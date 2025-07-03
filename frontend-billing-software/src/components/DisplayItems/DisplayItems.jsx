import React, { useState } from "react";
import "./DisplayItems.css";
import { useAppContext } from "../../context/AppContext";
import Item from "../Item/Item";
import SearchBox from "../SearchBox/SearchBox";

const DisplayItems = ({ selectedCategory }) => {
  const { itemsData } = useAppContext();
  const [searchText, setSearchText] = useState("");

  const filterItems = itemsData
    .filter((item) => {
      if (!selectedCategory) return true;
      return item.categoryId === selectedCategory;
    })
    .filter((item) =>
      item.name.toLowerCase().includes(searchText.toLowerCase())
    );

  return (
    <div className="p-3">
      <div className="d-flex justify-content-between mb-4">
        <div></div>
        <div>
          <SearchBox onSearch={setSearchText} />
        </div>
      </div>
      <div className="row g-3">
        {filterItems.map((item, index) => (
          <div key={index} className="col-md-4 col-sm-6">
            <Item
              itemName={item.name}
              itemPrice={item.price}
              itemImage={item.imgUrl}
              itemId={item.itemId}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisplayItems;
