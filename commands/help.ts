import { Message, MessageEmbed } from "discord.js";
import { i18n } from "../utils/i18n";
import { bot } from "../index";
import { EmbedHelper } from "../utils/EmbedHelper";

export default {
  name: "help",
  aliases: ["h"],
  description: i18n.__("help.description"),
  execute(message: Message) {
    let commands = bot.commands;

    let helpEmbed = new MessageEmbed()
      .setTitle(i18n.__mf("help.embedTitle", { botname: message.client.user!.username }))
      .setDescription(i18n.__("help.embedDescription"))
      .setColor(EmbedHelper.getColorWithFallback(message.guild));

    commands.forEach((cmd) => {
      helpEmbed.addField(
        `**${bot.prefix}${cmd.name} ${cmd.aliases ? `(${cmd.aliases})` : ""}**`,
        `${cmd.description}`,
        true
      );
    });

    helpEmbed.setTimestamp();

    return message.reply({ embeds: [helpEmbed] }).catch(console.error);
  }
};

// const { MessageEmbed } = require("discord.js");
// const i18n = require("../util/i18n");
// const { EmbedHelper } = require("../util/EmbedHelper");

// module.exports = {
//   name: "help",
//   aliases: ["h"],
//   description: i18n.__("help.description"),
//   execute(message) {
//     let commands = message.client.commands.array();

//     let helpEmbed = new MessageEmbed()
//       .setTitle(i18n.__mf("help.embedTitle", { botname: message.client.user.username }))
//       .setDescription(i18n.__("help.embedDescription"))
//       .setColor(EmbedHelper.getColorWithFallback(message.guild));

//     let field = "\n";
//     commands.forEach((cmd) => {
//       // helpEmbed.addField(
//       //   `**${message.client.prefix}${cmd.name} ${cmd.aliases ? `(${cmd.aliases})` : ""}**`,
//       //   `${cmd.description}`,
//       //   true
//       // );
//       let alias = `${cmd.aliases ? `(${cmd.aliases})` : ""}`;
//       field += `\`${message.client.prefix}${cmd.name}\` ${alias} - ${cmd.description}\n`;
//     });

//     helpEmbed.addField(`🎵 Commands`, `${field}`);
//     // helpEmbed.setTimestamp();

//     return message.channel.send(helpEmbed).catch(console.error);
//   }
// };
