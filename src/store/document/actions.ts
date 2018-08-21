import { ActionCreator } from 'redux';
import { DocumentLoadedAction, TokenClickedAction } from './types';

export const clickOnToken: ActionCreator<TokenClickedAction> = (index: number) => ({
        type: '@@document/TOKEN_CLICKED',
        payload: {
                index
        }
});

export const newDocumentToken: ActionCreator<DocumentLoadedAction> = (tokens: string[]) => ({
        type: '@@document/DOCUMENT_LOADED',
        payload: {
                tokens
        }
});

