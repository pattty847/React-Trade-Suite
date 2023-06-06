import React, { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import './LiquidityRatio.css'
import * as ccxt from 'ccxt'
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { ExchangeContext } from './Exchange';
Chart.register(...registerables);

const LiquidityVolumeChart = ({isWatching}) => {
    const { exchange } = useContext(ExchangeContext);
    const [chartData, setChartData] = useState({bids: { x: [], y: [] }, asks: { x: [], y: [] } })       
    const [isAggregated, setIsAggregated] = useState(false)

    const updateChart = (orderbook) => {
        const bids = {x: [], y: []}
        const asks = {x: [], y: []}
        
        let bidsVolumeTotal = 0
        let asksVolumeTotal = 0

        for (let i = 0; i < orderbook.bids.length; i++) {
            bidsVolumeTotal += orderbook.bids[i][1]
            bids.x.push(orderbook.bids[i][0]) // Prices
            bids.y.push(isAggregated ? bidsVolumeTotal : orderbook.bids[i][1]) // Volumes
        }

        for (let i = 0; i < orderbook.asks.length; i++) {
            asksVolumeTotal += orderbook.asks[i][1]
            asks.x.push(orderbook.asks[i][0]) // Prices
            asks.y.push(isAggregated ? asksVolumeTotal : orderbook.asks[i][1]) // Volumes
        }

        setChartData({
            bids: bids,
            asks: asks
        })
    }

    useEffect(() => {
        let cancel = false

        const startWatching = async () => {
            if (exchange.has['watchTrades']) {
                while (!cancel && isWatching) {
                    try {
                        const orderbook = await exchange.watchOrderBook("BTC/USD", 100)
                        //console.log(orderbook)
                        updateChart(orderbook)
                    } catch (e) {
                        console.log(e);
                    }
                }
            }
        };

        if (isWatching) {
            startWatching()
        }

        return () => {
            cancel = true;
            (async () => {
                if (exchange.close !== undefined) {
                    await exchange.close();
                }
            })();
        };
    }, [isAggregated, isWatching]);


    return (
        <div>
            <Button variant='light' onClick={() => setIsAggregated(!isAggregated)}>
                {isAggregated ? 'Normal Book' : 'Cummulative Book'}
            </Button>
            <div className='chart-container'>
                <Bar
                    data={{
                        labels: chartData.bids.x,
                        datasets: [
                            {
                                label: 'Bids',
                                data: chartData.bids.y,
                                borderColor: 'green',
                                backgroundColor: 'rgba(0, 255, 0, 1)',
                                fill: false,
                            },
                        ],
                    }}
                    options={{
                        scales: {
                            x: { type: 'linear', title: { display: true, text: 'Price' }},
                            y: { type: 'linear', title: { display: true, text: 'Volume' }},
                        },
                        barThickness: 2,
                        barPercentage: 0.5,
                        categoryPercentage: 0.5
                    }}
                />
                <Bar
                    data={{
                        labels: chartData.asks.x,
                        datasets: [
                            {
                                label: 'Asks',
                                data: chartData.asks.y,
                                borderColor: 'red',
                                backgroundColor: 'rgba(255, 0, 0, 1)',
                                fill: false,
                            },
                        ],
                    }}
                    options={{
                        scales: {
                            x: { type: 'linear', title: { display: true, text: 'Price' }},
                            y: { type: 'linear', title: { display: true, text: 'Volume' }},
                        },
                        barThickness: 2,
                        barPercentage: 0.5,
                        categoryPercentage: 0.5
                    }}
                />
            </div>
        </div>
    );
};

export default LiquidityVolumeChart;
