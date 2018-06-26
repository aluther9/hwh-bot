const Raven = require('raven');

module.exports = {
  description: 'Suggest role in #suggest-role',
  execute(message) {
    const {
      cleanContent: content,
      guild,
      member,
      client
    } = message;

    const suggestion = content.slice(1); // get first part of string (command)

    const validRole = guild.roles
      .map(role => {
        const {
          name
        } = role;

        if (suggestion.toLowerCase() === name.toLowerCase()) {
          member.guild.channels.get('425573787950514177')
            .send(`Role already exists.  You can add it in ${client.channels.get('275071813992710144').toString()}.`)
            .catch(err => Raven.captureException(err));
          return true;
        }
        return false;
      });

    if (!validRole.includes(true)) { // If the role exists
      message.reply(`suggested role ${suggestion} received.`);
      guild.channels.get('411828103321485313')
        .send(suggestion)
        .then((msg) => {
          msg.react('😁');
          msg.react('❌');
        })
        .catch(err => Raven.captureException(err));
    }

    message
      .delete()
      .catch(err => Raven.captureException(err));
  }
};
