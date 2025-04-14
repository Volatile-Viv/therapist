from flask import request, session
from flask_socketio import emit
from app import socketio, app
from app.services.groq_service import get_ai_response

# Store chat histories temporarily (in a real app, you'd use a database)
chat_histories = {}

@socketio.on('connect')
def handle_connect():
    session_id = request.sid
    if session_id not in chat_histories:
        chat_histories[session_id] = []
    
    emit('status', {'message': 'Connected to therapist AI'})
    
    # Send welcome message
    welcome_message = "Hi, I'm your AI therapist. How can I help you today?"
    emit('message', {'sender': 'ai', 'text': welcome_message})

@socketio.on('disconnect')
def handle_disconnect():
    session_id = request.sid
    if session_id in chat_histories:
        del chat_histories[session_id]

@socketio.on('send_message')
def handle_message(data):
    user_message = data.get('message', '')
    session_id = request.sid
    
    # Add user message to chat history
    chat_histories[session_id].append({'role': 'user', 'content': user_message})
    
    # Get AI response
    ai_response = get_ai_response(chat_histories[session_id])
    
    # Add AI response to chat history
    chat_histories[session_id].append({'role': 'assistant', 'content': ai_response})
    
    # Send AI response back to client
    emit('message', {'sender': 'ai', 'text': ai_response}) 