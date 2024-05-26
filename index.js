const { Client } = require('discord.js-selfbot-v13');
const client = new Client();

let enabled = true;

client.on('ready', async () => {
  console.log(`${client.user.username} is ready!`);
})

client.on("channelCreate", async function(channel){
  if (!enabled) return;

  if (channel.parentId === '1185991672740466729') {
    setTimeout(async() => {
      claimTicket(channel);
    }, 250);
  }
})

client.on("messageCreate", function(message){
  if (message.author.id !== '811580599068262421') {
    return;
  }

  if (message.content === ":?toggle") {
    enabled = !enabled;
    console.log(`Set to ${enabled}`);
  }
});

claimTicket = async(channel) => {
  const messages = await channel.messages.fetch({ after: '0', limit: 1 });
  const firstMessage = messages.first();

  try {
    firstMessage.clickButton({
      X: 2, Y: 0,
    })

    setTimeout(() => {
      channel.send("Hello. How can I help?");
    }, 5000);

    console.log(`Claimed Ticket ${channel.id}`)
  } catch (error) {
    console.error(error);
  }
}

client.login('TOKEN');
