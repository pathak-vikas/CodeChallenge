import styled from "styled-components";
import Shop from "./components/Shop";
import View from "./components/View";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Container>
      <Router>
        <Routes>
          <Route exact path="/shop/" element={<Shop />} />
          <Route exact path="/orders/" element={<View />} />
          <Route exact path="/" element={<View />} />
        </Routes>
      </Router>
    </Container>
  );
};

const Container = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background: white;
  height: 100vh;
  overflow-y: scroll;
  overflow-x: hidden;
  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #f5f5f5;
    border-radius: 10px;
  }

  &::-webkit-scrollbar {
    width: 0px;
    background-color: #f5f5f5;
    height: 0px;
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
`;

export default App;
