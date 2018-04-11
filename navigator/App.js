/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
    YellowBox,
} from 'react-native';
YellowBox.ignoreWarnings(['[mobx] Warning:','Module','Remote','Warning']);
import {StackNavigator,TabNavigator,TabBarBottom} from 'react-navigation';
import TabBarItem from './Commen/TabBarItem'
import HomeScreen from './pages/HomePage';
import MineScreen from './pages/MinePage';
import goodDetail from './pages/goodDetail';
import Login from './pages/Login';
import ProductScreen from './pages/ProductScreen';
const Tab = TabNavigator(
    {
        Home:{
            screen:HomeScreen,
            navigationOptions:({navigation}) => ({
                tabBarLabel:'首页',
                tabBarIcon:({focused,tintColor}) => (
                    <TabBarItem
                        tintColor={tintColor}
                        focused={focused}
                        normalImage={require('./imgs/store.png')}
                        selectedImage={require('./imgs/storeSelected.png')}
                    />
                )
            }),
        },

        Mine:{
            screen:MineScreen,
            navigationOptions:({navigation}) => ({
                tabBarLabel:'我',
                tabBarIcon:({focused,tintColor}) => (
                    <TabBarItem
                        tintColor={tintColor}
                        focused={focused}
                        normalImage={require('./imgs/meSelect.png')}
                        selectedImage={require('./imgs/me.png')}
                    />
                )
            }),
        },
    },

    {
        tabBarComponent:TabBarBottom,
        tabBarPosition:'bottom',
        swipeEnabled:false,
        animationEnabled:false,
        lazy:true,
        tabBarOptions:{
            activeTintColor:'#06c1ae',
            inactiveTintColor:'#979797',
            style:{backgroundColor:'#ffffff',},
            labelStyle: {
                fontSize: 13, // 文字大小
            },
        }

    }

);
const Navigator = StackNavigator(

    {


        Tab:{screen:Tab},
        Login:{screen:Login},
        goodDetail:{screen:goodDetail},

    },

    {
        navigationOptions:{
            headerBackTitle:null,
            headerTintColor:'#333333',
            headerText:"您好",
            headerTitle:"ss",
            showIcon:true,
            swipeEnabled:false,
            animationEnabled:false,
        },

        mode:'card',
    });
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
        <Navigator/>
        );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
