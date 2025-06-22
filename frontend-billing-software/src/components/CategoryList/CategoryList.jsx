import React, { useState } from "react";
import "./CategoryList.css";
import { useAppContext } from "../../context/AppContext";
import { deleteCategory } from "../../service/CategoryService";
import toast from "react-hot-toast";

const CategoryList = () => {
  const { categories, setCategories } = useAppContext();
  const [searchTerm, setSearchTerm] = useState("");

  const filterCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );


  const deleteCategories = async (categoryId) => {
    try {
      const response = await deleteCategory(categoryId);
      if (response.status === 204) {
        const updatedCategories = categories.filter(
          (category) => category.categoryId !== categoryId
        );
        setCategories(updatedCategories);
        toast.success("Category deleted");
      } else {
        // display error toast message
        toast.error("Unable to delete category");
      }
    } catch (error) {
      console.log("🚀 ~ deleteCategories ~ error:", error);
      // display error toast message
      toast.error("Unable to delete category");
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

      <div className="div row g-3 pe-2">
        {filterCategories.length > 0 &&
          filterCategories.map((category, index) => (
            <div key={index} className="col-12">
              <div
                className="div card p-3"
                style={{
                  backgroundColor: category.bgColor,
                }}
              >
                <div className="d-flex align-items-center">
                  <div
                    style={{
                      marginRight: "15px",
                    }}
                  >
                    <img
                      src={category.imgUrl}
                      alt={category.name}
                      className="category-image"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex-grow-1">
                    <h5 className="mb-1 text-white">{category.name}</h5>
                    <p className="mb-0 text-white">{category.items}</p>
                  </div>
                  <div>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => deleteCategories(category.categoryId)}
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

export default CategoryList;
