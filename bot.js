/*How to use :
Prefix : "view "
Commands :
"edits " + message ID,
"messages " + number of messages
*/

const Discord = require("discord.js");
const client = new Discord.Client();
var on = true;
var listMessages = new Map;

client.login(TOKEN);

client.on("ready", function()
{
  var options = {type: 3}
  client.user.setActivity("you clopping",options);
  console.log("Logged in");
});

client.on('message', function(message)
{
  var files = message.attachments;
  var text = message.content + "\n";
  for(var[key,file] of files)
  {
    text = text + file.url + "\n";
  }
  listMessages.set(listMessages.size, "<" + message.author.username + ">" + text);

  if(message.author.id == client.user.id)
  {
    const args = message.content.trim().split(/ +/g);
    const command = args.shift().toUpperCase();
    switch (command)
    {
      case "VIEW":
        if(args[0])
        {
          if(args[0].toUpperCase() == "EDITS" && args[1])
          {
            var messages = message.channel.messages;
            for(var[key,msg] of messages)
            {
              if(msg.id == args[1])
              {
                var edits = msg.edits;
                edits = edits.reverse();
                message.channel.send("Edits for the message ID " + args[1]);
                edits.forEach(function(element)
                {
                  message.channel.send(element.content)
                });
              }
            }
          }
          if(args[0].toUpperCase() == "MESSAGES" && args[1])
          {
            if(listMessages.size < args[1])
            {
              message.reply("Can't show more message than was scrapped (" + listMessages.size + ")");
              return;
            }
            for(var i = listMessages.size - args[1]; i < listMessages.size; i++)
            {
              message.channel.send(listMessages.get(i));
            }
          }
        }
        break;

      default:

    }
  }
});
