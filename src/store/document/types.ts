export interface CurrentDocument {
        tokens: string[];
        selectedTokens: number[];
}

import { Action } from 'redux';

export interface TokenClickedAction extends Action {
        type: '@@document/TOKEN_CLICKED';
        payload: {
                index: number;
        };
}

export interface DocumentLoadedAction extends Action {
        type: '@@document/DOCUMENT_LOADED';
        payload: {
                tokens: string[];
        };
}

export const initialState: CurrentDocument = {
        tokens: [],
        selectedTokens: []
};

export type DocumentActions = TokenClickedAction | DocumentLoadedAction;
