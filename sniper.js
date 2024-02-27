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

////////////////////// constants ////////////////////////////

const prefix = 'ep-';
const EpicPichu = '598085365815050241';
const types = ['Math event', 'Retype event', 'Unscramble event', 'Trivia event'];
const mathl1 = 'You have **100** seconds to solve the given riddle:';
const retypel1 = "seconds to retype the following sentence:";
const nump = /\d+/;


//////////////////////////// chat event sniper //////////////////////////////////////

client.on('messageCreate', (message) => {
  if (message.embeds.length > 0) {
    message.embeds.forEach(embed => {

      if (types.includes(embed.title)) {
        console.log('Chat Event!!!', embed.title), '\n';
        const lines = embed.description.split('\n');

        //                        Math Sniper                        //

        if (embed.title === types[0], lines[0] === mathl1) {
          const result = mathfc(lines[1]);
          if (typeof result !== 'number' || isNaN(result)) {
            console.log('fail.');
            return;
          }
          if (typeof result == 'number') {
            console.log(lines[1] + ' = ' + result);
            setTimeout(() => { message.channel.send((result + '')); }, 2420);
          }

          //                       Retype Sniper                           //

        }
        if (embed.title === types[1]) {
          if (lines[0].includes(retypel1)) {
            const matches = lines[0].match(nump);
            if (matches) {
              const time = parseInt(matches[0], 10);
              const result = retypefc(lines[1]);
              console.log(lines[1] + ' = ' + result);
              setTimeout(() => { message.channel.send((result + '')); }, ((time/15)*1000));
            } 
            else {
              console.log("fail.");
            }

          }


        }
      }
    });
  }
});





client.login(token);




//  ily_pichu >w< //