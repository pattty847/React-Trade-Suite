import React, { useEffect, useState } from 'react';
import ccxt from 'ccxt';

export const ExchangeContext = React.createContext();
// other imports...

export const ExchangeProvider = ({ children }) => {
    const [exchange, setExchange] = useState(new ccxt.pro.coinbasepro()); // default exchange
    
    const changeExchange = async (newExchangeName) => {
        if(exchange) {
            await exchange.close();
        }
        // initialize new exchange
        const newExchange = new ccxt.pro[newExchangeName]();
        setExchange(newExchange);
    };

    useEffect(() => {
        return async () => {
            if(exchange) {
                await exchange.close();
            }
        };
    }, [exchange]);

    return (
        <ExchangeContext.Provider value={{ exchange, changeExchange }}>
            {children}
        </ExchangeContext.Provider>
    );
};
