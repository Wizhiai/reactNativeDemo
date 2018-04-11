/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    ScrollView,
    Image,
    FlatList,
    Button,

    Alert,
    TouchableOpacity,
    ActivityIndicator,

} from 'react-native';
// import NetUtil from '../tools/netUtil';
const NetUtil = require('../tools/netUtil');
import {Theme, Toast, Overlay} from 'teaset';
var goodData = [];

var newId = 0;
var lastId = 0;
const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});
var Dimensions = require('Dimensions');
const {width, height} = Dimensions.get('window')
type Props = {};
export default class HomePage extends Component<Props> {
    // 构造
    constructor(props) {
        super(props);
        this.state = {
            data:[],
            isFirst:true,
            isLoadMore:true,
        }
        // this._changeData = this._changeData.bind(this);
        // this.initData;
    }
   async componentDidMount() {
        // 初始化数据
        let url1 = 'http://192.168.172.235:8002/getMorePic';
        let data={'f':0,'e':10};

        var result = await new Promise(function (resolve,reject) {
            NetUtil.postJson(url1,data, (set) => {
                this._overlayView && this._overlayView.close();
                if (parseInt(set.data[0].goodid) == newId) {

                } else {
                    let newTemId = parseInt(set.data[0].goodid);


                    if (set.data.length > 0) {
                        newId = parseInt(set.data[0].goodid);
                        lastId = parseInt(set.data[set.data.length - 1].goodid);
                    }
                    resolve(set.data);
                    // this.setState({data:set.data,});
                    // return set.data;


                }
            }) });
        this.setState({
            data : result,
        });
    }


    //
    // _changeData(){
    //     this.setState({
    //         data :[{"key": 1}, {"key": 2}, {"key": 3},{"key": 4},{"key": 5}],
    //     })
    // }

    refreshing = () => {



        let url1 = 'http://192.168.172.235:8002/getMorePic';
        let data={'f':0,'e':10};


        NetUtil.postJson(url1,data, (set) => {
            if(parseInt(set.data[0].goodid) == newId){
                alert("暂时没有新数据！");
            }else {
            let newTemId = parseInt(set.data[0].goodid);

            let tempData = this.state.data;
                for (let i = 0;i<(newTemId-newId);i++){
                        tempData.unshift(set.data[i]);
            }
            this.setState({
                data :tempData,
            });
                if (set.data.length>0){
                newId = parseInt(set.data[0].goodid);}

            }
            // switch (set.retCode) {
            //     case "0000":
            //         alert("登录成功");
            //         break;
            //     case "0001":
            //         alert("登录失败");
            //         break;
            //     default:
            //         alert("登录失败");
            // }

        });

    }
    _onload = () => {
        if (this.state.isLoadMore){


        let overlayView = (
            <Overlay.View
                ref={(overlayView) => this._overlayView = overlayView}
                style={{alignItems: 'center', justifyContent: 'center'}}
                modal={true}
                overlayOpacity={0}
            >
                <View style={{
                    backgroundColor: '#000',
                    padding: 40,
                    borderRadius: 15,
                    alignItems: 'center',
                    opacity: 0.8
                }}>
                    <ActivityIndicator size='large' color={Theme.toastIconTintColor}/>
                </View>
            </Overlay.View>
        );
        Overlay.show(overlayView);
        let url1 = 'http://192.168.172.235:8002/getMorePic';



        let data={'f':lastId,'e':10};
        this.setState({
            isLoadMore :false,
        });

        NetUtil.postJson(url1,data, (set) => {
            this._overlayView && this._overlayView.close();

            if(set.data.length == 0){
                alert("没有更多数据了！");
            }else {
                let tmeData = this.state.data;
                for(let i =0;i<set.data.length;i++){
                    let gid = set.data[i].goodid;
                    if (parseInt(gid)<lastId){
                        tmeData.push( set.data[i]);
                        lastId = parseInt(gid);
                    }
                }
                this.setState({
                    data :tmeData,
                });
                this.setState({
                    isLoadMore :true,
                });

            }


        });
        }
    }

