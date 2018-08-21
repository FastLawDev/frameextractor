import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Workplace } from './components/Workplace';
declare let module: any

ReactDOM.render(<Workplace compiler="Typescript" framework="React" bundler="Webpack" />,
document.getElementById('root'));

if (module.hot) {
   module.hot.accept();
}
