/**@type {import("../bot.js").Command} */
export const data = {
    name: "startup",
    type: 1, // u got 3 types, 1 is reg cmd, 2 is msg app, 3 is user app
    description: "Start a session",
    options: [
        {
            type: 4, // INT Type
            name: "reactions",
            description: "Amount off reacions",
            required: true,
            autocomplete: false,
            max_value: 25, 
            min_value: 5
        }
    ],
    dm_permission: false, // ensures that the command cannot be used inside of dms
    default_member_permissions: 0 // u can use default member permission to lock cmds to certain permission levels, ex administrator, u can use permissionbitfield to get one if u cant via discord docs
};
/**
 * 
 * @param {import("discord.js").ChatInputCommandInteraction<'cached'>} interaction
 * @param {import("../bot.js").Bot} client
 */
export async function execute(interaction, client) {
    const reactions = interaction.options.getInteger("reactions");

    /**@type {import("discord.js").APIEmbed[]} */
    const response = [{
        title: "Session Startup", 
        description: `<@${interaction.member.id}> is hosting a session! ${reactions} reactions are required to start the session.`,
        color: client.settings.color
    }]; 

    interaction.reply({
        content: "@everyone", 
        embed: response,
    })



}