import React from "react";
import { loadingButton } from "../../helpers/loading";
import { Select, Form } from "antd";

const { Option } = Select;

const ProductForm = ({
  handleSubmit,
  handleChange,
  handleCategoryChange,
  values,
  loading,
  subOption,
  showSubs,
  setValues,
}) => {
  const {
    title,
    description,
    price,
    categories,
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
          >
            <option>Shipping</option>
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
          >
            <option>Please Select a color</option>
            {colors.map((color) => (
              <option key={color} value={color}>
                {color}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group mb-3">
          {/* <label>Color </label> */}
          <select
            name="brand"
            id="brand"
            className="form-control border border-top-0 border-end-0 border-start-0 border-bottom-1 border-primary"
            onChange={handleChange}
          >
            <option>Please Select a brand</option>
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
          >
            <option defaultValue>Category</option>
            {categories !== null &&
              categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name} {}
                </option>
              ))}
          </select>
        </div>
        {showSubs && (
          <Form.Item name="subCategory">
            <Select
              mode="multiple"
              style={{ width: "100%" }}
              placeholder="Please Select Sub Category"
              value={subCategories}
              onChange={(value) =>
                setValues({ ...values, subCategories: value })
              }
            >
              {subOption.length &&
                subOption.map((sub) => (
                  <Option key={sub._id} value={sub._id}>
                    {sub.name}
                  </Option>
                ))}
            </Select>
          </Form.Item>
        )}
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

export default ProductForm;
