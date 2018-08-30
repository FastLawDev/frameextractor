import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { ApplicationState } from 'store';
import { SelectedItem, CurrentDocument, DocumentActions, TypeTag } from 'store/document/types';
import {TextAnnotator, TokenAnnotator} from 'components/annotator';
import './documentView.scss';

// Standard component props
interface DispatchProps {
        type: string,
        handler: (parNum: number, i: SelectedItem[]) => void
}

function randomColor(): string {
        const x=Math.round(0xffffff * Math.random()).toString(16);
        const y=(6-x.length);
        const z='000000';
        const z1 = z.substring(0,y);
        const color= '#' + z1 + x;
        return color;
}

var TAG_COLORS: { [id: string]: string } = {} 
Object.keys(TypeTag).filter(k => typeof TypeTag[k as any] === "string")
        .forEach(key => {
                TAG_COLORS[key] = randomColor()
        })

// You can now safely use the mapped state as our component props!
const DocumentView: React.SFC<CurrentDocument & DispatchProps> = ({ tokens, selectedTokens, currentTag, handler }) => (
  <div className="documentView">
        <div className="paper A4">
                {tokens.map((t, i) => 
                    <TokenAnnotator
                            style={{ }}
                            pageNum={i}
                            key={"" + i}
                            tokens={t}
                            value={selectedTokens.filter((si: SelectedItem) => (si.parNum == i))}
                            onChange={handler}
                            getSpan={span => ({
                                    ...span,
                                    tag: currentTag,
                                    color: TAG_COLORS[currentTag],
                            })}
                    />
                )}
            </div>
  </div>
);

const mapStateToProps = (state: ApplicationState): CurrentDocument => { 
        return { tokens: state.doc.tokens, selectedTokens: state.doc.selectedTokens, currentTag: state.doc.currentTag }
}

const mapDispatchToProps = (dispatch: Dispatch<DocumentActions>): DispatchProps => ({
        type: '@@document/TOKEN_CLICKED',
        handler: (parNum: number, value: SelectedItem[]) => {
                const res = value.map(si => ({ ...si, parNum }))
                dispatch({ type: '@@document/TOKEN_CLICKED', payload: { selection: res, parNum }});
        },
});

// Now let's connect our component!
export default connect(mapStateToProps, mapDispatchToProps)(DocumentView);
