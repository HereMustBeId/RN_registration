import ApolloClient from 'apollo-boost';
import NavigationController from "./NavigationController";

/**
 * Main class for getting data
 * extends Navigation that controls all changes between screens
 */
class RequestController extends NavigationController {

   constructor () {
      super ();

      this._url = 'https://app.zuber.litarg.ru:5443/graphql/';
      this._client = new ApolloClient({
         uri: this._url
      });
   }

   /**
    * Save request
    * @param request
    */
   setRequest (request) {
      this._request = request;
   }

   /**
    *
    * @param callback
    * @param variables
    * @param errback
    */
   queryRequest (callback, variables, errback) {
      const queryQL = this._request;
      variables = variables || {};
      this._client.query({query: queryQL, variables: variables}).then(
         result=>callback(result),
         error=>console.log (error)
      );
   }

   /**
    *
    * @param callback
    * @param variables
    * @param errback
    */
   mutationRequest (callback, variables, errback) {
      const queryQL = this._request;
      variables = variables || {};

      this._client.mutate({mutation: queryQL, variables: variables}).then(
         result=>(callback && callback(result)),
         error=>(errback && errback(error)) || console.log (error)
      );
   }

   /**
    * Mutation Data sender
    * @param type - 0 - query, !0 - mutation
    * @param request
    * @param variables
    * @param callback
    * @param errback
    */
   sender (type, request, variables, callback, errback) {
      if (!variables) {
         console.log ('wrong data!');
         return;
      }
      this.setRequest(request);

      if (type) {
         this.mutationRequest(callback, variables, errback);
      } else {
         this.queryRequest(callback, variables, errback);
      }
   }
}

export default RequestController;