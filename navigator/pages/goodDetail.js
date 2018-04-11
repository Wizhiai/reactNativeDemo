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
    WebView,
    TouchableHighlight,

} from 'react-native';

import {NavigationPage, ListRow, Select, Button} from 'teaset';
var Dimensions = require('Dimensions');
const {width, height} = Dimensions.get('window')
const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});
const HTML = `
<!DOCTYPE html>\n
<html>
  <head>
    <title>Hello Static World</title>
    <meta http-equiv="content-type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=320, user-scalable=no">
    <style type="text/css">
      body {
        margin: 0;
        padding: 0;
        font: 62.5% arial, sans-serif;
        background: #000;
      }
      h1 {
        padding: 45px;
        margin: 0;
        text-align: center;
        color: #fff;
      }
    </style>
  </head>
  <body>
    <h1>Welcome</h1>
  </body>
</html>
`;
type Props = {};
export default class Login extends Component<Props> {

    // _onPressButton =()=> {
    //     // Alert.alert("onPressButton");
    //     // this.props.navigator.navigate(Login);
    //     // this.props.navigation.navigate('Login');
    //     alert("s");
    // }

    constructor(props) {
        super(props);
        this.items = [
            'Apple',
            'Banana',
            'Cherry',
            'Durian',
            'Filbert',
            'Grape',
            'Hickory',
            'Lemon',
            'Mango',
        ];
        this.state = {
            value:"请选择规格",
            items:[],
            itemsValue:[]

        }

    }

    async componentDidMount() {
        // 初始化数据
        let sizeArr = [];
        let sizeNumArr = [];
        const {params} = this.props.navigation.state;
        let data = this.props.navigation.state.data;
        if(params.data.threetwo){
            sizeArr.push('32   (剩余'+params.data.threetwo+')');
            sizeNumArr.push(params.data.threetwo);
        }
        if(params.data.threefour){
            sizeArr.push('34   (剩余'+params.data.threefour+')');
            sizeNumArr.push(params.data.threefour);
        }
        if(params.data.threesix){
            sizeArr.push('36   (剩余'+params.data.threesix+')');
            sizeNumArr.push(params.data.threesix);
        }
        if(params.data.threeeight){
            sizeArr.push('38   (剩余'+params.data.threeeight+')');
            sizeNumArr.push(params.data.threeeight);
        }

        this.setState({
            items : sizeArr,
            itemsValue:sizeNumArr,
        });
    }
    render() {
        const {params} = this.props.navigation.state;
        var ptop = 5;

        if (Platform.OS == "ios"){
            ptop =10;
        }else ptop =5;
        let html = params.data.html;
        if(!params.data.html){
            html = HTML;
        }
        return (
            <View>
            <View style={styles.container}>
                <WebView
                    bounces ={false}
                    style={{width:width,height:height-120,  }}
                    mixedContentMode={'compatibility'}
                    source={{html: html}}
                    scalesPageToFit={true}
                    automaticallyAdjustContentInsets={true}
                />

            </View>
                <View style={{justifyContent:'space-around', flexDirection:'row'}}>
                    <View style={{paddingTop:ptop}}>
                <Select
                    style={{width: 200,

                        paddingTop:5
                    }}
                    value={this.state.value}
                    items={this.state.items}
                    placeholder='请选择规格'
                    pickerTitle='规格选择'
                    onSelected={(item, index) => this.setState({value: item})}
                />
                    </View>
                    <View style={{paddingTop:ptop-5}}>
                <Button  style={{width: 110, }} type='secondary' size='xl' title='购买' onPress={() => {
                    if (this.state.value == '请选择规格'){
                        alert(this.state.value);
                    }else {
                        alert('购买成功');
                    }


                }}/>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width:width,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        height:height-120,
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
