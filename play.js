const { VoiceConnection } = require('discord.js');
const { Command, CommandoMessage } = require("discord.js-commando");
const ytdl = require('ytdl-core');

module.exports = class PlayCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'play',
            aliases: ['p'],
            group: 'music',
            memberName: 'play',
            description: 'lit une musique depuit youtube.',
            args: [
                {
                    key: 'query',
                    prompt: 'Quel musique veux-tu ecouter,',
                    type: 'string'
                }                    
            ]
        });
    } 
    
    /**
     * 
     * @param {CommandoMessage} message 
     * @param {string} quary 
     */
    async run(message, { query }) {
        await message.member.voice.channel.join().then((connection) => {
            this.runVideo(message, connection, query);
        });
    }

    /**
     * 
     * @param {CommandoMessage} message 
     * @param {VoiceConnection} connection 
     * @param {*} video 
     */
    async runVideo(message, connection, video) {
        const dispatcher = connection.play( await ytdl(video, { filter: 'audioonly' }));

        message.client.serveur.dispatcher = dispatcher;

        dispatcher.on('finish', () => {
            message.member.voice.channel.leave();
        })
        }
}