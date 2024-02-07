const { spawn } = require('child_process');

function runPythonScript(scriptPath, args) {
    return new Promise((resolve, reject) => {
        const pythonProcess = spawn('python', [scriptPath, ...args]);
        pythonProcess.stdout.on('data', (data) => {
        });
        pythonProcess.stderr.on('data', (data) => {
            console.error(`Error executing Python script:\n${data}`);
            reject(data.toString());
        });
        pythonProcess.on('close', (code) => {
            if (code === 0) {
                resolve();
            } else {
            }
        });
    });
}

require('dotenv').config();
const token = process.env['token']

const { Client, Message } = require('discord.js-selfbot-v13');
const client = new Client();

client.on('ready', async () => {
  console.log(`@${client.user.username} is ready to snipe chatevents!`);
})

client.on('messageCreate', (message) => {
  // Check if the message contains any embeds
  if (message.embeds.length > 0) {
      // Loop through each embed in the message
      message.embeds.forEach(embed => {
          // Access properties of the embed
          const names = ['Unscramble event', 'Math event', 'Trivia event', 'Retype event']
          if (names.includes(embed.title)) {
              console.log('Chat Event!!!', embed.title);
              scriptPath = 'notification.py'
              args = ['Chat Event Spawned!', embed.title]
              runPythonScript(scriptPath, args);

          }
      });
  }
});

client.login(token);




//  ily_pichu >w< //