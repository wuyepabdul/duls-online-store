import React from "react";
import { loadingButton, loadingSpinner } from "../../helpers/loading";
import { Select, Form } from "antd";

const { Option } = Select;

const ProductUpdateForm = ({
  handleSubmit,
  handleChange,
  handleCategoryChange,
  values,
  loading,
  subOption,
  categories,
  arrayOfSubCategoriesIds,
  setArrayOfSubCategoriesIds,
  selectedCategory,
}) => {
  const {
    title,
    description,
    price,

    category,
    brands,
    subCategories,
    shipping,
    quantity,
    images,
    colors,
    color,
    brand,
  } = values;
  const arr = ["60d0e915b24e477d36a63b6a"];

  return (
    <div className="mt-1">
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={handleChange}
            className="form-control border border-top-0 border-end-0 border-start-0 border-bottom-1 border-primary"
            placeholder="Title"
          />
        </div>
        <div className="form-group mb-3">
          <textarea
            type="text"
            id="description"
            name="description"
            value={description}
            onChange={handleChange}
            className="form-control border border-top-0 border-end-0 border-start-0 border-bottom-1 border-primary"
            placeholder="Description"
          />
        </div>
        <div className="form-group mb-3">
          <input
            type="number"
            id="price"
            name="price"
            value={price}
            onChange={handleChange}
            className="form-control border border-top-0 border-end-0 border-start-0 border-bottom-1 border-primary"
            placeholder="Price"
          />
        </div>
        <div className="form-group mb-3">
          <select
            name="shipping"
            className="form-control border border-top-0 border-end-0 border-start-0 border-bottom-1 border-primary"
            onChange={handleChange}
            value={shipping === "Yes" ? "Yes" : "No"}
          >
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
        </div>
        <div className="form-group  mb-3">
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={quantity}
            onChange={handleChange}
            className="form-control border border-top-0 border-end-0 border-start-0 border-bottom-1 border-primary"
            placeholder="Quantity"
          />
        </div>
        <div className="form-groupborder mb-3">
          {/* <label>Color </label> */}
          <select
            name="color"
            className="form-control border border-top-0 border-end-0 border-start-0 border-bottom-1 border-primary"
            onChange={handleChange}
            value={color}
          >
            {colors.map((color) => (
              <option key={color} value={color}>
                {color}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group mb-3">
          <select
            name="brand"
            id="brand"
            className="form-control border border-top-0 border-end-0 border-start-0 border-bottom-1 border-primary"
            onChange={handleChange}
            value={brand}
          >
            {brands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group mb-3">
          <select
            name="category"
            id="category"
            className="form-select"
            aria-label="Default select example"
            onChange={handleCategoryChange}
            value={selectedCategory ? selectedCategory : category._id}
          >
            {categories !== null &&
              categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
          </select>
        </div>

        <Select
          mode="multiple"
          style={{ width: "100%" }}
          value={arrayOfSubCategoriesIds}
          onChange={(value) => setArrayOfSubCategoriesIds(value)}
        >
          {subOption.length &&
            subOption.map((sub) => (
              <Option key={sub._id} value={sub._id}>
                {sub.name}
              </Option>
            ))}
        </Select>

        <div className="d-grid gap-2 mt-4">
          {loading ? (
            loadingButton()
          ) : (
            <button className="btn btn-primary" type="submit">
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ProductUpdateForm;
