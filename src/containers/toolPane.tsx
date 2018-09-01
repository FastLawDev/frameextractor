import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { ApplicationState } from 'store';
import { SelectedItem, CurrentDocument, DocumentActions, TypeTag } from 'store/document/types'
import {TextAnnotator, TokenAnnotator} from 'react-text-annotate'
//import './documentView.scss';

// Standard component props
interface DispatchProps {
        type: string,
        handler: (i: React.ChangeEvent<HTMLSelectElement>) => void
}

// You can now safely use the mapped state as our component props!
const ToolPane: React.SFC<CurrentDocument & DispatchProps> = ({ currentTag, selectedTokens, tokens, handler }) => (
        <form className="sidebar">
          <div className="form-group">
          <select className="form-control" id="tag-selection" onChange={handler} value={currentTag}>
                  {Object.keys(TypeTag).filter(k => typeof TypeTag[k as any] === "string").map(key => {
                          const tag = TypeTag[key as any]
                          return <option value={tag} key={tag}>{tag}</option>
                  })}
            </select>
          </div>
        </form>
);

const mapStateToProps = (state: ApplicationState): CurrentDocument => { 
        return { currentTag: state.doc.currentTag, selectedTokens: [], tokens: [] }
}

const mapDispatchToProps = (dispatch: Dispatch<DocumentActions>): DispatchProps => ({
        type: '@@document/TAG_CHANGED',
        handler: (value: React.ChangeEvent<HTMLSelectElement>) => dispatch({ type: '@@document/TAG_CHANGED', payload: { tag: TypeTag[value.currentTarget.value as any] as TypeTag }}),
});

// Now let's connect our component!
export default connect(mapStateToProps, mapDispatchToProps)(ToolPane);
