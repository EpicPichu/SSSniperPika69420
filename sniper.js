const { spawn } = require('child_process');
const { exec } = require('child_process');
const path = require('path');


///////////////////////// Python run function

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

const { Client, Message, MessageAttachment } = require('discord.js-selfbot-v13');
const client = new Client();

const prefix = 'ep-';
const EpicPichu = '598085365815050241';


client.on('ready', async () => {
  console.log(`@${client.user.username} is ready to snipe chatevents!`);
})


//////////////////////////// chat event sniper //////////////////////////////////////

client.on('messageCreate', (message) => {
  // Check if the message contains any embeds
  if (message.embeds.length > 0) {
      // Loop through each embed in the message
      message.embeds.forEach(embed => {
          // Access properties of the embed
          const names = ['Unscramble event', 'Math event', 'Trivia event', 'Retype event']
          if (names.includes(embed.title)) {
              console.log('Chat Event!!!', embed.title);
              const scriptPath = 'notification.py'
              const args = ['Chat Event Spawned!', embed.title]
              runPythonScript(scriptPath, args);

          }
      });
  }
});

////////////////////////// stats command ///////////////////////////////////

client.on('messageCreate', (message) => {
    // Check if the message starts with the prefix and is not sent by a bot
    if (!message.content.startsWith(prefix) || message.author.bot ) return;

    // Extract the command and arguments from the message content
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    // Check if the command is 'bw'
    if (command === 'bw', message.author.id === EpicPichu) {
        console.log('loading...')
        // Extract the Python script filename and arguments from the message
        const filepath = path.resolve("D:/Works/Epic Stats/image.py");
        const outputpath = path.resolve("D:/Works/Epic Stats/output.png");
        const pythonArgs = args;

        // Execute the Python script with the provided arguments
        exec(`python "${filepath}" ${pythonArgs.join(' ')}`, (error, stdout, stderr) => {
            if (error) {
                console.log(`Error executing Python script: ${error.message}`);
                return;
            }
            if (stderr) {
                console.log(`Python script error output:\n${stderr}`);
                return;
            }
            if (stdout.trim()==='error') {
                message.channel.send('Invalid Player!');
                console.log('Fail.')
                return;
            }
            const attachment = new MessageAttachment(outputpath);
            message.channel.send({ content: ' ', files:[attachment]});
            console.log('Done.')
        });
    }
});










client.login(token);




//  ily_pichu >w< //s