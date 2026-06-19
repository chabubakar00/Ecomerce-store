import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="hero-section d-flex align-items-center">
      <div className="container">
        <div className="col-md-6 text-white">
          <p className="text-uppercase fw-semibold">New Collection</p>

          <h1 className="display-4 fw-bold">
            Elegant Fashion For Every Season
          </h1>

          <p className="lead">
            Discover stylish clothing, accessories, and modern fashion products.
          </p>

          <Link to="/shop" className="btn btn-light px-4 py-2 mt-3">
            Shop Now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;