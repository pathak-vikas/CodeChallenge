import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import axios from "axios";
import { store } from "./app/store";
import { Provider } from "react-redux";

axios.defaults.baseURL = "http://localhost:8000";

const app = (
  <Provider store={store}>
    <React.StrictMode>
      <div className="application">
        <App />
      </div>
    </React.StrictMode>
  </Provider>
);
ReactDOM.render(app, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
