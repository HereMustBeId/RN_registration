import React, {Component} from 'react';
import {
   AsyncStorage,
   Text,
   View
} from 'react-native';
import { connect } from 'react-redux';

import { phoneStyles as styles } from './RegistrationStyles';

import Button from './components/Button';
import CustomNumPad from './components/CustomNumPad';

import RegistrationController from './RegistrationController';
const registrationController = new RegistrationController();

class RegistrationPhone extends Component {

   constructor (props) {
      super(props);

      // default props for using redux, navigation, requests
      this._controller = registrationController;
      this._controller.navigation = props.navigation;

      this.state = {
         number: '',
         buttonActive: false
      };
      this._numberMap = this.controller.phoneMaps['rus'];
   }

   /**
    * registration controller
    * @returns {RegistrationController}
    */
   get controller () {
      return this._controller;
   }

   /**
    * phone number template
    * @returns {*}
    */
   get numberMap () {
      return this._numberMap;
   }

   /**
    * Check user registration
    */
   async componentDidMount(){
      try {
         const value = await AsyncStorage.getItem('@Registered:state');
         if (value === 'yes'){
            this.goToMap();
         }
      } catch (error) {
      }
   }

   goToMap () {
      this._controller.setNextScreen('OffersOnMap');
   }

   /**
    * Creating the phone number block from state
    * @returns {Array}
    */
   createNumberBlock () {
      let number = this.state.number.split('');
      let numberArray = [];
      let result = [];
      let map = this.numberMap;
      let stateNumberCounter = 0;

      for (let i = 0; i<map.length; i++) {
         if (map[i]) {
            numberArray.push(map[i]);
         } else {
            numberArray.push(number[stateNumberCounter] || ' ');
            stateNumberCounter++;
         }
      }

      let numberStyle = [];
      numberArray.forEach((item, index) => {
         numberStyle = [];

         // default style
         numberStyle.push(styles.eachNumber);

         // extend default style if the number was entered
         if (!map[index]) {
            if (item !== ' ') {
               numberStyle.push(styles.borderDone);
            } else {
               numberStyle.push(styles.borderDefault);
            }
         }

         // create view
         result.push(
            <View
               style={ numberStyle }
               key={ index + 'numIs' + item }>
               <Text style={ styles.eachNumberText }>{ item.toUpperCase() }</Text>
            </View>
         );
      });

      return result;
   }

   /**
    * set phone number to state
    */
   onPressNumButton (num) {
      if (this.state.number.length === this.numberMap['inputCount']) {
         return;
      }
      let numberPhone = this.state.number + num;
      this.setState({
         number: numberPhone
      });
      this.checkButtonActive(numberPhone);
   }

   /**
    * clear the last phone number, update state, check button active
    */
   clearLastNumber () {
      let numberPhone = this.state.number.slice(0, -1);
      this.setState({
         number: numberPhone
      });
      this.checkButtonActive(numberPhone);
   }

   /**
    *
    * @param phone
    */
   checkButtonActive (phone) {
      let btnActive = phone.length === 10;
      if (this.state.buttonActive !== btnActive) {
         this.setState({
            buttonActive: btnActive
         });
      }
   }

   /**
    * go to password screen
    */
   onPressButtonContinue () {
      const phoneNumber = this.state.number;

      // set phone number in store
      this.props.onSendRegistrationPhone(phoneNumber);

      this.pushToPasswordScreen();

      // send request to server
      this._controller.sender(1, this._controller.phoneRequest, {
         'phone': phoneNumber
      });
   }

   /**
    * enter code screen
    * @returns {*}
    */
   pushToPasswordScreen () {
      this._controller.setNextScreen('RegistrationPassword');
   }

   render () {
      return (
         <View style={ styles.generalView }>
            <Text style={ [styles.textHeader, style.fonts.h3, styles.bolderHeader] }>{ 'телефон'.toUpperCase() }</Text>
            <Text style={ [styles.textHeader, style.fonts.h2] }> Для авторизации введите номер телефона, на который будет отправлено sms с кодом подтверждения </Text>
            <View style={ styles.numBlock }>
               { this.createNumberBlock() }
            </View>
            <View style={ styles.button }>
               <Button onPress={ this.onPressButtonContinue.bind(this) } active={ this.state.buttonActive } title={ 'продолжить' }/>
            </View>
            <CustomNumPad onClick={ this.onPressNumButton.bind(this) } onDelete={ this.clearLastNumber.bind(this) } />
         </View>
      );
   }
}

export default connect(
   state => ({ stateStore: state }),
   dispatch => registrationController.setGetDispatch(dispatch)
)(RegistrationPhone);