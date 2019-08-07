import React from 'react'

const GroceriesContext = React.createContext({
    data: {},
    setGroceries: () => { },
    addGrocery: () => { },
    deleteGrocery: () => { },
    addShoppingListItem: () => { },
    removeShoppingListItem: () => { }
})

export default GroceriesContext