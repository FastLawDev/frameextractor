import { ActionCreator, Action, Reducer, Store, createStore, applyMiddleware } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router'
import { composeWithDevTools } from 'redux-devtools-extension';
import { History } from 'history';
import { sendDocument } from 'services'

export interface Interval {
  start: number;
  end: number;
}

export class SelectedItem implements Interval {
  tag: string;
  color: string;

  start: number;
  end: number;
  tokens: string[];
}

export class Slot {
  name: string;
  instructions: string;
  value: Interval;
  tokens: string[];

  constructor(name: string, instructions: string) {
    this.name = name;
    this.instructions = instructions;
    this.value = null;
    this.tokens = [];
  }

  fill(value: Interval, tokens: string[]) {
        const slot = new Slot(this.name, this.instructions)
        slot.value = value
        slot.tokens = tokens
        return slot
  }
}

export class Frame {
  name: string;
  slots: Slot[];

  constructor(name: string, slots: Slot[]) {
    this.name = name;
    this.slots = slots;
  }

  freeSlots(): Slot[] {
    return this.slots.filter((s: Slot) => (s.value == null))
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
    var slot: Slot = frame.slots.find((s: Slot) => (s.value == null))
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
      const slots = selected.map((si: SelectedItem) => s.fill({ start: si.start, end: si.end }, si.tokens));
      const filledNames = new Set<string>(slots.map( (s: Slot) => s.name))
      const frame = this.currentFrame();
      frame.slots = frame.slots.filter((s: Slot) => !filledNames.has(s.name)).concat(slots)
    } 
    this.currentSlot();
    if (this.filledFrames.length > 0 && this.emptyFrames.length == 0) {
      sendDocument(this)
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

const slotFilledChanged: ActionCreator<SlotFilledAction> = () => ({
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
