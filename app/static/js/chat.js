document.addEventListener("DOMContentLoaded", () => {
  const messageInput = document.getElementById("message-input");
  const sendButton = document.getElementById("send-button");
  const messagesContainer = document.getElementById("messages");

  // Function to send message
  async function sendMessage() {
    const message = messageInput.value.trim();

    if (message !== "") {
      // Display user message
      displayMessage(message, "user");

      // Clear input
      messageInput.value = "";

      // Show typing indicator
      displayTypingIndicator();

      try {
        // Send message to server using fetch API
        const response = await fetch("/send_message", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        // Remove typing indicator
        removeTypingIndicator();

        // Display AI response
        if (data.response) {
          displayMessage(data.response, "ai");
        }
      } catch (error) {
        console.error("Error sending message:", error);
        removeTypingIndicator();
        displayMessage(
          "Sorry, I'm having trouble connecting right now. Please try again later.",
          "ai"
        );
      }

      // Scroll to bottom
      scrollToBottom();
    }
  }

  // Load initial welcome message
  async function loadInitialMessage() {
    try {
      const response = await fetch("/get_initial_message");
      const data = await response.json();

      if (data.response) {
        displayMessage(data.response, "ai");
        scrollToBottom();
      }
    } catch (error) {
      console.error("Error loading initial message:", error);
    }
  }

  // Call initial message when page loads
  loadInitialMessage();

  // Send message when button is clicked
  sendButton.addEventListener("click", sendMessage);

  // Send message when Enter key is pressed
  messageInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  });

  // Function to display message
  function displayMessage(text, sender) {
    const messageElement = document.createElement("div");
    messageElement.classList.add("message", sender);
    messageElement.textContent = text;
    messagesContainer.appendChild(messageElement);
  }

  // Function to display typing indicator
  function displayTypingIndicator() {
    if (document.querySelector(".typing-indicator")) return;

    const typingIndicator = document.createElement("div");
    typingIndicator.classList.add("typing-indicator");

    for (let i = 0; i < 3; i++) {
      const dot = document.createElement("div");
      dot.classList.add("dot");
      typingIndicator.appendChild(dot);
    }

    messagesContainer.appendChild(typingIndicator);
    scrollToBottom();
  }

  // Function to remove typing indicator
  function removeTypingIndicator() {
    const typingIndicator = document.querySelector(".typing-indicator");
    if (typingIndicator) {
      typingIndicator.remove();
    }
  }

  // Function to scroll to bottom of messages
  function scrollToBottom() {
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }
});
