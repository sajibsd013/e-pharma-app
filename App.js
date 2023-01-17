import React from "react";
import AppV1 from "./AppV1";
import AppV3 from "./AppV3";

export default class App extends React.Component {
  render() {
    return (
      <>
        {/* <AppV1 /> */}
        <AppV3 />
      </>
    );
  }
}

// eas build -p android --profile preview
