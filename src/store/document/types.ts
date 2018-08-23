export interface CurrentDocument {
  tokens: string[];
  selectedTokens: number[];
  html: string;
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
    html: string;
  };
}

export const initialState: CurrentDocument = {
  tokens: [],
  selectedTokens: [],
  html: ''
};

export type DocumentActions = TokenClickedAction | DocumentLoadedAction;
