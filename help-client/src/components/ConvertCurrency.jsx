import React from 'react'

export const ConvertCurrency = (amount, currency) => {
    if (currency === 'USD') {
        return amount;
    } else if (currency === 'Leones') {
        return amount * 18940.1; 
    }
}
