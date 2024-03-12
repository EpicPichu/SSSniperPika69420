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

function triviafc(str){
  const str1 = str.replace(/['"]/g, '');
  return str1.substring(4, str1.length - 2)
}

function unscfc(str) {
  const p1 = str.substring(4, str.length - 2)
  return p1.replace(/\s/g, '');
}


////////////////////// constants ////////////////////////////


const token = process.env['token']
const prefix = 'ep ';
const EpicPichu = '598085365815050241';
const pikachat = '234731357903781888';
const pikabot = '601177246627135507';
const types = ['Math event', 'Retype event', 'Trivia event', 'Unscramble event'];
const mathl0 = 'seconds to solve the given riddle:';
const retypel0 = "seconds to retype the following sentence:";
const trivial0 = "seconds to answer the following question:";
const unscl0 = "seconds to unscramble the given set of letters:";
const nump = /\d+/;




//////////////////////////// msg logger //////////////////////////////////////

client.on('messageCreate', (message) => {
  if (message.channelId === pikachat && message.author.id === pikabot) {
    console.log(message.author.username+': '+message.content);
    if (message.embeds.length>0) {
      message.embeds.forEach(embed => {

        console.log('Embed Title:', embed.title);
        console.log('Embed Description:', embed.description);
        console.log('Embed Author:', embed.author?.name);
        console.log('Embed Fields:');
        embed.fields.forEach(field => {
          console.log(`- ${field.name}: ${field.value}`);
        });
        console.log('\n\n');
      })
    }
  }
});

//////////////////////////// chat event sniper //////////////////////////////////////

client.on('messageCreate', (message) => {
  if (message.embeds.length > 0) {
    message.embeds.forEach(embed => {

      if (types.includes(embed.title)) {
        console.log('Chat Event!!!', embed.title), '\n';
        const chev = 'Chat_Event_Spawned!!!'
        const che2 = embed.title.replace(/\s+/g, '_');
        exec(`python notification.py ${chev} ${che2}`, (stderr) => {
          if (stderr) {
            console.log(`Python script error output:\n${stderr}`);
          }
        });
        
        const lines = embed.description.split('\n');


        //                        Math Sniper                        //

        if (embed.title === types[0] && (lines[0].includes(mathl0))) {
          const result = mathfc(lines[1]);
          if (typeof result !== 'number' || isNaN(result)) {
            return;
          }
          if (typeof result == 'number') {
            console.log(lines[1] + ' = ' + result);
            setTimeout(() => { message.channel.send((result + '')); }, 3000);
          }
        }

        //                       Retype Sniper                           //

        if (embed.title === types[1] && lines[0].includes(retypel0)) {
          const result = retypefc(lines[1]);
          const matches = lines[0].match(nump);
          setTimeout(() => { message.channel.send((result + '')); }, ((matches*1000)/8));
          console.log(lines[1] + ' = ' + result);
        }


        //                      Trivia Sniper                           //

        if (embed.title === types[2] && lines[0].includes(trivial0)) {
          console.log(embed.description);
          import('open').then(open => {
            open.default('https://www.google.com/search?q='+triviafc(lines[1]));
          });
        }
        
        //                      Unscramble Sniper                           //

        if (embed.title === types[3] && lines[0].includes(unscl0)) {
          console.log(embed.description);
          import('open').then(open => {
            open.default('https://www.unscramble.me/'+unscfc(lines[1]));
          });
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