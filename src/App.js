import React, { useEffect, useState } from 'react';
import './App.css';
import { Nav } from './Nav';
import { Banner } from './TickerBanner';
import { TradeFeed } from './TradeFeed';
import LiquidityVolumeChart from './LiquidityRatio';
import { ExchangeProvider } from './Exchange';
import Button from 'react-bootstrap/Button';

function App() {
  const [home, setHome] = useState('home');
  const [exchange, setExchange] = useState('coinbasepro')
  const [isWatching, setIsWatching] = useState(false);

  useEffect(() => {
    console.log('Home: ', home, 'Exchange: ', exchange)
  }, [home, exchange])

  const setContent = (content) => {
    setHome(content);
  };

  const toggleWatching = () => {
    setIsWatching(!isWatching);
  }

  return (
    <div className='App'>
      <ExchangeProvider>
        <Nav setContent={setContent}/> 
        {home === 'price-banner' && <Banner />}
        {home === 'orderbook' && <>
        <Button variant="light" onClick={toggleWatching}>{isWatching ? 'Stop' : 'Start'}</Button>
        <LiquidityVolumeChart isWatching={isWatching}/> 
        <TradeFeed isWatching={isWatching}/>
        </>}
      </ExchangeProvider>
    </div>
  );
}

export default App;