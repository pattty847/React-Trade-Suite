import { useState, useEffect } from "react";
import './TickerBanner.css'

function Ticker({ticker, index}) {
    const delay = index * 3;
    const animation = `ticker 20s linear ${delay}s infinite`;

    const [price, setPrice] = useState(1.44)

    return (
        <div className="ticker-item" style={{animation: animation}}>
            <div className="ticker-title">
                <strong>{ticker}</strong>
            </div>
            <div className="ticker-content">
                ${price}
            </div>
        </div>
    )
}

export function Banner() {

    const tickers = ['Bitcoin', 'Ethereum', 'Pepe', 'Harmony One']

    return (
        <div className="ticker">
            <div className="add-remove"> + </div>
            {
                tickers.map((ticker, index) => (
                    <Ticker key={index} ticker={ticker} index={index} />
                ))
            }
        </div>
    )
}
