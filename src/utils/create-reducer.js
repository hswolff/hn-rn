/**
 * Allow for easy mapping of action type keys to handlers.
 * Allows for multiple usages. Inspired by
 * https://github.com/acdlite/redux-actions#handleactiontype-reducer--reducermap
 * @example
 * createReducer(state = {}, {
 *   'ACTION_TYPE': function(state, action) {},
 *   'DIFFERENT_ACTION_TYPE': {
 *     'next': function(state, action) {
 *       // called on every non-error action dispatched.
 *     }
 *     'throw': function(state, action) {
 *       // called when an error property exists on the action object.
 *     }
 *   }
 * });
 * @param {*} initialState Initial state of reducer.
 * @param {Object} handlers Mapping of action types to their handlers.
 * @return {Function} The reducer function.
 */
export default function createReducer(initialState, handlers) {
  return function reducer(state = initialState, action) {
    let nextState = state;

    if (handlers.hasOwnProperty(action.type)) {
      let handler = handlers[action.type];

      if (typeof handler !== 'function') {
        if (typeof action.error !== 'undefined') {
          handler = handler.throw;
        } else {
          handler = handler.next;
        }
      }

      if (typeof handler !== 'function') {
        throw new Error(`Need a handler for action.type: ${action.type}`);
      }

      nextState = handler(state, action);
    }

    return nextState;
  };
}
