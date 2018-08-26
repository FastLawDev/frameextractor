import { createStore, applyMiddleware, Store, combineReducers, Reducer } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router'
import { composeWithDevTools } from 'redux-devtools-extension';
import { History } from 'history';

// Import your state types and reducers here.
import { CurrentDocument } from './document/types';
import documentReducer from './document/reducer';
import { DocumentActions, SelectedItem, TypeTag, initialState } from './document/types';

// The top-level state object
export interface ApplicationState {
  doc: CurrentDocument;
}

// Whenever an action is dispatched, Redux will update each top-level application state property
// using the reducer with the matching name. It's important that the names match exactly, and that
// the reducer acts on the corresponding ApplicationState property type.
export const reducers: Reducer<ApplicationState> = combineReducers<ApplicationState>({
  doc: documentReducer
});

export type DWStore = Store<ApplicationState, DocumentActions>

export default function configureStore(
  history: History
): Store<ApplicationState, DocumentActions> {
  // create the composing function for our middlewares
  const composeEnhancers = composeWithDevTools({});

  const initialAppState: ApplicationState = {
    doc: initialState
  }

  // We'll create our store with the combined reducers and the initial Redux state that
  // we'll be passing from our entry point.
  return createStore<ApplicationState, DocumentActions, any, null>(
    connectRouter(history)(reducers),
    initialAppState,
    composeEnhancers(applyMiddleware(
      routerMiddleware(history),
    ))
  );
}
