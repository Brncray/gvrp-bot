/**@type {import("../bot.js").Command} */
export const data = {
  name: "reinvites",
  description: "Do Reinvites",
  options: [
    {
      name: "peacetime",
      description: "The time for peacetime",
      required: true,
      type: 3,
      choices: [
        {
          name: "Normal",
          value: "normal",
        },
        {
          name: "Strict",
          value: "strict",
        },
      ],
    },
    {
      name: "link",
      description: "Link to the session",
      required: true,
      type: 3,
    },
  ],
  type: 1, // u got 3 types, 1 is reg cmd, 2 is msg app, 3 is user app
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
  if(!interaction.member.roles.cache.has(client.settings.staff_role)) return await interaction.editReply({ content: "You do not have permission to use this command. If you are a staff member this means you do not have the ``Staff Team`` role", ephemeral: true });
  if (interaction.options.get("peacetime").value.toLowerCase() == "normal") {
    var pt = "Normal";
    var frp = 80;
  } else if (
    interaction.options.get("peacetime").value.toLowerCase() == "strict"
  ) {
    var pt = "Strict";
    var frp = 60;
  }
  const link = interaction.options.getString("link", true);

  /**@type {import("discord.js").APIEmbed[]} */
  const resp_embed = [
    {
      title: "Session Re-Invites",
      description: `Please be sure to follow all rules in this session, failure to do so will result in a mark.\n\nPeacetime: ${pt}\nFRP Speeds: ${frp}\n\n\nSession link: ${link}`,
      color: client.settings.color,
    },
  ];

  const msg = await interaction.channel?.send({
    content: "@here",
    embeds: resp_embed,
    allowedMentions: { parse: ["users", "roles", "everyone"] },
  });

  await interaction.deleteReply();
}
