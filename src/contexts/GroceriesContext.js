import React from 'react'

const GroceriesContext = React.createContext({
    data: {
        freezer: [],
        fridge: [],
        pantry: [],
    },
    addGroceries: () => { },
    deleteGroceries: () => { },
})

export default GroceriesContext
