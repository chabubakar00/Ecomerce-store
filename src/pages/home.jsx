import Hero from "../components/Hero";
import ProductCard from "../components/ProductCard";
import { products } from "../data/products";

const Home = () => {
  const featuredProducts = products.slice(0, 3);

  return (
    <>
      <Hero />

      <section className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <p className="text-muted text-uppercase">Featured Products</p>

            <h2 className="fw-bold">Latest Collection</h2>
          </div>

          <div className="row g-4">
            {featuredProducts.map((product) => (
              <div className="col-md-4" key={product.id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;