import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
    <ToastContainer autoClose={1000} position="bottom-right"/>
  </React.StrictMode>
);

serviceWorkerRegistration.register();