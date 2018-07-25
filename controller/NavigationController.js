import ReduxDispatcherController from "./ReduxDispatcerController";

/**
 * This class is needed for control changes between screen
 * extends ReduxDispatcherController
 */
class NavigationController extends ReduxDispatcherController {
   constructor () {
      super();
      this._navigation = null;
   }

   set navigation (nav) {
      this._navigation = nav;
   }

   /**
    * go back
    */
   setPrevScreen () {
      this.sendDispatchMessageThatScreenWasChenged();
      this._navigation.goBack();
   }

   /**
    * set next screen
    * @param screen
    */
   setNextScreen (screen) {
      this.sendDispatchMessageThatScreenWasChenged();
      this._navigation.push(screen);
   }

   /**
    * send message to reducers
    */
   sendDispatchMessageThatScreenWasChenged () {
      const dispatch = this.getDispatch();
      if (dispatch) {
         dispatch({
            type: 'NavigationPushedScreen',
         });
      }
   }
}

export default NavigationController;