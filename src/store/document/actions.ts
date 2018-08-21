import { ActionCreator } from 'redux';
import {
        DocumentLoadedAction,
        TokenClickedAction
} from './types';

export const clickOnToken: ActionCreator<TokenClickedAction> = (index: number) => ({
        type: '@@item/TOKEN_CLICKED',
        payload: {
                index
        },
});

export const newDocumentToken: ActionCreator<TokenClickedAction> = (tokens: string[]) => ({
        type: '@@item/DOCUMENT_LOADED',
        payload: {
                tokens
        },
});

