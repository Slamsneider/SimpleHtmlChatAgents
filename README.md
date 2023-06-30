# SimpleHtmlChatAgents
This is a simple HTML based chat application that uses OpenAI's GPT models to generate responses. The application allows you to choose from different agents, each with their own unique personality and style of communication.

The project is created to show a simple interface with a GPT chat model without the need for a server or backend.

Aimed for personal use and learning as you would publish your API key to the world if you use it on a public server.

## Features

- Option to select different GPT models.
- Multiple agents to choose from, each with a unique personality.
- Displays the token count used for each response.
- Conversation history is maintained for the duration of the session.

## Installation
1. Press the green "Code" button on the project page and choose "Download ZIP" to download the project.
2. Once downloaded, unzip the html folder to your desired location.
3. **RENAME** `apikey.js.install` to `apikey.js` and open the file in a text editor.
4. Replace `YOUR_API_KEY_HERE` with your OpenAI API key.
5. Save the changes made in the `apikey.js` file.
6. Now, open the `index.html` file in your browser to start using the application.

## How to Use

1. Select a model from the dropdown menu.
2. Select an agent from the dropdown menu.
3. Type your message in the input field and click the "Send" button or press Enter to send it.
4. The agent's response will appear in the chat log.
5. The token count used for the response and the finish reason is displayed together with the settings for temperature and max_tokens.
6. If you want to change to another agent, you can do so from the dropdown menu. Note that changing the agent will reset the chat.

## Code Structure

- `index.html`: This is the main HTML file for the application.
- `apikey.js`: This file contains the API key for OpenAI's API.
- `agents.js`: This file contains the definitions for the different agents.
- `functions.js`: This file contains the main functionality of the application, including sending messages and handling responses.
- `styles.css`: This file contains the CSS styles for the application.

## Important Note

Do not use this application on a public server as it will expose your API key to the world. This application is intended for 'local' use only.

## Disclaimer

This application is made for learning and is not intended to be a full fledged chat application.