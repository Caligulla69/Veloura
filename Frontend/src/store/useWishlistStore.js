import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useWishlistStore = create(
  persist(
    (set, get) => ({
      wishlist: [],

      addToWishlist: (product) => {
        const current = get().wishlist;
        if (!current.find((item) => item.id === product.id)) {
          set({ wishlist: [...current, product] });
        }
      },

      removeFromWishlist: (id) => {
        set({ wishlist: get().wishlist.filter((item) => item.id !== id) });
      },

      toggleWishlist: (product) => {
        const exists = get().wishlist.find((item) => item.id === product.id);
        if (exists) get().removeFromWishlist(product.id);
        else get().addToWishlist(product);
      },

      isInWishlist: (id) => {
        return get().wishlist.some((item) => item.id === id);
      },
    }),
    { name: "wishlist-storage" } // persists to localStorage
  )
);
