from flask import Flask
from flask_socketio import SocketIO
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)
app.config['SECRET_KEY'] = os.urandom(24).hex()

# Initialize SocketIO
socketio = SocketIO(app, cors_allowed_origins="*")

# Import routes
from app.routes import main_routes, chat_routes

def create_app():
    return app 