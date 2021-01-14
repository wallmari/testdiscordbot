const ownerId = process.env.OWNER_ID;

module.exports = {
  name: 'repeat',
  description: 'Repeats n times the message. !repeat times message...',
  execute(message, args) {
    console.log("Executing repeat")
    if (message.author.id === ownerId) {
      const times = args[0];
      const repeatable = args.slice(1).join(' ');

      for (let index = 0; index < times; index += 1) {
        message.channel.send(repeatable);
      }
    }
  },
};
