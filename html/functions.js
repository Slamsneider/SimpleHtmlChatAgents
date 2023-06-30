$(document).ready(function () {
    const API_ENDPOINT = 'https://api.openai.com/v1/chat/completions';
    const temperature = 0.8;// Lower values = predictable responses, Higher values = surprising responses (hallucinations)
    const max_tokens = 400;// Reserve this many tokens to the response
    const AddData = "(temp=" + temperature + " | max_tokens=" + max_tokens + ")"

    let conversationHistory = [];

    populateAgentDropdown();
    // initialize the TokenUse display
    $('#TokenUse').text(AddData);
    // setup the event handlers
    $('#send-btn').click(sendMessage);
    $('#user-input').keypress(function (e) {
        if (e.which === 13) {// Enter key
            sendMessage();
        }
    });
    $('#agent-dropdown').change(function () {
        showAgentInfo()
        conversationHistory = [];// Clear the conversation history
        $('#chat-log').empty();// Clear the chat log
        $('#TokenUse').text(AddData);// reset the TokenUse display
    });
    // ASSORTED FUNCTIONS
    function populateAgentDropdown() {
        let dropdown = $('#agent-dropdown');
        dropdown.empty();
        $.each(agents.agents, function (key, agent) {
            dropdown.append('<option value="' + key + '">' + agent.title + '</option>');
        });
        showAgentInfo()
    }

    function getSelectedAgent() {
        let selectedAgentKey = $('#agent-dropdown').val();
        return agents.agents[selectedAgentKey];
    }

    function sendMessage() {
        const userInput = $('#user-input').val();
        if (userInput.trim() === '') {
            return;
        }

        $('#chat-log').append('<p><strong>You:</strong> ' + userInput + '</p>');
        $('#user-input').val('');

        // Add the user's message to the conversation history
        conversationHistory.push({ role: 'user', content: userInput });

        let sysprom = getSelectedAgent().systemprompt;

        let selectedModel = $('#model-dropdown').val();

        $.ajax({
            url: API_ENDPOINT,
            type: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + APIKEY
            },
            data: JSON.stringify({
                model: selectedModel,
                // Prepend the conversation history to the messages
                messages: [{ role: 'system', content: sysprom }].concat(conversationHistory),
                temperature: temperature, // Set the temperature parameter
                max_tokens: max_tokens // Reserve this many tokens to the response
            }),
            success: function (response) {
                //Log the full response to the console
                console.log("response", response);

                const answer = response.choices[0].message.content;
                const finish_reason = response.choices[0].finish_reason;
                $('#chat-log').append('<p><strong>' + getSelectedAgent().title + ':</strong> ' + answer + '</p>');

                // Add the assistant's message to the conversation history
                conversationHistory.push({ role: 'assistant', content: answer });

                // Update the token count display
                const total_tokens = response.usage.total_tokens;
                $('#TokenUse').text('Used ' + total_tokens + ' tokens. finish_reason=' + finish_reason + ' ' + AddData);
            },
            error: function (xhr) {
                console.error(xhr.responseText);
            }
        });
    }

    function showAgentInfo() {
        let selectedAgent = getSelectedAgent();
        $('#agent-info').html(selectedAgent.info);
    }
});