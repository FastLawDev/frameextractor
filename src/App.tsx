import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createBrowserHistory } from 'history'
import DocumentView from 'containers/documentView';
import configureStore from 'store'
declare let module: any

const history = createBrowserHistory()
const store = configureStore(history)

ReactDOM.render(
  <Provider store={store}>
    <DocumentView />
  </Provider>
  , document.getElementById('root'));

if (module.hot) {
   module.hot.accept();
}

store.dispatch({ type: '@@document/DOCUMENT_LOADED', payload: { tokens: ['1', '2', '3'] } })
