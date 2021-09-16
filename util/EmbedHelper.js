"use strict";
exports.__esModule = true;
exports.EmbedHelper = void 0;
var Discord = require("discord.js");
/**
 * Discord Embed helper function class
 */
var EmbedHelper = /** @class */ (function () {
    function EmbedHelper() {
    }
    /**
     * Gets a color for generating embeds
     * @param guild - Discord message object
     */
    EmbedHelper.getColorWithFallback = function (guild, defaultColor) {
        var _a;
        if (defaultColor === void 0) { defaultColor = this.defaultColor; }
        // If guild doesn't exist, just return any value
        if (!guild) {
            return defaultColor;
        }
        var client = guild.client;
        var botColor = "";
        if (client.user) {
            if ((guild === null || guild === void 0 ? void 0 : guild.available) && ((_a = process.env.USE_DEFAULT_EMBED_COLOR_ALWAYS) === null || _a === void 0 ? void 0 : _a.toLocaleLowerCase()) != "true") {
                // Grabs the primary role's color the bot has
                var member = guild.members.cache.get(client.user.id);
                if (member) {
                    botColor = member.displayHexColor;
                }
                else {
                    console.warn("Unable to find member of self on guild?");
                }
            }
            // If the guild isn't availiable (or in DMs), we fallback to a preset color
            if (botColor == "#000000" || botColor == "") {
                botColor = defaultColor;
            }
        }
        return botColor;
    };
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
    EmbedHelper.getTemplate = function (msg, footer, baseEmbed) {
        var newEmbed = new Discord.MessageEmbed(baseEmbed)
            .setFooter(footer === null || footer === void 0 ? void 0 : footer.text, footer === null || footer === void 0 ? void 0 : footer.iconURL)
            .setColor(EmbedHelper.getColorWithFallback(msg.guild));
        return newEmbed;
    };
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
    EmbedHelper.getTemplateRaw = function (color, footer, baseEmbed) {
        return new Discord.MessageEmbed(baseEmbed)
            .setFooter(footer === null || footer === void 0 ? void 0 : footer.text, footer === null || footer === void 0 ? void 0 : footer.iconURL)
            .setColor(EmbedHelper.getColorWithFallback(null, color));
    };
    EmbedHelper.defaultColor = process.env.DEFAULT_EMBED_COLOR ? process.env.DEFAULT_EMBED_COLOR : "#ffffff";
    return EmbedHelper;
}());
exports.EmbedHelper = EmbedHelper;
