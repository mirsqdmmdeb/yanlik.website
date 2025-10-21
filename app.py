# app.py — basit Flask API for memory (opsiyonel)
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os, json, time

app = Flask(__name__, static_folder='.')
CORS(app)
DATA = 'memory.json'
if not os.path.exists(DATA):
    with open(DATA,'w',encoding='utf-8') as f: json.dump([], f, ensure_ascii=False, indent=2)

def load_mem(): 
    with open(DATA,'r',encoding='utf-8') as f: return json.load(f)
def save_mem(m):
    with open(DATA,'w',encoding='utf-8') as f: json.dump(m,f,ensure_ascii=False,indent=2)

@app.route('/api/message', methods=['POST'])
def message():
    body = request.json or {}
    msg = body.get('message','').strip()
    mem = load_mem()
    mem.append({'role':'user','text':msg,'t':time.time()})
    # reply logic (simple)
    l = msg.lower()
    if 'energy' in l:
        reply = '⚡ Sunucu: Energy protokolü tespit edildi.'
    elif 'merhaba' in l or 'selam' in l:
        reply = 'Sunucu: Selam! (server mode)'
    else:
        reply = 'Sunucu: Hmm… daha fazla anlat.'
    mem.append({'role':'bot','text':reply,'t':time.time()})
    save_mem(mem)
    return jsonify({'ok':True,'reply':reply})

@app.route('/api/memory', methods=['GET'])
def get_memory():
    return jsonify(load_mem())

@app.route('/api/clear', methods=['POST'])
def clear_mem():
    save_mem([])
    return jsonify({'ok':True})

if __name__ == '__main__':
    app.run(debug=True)