import React, { Component } from "react";
import { WebView } from "react-native-webview";

import { BackHandler, Alert, ScrollView, RefreshControl } from "react-native";

export default class AppV1 extends Component {
  webView = {
    canGoBack: false,
    ref: null,
  };

  onAndroidBackPress = () => {
    this.webView.ref.goBack();
    return true;
  };

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.onAndroidBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress");
  }

  render() {
    return (
      <ScrollView
        style={{
          backgroundColor: "white",
          position: "relative",
        }}
        contentContainerStyle={{ flex: 1 }}
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={() => this.webView.ref.reload()} // exl in function : this.yourWebview.reload();
          />
        }
      >
        <WebView
          javaScriptEnabled={true}
          domStorageEnabled={true}
          cacheEnabled={true}
          thirdPartyCookiesEnabled={true}
          setBuiltInZoomControls={false}
          source={{ uri: "https://sasthosebok.com/" }}
          ref={(webView) => {
            this.webView.ref = webView;
          }}
          onError={(event) => {
            Alert.alert(
              "Your are Offline!",
              "Please check your network connection",
              [
                {
                  text: "Ok",
                  onPress: () => console.log("Ok"),
                },
              ]
            );
          }}
          // onNavigationStateChange={(navState) => { this.webView.canGoBack = navState.canGoBack; }}
        />
      </ScrollView>
    );
  }
}
