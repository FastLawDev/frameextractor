class Slot {
        name: string;
        value: string;
}

class Frame {
        name: string;
        slots: Slot[];
}

class Pos {
        offset: number;
        len: number;
}

export class Item {
        document: string;
        frames: Array<[Frame, Pos]>;
}

export class UserInfo {
  email: string;
}

export class CurrentMarkup {
        user: UserInfo;
        item: Item;
        currentFrameId: number;
        currentSlotId: number;
}

import { Action } from 'redux';

export interface SlotSelectedAction extends Action {
        type: '@@item/SLOT_SELECTED';
        payload: {
                frameId: number;
                slotId: number;
        };
}

export interface TokenClickedAction extends Action {
        type: '@@item/TOKEN_CLICKED';
        payload: {
                index: number;
        };

}

export interface ItemMarkupCompleteAction extends Action {
        type: '@@item/ITEM_MARKUP_COMPLETE';
        payload: {
                timestamp: Date;
        };
}

export interface ItemReceivedAction extends Action {
        type: '@@item/ITEM_RECEIVED';
        payload: {
                item: Item;
        };
}
