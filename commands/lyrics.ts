import { Message, MessageEmbed } from "discord.js";
import { i18n } from "../utils/i18n";
// @ts-ignore
import lyricsFinder from "lyrics-finder";
import { bot } from "../index";
import { EmbedHelper } from "../utils/EmbedHelper";

export default {
  name: "lyrics",
  aliases: ["ly"],
  description: i18n.__("lyrics.description"),
  async execute(message: Message) {
    const queue = bot.queues.get(message.guild!.id);

    if (!queue) return message.reply(i18n.__("lyrics.errorNotQueue")).catch(console.error);

    let lyrics = null;
    const title = queue.songs[0].title;

    try {
      lyrics = await lyricsFinder(queue.songs[0].title, "");
      if (!lyrics) lyrics = i18n.__mf("lyrics.lyricsNotFound", { title: title });
    } catch (error) {
      lyrics = i18n.__mf("lyrics.lyricsNotFound", { title: title });
    }

    let lyricsEmbed = new MessageEmbed()
      .setTitle(i18n.__mf("lyrics.embedTitle", { title: title }))
      .setDescription(lyrics)
      .setColor(EmbedHelper.getColorWithFallback(message.guild))
      .setTimestamp();

    const descriptionMax = 2048;
    if (lyricsEmbed.description!.length >= descriptionMax)
      lyricsEmbed.description = `${lyricsEmbed.description!.substring(0, descriptionMax - 3)}...`;

    return message.reply({ embeds: [lyricsEmbed] }).catch(console.error);
  }
};
