const { Command, CommandoMessage } = require("discord.js-commando");
const {StreamDispatcher } = require('discord.js')

module.exports = class PauseCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'pause',
            group: 'music',
            memberName: 'pause',
            description: 'Met en pause la musique actuel.',
        });
    } 
    
    /**
     * 
     * @param {CommandoMessage} message 
     * @param {string} quary 
     */
    async run(message) {
        /**
         * @type StreamDispatcher
         */
        const serveur = message.client.serveur;
        if (!message.member.voice.channel) {
            return message.say(':x: tu dois etre dans un salon vocal pour pouvoir utiliser cette command');
        }

        if (!message.client.voice.connections.first()){
            return message.say(':x: je ne suis pas connecte a un salon vocal `!join` pour m`ajouter')
        }

        if (serveur.dispatcher) {
            serveur.dispatcher.pause();
        }

        return message.say(":pause_button: Pause :thumbsup:")
     }
}