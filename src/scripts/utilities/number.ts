const replace = require('lodash/replace');

export function roundTo(n: number, digits: number) {
    if (!n) {
        return 0;
    }
    
    if (digits === undefined) {
        digits = 0;
    }

    const multiplicator = Math.pow(10, digits);
    n = parseFloat((n * multiplicator).toFixed(11));
    const test = (Math.round(n) / multiplicator);
    return +(test.toFixed(digits));
}

export function formatCurrency(amount: number, sourceCurrency?: string, rate?: number) {
    // Default destCurrency = 'VND'
    if (!amount || amount <= 0) {
        return `0 ${sourceCurrency ? sourceCurrency : ''}`.trim();
    }

    if (sourceCurrency) {
        amount = roundTo(+amount / rate, 2);
    }

    return `${replace(amount, /(\d)(?=(\d{3})+(?!\d))/g, '$1,')} ${sourceCurrency ? sourceCurrency : ''}`.trim();
}