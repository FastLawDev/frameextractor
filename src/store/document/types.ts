export class SelectedItem {
        start: number;
        end: number;
}

export enum TypeTag {
    ORG = "ORG",
    PERSON = "PERSON",
    ADDR = "ADDR",
    EVENT = "EVENT",
    ACTION = "ACTION"
}

export interface CurrentDocument {
  tokens: string[];
  selectedTokens: SelectedItem[];
  currentTag: TypeTag; 
}

import { Action } from 'redux';

export interface TokenClickedAction extends Action {
  type: '@@document/TOKEN_CLICKED';
  payload: {
    selection: SelectedItem;
  };
}

export interface DocumentLoadedAction extends Action {
  type: '@@document/DOCUMENT_LOADED';
  payload: {
    tokens: string[];
  };
}

export interface TagChangedAction extends Action {
  type: '@@document/TAG_CHANGED';
  payload: {
    tag: TypeTag;
  };
}

export const initialState: CurrentDocument = {
  tokens: [],
  selectedTokens: [],
  currentTag: TypeTag.ORG
};

export type DocumentActions = TokenClickedAction | DocumentLoadedAction | TagChangedAction;
