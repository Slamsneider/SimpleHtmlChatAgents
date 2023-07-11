# SimpleHtmlChatAgents
This is a simple HTML/javascript based chat application that uses OpenAI's GPT models to generate responses without the need for a server or backend.

The application allows you to choose from different agents, each with their own unique personality and style of communication.

You will need your personal OpenAi API-KEY. Get it here: https://platform.openai.com/account/api-keys

The project is created to provide you with a simple interface running a GPT chat model without the need for any server or special backend. This so you easily can expand on the project. If you know a little HTML/Javascript this project is a made for you to learn how to use OpenAI's API.

This is NOT a full fledged chat application but you can make it one if you want to.

Aimed for local use and learning as you would publish your API key to the world if you use it on a public server.

1. [Features](#features)
2. [Installation](#installation)
3. [How to Use](#how-to-use)
4. [Code Structure](#code-structure)
5. [About OpenAi Models and Tokens](#About-OpenAi-Models-and-Tokens)
6. [Important Note](#%EF%B8%8Fimportant-note)
7. [Disclaimer](#disclaimer)

## Features
- Option to select different GPT models.
- Multiple agents to choose from, each with a unique personality.
- Displays the token count used for each response.
- Conversation history is maintained for the duration of the session.

![image](https://github.com/Slamsneider/SimpleHtmlChatAgents/assets/192285/e667f284-d9ab-4087-be6b-9efb584e506c)

## Installation
1. Press the green "Code" button on the project page and choose "Download ZIP" to download the project. (or [download here](https://github.com/Slamsneider/SimpleHtmlChatAgents/archive/refs/heads/main.zip))
2. Once downloaded, unzip the `html` folder to your desired location.
3. **RENAME** `apikey.js.install` to `apikey.js` and open the file in a text editor.
4. Replace `YOUR_API_KEY_HERE` with your OpenAI API key.
5. Save the changes made in the `apikey.js` file.
6. Now, open the `index.html` file in your browser to start using the application.

## How to Use

1. Select a model from the dropdown menu.
2. Select an agent from the dropdown menu.
3. Type your message in the input field and click the "Send" button or press Enter to send it.
4. The agent's response will appear in the chat log.
5. Add your own agents by editing the `agents.js` file.

## Code Structure

- `index.html`: Main HTML file for the application.
- `apikey.js`: Contains the API key for OpenAI's API.
- `agents.js`: Agent definitions.
- `functions.js`: Main functionality of the application, including sending messages and handling responses.
- `styles.css`: CSS styles for the application.

## About OpenAi Models and Tokens
Each model have a different total tokens available for the inference (request). One token is approximately 4 characters.

As example then `gpt-3.5-turbo` has 4096 tokens available for each request.

When sending a request, the token count consists of the following components:

- System prompt
- Conversation history
- User prompt
- `max_tokens` parameter value

The sum of these components must be less than the total tokens available for the model, or else an error will occur.
### max_tokens (parameter)
The `max_tokens` parameter determines how many tokens should be reserved for the response.

### finish_reason (output)
The `finish_reason` indicates the reason why the response ended. It can be either "stop" or "length". "stop" means that the response had a 'normal' run, while "length" indicates that the response reached the `max_tokens` limit and is incomplete. If so, then to continue the response, you can use the word "continue" as the next prompt.

### temperature (parameter)
The temperature parameter controls the randomness of the response. Lower values will result in more predictable responses, while higher values will result in more surprising responses (hallucinations).


## ⚠️Important Note 

Do not use this application on a public server as it will expose your API key to the world. This application is intended for 'local' use only.

## Disclaimer

This application is made for learning and is not a full fledged chat application.
