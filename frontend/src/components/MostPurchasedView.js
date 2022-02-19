import { useState, useRef, useCallback, useEffect } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { selectOrderItem } from "../features/forms/orderItemsSlice";
import Moment from "react-moment";
import style from "./styles/table.module.scss";
import useMostPurchasedSearch from "./api/useMostPurchasedSearch";

export default function MostPurchasedView(props) {
  const [query, setQuery] = useState("");
  const [queryType, setQueryType] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const { items, hasMore, loading, error } = useMostPurchasedSearch(
    query,
    pageNumber,
    queryType
  );

  useEffect(() => {
    setQuery(props.query);
    setQueryType(props.queryType);
  }, [props.queryType, props.query]);

  useEffect(() => {
    setPageNumber(props.pageNumber);
  }, [props.pageNumber]);

  const orderItems = useSelector(selectOrderItem);

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

  return (
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
                  <th>Quantity</th>
                  <th>Restaurant</th>
                  <th>Purchased Time</th>
                  <th>Total Products</th>
                </thead>
                <tbody>
                  {items.map((item, index) => {
                    if (items.length === index + 1) {
                      return (
                        <tr ref={lastBookElementRef} key={item}>
                          <td>{item.id}</td>
                          <TdItem>
                            <span>{item.name}</span>
                            {item.trending ? (
                              <Span
                                style={{
                                  background: "black",
                                  color: "white",
                                  display: "none",
                                }}
                              >
                                trending
                              </Span>
                            ) : (
                              <Span
                                style={{
                                  background: "green",
                                  color: "white",
                                }}
                              >
                                trending
                              </Span>
                            )}
                          </TdItem>
                          <td>{item.price}</td>
                          <td>{item.quantity}</td>
                          <td>{item.restaurant}</td>
                          <td>
                            purchased <Moment toNow>{item.updated_at}</Moment>{" "}
                            ago
                          </td>
                          <td>{item.count}</td>
                        </tr>
                      );
                    } else {
                      return (
                        <tr key={item}>
                          <td>{item.id}</td>
                          <TdItem>
                            <span>{item.name}</span>
                            {item.trending ? (
                              <Span
                                style={{
                                  background: "black",
                                  color: "white",
                                  display: "none",
                                }}
                              >
                                trending
                              </Span>
                            ) : (
                              <Span
                                style={{
                                  background: "green",
                                  color: "white",
                                }}
                              >
                                trending
                              </Span>
                            )}
                          </TdItem>
                          <td>{item.price}</td>
                          <td>{item.quantity}</td>
                          <td>{item.restaurant}</td>
                          <td>
                            purchased <Moment toNow>{item.updated_at}</Moment>{" "}
                            ago
                          </td>
                          <td>{item.count}</td>
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
        <Error>{error && "Error"}</Error>
      </div>
    </Main>
  );
}

const TdItem = styled.td`
  display: flex;
  justify-content: space-between;
`;

const Span = styled.span`
  padding: 2px 4px;
  background: green;
  border-radius: 5px;
  color: white;
`;

const ProcessingSpinner = styled.div`
  padding: 10px 2px;
  text-align: center;
  border-radius: 8px;
  color: blue;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Error = styled.div`
  padding: 10px 2px;
  text-align: center;
  border-radius: 8px;
  color: color;
  margin-bottom: 200px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
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
