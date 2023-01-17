import React from "react";
import { WebView } from "react-native-webview";
import {
  BackHandler,
  Alert,
  View,
  ScrollView,
  RefreshControl,
} from "react-native";
import InternetConnectionAlert from "react-native-internet-connection-alert";


export default class AppV2 extends React.Component {
  constructor(props) {
    super(props);
    this.WebView = null;
  }
  onReload() {
    console.log("onReload");
    this.WebView.reload()
  }

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
    // console.log(this.WebView);
    this.onReload()
    console.log("componentDidMount");
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
  }

  handleBackButton = () => {
    this.WebView.goBack();

    // console.log(this.WebView);
    return true;
  };

  onNavigationStateChange(navState) {
    // console.log(navState.url)
  }


  render() {
    const WebApp = () => {
      return (
        <WebView
          style={{ position: "relative" }}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          cacheEnabled={true}
          thirdPartyCookiesEnabled={true}
          setBuiltInZoomControls={false}
          source={{ uri: "https://sasthosebok.com/" }}
          ref={(ref) => this.WebView = ref}
          // ref={(ref)=>this.WebView = ref}
          // onNavigationStateChange={this.onNavigationStateChange.bind(this)}
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
        />
      );
    };

    return (
      <InternetConnectionAlert onChange={(connectionState) => this.onReload()}>
        <View style={{ flex: 1 }}>
          <ScrollView
            style={{
              backgroundColor: "white",
              position: "relative",
            }}
            contentContainerStyle={{ flex: 1 }}
            refreshControl={
              <RefreshControl
                refreshing={false}
                onRefresh={() => this.onReload()} // exl in function : this.yourWebview.reload();
              />
            }
          >
            <WebApp />
          </ScrollView>
        </View>
      </InternetConnectionAlert>
    );
  }
}

// eas build -p android --profile preview
