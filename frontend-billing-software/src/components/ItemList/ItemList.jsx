import React, { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { deleteItem } from "../../service/ItemService";
import toast from "react-hot-toast";
import "./ItemList.css";
const ItemList = () => {
  const { itemsData, setItemData } = useAppContext();
  const [searchTerm, setSearchTerm] = useState("");

  const filterItemData = itemsData.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const deleteItemById = async (itemId) => {
    try {
      const response = await deleteItem(itemId);
      if (response.status === 204) {
        const updatedItemsData = itemsData.filter(
          (item) => item.itemId !== itemId
        );
        setItemData(updatedItemsData);
        toast.success("Item deleted");
      } else {
        // display error toast message
        toast.error("Unable to delete item");
      }
    } catch (error) {
      console.log("🚀 ~ deleteItemById ~ error:", error);
      // display error toast message
      toast.error("Unable to delete item");
    }
  };

  return (
    <div
      className="div category-list-container"
      style={{
        height: "100vh",
        overflowY: "auto",
        overflowX: "hidden",
      }}
    >
      <div className="row pe-2">
        <div className="input-group mb-3">
          <input
            type="text"
            name="keyword"
            id="keyword"
            placeholder="Search by keyword"
            className="form-control"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="input-group-text bg-warning">
            <i className="bi bi-search"></i>
          </span>
        </div>
      </div>

      <div className="row g-3 pe-2">
        {filterItemData.length > 0 &&
          filterItemData.map((item, index) => (
            <div key={index} className="col-12">
              <div className="card p-3 bg-dark">
                <div className="d-flex align-items-center">
                  <div
                    style={{
                      marginRight: "15px",
                    }}
                  >
                    <img
                      src={item.imgUrl}
                      alt={item.name}
                      className="item-image"
                    />
                  </div>
                  <div className="flex-grow-1">
                    <h6 className="mb-1 text-white">{item.name}</h6>
                    <p className="mb-0 text-white">
                      Category: {item.categoryName}
                    </p>
                    <span className="mb-0 text-block badge rounded-pill text-bg-warning">
                      &#8377;{item.price}
                    </span>
                  </div>
                  <div>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => deleteItemById(item.itemId)}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ItemList;
