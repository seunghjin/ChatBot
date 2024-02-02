import openai from './config/open-ai.js';
import readlineSync from 'readline-sync';
import colors from 'colors';

async function main() {
    // const chatCompletion = await openai.chat.completions.create({
    //     model: 'gpt-3.5-turbo',
    //     messages: [
    //         {
    //             role: 'user', 
    //             content: 'What is the population of South Korea?'
    //         }
    //     ]
    // });
    // console.log(chatCompletion.data.choices[0].message.content);
    console.log(colors.bold.blue('Hello! Welcome to the ChatBot.'));
    console.log(colors.bold.blue('What would you like assistance with today?'));

    const chatHistory = [];

    
    while(true) {
        const userInput = readlineSync.question(colors.green('User: '));

        try {
            const messages = chatHistory.map(([role, content]) => ({role, content}))

            messages.push({ role: 'user', content: userInput});

            const completion = await openai.createChatCompletion({
                model: 'gpt-3.5-turbo',
                messages: messages,
            })

            const completionText = completion.data.choices[0].message.content;

            if(userInput.toLowerCase() === 'exit') {
                console.log(colors.blue('Bot: ') + completionText);
                return;
            }

            console.log(colors.blue('Bot: ') + completionText);
            chatHistory.push(['user', userInput]);
            chatHistory.push(['assistant', completionText]);
        
        } catch (error) {
            console.error(colors.red(error));
        }
    }
}

