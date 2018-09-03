import { ActionCreator, Action, Reducer, Store, createStore, applyMiddleware } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router'
import { composeWithDevTools } from 'redux-devtools-extension';
import { History } from 'history';

export interface Interval {
  start: number;
  end: number;
}

export enum SlotType {
  ORG = "ORG",
  PERSON = "PERSON",
  ADDR = "ADDR",
  EVENT = "EVENT",
  TOPIC_NAME = "TOPIC_NAME",
  ACTION = "ACTION"
}

export class SelectedItem implements Interval {
  tag: string;
  color: string;

  start: number;
  end: number;
}

export class Slot {
  name: string;
  instructions: string;
  type: SlotType;
  value: Interval;

  constructor(name: string, instructions: string, type: SlotType) {
    this.name = name;
    this.instructions = instructions;
    this.type = type;
    this.value = null;
  }
}

export class Frame {
  name: string;
  slots: Set<Slot>;

  constructor(name: string, slots: Slot[]) {
    this.name = name;
    this.slots = new Set(slots);
  }

  freeSlots(): Slot[] {
    return [...this.slots].filter((s: Slot) => (s.value == null))
  }
}

class NullFrame extends Frame {
  constructor() {
    super("Больше задач нет!", []);
  }
}

const nullFrame = new NullFrame();

export class Document { 
  private document: string[];
  private emptyFrames: Frame[];
  private filledFrames: Frame[];

  constructor(document: string[], frames: Frame[]) {
    this.document = document;
    this.emptyFrames = frames;
    this.filledFrames = [];
  } 
  
  tokens() {
    return this.document;
  }

  private currentFrame() {
    if (this.emptyFrames.length > 0) {
      return this.emptyFrames[0];
    } else {
      return nullFrame;
    }
  }

  currentSlot(): Slot {
    var frame = this.currentFrame();
    var slot: Slot = [...frame.slots].find((s: Slot) => (s.value == null))
    if (!slot && this.emptyFrames.length > 0) {
      this.filledFrames.push(this.emptyFrames.shift());
      return this.currentSlot();
    }
    return slot;
  }

  frame() {
    return this.currentFrame().name;
  }

  saveSlot(selected: Array<SelectedItem>) {
    const s: Slot = this.currentSlot();
    if (s) {
      const slots = selected.filter((si: SelectedItem) => (si.tag == s.type)).map((si: SelectedItem) => ({...s, value: { start: si.start, end: si.end } }));
      console.log(selected);
      const filledNames = new Set<string>(slots.map( (s: Slot) => s.name))
      const frame = this.currentFrame();
      frame.slots = new Set([...frame.slots].filter((s: Slot) => !filledNames.has(s.name)).concat(slots))
    }
    return this;
  }
}

export class State {
  document: Document;
  selected: SelectedItem[];

  constructor(document: Document) {
    this.document = document;
    this.selected = [];
  }
}

const initialState: State = new State(new Document(["EMPTY"], []));

interface TokenClickedAction extends Action {
  type: '@@document/TOKEN_CLICKED';
  selection: SelectedItem[];
}

interface DocumentLoadedAction extends Action {
  type: '@@document/DOCUMENT_LOADED';
  document: Document;
}

interface SlotFilledAction extends Action {
  type: '@@document/SLOT_FILLED';
}

export type DocumentActions = TokenClickedAction | DocumentLoadedAction | SlotFilledAction;

const clickOnToken: ActionCreator<TokenClickedAction> = (selection: SelectedItem[]) => ({
  type: '@@document/TOKEN_CLICKED',
  selection: selection

});

const newDocumentToken: ActionCreator<DocumentLoadedAction> = (document: Document) => ({
  type: '@@document/DOCUMENT_LOADED',
  document: document
});

const slotFilledChanged: ActionCreator<SlotFilledAction> = (tag: SlotType) => ({
  type: '@@document/SLOT_FILLED'
});

function select(this: State, selected: SelectedItem[]): State {
  const res = new State(this.document);
  res.selected = selected;
  return res;
}

function save(this: State): State {
  this.document.saveSlot(this.selected)
  return new State(this.document)
}

const reducer: Reducer<State> = (state: State = initialState, action) => {
  switch ((action as DocumentActions).type) {
    case '@@document/TOKEN_CLICKED':
      return select.bind(state)(action.selection);
    case '@@document/DOCUMENT_LOADED':
      return new State(action.document);
    case '@@document/SLOT_FILLED':
      return save.bind(state)();
    default:
      console.warn('unhandled event: ' + JSON.stringify(action))
      return state;
  }
};

export type DWStore = Store<State, DocumentActions>

  export default function configureStore(history: History): DWStore {
    // create the composing function for our middlewares
    const composeEnhancers = composeWithDevTools({});
    const initialAppState: State = initialState;

    return createStore<State, DocumentActions, any, null>(
      connectRouter(history)(reducer),
      initialAppState,
      composeEnhancers(applyMiddleware(
        routerMiddleware(history),
      ))
    );
  }
