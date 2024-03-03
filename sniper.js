require('dotenv').config();
const token = process.env['token']

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
  const out = "answer this with only the correct answer number like 1 or 2: \n"+p1;
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


const pikachat = '234731357903781888';
const pikabot = '601177246627135507';
const types = ['Math event', 'Retype event', 'Trivia event', 'Unscramble event'];
const mathl1 = 'seconds to solve the given riddle:';
const retypel1 = "seconds to retype the following sentence:";
const trivial1 = "seconds to answer the following question:";
const nump = /\d+/;
const { exec } = require('child_process');
const path = require('path');
const ppath = path.resolve("C:/Users/EpicPichu/Desktop/SSSniperPika69420/notification.py");


//////////////////////////// chat event sniper //////////////////////////////////////
client.on('messageCreate', (message) => {
  if (message.channelId === pikachat, message.author.id === pikabot) {
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
        console.log('\n\n\n');
      })
    }
  }
});

client.on('messageCreate', (message) => {
  if (message.embeds.length > 0) {
    message.embeds.forEach(embed => {

      if (types.includes(embed.title)) {
        console.log('Chat Event!!!', embed.title), '\n';
        exec(`python "${ppath}"`, (error, stderr) => {
          if (error) {
            console.log(`Error executing Python script: ${error.message}`);
            return;
          }
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
            console.log('fail.');
            return;
          }
          if (typeof result == 'number') {
            console.log(lines[1] + ' = ' + result);
            setTimeout(() => { message.channel.send((result + '')); }, 1000);
          }
        }
          
          //                       Retype Sniper                           //

        if (embed.title === types[1], lines[0].includes(retypel1)) {
          const result = retypefc(lines[1]);
          setTimeout(() => { message.channel.send((result + '')); }, (1500));
          console.log(lines[1] + ' = ' + result);
          const matches = lines[0].match(nump);            
        }


          //                      Trivia Sniper                           //

        if (embed.title === types[2], lines[0].includes(trivial1)) {
          const result = triviafc(lines[1]);

          const matches = lines[0].match(nump);            
        }


        else {
          console.log("fail.");
        }
      }
    });
  }
});





client.login(token);




//  ily_pichu >w< //