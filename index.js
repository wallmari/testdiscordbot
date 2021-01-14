const fs = require('fs');
const Discord = require('discord.js');

const { prefix } = require('./config.json');

const token = process.env.TOKEN;

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter((file) => file.endsWith('.js'));

commandFiles.forEach((file) => {
        // eslint-disable-next-line import/no-dynamic-require, global-require
        const command = require(`./commands/${file}`);
        console.log("Adding command: " + command.name)
        client.commands.set(command.name, command);
});

client.on('message', (message) => {
        if (!message.content.startsWith(prefix) || message.author.bot) {
            return;
        }

        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const command = args.shift().toLowerCase();

        if (!client.commands.has(command)) {
            console.log("Unsupported command: " + command)
            return
        };

        try {
            client.commands.get(command).execute(message, args);
        } catch (error) {
            message.reply('there was an error trying to execute that command!');
        }
});

client.login(token);
