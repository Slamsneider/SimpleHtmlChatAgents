# SimpleHtmlChatAgents
This is a simple HTML based chat application that uses OpenAI's GPT models to generate responses. The application allows you to choose from different agents, each with their own unique personality and style of communication.

You will need your personal OpenAi API-KEY. Get it here: https://platform.openai.com/account/api-keys

The project is created to provide you with a simple interface running a GPT chat model without the need for a server or backend. This so you can easily expand on the project and learn how to use OpenAI's API.

Aimed for local use and learning as you would publish your API key to the world if you use it on a public server.

1. [Features](#features)
2. [Installation](#installation)
3. [How to Use](#how-to-use)
4. [Code Structure](#code-structure)
5. [About OpenAI Models](#about-openai-models)
6. [Important Note](#important-note)
7. [Disclaimer](#disclaimer)

## Features
- Option to select different GPT models.
- Multiple agents to choose from, each with a unique personality.
- Displays the token count used for each response.
- Conversation history is maintained for the duration of the session.

## Installation
1. Press the green "Code" button on this page and choose "Download ZIP" to download the project.
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
5. If you want to change to another agent, you can do so from the dropdown menu. Note that changing the agent will reset the chat history.

## Code Structure

- `index.html`: Main HTML file for the application.
- `apikey.js`: Contains the API key for OpenAI's API.
- `agents.js`: Agent definitions.
- `functions.js`: Main functionality of the application, including sending messages and handling responses.
- `styles.css`: CSS styles for the application.

## About OpenAi Models and Tokens
Each model have a different total tokens available for the inference (request). One token is approximately 4 characters.

As example then `gpt-3.5-turbo` has 4096 tokens available for each request.

When you send a request then the token count consists of the following:

**`system prompt + history + user prompt + response (max_tokens)`**

Those added together must be less than the total tokens available for the model.



### Max Tokens
The max_tokens parameter controls how many tokens should be reserved to contain the response.

### finish_reason
The finish_reason parameter indicates the reason why the response ended.
- `stop`: GOOD - The response contained the stop sequence.
- `length`: BAD - The response reached the max_tokens limit. (use the word "continue" as next prompt to continue the response)

### Temperature
The temperature parameter controls the randomness of the response. Lower values will result in more predictable responses, while higher values will result in more surprising responses. The default value is 0.7.


## Important Note

Do not use this application on a public server as it will expose your API key to the world. This application is intended for 'local' use only.

## Disclaimer

This application is made for learning and is not intended to be a full fledged chat application.