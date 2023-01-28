import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    cartItems: []
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItem(state, action) {
            state.cartItems.push(action.payload)
        },
        updateItem(state, action) {
            // update with respect to your own item
        },
        deleteItem(state, action) {
            state.cartItems = state.cartItems.filter((item) => item.id !== action.payload.id);
        },
        reset: () => initialState
    }
})


export const cartActions = cartSlice.actions;
export default cartSlice;