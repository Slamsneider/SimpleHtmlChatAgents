# SimpleHtmlChatAgents
This is a simple chat application that uses OpenAI's GPT models to generate responses. The application allows you to choose from different agents, each with their own unique personality and style of communication.

## Features

- Multiple agents to choose from, each with a unique personality.
- Option to select different GPT models.
- Displays the token count used for each response.
- Conversation history is maintained for the duration of the session.

## How to Use

1. Select a model from the dropdown menu.
2. Select an agent from the dropdown menu.
3. Type your message in the input field and click the "Send" button or press Enter to send it.
4. The assistant's response will appear in the chat log, along with the token count used for the response.
5. If you want to change the agent, you can do so from the dropdown menu. Note that changing the agent will reset the chat.

## Code Structure

- `agents.js`: This file contains the definitions for the different agents.
- `functions.js`: This file contains the main functionality of the application, including sending messages and handling responses.
- `index.html`: This is the main HTML file for the application.
- `styles.css`: This file contains the CSS styles for the application.

## Note

This application uses OpenAI's GPT-3.5-Turbo model, which is a powerful language model capable of understanding and generating human-like text. However, it's important to note that the model doesn't have any real understanding of the world and doesn't have access to personal data about individuals unless it has been shared in the course of the conversation. It generates responses based on a mixture of licensed data, data created by human trainers, and publicly available data.

## Disclaimer

This application is for demonstration purposes only and is not intended to be used for any harmful or malicious activities. The developers are not responsible for any misuse of the application.