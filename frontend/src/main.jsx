import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { MathJaxContext } from "better-react-mathjax";

const config = {
  loader: { load: ["[tex]/color", "[tex]/ams"] },
  tex: { packages: { "[+]": ["color", "ams"] } }
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <MathJaxContext config={config}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </MathJaxContext>
);
