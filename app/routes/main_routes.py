from flask import render_template, request, jsonify, session
from app import app
from app.services.groq_service import get_ai_response
import uuid

# Store chat histories temporarily (in a real app, you'd use a database)
chat_histories = {}

@app.route('/')
def index():
    # Generate a unique session ID if not already present
    if 'user_id' not in session:
        session['user_id'] = str(uuid.uuid4())
        
    user_id = session['user_id']
    if user_id not in chat_histories:
        chat_histories[user_id] = []
        
    return render_template('index.html')

@app.route('/send_message', methods=['POST'])
def send_message():
    user_id = session.get('user_id')
    if not user_id or user_id not in chat_histories:
        return jsonify({'error': 'Session expired'}), 400
        
    user_message = request.json.get('message', '')
    if not user_message:
        return jsonify({'error': 'No message provided'}), 400
        
    # Add user message to chat history
    chat_histories[user_id].append({'role': 'user', 'content': user_message})
    
    # Get AI response
    ai_response = get_ai_response(chat_histories[user_id])
    
    # Add AI response to chat history
    chat_histories[user_id].append({'role': 'assistant', 'content': ai_response})
    
    return jsonify({'response': ai_response})

@app.route('/get_initial_message', methods=['GET'])
def get_initial_message():
    welcome_message = "नमस्ते दोस्त! मैं आपका AI therapist हूं। आप कैसे feel कर रहे हैं आज? कुछ भी share करना चाहते हैं तो बेझिझक बताएं, मैं यहां आपके लिए हूं। 😊"
    return jsonify({'response': welcome_message}) 