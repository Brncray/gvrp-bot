/**@type {import("../bot.js").Command} */
export const data = {
  name: "early",
  type: 1, // u got 3 types, 1 is reg cmd, 2 is msg app, 3 is user app
  description: "Start Early Access",
  options: [
    {
      name: "link",
      description: "Link to the session",
      required: true,
      type: 3,
    },
  ],
  dm_permission: false, // ensures that the command cannot be used inside of dms
  default_member_permissions: 0, // u can use default member permission to lock cmds to certain permission levels, ex administrator, u can use permissionbitfield to get one if u cant via discord docs
};
/**
 *
 * @param {import("discord.js").ChatInputCommandInteraction<'cached'>} interaction
 * @param {import("../bot.js").Bot} client
 */
export async function execute(interaction, client) {
  await interaction.deferReply({ ephemeral: true });
  /**@type {import("discord.js").APIEmbed[]} */
  const response = [
    {
      title: "Early Access",
      description: `Early access link: ${interaction.options.getString("link")}\n\nDo not share this link with anyone.`,
      color: client.settings.color,
    },
  ];


  await interaction.channel?.send({
    content: "@everyone",
    embeds: response,
    allowedMentions: { parse: ["users", "roles", "everyone"] },
  })
  await interaction.deleteReply();
}
