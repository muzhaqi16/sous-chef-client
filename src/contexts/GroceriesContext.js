import React from 'react'

const GroceriesContext = React.createContext({
    data: {},
    addGroceries: () => { },
    deleteGroceries: () => { },
    addShoppingListItem: () => { }
})

export default GroceriesContext