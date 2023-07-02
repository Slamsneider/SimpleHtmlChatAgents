
const API_ENDPOINT = 'https://api.openai.com/v1/chat/completions';
const temperature = 0.8;// Lower values = predictable responses, Higher values = surprising responses (hallucinations)
const max_tokens = 400;// Reserve this many tokens to the response
const AddData = "(temp=" + temperature + " | max_tokens=" + max_tokens + ")"
let conversationHistory = [];
let selectedModel = "";
let sysprom = "";

$(document).ready(function () {

    populateAgentDropdown();

    $('#TokenUse').text(AddData);// initialize the TokenUse display

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
});
// ASSORTED FUNCTIONS
function sendMessage() {
    const userInput = $('#user-input').val();
    if (userInput.trim() === '') {// Don't send empty messages
        return;
    }

    $('#chat-log').append('<p><strong>You:</strong> ' + userInput + '</p>');// Add the user's message to the chat log
    $('#user-input').val('');// Clear the user input field

    conversationHistory.push({ role: 'user', content: userInput });// Add the user's message to the conversation history

    sysprom = getSelectedAgent().systemprompt;

    selectedModel = $('#model-dropdown').val();
    callOpenai();
}
function callOpenai() {
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
            console.log("response", response);//Log the full response to the console
            doResponse(response);
        },
        error: function (xhr) {
            console.error(xhr.responseText);
        }
    });
}
function doResponse(response) {
    const answer = response.choices[0].message.content;// 0 (first) because we could have ordered multiple responses in same go
    const finish_reason = response.choices[0].finish_reason;
    // Add the agents answer to the chat log
    $('#chat-log').append('<p><strong>' + getSelectedAgent().title + ':</strong> ' + answer + '</p>');

    // Add the assistant's answer to the conversation history
    conversationHistory.push({ role: 'assistant', content: answer });

    // Update the TokenUse display
    const total_tokens = response.usage.total_tokens;
    $('#TokenUse').text('Used ' + total_tokens + ' tokens. finish_reason=' + finish_reason + ' ' + AddData);

}
function populateAgentDropdown() {
    let dropdown = $('#agent-dropdown');
    dropdown.empty();// Clear the dropdown
    $.each(agents.agents, function (key, agent) {
        dropdown.append('<option value="' + key + '">' + agent.title + '</option>');
    });
    showAgentInfo();// Show the info for the first agent
}

function getSelectedAgent() {
    let selectedAgentKey = $('#agent-dropdown').val();
    return agents.agents[selectedAgentKey];
}

function showAgentInfo() {
    let selectedAgent = getSelectedAgent();
    $('#agent-info').html(selectedAgent.info);
}
