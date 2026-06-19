import { useDispatch } from "react-redux";

import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "../features/cart/cartSlice";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const remainingStock = item.stock - item.quantity;

  return (
    <div className="card mb-3 border-0 shadow-sm">
      <div className="row g-0 align-items-center">
        <div className="col-md-2">
          <img
            src={item.image}
            alt={item.title}
            className="img-fluid rounded-start cart-img"
          />
        </div>

        <div className="col-md-10">
          <div className="card-body">
            <div className="d-flex justify-content-between flex-wrap gap-3">
              <div>
                <h5 className="card-title">{item.title}</h5>

                <p className="mb-1">
                  Price: PKR {item.price.toLocaleString()}
                </p>

                <p className="mb-1">Selected Quantity: {item.quantity}</p>

                <p className="text-muted mb-1">
                  Remaining Stock: {remainingStock}
                </p>

                <p className="fw-bold">
                  Subtotal: PKR{" "}
                  {(item.price * item.quantity).toLocaleString()}
                </p>
              </div>

              <div>
                <div className="btn-group mb-2">
                  <button
                    className="btn btn-outline-dark"
                    onClick={() => dispatch(decreaseQuantity(item.id))}
                  >
                    -
                  </button>

                  <button className="btn btn-light">{item.quantity}</button>

                  <button
                    className="btn btn-outline-dark"
                    disabled={item.quantity >= item.stock}
                    onClick={() => dispatch(increaseQuantity(item.id))}
                  >
                    +
                  </button>
                </div>

                <br />

                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => dispatch(removeFromCart(item.id))}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;