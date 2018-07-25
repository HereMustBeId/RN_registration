import React, {Component} from 'react';
import {
   AsyncStorage,
   Text,
   TouchableWithoutFeedback,
   View
} from 'react-native';
import { connect } from 'react-redux';

import CustomNumPad from './components/CustomNumPad';

import { passwordStyles as styles } from './RegistrationStyles';
import RegistrationController from "./RegistrationController";

const registrationController = new RegistrationController();

class RegistrationPassword extends Component {
   constructor (props) {
      super(props);

      // default props for using redux, navigation, requests
      this._controller = registrationController;
      this._controller.navigation = props.navigation;

      this._timer = null;
      this._passwordLength = 5;
      this.state = {
         smsNumber: '',
         seconds: 60,
         sendAgain: false
      };
   }

   componentDidMount () {
      this.startTimer();
   }

   /**
    * delete timer before component will be removed
    */
   componentWillUnmount () {
      if (this._timer) {
         clearInterval(this._timer);
      }
   }

   /**
    * Custom timer
    */
   startTimer () {
      this._timer = setInterval(() => {
         let sec = this.state.seconds - 1;
         if (sec === 0) {
            clearInterval(this._timer);
            this._timer = null;
            this.setState({
               sendAgain: true
            });
         }
         this.setState({
            seconds: sec
         });
      }, 1000);
   }

   /**
    * Creating the phone number block from state
    * @returns {Array}
    */
   createNumberBlock () {
      let number = this.state.smsNumber.split('');
      let numberArray = [];
      let resultJSX = [];

      for (let i = 0; i < this._passwordLength; i++) {
         numberArray.push(number[i] || '');
      }

      let numberStyle = [];
      let numberText = [];

      numberArray.forEach((item, index) => {
         numberStyle = [];
         numberText = [ styles.eachNumberText ];
         numberStyle.push(styles.eachNumber);
         if (item !== '') {
            numberStyle.push(styles.borderDone);
         } else {
            item = '0';
            numberStyle.push(styles.borderDefault);
            numberText.push(styles.defaultText);
         }
         resultJSX.push(
            <View
               style={ numberStyle }
               key={ index + 'numIs' + item }>
               <Text style={ numberText }>{ item.toUpperCase() }</Text>
            </View>
         );
      });

      return resultJSX;
   }

   onPressNumButton (num) {
      if (this.state.smsNumber.length < 5) {
         let number = this.state.smsNumber + num;
         this.setState({
            smsNumber: number
         });
      }
   }

   clearLastNumber () {
      let number = this.state.smsNumber.slice(0, -1);
      this.setState({
         smsNumber: number
      });
   }

   /**
    * check sms number state. If it is right then send it to server
    * @param prevProps
    * @param prevState
    */
   componentDidUpdate(prevProps, prevState) {
      if (prevState.smsNumber.length !== 5 && this.state.smsNumber.length === 5) {
         this._controller.sender(1, this._controller.smsPasswordRequest, {
            'phone': this.props.stateStore.registration.registrationPhone,
            'secret': this.state.smsNumber
         }, this.passwordChecker.bind(this), this.passwordChecker.bind(this));
      }
   }

   /**
    * resent password
    */
   resendPassword () {
      this._controller.sender(1, this._controller.resentPasswordRequest, {
         'phone': this.props.stateStore.registration.registrationPhone
      });
      this.setState({
         sendAgain: false,
         seconds: 60
      });
      this.startTimer();
   }

   /**
    * get response and set data to async storage
    * or send error message to console
    * @param response
    */
   passwordChecker (response) {
      if (response.graphQLErrors.length || response.name === 'Error') {
         this.props.onGetError('Введен неверный пароль');
      } else {
         this._setAsyncStorageState();
      }
   }

   /**
    *
    * @private
    */
   _setAsyncStorageState () {
      try {
         AsyncStorage.setItem('@Registered:state', 'yes').then(result => {
            if (result){
               console.log('Saved');
            }
            else {
               console.log('Cannot save')
            }
            this._controller.setNextScreen('OffersOnMap');
         });
      } catch (error) {
         console.log (error);
      }
   }

   render () {
      return (
         <View style={ styles.generalView }>
            <Text style={ [styles.textHeader, style.fonts.h2, styles.bolderHeader] }>{ 'пароль'.toUpperCase() }</Text>
            <Text style={ [styles.textHeader, style.fonts.normal] }> Для авторизации введите код подтверждения, отправленный Вам по СМС </Text>
            <View style={ styles.numBlock }>
               { this.createNumberBlock() }
            </View>
            {
               this.state.sendAgain &&
               <TouchableWithoutFeedback onPress={ this.resendPassword.bind(this) }>
                  <View>
                     <Text style={[styles.textHeader, style.fonts.h2, style.fonts.link]}>
                        Отправить код повторно
                     </Text>
                  </View>
               </TouchableWithoutFeedback>
            }
            {
               !this.state.sendAgain &&
               <Text style={ [styles.textHeader, style.fonts.h2] }> Запросить код повторно можно через { this.state.seconds } с. </Text>
            }
            <Text style={ [styles.textHeader, styles.textConfidence, style.fonts.small] }> Вводя код из СМС, Вы соглашаетесь с Условиями использования и Политикой конфидециальности </Text>
            <CustomNumPad onClick={ this.onPressNumButton.bind(this) } onDelete={ this.clearLastNumber.bind(this) } />
         </View>
      );
   }
}

export default connect(
   state => ({ stateStore: state }),
   dispatch => registrationController.setGetDispatch(dispatch)
)(RegistrationPassword);