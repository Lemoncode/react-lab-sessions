import * as React from "react";

// TODO (next examples): move style to CSS in JS
export const CenteredLayout: React.FunctionComponent = props => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: "100vw",
      height: "100vh",
      boxSizing: "border-box",
      padding: "2rem",
      overflow: "auto"
    }}
  >
    {props.children}
  </div>
);
