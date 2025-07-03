import { createContext, useContext, useEffect, useState } from "react";
import { fetchAllCategories } from "../service/CategoryService";
import { fetchItems } from "../service/ItemService";

const AppContext = createContext(null);

export default function AppContextProvider(props) {
  const [categories, setCategories] = useState([]);
  const [itemsData, setItemsData] = useState([]);
  const [auth, setAuth] = useState({
    token: null,
    role: null,
  });

  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    const existingItem = cartItems.find(
      (cartItem) => cartItem.name === item.name
    );
    if (existingItem) {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.name === item.name
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (itemId) => {
    setCartItems(cartItems.filter((item) => item.itemId !== itemId));
  };

  const updateQuantity = (itemId, newQuantity) => {
    setCartItems(
      cartItems.map((item) =>
        item.itemId === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  useEffect(() => {
    async function loadData() {
      const token = localStorage.getItem("token");
      const role = localStorage.getItem("role");

      if (token && role && (auth.token !== token || auth.role !== role)) {
        setAuthData(token, role);
      }
      const response = await fetchAllCategories();
      const itemsResponse = await fetchItems();

      setCategories(response.data);
      setItemsData(itemsResponse.data);
    }

    loadData();
  }, [auth]);

  const setAuthData = (token, role) => {
    setAuth({ token, role });
  };

  const contextValue = {
    categories,
    setCategories,
    auth,
    setAuthData,
    itemsData,
    setItemsData,
    addToCart,
    cartItems,
    removeFromCart,
    updateQuantity,
  };
  return (
    <AppContext.Provider value={contextValue}>
      {props.children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context == undefined) {
    throw new Error("App context must be used inside the App folder");
  }
  return context;
}
