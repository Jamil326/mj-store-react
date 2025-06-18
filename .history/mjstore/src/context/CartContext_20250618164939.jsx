// context/CartContext.js
import React, { createContext, useReducer, useContext } from "react";

// Initial state
const initialState = {
  items: [], // Array of cart items
  total: 0,  // Total price
};

// Reducer function
const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (existingItemIndex !== -1) {
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex].quantity += 1;
        return {
          ...state,
          items: updatedItems,
          total: state.total + action.payload.price,
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
        total: state.total + action.payload.price,
      };

    case "REMOVE_ITEM":
      const filteredItems = state.items.filter(
        (item) => item.id !== action.payload.id
      );
      const removedItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      return {
        ...state,
        items: filteredItems,
        total: state.total - (removedItem.price * removedItem.quantity),
      };

    case "UPDATE_QUANTITY":
      const updatedCartItems = state.items.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
      const newTotal = updatedCartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      return { ...state, items: updatedCartItems, total: newTotal };

    case "CLEAR_CART":
      return initialState;

    default:
      return state;
  }
};

// Create Context
const CartContext = createContext();

// Provide Context
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addItem = (item) => dispatch({ type: "ADD_ITEM", payload: item });
  const removeItem = (id) => dispatch({ type: "REMOVE_ITEM", payload: { id } });
  const updateQuantity = (id, quantity) =>
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });
  const clearCart = () => dispatch({ type: "CLEAR_CART" });

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        total: state.total,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom Hook
export const useCart = () => useContext(CartContext);
