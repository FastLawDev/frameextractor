import { Reducer } from 'redux';
import { CurrentDocument, DocumentActions, SelectedItem, initialState, TypeTag } from './types';

const reducer: Reducer<CurrentDocument> = (state: CurrentDocument = initialState, action) => {
        switch ((action as DocumentActions).type) {
                case '@@document/TOKEN_CLICKED':
                        if (action.payload.selection.length > 0) {
                                const parNum = action.payload.selection[0].parNum 
                                const res = state.selectedTokens.filter(st => st.parNum == parNum).concat(action.payload.selection)
                                console.log(res)

                                return { ...state, selectedTokens:  res };
                        } else {
                                return state;

                        }

                case '@@document/DOCUMENT_LOADED':
                        return { ...state, selectedTokens: [], tokens: action.payload.tokens };
                case '@@document/TAG_CHANGED':
                        return { ...state, currentTag: action.payload.tag };
                default:
                        return state;
        }
};

export default reducer;
