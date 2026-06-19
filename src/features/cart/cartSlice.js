import { createSlice } from "@reduxjs/toolkit";

const getCartFromLocalStorage = () => {
  const savedCart = localStorage.getItem("cartItems");

  if (savedCart) {
    return JSON.parse(savedCart);
  }

  return [];
};

const saveCartToLocalStorage = (cartItems) => {
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
};

const calculateTotalQuantity = (cartItems) => {
  return cartItems.reduce((total, item) => total + item.quantity, 0);
};

const calculateTotalAmount = (cartItems) => {
  return cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
};

const savedCartItems = getCartFromLocalStorage();

const initialState = {
  cartItems: savedCartItems,
  totalQuantity: calculateTotalQuantity(savedCartItems),
  totalAmount: calculateTotalAmount(savedCartItems),
};

const cartSlice = createSlice({
  name: "cart",

  initialState,

  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;

      const existingProduct = state.cartItems.find(
        (item) => item.id === product.id
      );

      if (existingProduct) {
        if (existingProduct.quantity < existingProduct.stock) {
          existingProduct.quantity += 1;
        }
      } else {
        if (product.stock > 0) {
          state.cartItems.push({
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
            stock: product.stock,
            quantity: 1,
          });
        }
      }

      state.totalQuantity = calculateTotalQuantity(state.cartItems);
      state.totalAmount = calculateTotalAmount(state.cartItems);

      saveCartToLocalStorage(state.cartItems);
    },

    increaseQuantity: (state, action) => {
      const id = action.payload;

      const product = state.cartItems.find((item) => item.id === id);

      if (product && product.quantity < product.stock) {
        product.quantity += 1;
      }

      state.totalQuantity = calculateTotalQuantity(state.cartItems);
      state.totalAmount = calculateTotalAmount(state.cartItems);

      saveCartToLocalStorage(state.cartItems);
    },

    decreaseQuantity: (state, action) => {
      const id = action.payload;

      const product = state.cartItems.find((item) => item.id === id);

      if (product && product.quantity > 1) {
        product.quantity -= 1;
      } else {
        state.cartItems = state.cartItems.filter((item) => item.id !== id);
      }

      state.totalQuantity = calculateTotalQuantity(state.cartItems);
      state.totalAmount = calculateTotalAmount(state.cartItems);

      saveCartToLocalStorage(state.cartItems);
    },

    removeFromCart: (state, action) => {
      const id = action.payload;

      state.cartItems = state.cartItems.filter((item) => item.id !== id);

      state.totalQuantity = calculateTotalQuantity(state.cartItems);
      state.totalAmount = calculateTotalAmount(state.cartItems);

      saveCartToLocalStorage(state.cartItems);
    },

    clearCart: (state) => {
      state.cartItems = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;

      localStorage.removeItem("cartItems");
    },
  },
});

export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;