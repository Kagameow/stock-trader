const state = {
    defaultGameData: {
        funds: 10000,
        stockStorage: {
            /*This style (1rubles, 2brent, etc) of keys naming is important to save them in correct order in Firebase*/
            '1rubles': {
                name: 'Мини-деньги',
                ownedQuantity: 0,
                price: 78,
            },
            '2brent': {
                name: 'BRENT',
                ownedQuantity: 0,
                price: 40,
            },
            '3cocks': {
                name: 'Cocks',
                ownedQuantity: 0,
                price: 1000,
            },
        }
    },
}

export default {
    state
}