const Discord = require("discord.js");

/**
 * Discord Embed helper function class
 */
export class EmbedHelper {
  static defaultColor = process.env.DEFAULT_EMBED_COLOR ? process.env.DEFAULT_EMBED_COLOR : "#ffffff";

  /**
   * Gets a color for generating embeds
   * @param guild - Discord message object
   */
  static getColorWithFallback(guild, defaultColor = this.defaultColor) {
    // If guild doesn't exist, just return any value
    if (!guild) {
      return defaultColor;
    }

    const client = guild.client;
    let botColor = "";

    if (client.user) {
      if (guild?.available && process.env.USE_DEFAULT_EMBED_COLOR_ALWAYS?.toLocaleLowerCase() != "true") {
        // Grabs the primary role's color the bot has
        const member = guild.members.cache.get(client.user.id);
        if (member) {
          botColor = member.displayHexColor;
        } else {
          console.warn(`Unable to find member of self on guild?`);
        }
      }

      // If the guild isn't availiable (or in DMs), we fallback to a preset color
      if (botColor == "#000000" || botColor == "") {
        botColor = defaultColor;
      }
    }

    return botColor;
  }

  /**
   * Applies a Discord embed template that should
   * (hopefully) be a consistent design language.
   *
   * @param msg Message object or Discord message
   * @param footer Discord footer
   * @param baseEmbed Base Discord embed to apply the template to
   *
   * @returns Discord embed
   */
  static getTemplate(msg, footer, baseEmbed) {
    const newEmbed = new Discord.MessageEmbed(baseEmbed)
      .setFooter(footer?.text, footer?.iconURL)
      .setColor(EmbedHelper.getColorWithFallback(msg.guild));

    return newEmbed;
  }

  /**
   * Applies a Discord embed template that should
   * (hopefully) be a consistent design language.
   *
   * Use EmbedHelper.getTemplate() if you have access to those parameters,
   * as that would be more simpler.
   *
   * @param color Discord color resolvable
   * @param footer Discord Footer data
   * @param baseEmbed Base Discord embed to apply the template to
   *
   * @returns Discord embed
   */
  static getTemplateRaw(color, footer, baseEmbed) {
    return new Discord.MessageEmbed(baseEmbed)
      .setFooter(footer?.text, footer?.iconURL)
      .setColor(EmbedHelper.getColorWithFallback(null, color));
  }
}
