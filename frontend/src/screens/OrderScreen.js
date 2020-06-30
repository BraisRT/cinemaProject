import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createOrder, detailsOrder, payOrder } from '../actions/orderActions';
import PaypalButton from '../components/PaypalButton';


function OrderScreen(props) {

  const orderPay = useSelector(state => state.orderPay);
  const { loading: loadingPay, success: successPay, error: errorPay } = orderPay;
  const dispatch = useDispatch();


  useEffect(() => {
    if (successPay) {
      props.history.push("/profile");
    } else {
      dispatch(detailsOrder(props.match.params.id));
    }
    return () => {
    };
  }, []);

  const handleSuccessPayment = (paymentResult) => {
    
    dispatch(payOrder(order, paymentResult));
  }

  const orderDetails = useSelector(state => state.orderDetails);
  const { loading, order, error } = orderDetails;
  


  return loading ? <div>Loading ...</div> : error ? <div>{error}</div> :
  <div>
  <div className="placeorder">
  <div className="placeorder-info">
    <div>
        <h3>State</h3>
      <div>
              {order.isDelivered ? "Sent at " + order.deliveredAt : "Not Sent."}
            </div>
    </div>
    <div>
      <h3>Payment</h3>
      <div>
        Payment Method: {order.payment.paymentMethod}
      </div>
      
    </div>
    <div>
      <ul className="cart-list-container">
        <li>
          <h3>
            Shopping Cart
      </h3>
          <div>
            Price
      </div>
        </li>
        {
                order.orderItems.length === 0 ?
                  <div>
                    Cart is empty
          </div>
            :
            order.orderItems.map(item =>
              <li>
               
                <div className="cart-name">
                  <div>
                    <Link to={"/product/" + item.product}>
                      {item.name}
                    </Link>

                  </div>
                  <div>
                    Qty: {item.qty}
                  </div>
                </div>
                <div className="cart-price">
                  €{item.price}
                </div>
              </li>
            )
        }
      </ul>
    </div>


        </div>
        <div className="placeorder-action">
          <ul>
          <li className="placeorder-actions-payment">
          <Link to={"/"} className="button primary full-width">Finalize Purchase</Link>
            </li>
            <li>
              <h3>Order Summary</h3>
            </li>
            <li>
              <div>Items</div>
              <div>€{order.itemsPrice}</div>
            </li>
            <li>
              <div>Order Total</div>
              <div>€{order.totalPrice}</div>
            </li>
          </ul>



        </div>

      </div>
    </div>

}

export default OrderScreen;