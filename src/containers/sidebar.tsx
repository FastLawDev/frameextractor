import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { State, DocumentActions } from 'store';
import './sidebar.scss';

interface Props {
  frameName: string,
  instructions: string[],
  isDisabled: boolean
}

interface Handlers {
  type: string,
  handler: () => void,
}

const ControlPanel: React.SFC<Props & Handlers> = (props: (Props & Handlers)) => (
  <div className="jumbotron sidebar">
    <h1 className="display-4">{props.frameName}</h1>
    <ul className="lead">{props.instructions.map((i: string) => (<li key={i}>{i}</li>))}</ul>
    <hr className="my-4"></hr>
    <button type="button" className={"btn btn-primary" + (props.isDisabled ? ' disabled' : '')} onClick={props.handler}>Ок</button>
  </div>
);

const mapStateToProps = (state: State): Props => { 
  const slot = state.document.currentSlot();
  if (slot) {
    return { frameName: state.document.frame(), instructions: slot.instructions.split('\n'), isDisabled: false }
  } else {
    return { frameName: state.document.frame(), instructions: [], isDisabled: true }
  }
}

const mapDispatchToProps = (dispatch: Dispatch<DocumentActions>): Handlers => ({
        type: '@@document/SLOT_FILLED',
        handler: () => {
          dispatch({ type: '@@document/SLOT_FILLED' });
        },
});

// Now let's connect our component!
export default connect(mapStateToProps, mapDispatchToProps)(ControlPanel);
