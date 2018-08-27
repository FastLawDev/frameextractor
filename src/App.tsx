import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createBrowserHistory } from 'history'
import DocumentView from 'containers/documentView';
import ToolPane from 'containers/toolPane';
import configureStore from 'store'
import 'bootstrap/scss/bootstrap.scss'
import run from 'services'
declare let module: any

const history = createBrowserHistory()
const store = configureStore(history)

ReactDOM.render(
  <Provider store={store}>
    <div className="container-fluid">
        <div className="row">
                <div className="col-md-8">
                        <DocumentView />
                </div>
                <div className="col-md-4">
                        <ToolPane />
                </div>
        </div>
    </div>
  </Provider>
  , document.getElementById('root'));

if (module.hot) {
   module.hot.accept();
}

run(store)
