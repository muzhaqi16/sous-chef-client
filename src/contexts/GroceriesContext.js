import React from 'react'

const GroceriesContext = React.createContext({
    data: {},
    addGroceries: () => {},
    deleteGroceries: () => {},
})

export default GroceriesContext