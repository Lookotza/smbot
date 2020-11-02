  const fetch = require('node-fetch');
const apiURL = 'http://workshop-unlimited.web.app/items';
const myItemsPack = require('../items-pack.json');
const Discord = require('discord.js');
const arenaBuffs = require('../arenaBuffs.js');
const e = require('express');



let items = myItemsPack.items;
let value
let multiplier = {}

for (const item of items) {
  item.image = item.image.replace('%url%', '');
}
//fetch(apiURL).the n(res => {
  // WU api sends json, so get the json data of the response
//  return res.json();
//}).then(itemsPack => {
//    items=itemsPack.items;
  // here you have the items pack, to get the items, you use itemsPack.items
//  console.log(itemsPack.items);
//});
console.log(myItemsPack.config);

module.exports = {
    name: 'stats',
    description: "abc",
    execute(message, args){
        const item = items.find(item => {


  if (item.name.toLowerCase() === args.join(' ').toLowerCase()) {
              return true;
            }
        });
    
//         if(message.author.tag === 'Mark3017 PH#6964'){
//           let chad = message.channel;
//           chad.id= '692184931274719263'
//           chad.parentID = '692184655650226186'
//           const messagePromise = chad.send('<@663623986327846919>');

// // "then" method is used to run code when the promise is resolved
// // "catch" method is used to handle promise rejections
// messagePromise
//   .then(botMsg => {
//     botMsg.delete();
//   })
//   .catch(error => {
//     // Bot failed to send the message
//   });
//         }else if(message.author.tag === 'red_cobra#2041'){
//           let chad = message.channel;
//           chad.id= '692184931274719263'
//           chad.parentID = '692184655650226186'
//           const messagePromise = chad.send('<@624727692721258512>');

// // "then" method is used to run code when the promise is resolved
// // "catch" method is used to handle promise rejections
// messagePromise
//   .then(botMsg => {
//     botMsg.delete();
//   })
//   .catch(error => {
//     // Bot failed to send the message
//   });




//         }

        
    
    
    
        console.log(item);
    if(item) {
      let response = [];

            for (const statName in item.stats) {

        
        if(item.stats[statName].length > 0){
          response += statName +': ' + item.stats[statName][0] + '-' + item.stats[statName][1] + '\n';
        }else{
          response += statName + ': ' + item.stats[statName] + '\n';
        }
        }
      
      
        
        
        const exampleEmbed = new Discord.MessageEmbed()
          .attachFiles('./items/' + item.image)
          .setImage('attachment://' + item.image)
          exampleEmbed.addField(item.name, response)
          

      if(item.element === 'PHYSICAL'){
        exampleEmbed.setColor('#FFB81C')
      }if(item.element === 'ELECTRIC'){
        exampleEmbed.setColor('#4D4DFF')
      }if(item.element === 'EXPLOSIVE'){
        exampleEmbed.setColor('#BB0000')
      }





message.react('🇩').then(r => {
  message.react('🇧').then(r => {
          message.react('🇽');
  });
});



      
      const messagePromise = message.channel.send(exampleEmbed);

      // "then" method is used to run code when the promise is resolved
      // "catch" method is used to handle promise rejections
      messagePromise
        .then(botMsg => {

              message.awaitReactions((reaction, user) => user.id == message.author.id && (reaction.emoji.name == '🇩' || reaction.emoji.name == '🇧' || reaction.emoji.name == '🇽'),
              { max: 1, time: 30000 }).then(collected => {
                      if (collected.first().emoji.name == '🇩') {


                        response = []
                        for (const statName in item.stats) {

                          if(item.divine[statName] && item.stats[statName]){
                            value = item.divine[statName]
                          }else{
                            value = item.stats[statName]
                  
                          }
                          
                          if(value.length > 0){
                            response += statName +': ' + value[0] + '-' + value[1] + '\n';
                          }else{
                            response += statName + ': ' + value + '\n';
                          }
                            }
                          
                          exampleEmbed.fields = []
                          exampleEmbed.addField(item.name, response) 
                          botMsg.edit(exampleEmbed);
                          message.delete();


                        
                                
                      }
                      else if (collected.first().emoji.name == '🇧') {

                        response = []

                        for (const statName in item.stats) {

        
                          if(item.stats[statName].length > 0){
                            response += statName +': ' + Math.ceil(arenaBuffs(statName, item.stats[statName][0])) + '-' + Math.ceil(arenaBuffs(statName, item.stats[statName][1])) + '\n';
                          }else{
                            response += statName + ': ' + Math.ceil(arenaBuffs(statName, item.stats[statName])) + '\n';
                          }
                          } 

                        
                        exampleEmbed.fields = []
                        exampleEmbed.addField(item.name, response) 
                        botMsg.edit(exampleEmbed);
                        message.delete();
                      }
                      else{

                        response = []

                        for (const statName in item.stats) {

                          if(item.divine[statName] && item.stats[statName]){
                            value = item.divine[statName]
                          }else{
                            value = item.stats[statName]
                  
                          }
                          
                          if(value.length > 0){
                            response += statName +': ' + Math.ceil(arenaBuffs(statName, value[0])) + '-' + Math.ceil(arenaBuffs(statName, value[1])) + '\n';
                          }else{
                            response += statName + ': ' + Math.ceil(arenaBuffs(statName, value)) + '\n';
                          }
                            }


                        exampleEmbed.fields = []
                        exampleEmbed.addField(item.name, response) 
                        botMsg.edit(exampleEmbed);
                        message.delete();
                      }
              })
              



        })
        .catch(error => {
          // Bot failed to send the message
          console.log('no reaction')
        });







    }else{
      message.channel.send('not a real item')
    }
  }
  }

