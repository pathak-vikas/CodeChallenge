import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  selectOrderItem,
  setOrderItem,
} from "../../features/forms/orderItemsSlice";
import {
  selectViewCart,
  setViewCart,
} from "../../features/forms/ViewCartSlice";

import style from "../../components/styles/table.module.scss";
import axios from "axios";

function ViewCartForm() {
  const orderItems = useSelector(selectOrderItem);
  const viewCart = useSelector(selectViewCart);
  let dispatch = useDispatch();

  function placeOrder() {
    const orders = JSON.stringify([...orderItems]);
    axios.post("/api/saveorders/", { orders }).then((re) => {
      dispatch(setOrderItem([]));
      dispatch(setViewCart(false));
    });
  }

  return (
    <div>
      {viewCart && (
        <AddWellWrapper>
          <FormContainer onSubmit={(e) => {}}>
            <FormTitle>
              <span>Add to Cart</span>
              <span
                onClick={() => {
                  dispatch(setViewCart(false));
                }}
              >
                X
              </span>
            </FormTitle>
            <div className={style.TableContainer}>
              {orderItems !== null && (
                <>
                  {orderItems.length === 0 ? (
                    <div>
                      <div>Ops the cart is empty</div>
                      <Createbutton
                        onClick={(e) => {
                          e.preventDefault();
                          dispatch(setViewCart(false));
                        }}
                      >
                        Shop Now
                      </Createbutton>
                    </div>
                  ) : (
                    <>
                      <table className={style.Table}>
                        <thead>
                          <th>Id</th>
                          <th>Name</th>
                          <th>Price</th>
                          <th>Quantity</th>
                          <th>Restaurant</th>
                        </thead>

                        <tbody>
                          {orderItems.map((item, index) => {
                            return (
                              <tr>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.price}</td>
                                <td>{item.quantity}</td>
                                <td>{item.restaurant}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                      <Createbutton
                        onClick={(e) => {
                          e.preventDefault();
                          placeOrder();
                        }}
                      >
                        Create Order
                      </Createbutton>
                    </>
                  )}
                </>
              )}
            </div>
          </FormContainer>
        </AddWellWrapper>
      )}
    </div>
  );
}

const Createbutton = styled.button`
  margin-top: 20px;
`;
const FormTitle = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom:20px;
    & > span {
    font-weight: 600;
    text-transform: capitalize;
    font-size: 12px;
    color: black;
    padding: 2px;
    border-radius:7px;
    border-radius:50%;
    
    }
    & > span:first-child{
        font-size:15px;
    }

    & > span:last-child{
        font-weight: bold;
        color:black;
        display:flex;
        justify-content:center;
        align-items:center;
        height:20px;
        width:20px;
        cursor:pointer;
    }

    & > span:last-child:hover{
        background-color: rgba(0, 0, 0, 0.3);
        color: white;
    }
  }`;

const AddWellWrapper = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.2);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 11100;
  }`;

const FormContainer = styled.form`
  background: #eeeaea;
  width: 50%;
  height: 70%;
  padding: 50px;
  padding-top: 5px;
  border-radius: 10px;
  box-shadow: -1px 1px 5px 0px rgba(0, 0, 0, 0.75);
  -webkit-box-shadow: -1px 1px 5px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: -1px 1px 5px 0px rgba(0, 0, 0, 0.75);
`;

export default ViewCartForm;
