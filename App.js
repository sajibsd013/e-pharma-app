import React, { Component } from "react";
import { WebView } from "react-native-webview";
import { BackHandler, Alert, ScrollView, RefreshControl } from "react-native";
import "expo-dev-client";
import {
  InterstitialAd,
  AdEventType,
  BannerAd,
  BannerAdSize,
  RewardedAd,
  RewardedAdEventType,
  TestIds,
  AppOpenAd,
} from "react-native-google-mobile-ads";


const adUnitIdInterstitial = __DEV__
  ? TestIds.INTERSTITIAL
  : "ca-app-pub-3545205458668722/1332006425";

const adUnitIdBanner = __DEV__
  ? TestIds.BANNER
  : "ca-app-pub-3545205458668722/4857932864";

const adUnitIdrewarded = __DEV__
  ? TestIds.REWARDED
  : "ca-app-pub-3545205458668722/5447630813";

const adUnitId = __DEV__
  ? TestIds.APP_OPEN
  : "ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy";

export default class App extends Component {
  webView = {
    ref: null,
  };
  state = {
    canGoBack: false,
    url: "",
    enablePTR: false,
    interstitial_loaded: false,
    loaded: false,
  };
  _OnScroll(e) {}

  interstitial = InterstitialAd.createForAdRequest(adUnitIdInterstitial, {
    requestNonPersonalizedAdsOnly: true,
    keywords: ["fashion", "clothing"],
  });

  rewarded = RewardedAd.createForAdRequest(adUnitIdrewarded, {
    requestNonPersonalizedAdsOnly: true,
    keywords: ["fashion", "clothing"],
  });

  // appOpenAd = AppOpenAd.createForAdRequest(adUnitId, {
  //   requestNonPersonalizedAdsOnly: true,
  //   keywords: ["fashion", "clothing"],
  // });

  onAndroidBackPress = () => {
    // console.log(this.state.url);
    this.handleInterstitialShow();
    if (this.state.url == "https://sasthosebok.com/") {
      this.handlerewardedShow();

      Alert.alert("Close this app?", "Are you sure, You want to exit?", [
        {
          text: "No",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "Yes", onPress: () => BackHandler.exitApp() },
      ]);
    } else {
      this.webView.ref.goBack();
    }
    return true;
  };

  handleInterstitialShow = () => {
    if (this.state.interstitial_loaded) {
      this.interstitial.show();
      this.setState({ interstitial_loaded: false }); // Reset interstitial_loaded state
      this.interstitial.load(); // Reload the ad
    }
  };
  handlerewardedShow = () => {
    if (this.state.loaded) {
      this.rewarded.show();
      this.setState({ loaded: false }); // Reset loaded state
      this.rewarded.load(); // Reload the ad
    }
  };

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.onAndroidBackPress);

    this.unsubscribe = this.interstitial.addAdEventListener(
      AdEventType.LOADED,
      () => {
        this.setState({ interstitial_loaded: true });
      }
    );


    this.unsubscribeLoaded = this.rewarded.addAdEventListener(
      RewardedAdEventType.LOADED,
      () => {
        this.setState({ loaded: true });
      }
    );
    this.unsubscribeEarned = this.rewarded.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      (reward) => {
        console.log("User earned reward of ", reward);
      }
    );

    
    this.rewarded.load();
    this.interstitial.load();
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress");
    // Unsubscribe from events on unmount
    if (this.unsubscribe) {
      this.unsubscribe();
    }
    if (this.unsubscribeLoaded) {
      this.unsubscribeLoaded();
    }
    if (this.unsubscribeEarned) {
      this.unsubscribeEarned();
    }
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
            onRefresh={() => this.webView.ref.reload()} 
          />
        }
      >
        <WebView
          onScroll={(e) => {
            console.log(e.nativeEvent.contentOffset.y);
            const yAxis = e.nativeEvent.contentOffset.y;
            if (yAxis === 0) {
              this.setState({ enablePTR: true });
            } else {
              this.setState({ enablePTR: false });
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
            this.setState({
              canGoBack: nativeEvent.nativeEvent.canGoBack,
              url: nativeEvent.nativeEvent.url,
            });
          }}
          onNavigationStateChange={(navState) => {}}
        />
      </ScrollView>
    );
  }
}
