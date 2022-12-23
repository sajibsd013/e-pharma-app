import React from 'react';
import { WebView } from 'react-native-webview';
import {BackHandler, StyleSheet,Platform, Alert} from 'react-native';
import InternetConnectionAlert from "react-native-internet-connection-alert";
export default class App extends React.Component {
	constructor(props) {
    super(props);
  }
   webView = {
    canGoBack: false,
    ref: null,
  }
  state = {
    c_url :'https://sasthosebok.com/'
  }
  

  /** For Loading And Back Button Press**/
  onAndroidBackPress = () => {
    if (this.webView.canGoBack && this.webView.ref) {
      this.webView.ref.goBack();
      return true;
    }
    return false;
  }

  componentDidMount() {
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', this.onAndroidBackPress);
    }
  }

 _onRefresh = () => {
    this.setState({refreshing: true});
     this.webView.ref.reload();
     this.setState({refreshing: false});
  }
  /** For Loading And Back Button Press**/
	render() {
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
      },
      text1:{
        color: 'red',
        fontSize: 26,
        fontWeight: 650
      },
      text2:{
        // color: red,
        fontSize: 15
      }

    });



    const WebApp = ()=>{ 

      return( 
        <WebView  
          ref={(webView) => { this.webView.ref = webView; }}
          onNavigationStateChange={(navState) => { this.webView.canGoBack = navState.canGoBack; }}
          source={{ uri: this.state.c_url }} javaScriptEnabled={true}  domStorageEnabled={true} cacheEnabled={true} thirdPartyCookiesEnabled={true} 

          onError={(event) => {
            Alert.alert(
              "Your are Offline!",
              "Please check your network connection",
              [
                { text: "Refresh", onPress: () => this._onRefresh() }
              ]
   
           )
        }}
        />
        )
     
    }
     

    return(
      <InternetConnectionAlert
        onChange={(connectionState) => {
        }}>
          <WebApp/> 
      </InternetConnectionAlert>
    )
	}
}
