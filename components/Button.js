import React, {Component} from 'react';
import {
   StyleSheet,
   Text,
   TouchableOpacity,
   View
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import style from '../config/style.js';

export default class Button extends Component {
   static defaultProps = {
      ...Component.defaultProps,
      active: true

   };

   getColors(){
      let alpha = 'ff';

      if (!this.props.active)
         alpha = '90';

      return [style.colors.barney + alpha, style.colors.violet + alpha];
   }

   render() {
      return (
         <TouchableOpacity onPress={ _ => { if (this.props.active) { this.props.onPress() }}} style={styles.opacity}>
            <LinearGradient colors={this.getColors()}
                            start={{x: 0.0, y: 0.5}} end={{x: 1.0, y: 0.5}}
                            style={styles.linearGradient}>
               <Text style={styles.text}>
                  {this.props.title.toUpperCase()}
               </Text>
            </LinearGradient>
         </TouchableOpacity>
      );
   }
}

const styles = StyleSheet.create({
   opacity: {
   },
   view: {
      borderRadius: style.sizes.one * 2,
      backgroundColor: style.colors.violet,
      padding: style.sizes.one,
      alignItems: 'center'
   },
   linearGradient: {
      borderRadius: style.sizes.one * 2,
      padding: style.sizes.one,
      alignItems: 'center'
   },
   text: {
      ...style.fonts.h2,
      color: style.colors.white
   }
});