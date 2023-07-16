import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      item.quantity = 1; // Définit la quantité par défaut à 1 lors de l'ajout au panier
      state.push(item);
    },
    incrementQuantity: (state, action) => {
      const item = action.payload;
      const existingItem = state.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        existingItem.quantity += 1;
      }
    },
    decrementQuantity: (state, action) => {
      const itemId = action.payload;
      const item = state.find((cartItem) => cartItem.id === itemId);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },
    removeFromCart: (state, action) => {
      const itemId = action.payload;
      return state.filter((item) => item.id !== itemId);
    },
    clearCart: () => {
      return [];
    },
  },
});

export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
