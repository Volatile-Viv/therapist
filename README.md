# AI Therapist Chat Application

An Instagram-like chat interface for a mental health therapist AI that communicates in Hinglish (Hindi+English mix) and provides counseling in a friendly, conversational manner.

## Features

- Real-time chat using WebSockets
- Instagram-inspired UI/UX
- AI responses in Hinglish language
- Conversational and empathetic AI therapist
- Mobile-responsive design

## Prerequisites

- Python 3.8 or higher
- Groq API key

## Installation

1. Clone this repository:

```bash
git clone https://github.com/yourusername/therapist.git
cd therapist
```

2. Create and activate a virtual environment (recommended):

```bash
python -m venv venv
source venv/bin/activate  # On Windows, use: venv\Scripts\activate
```

3. Install required packages:

```bash
pip install -r requirements.txt
```

4. Update the `.env` file with your Groq API key:

```
GROQ_API_KEY=your_groq_api_key_here
FLASK_APP=app
FLASK_ENV=development
```

## Running the Application

1. Run the Flask app:

```bash
python run.py
```

2. Open your browser and navigate to `http://127.0.0.1:5000`

## Usage

- Type your message in the input field and press Enter or click the send button
- The AI will respond in a friendly, conversational manner using Hinglish language
- The chat history is stored for the duration of your session

## Technology Stack

- Flask - Web framework
- Flask-SocketIO - WebSocket implementation
- Groq API - AI language model
- HTML/CSS/JavaScript - Frontend

## License

MIT
