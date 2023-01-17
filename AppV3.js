import React, { Component } from "react";
import { WebView } from "react-native-webview";
import { BackHandler, Alert, ScrollView, RefreshControl  } from "react-native";

export default class AppV3 extends Component {
  webView = {
    ref: null,
  };
  state = {
    canGoBack: false,
    url:"",
    enablePTR: false
  };
  _OnScroll(e){
   
  }

  onAndroidBackPress = () => {
    // console.log(this.state.url);
    if (this.state.url == "https://sasthosebok.com/") {
      Alert.alert(
        'Close this app?',
        'Are you sure, You want to exit?',
        [
          {text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
          {text: 'Yes', onPress: () => BackHandler.exitApp()},
        ],
      )
    }else{
      this.webView.ref.goBack();

    }
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
            enabled={this.state.enablePTR}
            refreshing={false}
            onRefresh={() => this.webView.ref.reload()} // exl in function : this.yourWebview.reload();
          />
        }
      >
        <WebView
               onScroll={(e)=>{
                console.log(e.nativeEvent.contentOffset.y)
                const yAxis = e.nativeEvent.contentOffset.y;
                if(yAxis===0){
                  this.setState({ enablePTR: true});
                }else{
                  this.setState({ enablePTR: false});
                }
            }}

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
          onLoadProgress={(nativeEvent) => {
            // this.setState({ canGoBack : navState.canGoBack})
            // console.log(nativeEvent.nativeEvent.url);
            this.setState({ canGoBack: nativeEvent.nativeEvent.canGoBack , url:  nativeEvent.nativeEvent.url});
          }}
          onNavigationStateChange={(navState) => {
            // this.setState({ canGoBack : navState.canGoBack})
            // console.log(navState);
          }}
          // onMessage = {(e)=> console.log(e)}
        />
      </ScrollView>
    );
  }
}
