import React, { ReactNode, createContext, useContext, useState } from "react";
import { CartItem, Product, Store, User } from "../type";

interface StoreContextType {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  createStore: (name: string) => void;
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  removeProduct: (productId: string) => void;
  products: Product[];
  login: (email: string, password: string) => void;
  logout: () => void;
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [store, setStore] = useState<Store | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);

  const createStore = (name: string) => {
    if (currentUser) {
      const newStore: Store = {
        id: Date.now().toString(),
        name,
        products: [],
      };
      setStore(newStore);
      setCurrentUser({ ...currentUser, store: newStore });
    }
  };

  const addProduct = (product: Product) => {
    if (store) {
      const updatedStore = {
        ...store,
        products: [...store.products, product],
      };
      setStore(updatedStore);
      setCurrentUser(prev => (prev ? { ...prev, store: updatedStore } : null));
    }
  };

  const updateProduct = (updatedProduct: Product) => {
    if (store) {
      const updatedProducts = store.products.map(product =>
        product.id === updatedProduct.id ? updatedProduct : product,
      );
      const updatedStore = { ...store, products: updatedProducts };
      setStore(updatedStore);
      setCurrentUser(prev => (prev ? { ...prev, store: updatedStore } : null));
    }
  };

  const removeProduct = (productId: string) => {
    if (store) {
      const updatedProducts = store.products.filter(product => product.id !== productId);
      const updatedStore = { ...store, products: updatedProducts };
      setStore(updatedStore);
      setCurrentUser(prev => (prev ? { ...prev, store: updatedStore } : null));
    }
  };

  const login = (email: string) => {
    // Mock login functionality
    const user: User = {
      id: "1",
      name: "John Doe",
      email: email,
    };
    setCurrentUser(user);
  };

  const logout = () => {
    setCurrentUser(null);
    setStore(null);
    setCart([]);
  };

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.product.id === product.id);
      if (existingItem) {
        return prevCart.map(item => (item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
      }
      return [...prevCart, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.product.id !== productId));
  };

  return (
    <StoreContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        createStore,
        addProduct,
        updateProduct,
        removeProduct,
        products: store?.products || [],
        login,
        logout,
        cart,
        addToCart,
        removeFromCart,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
};
