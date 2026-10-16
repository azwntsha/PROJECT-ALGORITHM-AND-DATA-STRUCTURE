import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

import { TableProvider } from "./context/TableContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <TableProvider>
        <App />
      </TableProvider>
    </BrowserRouter>
  </StrictMode>
);