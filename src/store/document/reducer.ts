import { Reducer } from 'redux';
import { CurrentDocument, DocumentActions } from './types';

const initialState: CurrentDocument = {
        text: [],
        selectedTokens: new Set()
};

const reducer: Reducer<ChatState> = (state: ChatState = initialState, action) => {
        switch ((action as ChatActions).type) {
                case '@@document/TOKEN_CLICKED':
                        return { ...state, selectedTokens: state.selectedTokens.add(action.index) };
                case '@@document/DOCUMENT_LOADED':
                        return { selectedTokens: new Set(), text: action.text };
                default:
                        return state;
        }
};

export default reducer;
