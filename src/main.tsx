import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { TaskApp } from "./TaskApp";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap-icons/font/bootstrap-icons.min.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TaskApp />
  </StrictMode>,
);
