import { vehicle, ticket } from "../../data/mongodb.js"; 

/**@type {import("../bot.js").Command} */
export const data = {
  name: "profile",
  type: 1, // u got 3 types, 1 is reg cmd, 2 is msg app, 3 is user app
  description: "view a profile",
  options: [
    {
      type: 6, // STRING Type
      name: "user",
      description: "What user",
      required: false,
      autocomplete: false,
    },
  ],
  dm_permission: false,
  default_member_permissions: 0, 
};
/**
 *
 * @param {import("discord.js").ChatInputCommandInteraction<'cached'>} interaction
 * @param {import("../bot.js").Bot} client
 */
export async function execute(interaction, client) {
  await interaction.deferReply({ ephemeral: false }); 
  if (interaction.options.get("user") == null) {
    var user = interaction.user;
  } else if (interaction.options.get("user") != null) {
    var user = interaction.options.get("user").user;
  }

  if (user.bot) {
    return interaction.editReply({
      content: "You cannot view a bot's profile.",
    })
  }
  const vehicles = await vehicle.find({ ownerId: user.id });
  const tickets = await ticket.find({ recipient: user.id });

  /**@type {import("discord.js").APIEmbed[]} */
  const response = [
    {
      title: `${user.username} Profile`,
      fields: [
        {
          name: "Citations",
          value: `${tickets.length}`,
          inline: true,
        },
        {
          name: "Vehicles",
          value: `${vehicles.length}`,
          inline: true,
        },
      ],
      color: client.settings.color,
    },
  ];



  const r = [
    {
      type: 1,
      /**@type {import("discord.js").APIButtonComponent[]} */
      components: [
        {
          label: "Registered Vehicles",
          type: 2,
          style: 1,
          custom_id: "registered_vehicles",
        },
        { label: "Citations", type: 2, style: 1, custom_id: "citations" },
        { label: "Modlogs", type:2, style:1, custom_id: "modlogs" }
      ],
    },
  ];

  interaction.editReply({
    embeds: response,
    components: r,
  });
  
  
  
}
