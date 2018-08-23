import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { ApplicationState } from 'store';
import './documentView.scss';

// Standard component props
interface DocumentViewProps {
  // write your props here
}

// Create an intersection type of the component props and our state.
type AllProps = DocumentViewProps & { tokens: string[], html: string };

// You can now safely use the mapped state as our component props!
const DocumentView: React.SFC<AllProps> = ({ tokens, html }) => (
  <div className="documentView">
    <div className="paper A4">
          <div dangerouslySetInnerHTML={{__html: html}} />
          <ul>
            {tokens && tokens.map((m: string) => (
              <li key={m}>{m}</li>
            ))}
          </ul>
    </div>
  </div>
);

const mapStateToProps = (state: ApplicationState): AllProps => { 
  return { tokens: state.doc.tokens, html: state.doc.html }
}

// Now let's connect our component!
export default connect(mapStateToProps)(DocumentView);
