import React from "react";
import { WebView } from "react-native-webview";
import { BackHandler, Alert } from "react-native";
import InternetConnectionAlert from "react-native-internet-connection-alert";
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.WEBVIEW_REF = React.createRef();
  }

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
  }

  handleBackButton = () => {
    this.WEBVIEW_REF.current.goBack();
    return true;
  };

  onNavigationStateChange(navState) {
    this.setState({
      canGoBack: navState.canGoBack,
    });
  }

  render() {
    const WebApp = () => {
      return (
        <WebView
          javaScriptEnabled={true}
          domStorageEnabled={true}
          cacheEnabled={true}
          thirdPartyCookiesEnabled={true}
          setBuiltInZoomControls={false}
          source={{ uri: "https://sasthosebok.com/" }}
          ref={this.WEBVIEW_REF}
          // onNavigationStateChange={this.onNavigationStateChange.bind(this)}
          onError={(event) => {
            Alert.alert(
              "Your are Offline!",
              "Please check your network connection",
              [{ text: "Ok", onPress: () => console.log("Your are Offline ") }]
            );
          }}
        />
      );
    };

    return (
      <InternetConnectionAlert onChange={(connectionState) => {}}>
        <WebApp />
      </InternetConnectionAlert>
    );
  }
}

// eas build -p android --profile preview
