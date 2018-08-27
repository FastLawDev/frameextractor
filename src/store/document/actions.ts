import { ActionCreator } from 'redux';
import { DocumentLoadedAction, TokenClickedAction, TagChangedAction, SelectedItem, TypeTag } from './types';

export const clickOnToken: ActionCreator<TokenClickedAction> = (selection: SelectedItem[]) => ({
        type: '@@document/TOKEN_CLICKED',
        payload: {
                selection
        }
});

export const newDocumentToken: ActionCreator<DocumentLoadedAction> = (tokens: string[][], html: string) => ({
        type: '@@document/DOCUMENT_LOADED',
        payload: {
                tokens
        }
});

export const tagChanged: ActionCreator<TagChangedAction> = (tag: TypeTag) => ({
        type: '@@document/TAG_CHANGED',
        payload: {
                tag
        }
});

