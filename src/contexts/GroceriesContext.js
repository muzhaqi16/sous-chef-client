import React from 'react'

const GroceriesContext = React.createContext({
    data: {},
    addGrocery: () => { },
    deleteGroceries: () => { },
    addShoppingListItem: () => { },
    removeShoppingListItem: () => { }
})

export default GroceriesContext