import React from 'react'

const GroceriesContext = React.createContext({
    data: {},
    addGrocery: () => { },
    deleteGrocery: () => { },
    addShoppingListItem: () => { },
    removeShoppingListItem: () => { }
})

export default GroceriesContext