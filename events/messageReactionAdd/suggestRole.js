const Raven = require('raven');

module.exports = {
  description: 'Suggest role approval in #role-request',
  execute(reaction, user) {
    const {
      cleanContent: content,
      message,
      emoji
    } = reaction;

    if (emoji.name === '😁' && message.client.user.id !== user.id) {
      message.guild
        .createRole({
          name: content,
          color: 9807270,
          mentionable: true
        });
      message
        .delete()
        .catch(err => Raven.captureException(err));
      message.guild.channels
        .get('411828103321485313')
        .send(`Added ${content} role.`)
        .catch(err => Raven.captureException(err));
      message.guild.channels
        .get('425573787950514177')
        .send(`Suggested role ${content} was approved.`)
        .catch(err => Raven.captureException(err));
    } else if (emoji.name === '❌' && message.client.user.id !== user.id) {
      message
        .delete()
        .catch(err => Raven.captureException(err));
      message.guild.channels
        .get('411828103321485313')
        .send(`Rejected '${content}' role.`)
        .catch(err => Raven.captureException(err));
      message.guild.channels
        .get('425573787950514177')
        .send(`Suggested role ${content} was not approved.`)
        .catch(err => Raven.captureException(err));
    }
  }
};