import { useState } from "react";
import styled from "styled-components";
import AddCartForm from "./forms/AddCartForm";
import ViewCartForm from "./forms/ViewCartForm";
import { Link } from "react-router-dom";
import MostPurchasedView from "./MostPurchasedView";
import MostRecentView from "./MostRecentView";

export default function View() {
  const [query, setQuery] = useState("");
  const [queryType, setQueryType] = useState("m");
  const [pageNumber, setPageNumber] = useState(1);

  function handleSearch(e) {
    setQuery(e.target.value);
    setPageNumber(1);
  }

  function handleSort(e) {
    setQueryType(e.target.value);
    setPageNumber(1);
  }

  return (
    <Container>
      <AddCartForm />
      <ViewCartForm />
      <Nav>
        <Link to="/shop/">Buy New Items</Link>
        <input
          placeholder="search"
          type="text"
          value={query}
          onChange={handleSearch}
        ></input>
        <select onChange={handleSort}>
          <option selected={queryType === "r" ? "selected" : ""} value="r">
            recently purchased
          </option>
          <option selected={queryType === "m" ? "selected" : ""} value="m">
            most purchased
          </option>
        </select>
      </Nav>

      {queryType === "m" && (
        <MostPurchasedView
          pageNumber={pageNumber}
          queryType={queryType}
          query={query}
        />
      )}
      {queryType === "r" && (
        <MostRecentView
          pageNumber={pageNumber}
          queryType={queryType}
          query={query}
        />
      )}
    </Container>
  );
}

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
`;
