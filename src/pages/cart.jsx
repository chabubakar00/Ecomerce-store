import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import CartItem from "../components/CartItem";
import { clearCart } from "../features/cart/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();

  const { cartItems, totalQuantity, totalAmount } = useSelector(
    (state) => state.cart
  );

  if (cartItems.length === 0) {
    return (
      <section className="py-5">
        <div className="container text-center">
          <h2 className="fw-bold mb-3">Your Cart is Empty</h2>

          <p className="text-muted">Please add some products to your cart.</p>

          <Link to="/shop" className="btn btn-dark">
            Go to Shop
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="py-5">
      <div className="container">
        <h2 className="fw-bold mb-4">Shopping Cart</h2>

        <div className="row">
          <div className="col-lg-8">
            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          <div className="col-lg-4">
            <div className="card border-0 shadow-sm">
              <div className="card-body">
                <h4 className="fw-bold mb-3">Order Summary</h4>

                <div className="d-flex justify-content-between mb-2">
                  <span>Total Items:</span>
                  <strong>{totalQuantity}</strong>
                </div>

                <div className="d-flex justify-content-between mb-3">
                  <span>Total Amount:</span>
                  <strong>PKR {totalAmount.toLocaleString()}</strong>
                </div>

                <button
                  className="btn btn-dark w-100 mb-2"
                  onClick={() => alert("Checkout frontend only")}
                >
                  Checkout
                </button>

                <button
                  className="btn btn-outline-danger w-100"
                  onClick={() => dispatch(clearCart())}
                >
                  Clear Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;