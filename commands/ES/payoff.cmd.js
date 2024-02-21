import { vehicle } from "../../data/mongodb.js";



/**@type {import("../bot.js").Command} */
export const data = {
  name: "payoff",
  type: 1,
  description: "Pay off a ticket",
  options: [
    {
      type: 4,
      name: "case",
      description: "What case number",
      required: true,
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
  await interaction.deferReply({ ephemeral: true });
  const Client = unbApi(client.settings.unbtoken);
  const balance = await Client.getUserBalance(client.settings.guild_id, interaction.user.id);
  const user = interaction.user;
  const case_number = interaction.options.getInteger("case", true);
  const ticket_data = await ticket.findOne({
    case: case_number,
    recipient: user.id,
  });

  if (!ticket_data) {
    return interaction.editReply({
      content: "Ticket not found.",
      ephemeral: true,
    });
  }
  if (ticket_data.recipient !== user.id) {
    return interaction.editReply({
      content: "You do not own this ticket.",
      ephemeral: true,
    });
  }

  if (balance < ticket_data.fine) {
    return interaction.editReply({
      content: "You do not have enough money to pay off this ticket. Make sure you move money from your bank to your cash.",
      ephemeral: true,
    });
  }
  await Client.editUserBalance(client.settings.guild_id, user.id, {
    cash: balance - ticket_data.fine,
  });

  await ticket.deleteOne({ case: case_number });
  await interaction.editReply({
    content: `Paid off ticket ${ticket_data.case}.`,
    ephemeral: true,
  });
}
