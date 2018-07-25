/**
 * If dispatcher was sett, than message about any step can be send to store
 */
class ReduxDispatcherController {
   constructor () {
      this._dispatch = null;
      this._dispatcher = {};
   }

   setDispatcher (eventsObject) {
      this._dispatcher = Object.assign({}, eventsObject);
   }

   getDispatch () {
      return this._dispatch;
   }

   /**
    * dispatcher setter
    * @param dispatch
    * @returns {{onSendRegistrationPhone: any}|*}
    */
   setGetDispatch (dispatch) {
      if (dispatch) {
         this._dispatch = dispatch;
      }
      return this._dispatcher;
   }
}

export default ReduxDispatcherController;