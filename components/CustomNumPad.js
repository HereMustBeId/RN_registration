import React, {Component} from 'react'
import {
   StyleSheet,
   Text,
   View,
   Dimensions,
   Image,
   TouchableOpacity
} from 'react-native'

import style from "../config/style"
import Icon, { ICONS } from './Icon'

export default class CustomNumPad extends Component {

   setTabWindowParams () {
      this._window = Dimensions.get('window');
      this._windowWidth = this._window.width;
      this._windowHeight = this._window.height;
      this._buttonsWidth = this._windowWidth/3.2;

      if (this._windowWidth > this._windowHeight) {
         this._textSize = this._windowHeight/16;
      } else if (this._windowWidth < this._windowHeight) {
         this._textSize = this._windowWidth/6;
      }
   }

   createNumPad () {
      let result = [];

      for (let i = 1; i<10; i++) {
         result.push(
            <TouchableOpacity
               key={ 'numpad' + i }
               style={ [styles.numPadButton, {width: this._buttonsWidth} ] }
               onPress={_ => { this.props.onClick(i) }}>
               <Text style={ [styles.numPadButtonText, {fontSize: this._textSize}] }>{ i }</Text>
            </TouchableOpacity>
         );
      }

      return result;
   }

   render () {
      this.setTabWindowParams();
      return (
         <View style={ styles.numPad }>
            { this.createNumPad() }
            <View style={ [styles.numPadButton, {width: this._buttonsWidth} ] } />
            <TouchableOpacity
               onPress={_ => { this.props.onClick('0') }}
               style={ [styles.numPadButton, {width: this._buttonsWidth} ] }>
               <Text style={ [styles.numPadButtonText, {fontSize: this._textSize}] }>0</Text>
            </TouchableOpacity>
            <TouchableOpacity
               style={[styles.numPadButton, {width: this._buttonsWidth} ]}
               onPress={_ => { this.props.onDelete() }}>
               <Icon
                  icon={ ICONS.backspace }
                  width={ this._textSize }
                  height={this._textSize }
               />
            </TouchableOpacity>
         </View>
      );
   }
}

const styles = StyleSheet.create({
   numPad: {
      marginTop: 10,
      flex: 1,
      flexDirection: 'row',
      alignContent: 'flex-end',
      flexWrap: 'wrap',
   },
   numPadButton: {
      justifyContent: 'center',
      alignItems: 'center',
   },
   numPadButtonText: {
      textAlign: 'center',
      fontFamily: 'Lato-Light',
      color: style.colors.black
   }
});