    render() {



        return (
            <View style={{flex: 1}}>

                <View style={{flex: 1}}>
                    <FlatList
                        ref={(flatList) => this._flatList = flatList}
                        ListHeaderComponent={this._header}
                        ListFooterComponent={this._footer}
                        ItemSeparatorComponent={this._separator}
                        renderItem={this._renderItem}
                        onRefresh={this.refreshing}
                        refreshing={false}
                        onEndReachedThreshold={0.1}
                        ListEmptyComponent={this.createEmptyView()}
                        onEndReached={
                            this._onload
                        }
                        numColumns={2}
                        columnWrapperStyle={{borderWidth: 0, borderColor: 'gray', paddingLeft: 0}}

                        //horizontal={true}

                        getItemLayout={(data, index) => (
                            {length: 100, offset: (100 + 2) * index, index}
                        )}
                        extraData={this.state}
                        data={this.state.data}>
                    </FlatList>
                </View>

            </View>
        );
    }
    //加载失败view
    renderErrorView(error) {
        return (
            <View style={styles.container}>
                <Text>
                    Fail: {error}
                </Text>
            </View>
        );
    }
    //加载等待的view
    renderLoadingView() {
        return (
            <View style={styles.container}>
                <ActivityIndicator
                    animating={true}
                    style={[styles.gray, {height: 80}]}
                    color='red'
                    size="large"
                />
            </View>
        );
    }

    createEmptyView() {
        return (
            <Text style={{fontSize: 40, alignSelf: 'center'}}>还没有数据哦！</Text>
        );
    }

    itemClick = (item, index) => {
        this.props.navigation.navigate('goodDetail',{data:this.state.data[item.index]});
        // Alert.alert('点击了第' + item.index);
    }

    _renderItem = (item, index) => {
        var txt = '还剩' + item.item.goodnum + '个'  ;
        if (item.index % 2 == 0) {
            return <View style={{paddingLeft: 0, backgroundColor: 'white'}}>
                <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={this.itemClick.bind(this, item, index)}>
                    <View>
                        <Image source={{uri:item.item.goodimageurl}}
                               style={{width: width/2-10, height: width/2-10}}/>
                        <Text style={styles.txt}> {txt}</Text>
                        <Text style={styles.price}>￥{item.item.goodprice}元</Text>
                    </View>
                </TouchableOpacity>
            </View>
        } else {
            return <View style={{paddingLeft: 10, backgroundColor: 'white'}}>
                <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={this.itemClick.bind(this, item, index)}>
                    <View>
                        <Image source={{uri:item.item.goodimageurl}}
                               style={{width: width/2-10, height: width/2-10}}/>
                        <Text style={styles.txt}> {txt}</Text>
                        <Text style={styles.price}>￥{item.item.goodprice}元</Text>
                    </View>
                </TouchableOpacity>
            </View>
        }

    }

    // _header = () => {
    //     return <Text style={[styles.txt,{backgroundColor:'black'}]}>这是头部</Text>;
    // }

    // _footer = () => {
    //     return <Text style={[styles.txt,{backgroundColor:'black'}]}>这是尾部</Text>;
    // }

    // _separator = () => {
    //     return <View style={{height:2,backgroundColor:'yellow'}}/>;
    // }


}
async function initData() {
    let url1 = 'http://192.168.172.235:8002/getMorePic';
    let data={'f':0,'e':10};

    var result = await new Promise(function (resolve,reject) {
    NetUtil.postJson(url1,data, (set) => {
        this._overlayView && this._overlayView.close();
        if (parseInt(set.data[0].goodid) == newId) {

        } else {
            let newTemId = parseInt(set.data[0].goodid);


            if (set.data.length > 0) {
                newId = parseInt(set.data[0].goodid);
                lastId = parseInt(set.data[set.data.length - 1].goodid);
            }
            resolve(set.data);
            // this.setState({data:set.data,});
            // return set.data;


        }
    }) });
    alert(result);
    // this.setState({data:result});
    return result;
}
//get请求
  function FpostJson (url, data, callback) {
     var fetchOptions = {
         method: 'POST',
         headers: {
             'Accept': 'application/json',
             //json形式
             'Content-Type': 'application/json'
         },
         body: JSON.stringify(data)
     };

     fetch(url, fetchOptions)
         .then((response) => response.text())
         .then((responseText) => {
             callback(JSON.parse(responseText));
         }).done();
 }

const styles = StyleSheet.create({
    container: {},
    content: {
        width: width,
        height: height,
        backgroundColor: 'yellow',
        justifyContent: 'center',
        alignItems: 'center'
    },
    cell: {
        height: 100,
        backgroundColor: 'purple',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomColor: '#ececec',
        borderBottomWidth: 1

    },
    txt: {
        // textAlign: 'center',
        // textAlignVertical: 'center',
        color: 'gray',
        fontSize: 12,
    },
    price:{
        // textAlign: 'center',
        // textAlignVertical: 'center',
        color: 'red',
        fontSize: 16,
    }


})