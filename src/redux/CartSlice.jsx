import { createSlice } from "@reduxjs/toolkit";

export const CartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    addItem: (state, action) => {
      const { name, cost, image } = action.payload;
      const item = state.items.find((d) => d.name === name);

      if (item) {
        item.quantity++;
      } else {
        state.items.push({ name, cost, image, quantity: 1 });
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((d) => d.name !== action.payload.name);
    },
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const item = state.items.find((d) => d.name === name);
      if (item) {
        item.quantity = quantity;
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
