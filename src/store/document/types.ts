export interface CurrentDocument {
        text: string[];
        selectedTokens: Set<number>;
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
                text: string[];
        };
}

export type DocumentActions = TokenClickedAction | DocumentLoadedAction;
