import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { ApplicationState } from 'store';
import { SelectedItem, CurrentDocument, DocumentActions } from 'store/document/types'
import {TextAnnotator, TokenAnnotator} from 'react-text-annotate'
import './documentView.scss';

// Standard component props
interface DispatchProps {
        type: string,
        handler: (i: SelectedItem) => void
}

// Create an intersection type of the component props and our state.
//type AllProps = DocumentViewProps & { tokens: string[], selectedTokens: SelectedItem[], tag: string };

const TAG_COLORS: { [id: string]: string } = {
  "ORG": '#00ffa2',
  "PERSON": '#84d2ff',
}

// You can now safely use the mapped state as our component props!
const DocumentView: React.SFC<CurrentDocument & DispatchProps> = ({ tokens, selectedTokens, currentTag, handler }) => (
  <div className="documentView">
        {alert("!!!")}
    <div className="paper A4">
        <TokenAnnotator
              style={{
                fontFamily: 'IBM Plex Sans',
                maxWidth: 500,
                lineHeight: 1.5,
              }}
              tokens={tokens}
              value={selectedTokens}
              onChange={handler}
              getSpan={span => ({
                ...span,
                tag: currentTag,
                color: TAG_COLORS[currentTag],
              })}
              //renderMark={props => (
              //  <mark
              // key='1'//{props.key}
                  //onClick={() => props.onClick({start: props.start, end: props.end})}
              // >
              //   "erer" [{currentTag}]
              //  </mark>
              //)}
        />
    </div>
  </div>
);

const mapStateToProps = (state: ApplicationState): CurrentDocument => { 
        return { tokens: state.doc.tokens, selectedTokens: state.doc.selectedTokens, currentTag: state.doc.currentTag }
}

const mapDispatchToProps = (dispatch: Dispatch<DocumentActions>): DispatchProps => ({
        type: '@@document/TOKEN_CLICKED',
        handler: (value: SelectedItem) => dispatch({ type: '@@document/TOKEN_CLICKED', payload: { selection: value }}),
});

// Now let's connect our component!
export default connect(mapStateToProps, mapDispatchToProps)(DocumentView);
