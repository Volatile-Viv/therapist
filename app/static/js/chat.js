document.addEventListener("DOMContentLoaded", () => {
  const messageInput = document.getElementById("message-input");
  const sendButton = document.getElementById("send-button");
  const messagesContainer = document.getElementById("messages");

  // Connect to SocketIO server
  const socket = io();

  // Handle connection status
  socket.on("status", (data) => {
    console.log(data.message);
  });

  // Handle incoming messages from server
  socket.on("message", (data) => {
    removeTypingIndicator();
    displayMessage(data.text, data.sender);
    scrollToBottom();
  });

  // Send message when button is clicked
  sendButton.addEventListener("click", sendMessage);

  // Send message when Enter key is pressed
  messageInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  });

  // Function to send message
  function sendMessage() {
    const message = messageInput.value.trim();

    if (message !== "") {
      // Display user message
      displayMessage(message, "user");

      // Send to server
      socket.emit("send_message", { message });

      // Clear input
      messageInput.value = "";

      // Show typing indicator
      displayTypingIndicator();

      // Scroll to bottom
      scrollToBottom();
    }
  }

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
