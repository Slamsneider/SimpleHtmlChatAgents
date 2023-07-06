class ChatApp {
    constructor(temperature, max_tokens) {
        this.temperature = temperature;
        this.max_tokens = max_tokens;
        this.strShowSettings = `(temp=${this.temperature} | max_tokens=${this.max_tokens})`;
        this.conversationHistory = [];
    }

    populateAgentDropdown() {
        let dropdown = $('#agent-dropdown');
        dropdown.empty();//remove all child nodes
        $.each(agents, (key, agent) => {
            dropdown.append(`<option value="${key}">${agent.title}</option>`);
        });
        $('#agent-info').html(this.getSelectedAgent().info);//show default agent info
    }

    getSelectedAgent() {
        let selectedAgentKey = $('#agent-dropdown').val();
        return agents[selectedAgentKey];
    }

    sendMessage() {
        const userInput = $('#user-input').val();
        if (userInput.trim() === '') {//we don't want to send empty messages
            return;
        }
        const selectedModel = $('#model-dropdown').val();
        const sysprom = this.getSelectedAgent().systemprompt;

        //add user message to chat log
        $('#chat-log').val($('#chat-log').val() + `You: ${userInput}\n\n`);
        $('#user-input').val('');//clear user input field

        //add user message to conversation history
        this.conversationHistory.push({ role: 'user', content: userInput });

        //system prompt + conversation history
        const FullPrompt = [{ role: 'system', content: sysprom }].concat(this.conversationHistory);

        //Inference call
        this.callOpenai(selectedModel, FullPrompt, this.temperature, this.max_tokens);
    }

    callOpenai(model, messages, temperature, max_tokens) {
        $.ajax({
            url: 'https://api.openai.com/v1/chat/completions',
            type: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${APIKEY}`
            },
            data: JSON.stringify({
                model: model,
                messages: messages,
                temperature: temperature,
                max_tokens: max_tokens
            }),
            success: (response) => {
                console.log("response", response);//dump full response object to console
                this.doResponse(response);
            },
            error: function (xhr) {
                console.error(xhr.responseText);
            }
        });
    }

    doResponse(response) {
        const answer = response.choices[0].message.content;
        const finish_reason = response.choices[0].finish_reason;
        const total_tokens = response.usage.total_tokens;

        //add answer to chat log
        $('#chat-log').val($('#chat-log').val() + `${this.getSelectedAgent().title}: ${answer}\n\n`);

        //add answer to conversation history
        this.conversationHistory.push({ role: 'assistant', content: answer });

        //update TokenUse
        $('#TokenUse').text(`Used ${total_tokens} tokens. finish_reason=${finish_reason} ${this.strShowSettings}`);
    }
}

$(document).ready(function () {
    const myTemperature = 0.8;// Lower values = predictable responses, Higher values = surprising responses (hallucinations)
    const myMax_tokens = 400;// Reserve this many tokens to the response
    const chatApp = new ChatApp(myTemperature, myMax_tokens);

    chatApp.populateAgentDropdown();

    $('#TokenUse').text(chatApp.strShowSettings);
    
    //setup event handlers
    $('#send-btn').click(() => chatApp.sendMessage());
    $('#user-input').keypress(function (e) {
        if (e.which === 13) {//enter key
            chatApp.sendMessage();
        }
    });
    $('#agent-dropdown').change(function () {
        $('#agent-info').html(chatApp.getSelectedAgent().info);
        
        //clear chat log and conversation history
        chatApp.conversationHistory = [];
        $('#chat-log').val('');

        $('#TokenUse').text(chatApp.strShowSettings);
    });
});