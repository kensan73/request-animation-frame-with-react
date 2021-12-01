import * as React from "react";
import * as ReactDOM from "react-dom";
import Animation from "./src/Animation";

const Root = () => (
  <>
    <div
      css={{
        display: "grid",
        placeItems: "center",
        width: "calc(100vw - 16px)",
        height: "calc(100vh - 16px)",
        color: "blue",
      }}
    >
      Parcel + Emotion + TypeScript example
    </div>
    <Animation />
  </>
);

ReactDOM.render(<Root />, document.getElementById("root"));
