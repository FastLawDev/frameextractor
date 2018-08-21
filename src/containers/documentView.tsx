import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { CurrentDocument } from '../store/document/types';
import { ApplicationState } from '../store';

// Standard component props
interface DocumentViewProps {
  // write your props here
}

// Create an intersection type of the component props and our state.
type AllProps = DocumentViewProps & CurrentDocument;

// You can now safely use the mapped state as our component props!
const DocumentView: React.SFC<AllProps> = ({ tokens, selectedTokens }) => (
  <div>
          olololo
        {tokens && tokens.map((m: string) => (
          <span>{m}</span>
        ))}
  </div>
);

const mapStateToProps = (state: ApplicationState): AllProps => { 
  return { tokens: state.doc.tokens, selectedTokens: [] }
}

// Now let's connect our component!
export default connect(mapStateToProps)(DocumentView);
