import { Reducer } from 'redux';
import { CurrentDocument, DocumentActions, SelectedItem, initialState, TypeTag } from './types';

const reducer: Reducer<CurrentDocument> = (state: CurrentDocument = initialState, action) => {
        switch ((action as DocumentActions).type) {
                case '@@document/TOKEN_CLICKED':
                        const parNum = action.payload.parNum 
                        const res = state.selectedTokens.filter(st => st.parNum != parNum).concat(action.payload.selection)
                        return { ...state, selectedTokens:  res };
                case '@@document/DOCUMENT_LOADED':
                        return { ...state, selectedTokens: [], tokens: action.payload.tokens };
                case '@@document/TAG_CHANGED':
                        return { ...state, currentTag: action.payload.tag };
                default:
                        return state;
        }
};

export default reducer;
