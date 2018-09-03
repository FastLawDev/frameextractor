import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createBrowserHistory } from 'history'
import DocumentView from 'containers/documentView';
//import ToolPane from 'containers/toolPane';
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
                <div className="col-md-12">
                        <div className="jumbotron">
                          <h1 className="display-4">Hello, world!</h1>
                                <p className="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
                        </div>
                </div>
        </div>
        <div className="row">
                <div className="col-md-8">
                        <DocumentView />
                </div>
                <div className="col-md-4">

                </div>
        </div>
    </div>
  </Provider>
  , document.getElementById('root'));

if (module.hot) {
   module.hot.accept();
}

run(store)
