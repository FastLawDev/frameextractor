import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { State, DocumentActions, SelectedItem } from 'store';
import { TokenAnnotator } from 'components/annotator';
import './documentView.scss';

// Standard component props
interface Props {
  selected: SelectedItem[],
  tokens: string[],
  currentTag: string
}

interface Handlers {
  type: string,
  handler: (i: SelectedItem[]) => void,
}

function randomColor(): string {
  const x=Math.round(0xffffff * Math.random()).toString(16);
  const y=(6-x.length);
  const z='000000';
  const z1 = z.substring(0,y);
  const color= '#' + z1 + x;
  return color;
}

// You can now safely use the mapped state as our component props!
const DocumentView: React.SFC<Props & Handlers> = (props: (Props & Handlers)) => (
  <div className="documentView">
          <TokenAnnotator
                  style={{ }}
                  tokens={props.tokens}
                  value={props.selected}
                  onChange={props.handler}
                  getSpan={span => ({
                          ...span,
                          tag: props.currentTag,
                          color: randomColor(),
                  })}
          />
  </div>
);

const mapStateToProps = (state: State): Props => { 
  const slot = state.document.currentSlot();
  if (slot) {
    return { tokens: state.document.tokens(), selected: state.selected, currentTag: '' }
  } else {
    return { tokens: [], selected: [], currentTag: '' }
  }
}

const mapDispatchToProps = (dispatch: Dispatch<DocumentActions>): Handlers => ({
        type: '@@document/TOKEN_CLICKED',
        handler: (value: SelectedItem[]) => {
          dispatch({ type: '@@document/TOKEN_CLICKED', selection: value });
        },
});

// Now let's connect our component!
export default connect(mapStateToProps, mapDispatchToProps)(DocumentView);
