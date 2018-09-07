import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createBrowserHistory } from 'history'
import DocumentView from 'containers/documentView';
import Sidebar from 'containers/sidebar';
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
        <div className="col-md-12" style={{textAlign: "center"}}>
          <h1>Разметка документа</h1>
          <p className="lead">Выделите мышью ответ на вопрос, указанный справа</p>
        </div>
      </div>
      <div className="row">
              <div className="col-md-8">
                <DocumentView />
              </div>
              <div className="col-md-4">
                <Sidebar />
              </div>
      </div>
    </div>
  </Provider>
  , document.getElementById('root'));

if (module.hot) {
   module.hot.accept();
}

run(store)
