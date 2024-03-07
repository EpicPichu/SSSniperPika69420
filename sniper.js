const { exec } = require('child_process');
const path = require('path');
require('dotenv').config();


const { Client, Message, MessageAttachment } = require('discord.js-selfbot-v13');
const client = new Client();

client.on('ready', async () => {
  console.log(`@${client.user.username} is ready to snipe chatevents!`);
})

/////////////////////// functions ////////////////////

function mathfc(str) {
  const p1 = str.substring(4, str.length - 2)
  let result;

  try {
    result = eval(p1);
  } catch (error) {
    console.error('Error:', error);
    result = error;
  }

  return result;
}


function retypefc(str) {
  const p1 = str.substring(4, str.length - 2)
  return p1.replace(/\s(?=\w)|(?<=\w)\s/g, '').replace(/ {2,}/g, ' ');
}


function triviafc(str) {

  const p1 = str.replace(/"/g, "'");
  const out = "answer this with only the correct answer number like 1 or 2: \n" + p1;
  let result;

  exec(`python -m pytgpt generate "${out}"`, (error, stderr, sdout) => {
    if (sdout) {
      result = sdout;
      return;
    }
    if (error) {
      console.log(`Error executing Python script: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`Python script error output:\n${stderr}`);
      return;
    }
  });
  return result;
}

////////////////////// constants ////////////////////////////


const token = process.env['token']
const prefix = 'ep ';
const EpicPichu = '598085365815050241';
const pikachat = '234731357903781888';
const pikabot = '601177246627135507';
const types = ['Math event', 'Retype event', 'Trivia event', 'Unscramble event'];
const mathl1 = 'seconds to solve the given riddle:';
const retypel1 = "seconds to retype the following sentence:";
const trivial1 = "seconds to answer the following question:";
const nump = /\d+/;
const ppath = path.resolve("C:/Users/EpicPichu/Desktop/SSSniperPika69420/notification.py");





//////////////////////////// chat event sniper //////////////////////////////////////

client.on('messageCreate', (message) => {
  if (message.embeds.length > 0) {
    message.embeds.forEach(embed => {

      if (types.includes(embed.title)) {
        console.log('Chat Event!!!', embed.title), '\n';
        exec(`python "${ppath}"`, (stderr) => {
          if (stderr) {
            console.log(`Python script error output:\n${stderr}`);
            return;
          }
        });
        
        const lines = embed.description.split('\n');


        //                        Math Sniper                        //

        if (embed.title === types[0], (lines[0].includes(mathl1))) {
          const result = mathfc(lines[1]);
          if (typeof result !== 'number' || isNaN(result)) {
            return;
          }
          if (typeof result == 'number') {
            console.log(lines[1] + ' = ' + result);
            setTimeout(() => { message.channel.send((result + '')); }, 3420);
          }
        }

        //                       Retype Sniper                           //

        if (embed.title === types[1], lines[0].includes(retypel1)) {
          const result = retypefc(lines[1]);
          const matches = lines[0].match(nump);
          setTimeout(() => { message.channel.send((result + '')); }, ((matches*1000)/6.5));
          console.log(lines[1] + ' = ' + result);
        }


        //                      Trivia Sniper                           //

        if (embed.title === types[2], lines[0].includes(trivial1)) {
          const result = triviafc(lines[1]);


        }
      }
    });
  }
});
















////////////////////////// stats command ///////////////////////////////////

client.on('messageCreate', (message) => {
  // Check if the message starts with the prefix and is not sent by a bot
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  // Extract the command and arguments from the message content
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  // Check if the command is 'bw'
  if (command === 'bw', message.author.id === EpicPichu) {
    message.delete();
    console.log('loading...')
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
      if (stdout.trim() === 'error') {
        message.channel.send('Invalid Player!');
        console.log('Fail.')
        return;
      }
      const attachment = new MessageAttachment(outputpath);
      message.channel.send({ content: ' ', files: [attachment] });
      console.log('Done.')
    });
  }
});










client.login(token);




//  ily_pichu >w< //s