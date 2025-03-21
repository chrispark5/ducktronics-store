import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set, get) => ({
      cartItems: [],

      fetchCart: async () => {
        const token = localStorage.getItem("token");
        if (!token) return;

        try {
          const response = await fetch("http://localhost:5001/cart", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const cartItems = await response.json();
            set({ cartItems });
          } else {
            console.error("Failed to fetch cart items.");
          }
        } catch (error) {
          console.error("Error fetching cart items:", error);
        }
      },

      syncCart: async () => {
        const token = localStorage.getItem("token");
        if (!token) return;

        try {
          const response = await fetch("http://localhost:5001/cart", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ cartItems: get().cartItems }),
          });

          if (!response.ok) {
            console.error("Failed to sync cart items.");
          }
        } catch (error) {
          console.error("Error syncing cart items:", error);
        }
      },

      addToCart: (item) => {
        set((state) => {
          const existingItem = state.cartItems.find(
            (cartItem) => cartItem.id === item.id
          );

          if (existingItem) {
            return {
              cartItems: state.cartItems.map((cartItem) =>
                cartItem.id === item.id
                  ? { ...cartItem, quantity: cartItem.quantity + 1 }
                  : cartItem
              ),
            };
          } else {
            return {
              cartItems: [...state.cartItems, { ...item, quantity: 1 }],
            };
          }
        });

        get().syncCart();
      },

      removeFromCart: (itemId) => {
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
            .filter((item) => item.quantity !== undefined),
        }));

        get().syncCart();
      },

      removeItemCompletely: (itemId) => {
        set((state) => ({
          cartItems: state.cartItems.filter((item) => item.id !== itemId),
        }));

        get().syncCart();
      },

      clearCart: () => {
        set({ cartItems: [] });
        get().syncCart();
      },
    }),
    {
      name: "cart-storage",
    }
  )
);
