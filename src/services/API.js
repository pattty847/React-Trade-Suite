import ccxt from "ccxt"



class API {
    constructor(exchange) {
        this.exchange = exchange
    }

    async loadExchange(selectedExchange) {
        let exchange = new ccxt[selectedExchange]();
    
        // Load markets
        await exchange.loadMarkets();
    
        // Check if the exchange supports fetchOHLCV
        if (exchange.has.fetchOHLCV) {
            // Get symbols
            let symbols = exchange.symbols;
            console.log(symbols);
    
            // Get timeframes
            let timeframes = exchange.timeframes;
            console.log(timeframes);
        } else {
            console.log(`${exchange.id} does not support fetchOHLCV.`);
        }
    }
}