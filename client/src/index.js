import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import MyRoutes from "./router/MyRoutes";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import ContextProvider from "./context/context";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./components/ErrorBoundaryOptions";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <ContextProvider>
      <React.StrictMode>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <MyRoutes />
        </ErrorBoundary>
      </React.StrictMode>
    </ContextProvider>
  </BrowserRouter>
);

serviceWorkerRegistration.register();

reportWebVitals();
