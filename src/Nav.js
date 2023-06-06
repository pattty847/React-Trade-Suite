import { createContext, useState, useContext } from 'react'
import './Nav.css'
import { Dropdown } from "react-bootstrap"
import { ExchangeContext } from './Exchange'

function ExchangeSelection({ setSelectedExchange, availableExchanges, selectedExchange }) {
    return (
        <Dropdown>
            <Dropdown.Toggle variant="light" id="dropdown-basic" size='sm'>
                {selectedExchange ? selectedExchange : "Exchange"}
            </Dropdown.Toggle>

            <Dropdown.Menu>
                {
                    availableExchanges.map(exchangeName => (
                        <Dropdown.Item onClick={() => setSelectedExchange(exchangeName)}>{exchangeName}</Dropdown.Item>
                    ))
                }
            </Dropdown.Menu>
        </Dropdown>
    );
}


function SymbolSelection({setSelectedSymbol, availableSymbols}) {
    return (
        <div>
            <Dropdown>
                <Dropdown.Toggle variant='light' id='dropdown-basic' size='sm'>
                    Symbols
                </Dropdown.Toggle>
            </Dropdown>

            <Dropdown.Menu>
            {
                availableSymbols.map(exchange => (
                    <Dropdown.Item onClick={() => setSelectedSymbol(exchange)}>{exchange}</Dropdown.Item>
                ))
            }
            </Dropdown.Menu>
        </div>
    )
}

export function Nav({ setContent }) {

    const { exchange, changeExchange } = useContext(ExchangeContext);
    const availableExchanges = ['coinbasepro', 'bybit', 'bitfinex', 'kucoin'];

    return (            
        <div className="nav-bar">
            <div onClick={() => setContent('home')} className="button-2">Home</div>
            <div onClick={() => setContent('orderbook')} className='button-2'>Orderbook</div>
            <div onClick={() => setContent('price-banner')} className='button-2'>Banner</div>
            <h2 className="title">TradeSuite</h2>
            <ExchangeSelection
                setSelectedExchange={changeExchange}
                availableExchanges={availableExchanges}
                selectedExchange={exchange.id}  // assuming exchange is a ccxt instance and has an id property
            />
        </div>
    )
}