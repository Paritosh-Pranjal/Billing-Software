import React, { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import UploadImage from "../../assets/upload-image.png";
import toast from "react-hot-toast";
import { addItems } from "../../service/ItemService";

const ItemForm = () => {
  const { categories, setItemsData, itemsData, setCategories } =
    useAppContext();
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    categoryId: "",
    price: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);

  function onChangeHandler(e) {
    const name = e.target.name;
    const value = e.target.value;
    setData((data) => ({ ...data, [name]: value }));
  }

  async function onSubmitHandler(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("item", JSON.stringify(data));
      formData.append("file", image);
      if (!image) {
        toast.error("Select Image...");
        return;
      }
      const response = await addItems(formData);
      if (response.status === 201) {
        setItemsData([...itemsData, response.data]);
        setCategories((prev) =>
          prev.map((category) =>
            category.categoryId === data.categoryId
              ? { ...category, items: category.items + 1 }
              : category
          )
        );
        toast.success("Item Created successfully");
        setData({
          name: "",
          categoryId: "",
          price: "",
          description: "",
        });
        setImage(false);
      } else {
        throw new Error("Error while creating items");
      }
    } catch (error) {
      console.log("🚀 ~ onSubmitHandler ~ error:", error);
      toast.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="item-form-container"
      style={{ height: " 100vh", overflowY: "auto", overflowX: "hidden" }}
    >
      <div className="mx-2 mt-2">
        <div className="row">
          <div className="card col-md-12 form-container">
            <div className="card-body">
              <form onSubmit={onSubmitHandler}>
                <div className="mb-3">
                  <label htmlFor="image" className="form-label">
                    <img
                      src={image ? URL.createObjectURL(image) : UploadImage}
                      alt=""
                      width={48}
                    />
                  </label>
                  <input
                    type="file"
                    name="image"
                    id="image"
                    className="form-control"
                    hidden
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="form-control"
                    placeholder="Item Name..."
                    onChange={onChangeHandler}
                    value={data.name}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="categoryId" className="form-label">
                    Category
                  </label>
                  <br />
                  <select
                    name="categoryId"
                    id="category"
                    className="form-control"
                    onChange={onChangeHandler}
                    value={data.categoryId}
                  >
                    <option value="">Select Category</option>
                    {categories.map((category, index) => (
                      <option key={index} value={category.categoryId}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-3">
                  <label htmlFor="price" className="form-label">
                    Price
                  </label>
                  <input
                    type="number"
                    name="price"
                    id="price"
                    className="form-control"
                    placeholder="&#8377;200.00"
                    onChange={onChangeHandler}
                    value={data.price}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <textarea
                    rows={5}
                    name="description"
                    id="description"
                    className="form-control"
                    placeholder="Write content here..."
                    onChange={onChangeHandler}
                    value={data.description}
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-warning w-100"
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Save"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemForm;
