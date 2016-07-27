'use strict';

import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableHighlight,
  Dimensions,
  Alert
} from 'react-native';
var winWidth = Dimensions.get('window').width;
var winHeight = Dimensions.get('window').height;
var myDB = require('./DAAsyncStorage');
var myDBInstance = new myDB();

var textField;
class StorageDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchString:''
    }
  }

  savePressed() {
    myDBInstance.setTheItem('myKey',this.state.searchString,function(){
      Alert.alert('Save',this.state.searchString+' was saved!');
    }.bind(this));
  }

  fetchPressed() {
    myDBInstance.getTheItem('myKey',function(value){
      Alert.alert('Fetch','Your Value is - '+value);
    });
  }

  valueChanged(event) {
    this.setState({
      searchString:event.nativeEvent.text
    })
  }

  render() {
    textField = <TextInput placeholder='Enter text to save' style={{position:'absolute',width:winWidth - 20,top:20,height:44,margin:10,backgroundColor:'#EEEEEE'}} onChange={this.valueChanged.bind(this)}></TextInput>;
    return(
      <View>
      {textField}
        <TouchableHighlight
            underlayColor='#dddddd' onPress={this.savePressed.bind(this)} style={{position:'absolute',top:80}}>
          <View>
            <Text style={{fontSize:22,marginLeft:10,height:22,marginBottom:10,color:'blue'}}>Save</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
              underlayColor='#dddddd' onPress={this.fetchPressed} style={{position:'absolute',top:110}}>
            <View>
              <Text style={{fontSize:22,marginLeft:10,height:22,marginBottom:10,color:'blue'}}>Fetch</Text>
            </View>
          </TouchableHighlight>
      </View>
    );
  }

}


module.exports = StorageDemo;
