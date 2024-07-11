import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { SisenseContextProvider } from "@sisense/sdk-ui";
import { AiContextProvider } from "@sisense/sdk-ui/ai";

const sisenseContextProviderArgs = {
  url: "",
  token:
    "",
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <React.StrictMode>
    <SisenseContextProvider {...sisenseContextProviderArgs}>
      <AiContextProvider>
        <App />
      </AiContextProvider>
    </SisenseContextProvider>
  </React.StrictMode>,
);

reportWebVitals();
