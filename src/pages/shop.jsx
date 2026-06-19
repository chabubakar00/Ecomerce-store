import { useState } from "react";
import ProductCard from "../components/ProductCard";
import { products } from "../data/products";

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Women", "Men", "Accessories"];

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  return (
    <section className="py-5">
      <div className="container">
        <div className="text-center mb-4">
          <p className="text-muted text-uppercase">Our Products</p>

          <h2 className="fw-bold">Shop Collection</h2>
        </div>

        <div className="d-flex justify-content-center gap-2 flex-wrap mb-5">
          {categories.map((category) => (
            <button
              key={category}
              className={
                selectedCategory === category
                  ? "btn btn-dark"
                  : "btn btn-outline-dark"
              }
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="row g-4">
          {filteredProducts.map((product) => (
            <div className="col-sm-6 col-lg-4" key={product.id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Shop;