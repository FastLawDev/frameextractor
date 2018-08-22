import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { ApplicationState } from 'store';

// Standard component props
interface DocumentViewProps {
  // write your props here
}

// Create an intersection type of the component props and our state.
type AllProps = DocumentViewProps & { tokens: string[] };

// You can now safely use the mapped state as our component props!
const DocumentView: React.SFC<AllProps> = ({ tokens }) => (
  <div>
        olololo
        <ul>
          {tokens && tokens.map((m: string) => (
            <li key={m}>{m}</li>
          ))}
        </ul>
  </div>
);

const mapStateToProps = (state: ApplicationState): AllProps => { 
  return { tokens: state.doc.tokens }
}

// Now let's connect our component!
export default connect(mapStateToProps)(DocumentView);
