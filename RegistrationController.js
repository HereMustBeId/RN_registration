import RequestController from "./controller/RequestController";
import { gql } from 'apollo-boost';

/**
 * Registration Controller.
 * Maps for phone numbers.
 * Send request to server.
 */
class RegistrationController extends RequestController {
   constructor () {
      super();

      this._phoneMaps = {
         'rus': this.getRusMap()
      };

      this._phoneRequest = gql`
            mutation auth ($phone: String!) {
                authByPhone(phone: $phone) {
                    secretSent
                }
            }
        `;
      this._smsPasswordRequest = gql`
            mutation verificate ($phone: String!, $secret: String!) {
                verificatePhone(phone: $phone, secret: $secret) {
                    token
                }
            }
        `;
      this._resentPassword = gql`
            mutation resend ($phone: String!) {
                resendSecret(phone: $phone) {
                    secretSent
                }
            }
        `;

      this.setDispatcher({
         onGetError: this.onGetError.bind(this),
         onSendRegistrationPhone: this.onSendRegistrationPhone.bind(this)
      });
   }

   /**
    *
    * @param text
    */
   onGetError (text) {
      this.getDispatch()({
         type: 'ShowWarning',
         payload: text
      });
   }

   /**
    * set up store by the phone number
    * @param phoneNumber
    */
   onSendRegistrationPhone (phoneNumber) {
      this.getDispatch()({
         type: 'RegistrationPhoneNumberIsEntered',
         payload: phoneNumber
      });
   }

   get phoneRequest () {
      return this._phoneRequest;
   }

   get smsPasswordRequest () {
      return this._smsPasswordRequest;
   }

   get resentPasswordRequest () {
      return this._resentPassword;
   }

   /**
    * Russian map
    * @returns {any[]}
    */
   getRusMap () {
      let map = new Array(17);
      map[0] = '+';
      map[1] = '7';
      map[2] = '(';
      map[6] = ')';
      map[7] = ' ';
      map[11] = map[14] = '-';
      map['inputCount'] = 10;
      return map;
   }

   /**
    * all maps getter
    * @returns {{rus: any[]}|*}
    */
   get phoneMaps () {
      return this._phoneMaps;
   }
}

export default RegistrationController;