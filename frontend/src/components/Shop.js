import { useState, useRef, useCallback } from "react";
import useItemSearch from "./api/useItemSearch";
import styled from "styled-components";
import AddCartForm from "./forms/AddCartForm";
import { setAddCart } from "../features/forms/AddCartSlice";
import { useDispatch, useSelector } from "react-redux";
import { setActiveItem } from "../features/forms/ActiveItemSlice";
import {
  selectOrderItem,
  setOrderItem,
} from "../features/forms/orderItemsSlice";
import ViewCartForm from "./forms/ViewCartForm";
import { setViewCart } from "../features/forms/ViewCartSlice";
import axios from "axios";
import { Link } from "react-router-dom";
import style from "./styles/table.module.scss";

export default function ShopWindow() {
  const [query, setQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(1);

  const { items, hasMore, loading, error } = useItemSearch(query, pageNumber);

  const orderItems = useSelector(selectOrderItem);

  let dispatch = useDispatch();

  const observer = useRef();
  const lastBookElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  function placeOrder() {
    const orders = JSON.stringify([...orderItems]);
    axios.post("/api/saveorders/", { orders }).then((re) => {
      dispatch(setOrderItem([]));
    });
  }

  function handleSearch(e) {
    setQuery(e.target.value);
    setPageNumber(1);
  }

  return (
    <Container>
      <AddCartForm />
      <ViewCartForm />
      <Nav>
        <Link to="/orders/">Recently Purchased</Link>
        <input
          placeholder="search"
          type="text"
          value={query}
          onChange={handleSearch}
        ></input>
        <button
          onClick={(e) => {
            dispatch(setViewCart(true));
          }}
        >
          My Cart ({orderItems.length})
        </button>
        {orderItems.length > 0 && (
          <button
            onClick={(e) => {
              placeOrder();
            }}
          >
            Create Order
          </button>
        )}
      </Nav>
      <Main>
        <div>
          <div className={style.TableContainer}>
            {orderItems !== null && (
              <>
                <table className={style.Table}>
                  <thead>
                    <th>Id</th>
                    <th>Item Name</th>
                    <th>Price</th>
                    <th>Restaurant</th>
                    <th>Action</th>
                  </thead>
                  <tbody>
                    {items.map((item, index) => {
                      if (items.length === index + 1) {
                        return (
                          <tr ref={lastBookElementRef} key={item}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.price}</td>
                            <td>{item.count}</td>
                            <td>{item.restaurant}</td>
                            <td>
                              <button
                                onClick={(e) => {
                                  dispatch(setAddCart(true));
                                  dispatch(
                                    setActiveItem({
                                      name: item.name,
                                      restaurant: item.restaurant,
                                      price: item.price,
                                      id: item.id,
                                    })
                                  );
                                }}
                              >
                                add to cart
                              </button>
                            </td>
                          </tr>
                        );
                      } else {
                        return (
                          <tr key={item}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.price}</td>
                            <td>{item.restaurant}</td>
                            <td>
                              <button
                                onClick={(e) => {
                                  dispatch(setAddCart(true));
                                  dispatch(
                                    setActiveItem({
                                      name: item.name,
                                      restaurant: item.restaurant,
                                      price: item.price,
                                      id: item.id,
                                    })
                                  );
                                }}
                              >
                                add to cart
                              </button>
                            </td>
                          </tr>
                        );
                      }
                    })}
                  </tbody>
                </table>
              </>
            )}
          </div>

          {loading && <ProcessingSpinner>Loading.....</ProcessingSpinner>}
          <div>{error && "Error"}</div>
        </div>
      </Main>
    </Container>
  );
}

const ProcessingSpinner = styled.div`
  border-top: 8px solid rgba(0, 0, 0, 0.2);
  border-right: 8px solid rgba(0, 0, 0, 0.2);
  border-bottom: 8px solid rgba(0, 0, 0, 0.3);
  border-left: 8px solid rgba(0, 0, 0, 0.4);
  padding: 10px 2px;
  text-align: center;
  border-radius: 8px;
  color: blue;
`;

const Container = styled.div`
  height: 100vh;
  overflow: hidden;
`;

const Nav = styled.div`
  height: 10%;
  background: silver;
  padding: 10px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  width: 100vw;
  top: 0;
  input {
    border-radius: 6px;
    width: 150px;
    height: 30px;
    margin-right: 10px;
    border: 1px solid black;
    padding: 0px 6px;
    outline: none;
  }
  select {
    width: 180px;
    height: 30px;
    margin-right: 10px;
    border-radius: 6px;
    border: 1px solid black;
    cursor: pointer;
    padding: 0px 6px;
    outline: none;
  }

  a {
    width: 150px;
    height: 30px;
    margin-right: 10px;
    border-radius: 6px;
    border: 1px solid black;
    cursor: pointer;
    padding: 0px 6px;
    outline: none;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    color: black;
  }

  button {
    width: 150px;
    height: 30px;
    margin-right: 10px;
    border-radius: 6px;
    border: 1px solid black;
    cursor: pointer;
    padding: 0px 6px;
    outline: none;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    color: black;
  }
`;

const Main = styled.div`
  margin-top: 85px;
  height: 90%;
  background: rgba(0, 0, 0, 0.07);
  padding: 20px;
  display: flex;
  justify-content: center;
  overflow-y: scroll;
  overflow-x: hidden;
  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #f5f5f5;
    border-radius: 10px;
  }

  &::-webkit-scrollbar {
    width: 5px;
    background-color: #f5f5f5;
    height: 40px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #3366ff;
    border-radius: 10px;
    background-image: -webkit-linear-gradient(
      0deg,
      rgba(255, 255, 255, 0.5) 25%,
      transparent 25%,
      transparent 50%,
      rgba(255, 255, 255, 0.5) 50%,
      rgba(255, 255, 255, 0.5) 75%,
      transparent 75%,
      transparent
    );
  }
  div {
    width: 50vw;
  }
`;
