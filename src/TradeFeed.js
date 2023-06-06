import { useEffect, useState, useContext } from "react"
import { Dropdown } from "react-bootstrap"
import './TradeFeed.css'
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import API from './services/API'
import { ExchangeContext } from './Exchange';
import * as ccxt from 'ccxt'

const TradeComponent = ({ trade }) => {

    const sideClass = trade.side === 'buy' ? 'buy' : 'sell'
    return (
        <div className="trade">
            <Stack direction="horizontal" gap={3}>
                <p>{trade.datetime}</p>
                <p>{trade.symbol}</p>
                <p className={sideClass}>{trade.side.toUpperCase()}</p>
                <p>{trade.amount}</p>
                <p>{trade.price}</p>
                <p>{trade.cost}</p>
            </Stack>
        </div>
    )
}


export function TradeFeed({isWatching}) {

    const [symbol, setSymbol] = useState('BTC/USD')
    const [trades, setTrades] = useState([])
    const { exchange } = useContext(ExchangeContext)

    useEffect(() => {
        let cancel = false

        const startWatching = async () => {
            if (exchange.has['watchTrades']) {
                while (!cancel && isWatching) {
                    try {
                        const newTrades = await exchange.watchTrades(symbol);
                        setTrades(prevTrades => [...newTrades, ...prevTrades]);
                    } catch (e) {
                        console.log(e);
                    }
                }
            }
        };

        if (isWatching) {
            startWatching()
        }


        // Clean-up function to stop watching when the component is unmounted or exchange/symbol changes
        return () => {
            cancel = true;
            if (exchange.close !== undefined) {
              exchange.close();
            }
          };
    }, [exchange, symbol, isWatching]);


    return (
        <div className="trade-feed">
            <h2 style={{ textAlign: 'center' }}>Trades</h2>
            <div className="trade-feed-panel">
                {trades.map((trade, index) => (
                    <TradeComponent trade={trade} key={index} />
                ))}
            </div>
        </div>
    )
}