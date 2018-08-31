import { ActionCreator, Action } from 'redux';

/*export class SelectedItem {
        start: number;
        end: number;
        tag: string;
        color: string;
        parNum: number;
        }*/

export enum SlotType {
        ORG = "ORG",
        PERSON = "PERSON",
        ADDR = "ADDR",
        EVENT = "EVENT",
        ACTION = "ACTION"
}

export class Slot {
        name: string;
        instructions: string;
        type: SlotType;
        value: string?;
}

export class Frame {
        name: string;
        slots: Slot[];
}

class NullFrame extends Frame {
        constructor() {
                this.name = "Больше задач нет!";
                this.slots = [];
        }
}

const nullFrame = new NullFrame();

export class ExtractorState {
        document: string[][];
        private emptyFrames: Frame[];
        private filledFrmaes: Frame[];

        constructor() {
                this.document = [];
                this.emptyFrames = [];
                this.filledFrames = [];
        }

        private currentFrame(): Frame {
                if (this.emptyFrames && this.emptyFrames.length > 0) {
                        return this.emptyFrames[0];
                } else {
                        return nullFrame;
                }
        }

        currentFrameName(): string {
                currentFrame().name;
        }

        currentSlot(): Slot? {
                const frame = currentFrame();
                if (frame && frame.slots.length > 0) {
                        return frame.slots[0]    
                } else {
                        return null;
                }
        }
}

export const initialState: CurrentDocument = {
        tokens: [],
        selectedTokens: [],
        currentTag: TypeTag.ORG
};

export interface TokenClickedAction extends Action {
  type: '@@document/TOKEN_CLICKED';
  payload: {
          selection: SelectedItem[];
          parNum: number;
  };
}

export interface DocumentLoadedAction extends Action {
  type: '@@document/DOCUMENT_LOADED';
  payload: {
    tokens: string[][];
  };
}

export interface TagChangedAction extends Action {
  type: '@@document/TAG_CHANGED';
  payload: {
    tag: TypeTag;
  };
}

export type DocumentActions = TokenClickedAction | DocumentLoadedAction | TagChangedAction;

export const clickOnToken: ActionCreator<TokenClickedAction> = (selection: SelectedItem[], parNum: number) => ({
        type: '@@document/TOKEN_CLICKED',
        payload: {
                selection,
                parNum
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
