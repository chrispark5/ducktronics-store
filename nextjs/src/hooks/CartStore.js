import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set, get) => ({
      cartItems: [],

      addToCart: (item) => {
        console.log(item);
        set((state) => {
          const existingItem = state.cartItems.find(
            (cartItem) => cartItem.id === item.id
          );

          if (existingItem) {
            // If item exists, increase its quantity
            return {
              cartItems: state.cartItems.map((cartItem) =>
                cartItem.id === item.id
                  ? { ...cartItem, quantity: cartItem.quantity + 1 }
                  : cartItem
              ),
            };
          } else {
            // If item doesn't exist, add it with quantity 1
            return {
              cartItems: [...state.cartItems, { ...item, quantity: 1 }],
            };
          }
        });
      },

      removeFromCart: (itemId) => {
        console.log(itemId);
        set((state) => ({
          cartItems: state.cartItems
            .map((item) =>
              item.id === itemId
                ? {
                    ...item,
                    quantity: item.quantity > 1 ? item.quantity - 1 : undefined,
                  }
                : item
            )
            .filter((item) => item.quantity !== undefined), // Remove the item if its quantity is undefined
        }));
      },
      removeItemCompletely: (itemId) => {
        set((state) => ({
          cartItems: state.cartItems.filter((item) => item.id !== itemId),
        }));
      },

      clearCart: () => set({ cartItems: [] }),
    }),
    {
      name: "cart-storage", // Key in localStorage
    }
  )
);
