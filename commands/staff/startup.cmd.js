import { Message } from "discord.js";

/**@type {import("../bot.js").Command} */
export const data = {
  name: "startup",
  type: 1, // u got 3 types, 1 is reg cmd, 2 is msg app, 3 is user app
  description: "Start a session",
  options: [
    {
      type: 4, // INT Type
      name: "reactions",
      description: "Amount of reactions",
      required: true,
      autocomplete: false,
      max_value: 25,
      min_value: 5,
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
  await interaction.deferReply({})
  const reactions = interaction.options.getInteger("reactions");
  const user = interaction.member;
  if(!interaction.member.roles.cache.has(client.settings.staff_role)) return await interaction.editReply({ content: "You do not have permission to use this command. If you are a staff member this means you do not have the ``Staff Team`` role", ephemeral: true });


  /**@type {import("discord.js").APIEmbed[]} */
  const response = [
    {
      title: "Session Startup",
      description: `<@${interaction.member.id}> is hosting a session! Before joining please read all information and rules in <#1128821529522753547>\n\n${reactions}+ reactions requried to start`,
      color: client.settings.color,
    },
  ];

  const log = [
    {
      title: `Attempted Session Startup`,
      description: `${interaction.user} has attempted a session startup`,
      color: 0x00ffff,
    },
  ];


  let sending = await interaction.channel.send({
    content: "@everyone",
    embeds: response,
    allowedMentions: { parse: ["users", "roles", "everyone"] },
  });
  await sending.react('👍');
  await interaction.deleteReply(); 
  
}
