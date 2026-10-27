import os
from flask import Flask, send_from_directory

app = Flask(__name__, static_folder='.', static_url_path='')
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory(BASE_DIR, path)

if __name__ == '__main__':
    print("Starting Benny's TicTacToe Server...")
    # Local testing only: bound to this computer with the debugger off, since
    # Flask's debugger on a network-facing host allows remote code execution.
    app.run(host='127.0.0.1', port=8000)
