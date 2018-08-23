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
        <div className="pageContent">
                {wrap2spans(html, tokens)}
        </div>
    </div>
  </div>
);

function wrap2spans(html: string, tokens: string[]): JSX.Element[] {
        var buf: string = html
        var res: JSX.Element[] = []
        tokens.forEach((item: string, index: number) => {
                const htmlOffset = buf.indexOf(item)
                res.push(<span key={"o-" + htmlOffset} dangerouslySetInnerHTML={{__html: buf.substring(0, htmlOffset - 1)}} />)
                const id = "" + index
                res.push(<span id={id} key={id}>{item}</span>)
                buf = buf.substring(htmlOffset + item.length)
        })
        return res
}

const mapStateToProps = (state: ApplicationState): AllProps => { 
  return { tokens: state.doc.tokens, html: state.doc.html }
}

// Now let's connect our component!
export default connect(mapStateToProps)(DocumentView);
