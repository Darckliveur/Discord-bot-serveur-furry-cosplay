const { CommandoClient } = require("discord.js-commando");
const path = require('path');

const Client = new CommandoClient({
    commandPrefix: '!' ,
    owner: '602531556984225846',
    invite: 'https://discord.gg/T32Ufgjr'
});

Client.registry
    .registerDefaultTypes()
    .registerDefaultGroups()
    .registerDefaultCommands()
    .registerGroup('music', 'Music')
    .registerCommandsIn(path.join(__dirname, 'commands'));

Client.serveur = {
    queue: [],
    currentVideo: [title = "", url = ""],
    dispatcher: null
};
    
Client.once('ready', () => {
    console.log(`Connecté en tant que ${Client.user.tag} - (${Client.user.id})`);
})

Client.on('error', (error) => console.error(error));

Client.login(process.env.TOKEN);