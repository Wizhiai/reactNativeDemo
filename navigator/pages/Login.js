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
    View
} from 'react-native';

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});
import {Input,Button} from 'teaset';
type Props = {};
export default class Login extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {
            data:[],
           value1:'请输入用户名',
            value2:'请输入密码',
        }
        // this._changeData = this._changeData.bind(this);
        // this.initData;
    }
    render() {
        return (
            <View style={styles.container}>
                <Input style={{width: 300}}
                       size='lg'
                       value={this.state.value1}
                       onChangeText={text => this.setState({value1: text})}
                />
                <View style={{width: 300,paddingTop:10}}>
                <Input style={{width: 300,paddingTop:10}}
                       size='lg'
                       value={this.state.value2}
                       onChangeText={text => this.setState({value2: text})}
                />
                </View>
                <View style={{width: 300,paddingTop:10,justifyContent:'center',alignItems:'flex-end'}}>
                    <Button  style={{width: 100, }} type='secondary' size='md' title='登陆' onPress={() => {
                            if (this.state.value1 && this.state.value1!='请输入用户名' &&this.state.value1!= '' &&this.state.value2 && this.state.value2!='请输入密码' &&this.state.value2!= '')
                            {    alert('购买成功');}else {
                                alert('请输入正确的用户名和密码');
                            }




                    }}/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
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
