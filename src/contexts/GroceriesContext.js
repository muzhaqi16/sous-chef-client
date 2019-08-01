import React from 'react'

const GroceriesContext = React.createContext({
    data: {},
    addGroceries: () => { },
    deleteGroceries: () => { },
    addShoppingListItem: () => { },
    removeShoppingListItem: () => { }
})

export default GroceriesContext