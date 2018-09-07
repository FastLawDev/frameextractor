import { DWStore, Document, Frame, Slot } from 'store'
import * as io from 'socket.io-client'

const socket = io.connect('http://' + document.domain + ':' + location.port);

export default function run(store: DWStore) {
        socket.on('connect', function() {
                socket.emit('init');
        });

        socket.on('finish', function() {
                
        });


        socket.on('new-document', function(json: string) {
                const raw = JSON.parse(json)
                const tokens: string[] = raw.tokens
                const frames: Frame[] = raw.frames.map((f: any) => {
                        const slots: Slot[] = f.slots.map((s: any) => {
                                return new Slot(s.name, s.instructions)
                        })

                        return new Frame(f.name, slots)
                })
                const doc = new Document(tokens, frames);
                store.dispatch({ type: '@@document/DOCUMENT_LOADED', document: doc });
        });
}

export function sendDocument(d: Document): void {
        const json = JSON.stringify(d);
        console.log(json);
        socket.emit('save-document', json);
}
