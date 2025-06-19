import { createContext, useContext, useEffect, useState } from "react";
import { fetchAllCategories } from "../service/CategoryService";

const AppContext = createContext(null);

export default function AppContextProvider({ props }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function loadData() {
      const response = await fetchAllCategories();
      setCategories(response.data);
    }
    loadData();
  }, []);

  const contextValue = {
    categories,
    setCategories,
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
