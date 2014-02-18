Ext.define('moneyworld.store.BarLabel', {
    extend: 'Ext.data.Store',
    config: {
        fields: ['year', 'top20', 'top40', 'top60', 'top80', 'top100'],
        data: [
                {year: 2005, top20: 80, top40: 10, top60: 4, top80: 3, top100: 3},
                {year: 2006, top20: 70, top40: 15, top60: 6, top80: 5, top100: 4},
                // {year: 2007, top20: 60, top40: 20, top60: 8, top80: 6, top100: 6},
                // {year: 2008, top20: 50, top40: 20, top60: 10, top80: 10, top100: 10}
              ]
    }
});