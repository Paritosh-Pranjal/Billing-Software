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

  useEffect(() => {
    async function loadData() {
      if (localStorage.getItem("token") && localStorage.getItem("role")) {
        setAuthData(
          localStorage.getItem("token"),
          localStorage.getItem("role")
        );
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
