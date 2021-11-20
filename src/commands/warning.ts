require('dotenv-extended').load();
import Discord, { MessageEmbed } from 'discord.js';
const { SlashCommandBuilder } = require('@discordjs/builders');

export default class Report {
	data: any 
    
  constructor() {
    this.data = new SlashCommandBuilder()
      .setName('warning')
      .setDescription('Warning')
      // .addStringOption(
      //     option =>
      //       option.setName('reason')
      //         .setDescription('Reason for warning')
      //         .setRequired(true)
      // )
      .addUserOption(option => option.setName('user').setDescription('The user to be warned').setRequired(true))
      .addStringOption(option => option.setName('reason').setDescription('The reason for the user to be warned').setRequired(true))
  }

  async execute(interaction) {
    const { guild, client, options } = interaction;

    const warning = new MessageEmbed()
      .setTitle('Warning')
      .setColor(16645888)
      .setDescription(`${options.getUser('user')} was warned by a staff member.`)
      .addFields({
        name: 'Reason',
        value: options.getString('reason')
      })
      .setImage(client.user.avatarURL)
      .setFooter('To clarify or contest this warning, contact us via ModMail.')
      .setTimestamp()

    interaction.reply({
      embeds: [warning]
    })
  }
}