/**@type {import("../bot.js").Command} */
export const data = {
  name: "invited",
  type: 1, // u got 3 types, 1 is reg cmd, 2 is msg app, 3 is user app
  description: "Finished E/A",
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

  await interaction.channel?.send({
    content: `Early access for <@${interaction.user.id}>\’s session has now been concluded. The links have been issued to all of the members who messaged this host conscious of the limits.`,
  });

  await interaction.deleteReply();
}
