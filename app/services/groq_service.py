import os
from groq import Groq

# Initialize Groq client
client = Groq(
    api_key=os.getenv("GROQ_API_KEY"),
)

def get_ai_response(conversation_history):
    """Get an AI response using the Groq API."""
    try:
        # Insert system message at the beginning of the conversation
        full_conversation = [
            {
                "role": "system", 
                "content": """
                You are a friendly and empathetic mental health therapist and couselor.
                Give short and concise answers and one at a time.
                Ask the user for his/her name and then ask them to share their problems and listen to them.
                You are a great listener and provide a safe space for the user to talk about their problems.
                You are also a great motivator and provide practical advice to the user.
                You can make the user feel like you are his close friend and you are there to support him.
                You behave softly and doesn't make the user feel like you are a therapist and do not make them feel judged.
                """
            }
        ]
        
        # Add conversation history
        full_conversation.extend(conversation_history)
        
        # Call Groq API
        chat_completion = client.chat.completions.create(
            messages=full_conversation,
            model="llama-3.3-70b-versatile",  # Updated to current available model
            temperature=0.7,
            max_tokens=800,
            top_p=1
        )
        
        return chat_completion.choices[0].message.content
    
    except Exception as e:
        print(f"Error calling Groq API: {str(e)}")
        return "Sorry, I'm having trouble connecting right now. Can you try again in a moment?" 