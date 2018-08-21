import { ActionCreator } from 'redux';
import {
        Item,
        UserInfo,
        CurrentMarkup,
        SlotSelectedAction,
        TokenClickedAction,
        ItemMarkupCompleteAction,
        ItemReceivedAction
} from './types';

export const selectSlot: ActionCreator<SlotSelectedAction> = (frameId: number, slotId: number) => ({
        type: '@@item/SLOT_SELECTED',
        payload: {
                frameId,
                slotId
        },
});

export const clickOnToken: ActionCreator<TokenClickedAction> = (index: number) => ({
        type: '@@item/TOKEN_CLICKED',
        payload: {
                index
        },
});

export const seve: ActionCreator<ItemMarkupCompleteAction> = () => ({
        type: '@@item/ITEM_MARKUP_COMPLETE',
        payload: {
                timestamp: new Date()
        },
});

export const received: ActionCreator<ItemReceivedAction> = (item: Item) => ({
        type: '@@item/ITEM_RECEIVED',
        payload: {
                item
        },
});

