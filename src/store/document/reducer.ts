import { Reducer } from 'redux';
import { CurrentDocument, DocumentActions, initialState } from './types';

const reducer: Reducer<CurrentDocument> = (state: CurrentDocument = initialState, action) => {
        switch ((action as DocumentActions).type) {
                case '@@document/TOKEN_CLICKED':
                        var newTokens = state.selectedTokens
                        newTokens.push(action.payload.index)
                        return { ...state, selectedTokens: newTokens };
                case '@@document/DOCUMENT_LOADED':
                        return { selectedTokens: [], tokens: action.payload.tokens, html: action.payload.html };
                default:
                        return state;
        }
};

export default reducer;
