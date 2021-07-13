import React from "react";
import { Link } from "react-router-dom";

const ProductListItems = ({ product }) => {
  return (
    <ul className="list-group">
      <li className="list-group-item d-inline-flex justify-content-between">
        Price
        <span> ${product.price} </span>
      </li>
      <li className="list-group-item d-inline-flex justify-content-between">
        Category
        <Link to={`/category/${product.category.slug}`}>
          {" "}
          {product.category.name}{" "}
        </Link>
      </li>
      <li className="list-group-item d-inline-flex justify-content-between">
        Sub Catgeories
        {product.subCategories &&
          product.subCategories.map((subCategory) => (
            <Link key={subCategory._id} className="">
              {subCategory.name}{" "}
            </Link>
          ))}{" "}
      </li>
      <li className="list-group-item d-inline-flex justify-content-between">
        Shipping
        <span> ${product.shipping} </span>
      </li>
      <li className="list-group-item d-inline-flex justify-content-between">
        Color
        <span> ${product.color} </span>
      </li>
      <li className="list-group-item d-inline-flex justify-content-between">
        Brand
        <span> ${product.brand} </span>
      </li>
      <li className="list-group-item d-inline-flex justify-content-between">
        Available
        <span> ${product.quantity} </span>
      </li>
      <li className="list-group-item d-inline-flex justify-content-between">
        Sold
        <span> ${product.sold} </span>
      </li>
    </ul>
  );
};

export default ProductListItems;
