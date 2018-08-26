import { Reducer } from 'redux';
import { CurrentDocument, DocumentActions, SelectedItem, initialState } from './types';

const reducer: Reducer<CurrentDocument> = (state: CurrentDocument = initialState, action) => {
        switch ((action as DocumentActions).type) {
                case '@@document/TOKEN_CLICKED':
                        var newTokens = state.selectedTokens
                        newTokens.push(action.payload.selection)
                        return { ...state, selectedTokens: newTokens };
                case '@@document/DOCUMENT_LOADED':
                        return { ...state, selectedTokens: [], tokens: action.payload.tokens };
                case '@@document/TAG_CHANGED':
                        return { ...state, tag: action.payload.tag };
                default:
                        return state;
        }
};

export default reducer;
