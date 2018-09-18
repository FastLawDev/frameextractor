#!env/bin/python

import csv
import sys
import os
from flask import Flask, send_from_directory
from flask_socketio import SocketIO, send, emit
from nltk.tokenize import WordPunctTokenizer
tknzr = WordPunctTokenizer()

app = Flask(__name__, static_url_path='')
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app, binary=True)
static_file_dir = os.path.join(os.path.dirname(os.path.realpath(__file__)), 'dist')

import json

class Slot:
    def __init__(self, name, instructions):
        self.name = name
        self.instructions = instructions

class Frame:
    def __init__(self, name, slots):
        self.name = name
        self.slots = slots

class Document:
    def __init__(self, doc, frames):
        self.tokens = tknzr.tokenize(doc)
        self.frames = frames 
        
    def toJSON(self):
        return json.dumps(self, default=lambda o: o.__dict__, sort_keys=True, indent=4)

work_contract_frames = [
    Frame('Информация о работнике', [ 
            Slot('ФИО работника', 'выделите текст, означающий ФИО работника\nнажмите ОК'), 
            Slot('паспортные данные работника', 'выделете текст, означающий номер паспорта работника\nвыделете текст, указывающий кем и когда был выдан паспорт работнику\nвыделете текст, указывающий где проживает работник\nнажмите ОК'),
            Slot('гражданство', 'выделите текст, указывающий на гражданство работника\nнажмите ОК')
        ]),
    Frame('Информация о работодателе', [ Slot('название', 'выдилите текст, указывающий на название работодателя\nнажмите ОК') ]),
    Frame('Условия оплаты труда', [ 
            Slot('график работы', 'укажите текст, задающий грфик работы\nнажмите ОК'), 
            Slot('размер оплаты труда', 'укажите текст, задающий размер оплаты труда\nнажмите ОК')
        ]),
    Frame('Обязанности работника', [ Slot('обязанности работника', 'укажите текст, задающий обязанности работника\nнажмитео ОК') ])
]

writer = csv.writer(sys.stdout, quoting=csv.QUOTE_NONNUMERIC)
reader = csv.reader(iter(sys.stdin.readline, ''))

def next_doc():
    for row in reader:
        txt = row[0]
        doc = Document(txt, work_contract_frames)
        emit('new-document', doc.toJSON())

@socketio.on('init')
def next_document():
    next_doc()


@socketio.on('save-document')
def handle_my_custom_event(json):
    print(json)
    next_doc()

@app.route('/', methods=['GET'])
def serve_dir_directory_index():
    return send_from_directory(static_file_dir, 'index.html')
  
@app.route('/<path:path>', methods=['GET'])
def serve_file_in_dir(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = os.path.join(path, 'index.html')
    print(path)
    return send_from_directory(static_file_dir, path)

@app.route('/app.bundle.js', methods=['GET'])
def serve_file_in_dir_js1():
    return send_from_directory(static_file_dir, 'app.bundle.js')

@app.route('/vendor.bundle.js', methods=['GET'])
def serve_file_in_dir_js2():
    return send_from_directory(static_file_dir, 'vendor.bundle.js')

@app.route('/app.bundle.js.map', methods=['GET'])
def serve_file_in_dir_js3():
    return send_from_directory(static_file_dir, 'app.bundle.js.map')

@app.route('/vendor.bundle.js.map', methods=['GET'])
def serve_file_in_dir_js4():
    return send_from_directory(static_file_dir, 'vendor.bundle.js.map')

if __name__ == '__main__':
    app.run(debug=False)
