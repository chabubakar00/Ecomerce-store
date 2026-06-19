import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const cartItem = useSelector((state) =>
    state.cart.cartItems.find((item) => item.id === product.id)
  );

  const quantityInCart = cartItem ? cartItem.quantity : 0;

  const remainingStock = product.stock - quantityInCart;

  const isOutOfStock = remainingStock === 0;

  return (
    <div className="card product-card h-100 border-0 shadow-sm">
      <div className="product-image-box">
        <img src={product.image} className="card-img-top" alt={product.title} />
      </div>

      <div className="card-body">
        <p className="text-muted mb-1">{product.category}</p>

        <h5 className="card-title">{product.title}</h5>

        <p className="card-text small text-muted">{product.description}</p>

        <div className="d-flex gap-2 align-items-center mb-2">
          <span className="fw-bold">PKR {product.price.toLocaleString()}</span>

          <span className="text-muted text-decoration-line-through">
            PKR {product.oldPrice.toLocaleString()}
          </span>
        </div>

        <p className="small mb-1">
          Available Stock: <strong>{remainingStock}</strong>
        </p>

        <p className="small text-muted">
          In Cart: <strong>{quantityInCart}</strong>
        </p>

        <button
          className="btn btn-dark w-100"
          disabled={isOutOfStock}
          onClick={() => dispatch(addToCart(product))}
        >
          {isOutOfStock ? "Out of Stock" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;