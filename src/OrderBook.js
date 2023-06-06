import React, { useEffect, useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import * as ccxt from 'ccxt'
import { Line } from 'react-chartjs-2';

export const LiquidityVolumeChart = ({ exchange }) => {
    const exchangeObject = new ccxt.pro[exchange]()
    const [isWatching, setIsWatching] = useState(false);
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
            {
                label: 'Bids',
                data: [],
                borderColor: 'green'
            },
            {
                label: 'Asks',
                data: [],
                borderColor: 'red'
            }
        ]
    })    

    const updateChart = (orderbook) => {
        const bids = orderbook.bids.slice(0, 100).sort((a, b) => a[0] - b[0])
        const asks = orderbook.asks.slice(0, 100).sort((a, b) => a[0] - b[0])

        const bidLabels = bids.map((item) => item[0])
        const bidVolumes = bids.map((item) => item[1])
        const askLabels = asks.map((item) => item[0])
        const askVolumes = asks.map((item) => item[1])

        setChartData({
            labels: bidLabels.concat(askLabels),
            datasets: [
                {
                    label: 'Bids',
                    data: bidVolumes,
                    borderColor: 'green'
                },
                {
                    label: 'Asks',
                    data: askVolumes,
                    borderColor: 'red'
                }
            ]
        })
    }

    useEffect(() => {
        let cancel = false

        const startWatching = async () => {
            if (exchangeObject.has['watchTrades']) {
                while (!cancel && isWatching) {
                    try {
                        const orderbook = await exchangeObject.watchOrderBook("BTC/USD", 100)
                        console.log(orderbook)
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
                if (exchangeObject.close !== undefined) {
                    await exchangeObject.close();
                }
            })();
        };
    }, [exchange, isWatching]);

    const toggleWatching = () => {
        setIsWatching(!isWatching)
    }

    const options = {
        scales: {
            xAxes: [
                {
                    type: 'linear', // added this line
                    display: true,
                    position: 'bottom',
                    title: {
                        display: true,
                        text: 'Price'
                    }
                }
            ],
            yAxes: [
                {
                    type: 'linear', // added this line
                    display: true,
                    position: 'left',
                    title: {
                        display: true,
                        text: 'Volume'
                    }
                }
            ]
        }
    }
    

    return (
        <div>
            <Button variant="link" onClick={toggleWatching}>{isWatching ? 'Stop' : 'Start'}</Button>
            <Line data={chartData} options={options} />
        </div>
    );
};

export default LiquidityVolumeChart;
