/**@type {import("../bot.js").Command} */
export const data = {
    name: "adjustments",
    type: 1,
    description: "Make a server adjustment",
    options: [
        {
            name: "server-adjustment",
            description: "Make a server adjustment",
            type: 1,
            options: [
                {
                    name: "adjustment",
                    description: "What adjustment would you like to make?",
                    required: true,
                    type: 3,
                },
                {
                    name: "rank",
                    description: "What rank are you?",
                    required: true,
                    type: 3,
                }
            ]

        },
        {
            name: "server-blacklist",
            description: "Blacklist a server",
            type: 1,
            options: [
                {
                    name: "server",
                    description: "What server would you like to blacklist?",
                    required: true,
                    type: 3,
                },
                {
                    name: "reason",
                    description: "What is the reason for blacklisting?",
                    required: true,
                    type: 3,
                },
                {
                    name: "rank",
                    description: "What rank are you?",
                    required: true,
                    type: 3,
                }
            ]
        },
        {
            name: "staff-handpick",
            description: "Handpick a staff member",
            type: 1,
            options: [
                {
                    name: "staff",
                    description: "What staff member would you like to handpick?",
                    required: true,
                    type: 6,
                },
                {
                    name: "staff-rank",
                    description: "What rank is the new staff member?",
                    required: true,
                    type: 3,
                },
                {
                    name: "rank",
                    description: "What rank are you?",
                    required: true,
                    type: 3,
                }
            ]
        },
        {
            name: "staff-termination",
            description: "Terminate a staff member",
            type: 1,
            options: [
                {
                    name: "staff",
                    description: "What staff member would you like to terminate?",
                    required: true,
                    type: 6,
                },
                {
                    name: "rank",
                    description: "What rank are you?",
                    required: true,
                    type: 3,
                },
                {
                    name: "reason",
                    description: "What is the reason for termination?",
                    required: true,
                    type: 3,
                }
            ]
        },
        {
            name: "staff-promotion",
            description: "Promote a staff member",
            type: 1,
            options: [
                {
                    name: "staff",
                    description: "What staff member would you like to promote?",
                    required: true,
                    type: 6,
                },
                {
                    name: "before-rank",
                    description: "What was their rank before",
                    required: true,
                    type: 3,
                },
                {
                    name: "after-rank",
                    description: "What is their new rank?",
                    required: true,
                    type: 3,
                },
                {
                    name: "rank",
                    description: "What rank are you?",
                    required: true,
                    type: 3,
                }
            ]
        },
        {
            name: "staff-demotion",
            description: "Demote a staff member",
            type: 1,
            options: [
                {
                    name: "staff",
                    description: "What staff member would you like to demote?",
                    required: true,
                    type: 6,
                },
                {
                    name: "before-rank",
                    description: "What was their rank before",
                    required: true,
                    type: 3,
                },
                {
                    name: "after-rank",
                    description: "What is their new rank?",
                    required: true,
                    type: 3,
                },
                {
                    name: "rank",
                    description: "What rank are you?",
                    required: true,
                    type: 3,
                },
                {
                    name: "reason",
                    description: "What is the reason for demotion?",
                    required: true,
                    type: 3,
                }
            ]
        },
        {
            name: "staff-resignation",
            description: "Resign a staff member",
            type: 1,
            options: [
                {
                    name: "staff",
                    description: "What staff member would you like to resign?",
                    required: true,
                    type: 6,
                },
                {
                    name: "rank",
                    description: "What rank are you?",
                    required: true,
                    type: 3,
                }
            ]
        }
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
    const cmd = interaction.options.getSubcommand();

    switch(cmd){
        case "server-adjustment":
            await adjustment(interaction, client);
            break;
        case "server-blacklist":
            await server_blacklist(interaction, client);
            break;
        case "staff-handpick":
            await staff_handpick(interaction, client);
            break;
        case "staff-termination":
            await staff_termination(interaction, client);
            break;
        case "staff-promotion":
            await staff_promotion(interaction, client);
            break;
        case "staff-demotion":
            await staff_demotion(interaction, client);
            break;
        case "staff-resignation":
            await staff_resignation(interaction, client);
            break;
    }
}


async function adjustment(interaction, client) {

    const channel = client.channels.cache.get(client.settings.adjustments);
    const adjustment = interaction.options.getString("adjustment");
    const rank = interaction.options.getString("rank");

    const response = "**__Server Adjustment__**\n\n> " + adjustment + `\n\n**Date:** <t:${Math.trunc(Date.now() / 1000)}:D>\n\n*Signed,*\n***${rank}, ${interaction.user.tag}***`;

    channel.send({ content: response});
    await interaction.editReply({
        content: "Sent."
    })
    await interaction.deleteReply()
}

async function server_blacklist(interaction, client) {
    const channel = client.channels.cache.get(client.settings.adjustments);
    const server = interaction.options.getString("server");
    const reason = interaction.options.getString("reason");
    const rank = interaction.options.getString("rank");

    const response = `**__Server Blacklist__**

> ${server} has been blacklisted from all Greenville Community partnerships and fastpasses. The reasoning for this blacklist is ${reason}\n\n**Date:** <t:${Math.trunc(Date.now() / 1000)}:D>\n\n*Signed,*\n***${rank}, ${interaction.user.tag}***`
    channel.send({ content: response});
    await interaction.editReply({
        content: "Sent."
    })
    await interaction.deleteReply()
}
async function staff_handpick(interaction, client) {
    const channel = client.channels.cache.get(client.settings.adjustments);
    const staff = interaction.options.getUser("staff");
    const staff_rank = interaction.options.getString("staff-rank");
    const rank = interaction.options.getString("rank");

    const response = `**__Staff Handpick__**\n\n${staff}has been handpicked onto the Greenville Community Roleplay Staff Team as ${staff_rank}. The High-Command Team finds this user fit for this position due to past and/or previous experience.\n\n**Date:**<t:${Math.trunc(Date.now() / 1000)}:D>\n\n*Signed,*\n***${rank}, ${interaction.user.tag}***`

    channel.send({ content: response});
    await interaction.editReply({
        content: "Sent."
    })
    await interaction.deleteReply()
}
async function staff_termination(interaction, client) {
    const channel = client.channels.cache.get(client.settings.adjustments);
    const staff = interaction.options.getUser("staff");
    const rank = interaction.options.getString("rank");
    const reason = interaction.options.getString("reason");

    const response = `**__Staff Termination__**\n\n${staff} has been terminated from the Greenville Community Roleplay Staff Team. The reasoning for this termination is ${reason}\n\n**Date:** <t:${Math.trunc(Date.now() / 1000)}:D>\n\n*Signed,*\n***${rank}, ${interaction.user.tag}***`

    channel.send({ content: response});
    await interaction.editReply({
        content: "Sent."
    })
    await interaction.deleteReply()
}
async function staff_promotion(interaction, client) {
    const channel = client.channels.cache.get(client.settings.adjustments);
    const staff = interaction.options.getUser("staff");
    const before = interaction.options.getString("before-rank");
    const after = interaction.options.getString("after-rank");
    const rank = interaction.options.getString("rank");

    const response = `**__Staff Promotion__**\n\n${staff} has been promoted to **${after} from ${before}**. The High-Command Team believe this user meets our expectations to move forward to this rank.\n\n**Date:** <t:${Math.trunc(Date.now() / 1000)}:D>\n\n*Signed,*\n***${rank}, ${interaction.user.tag}***`

    channel.send({ content: response});
    await interaction.editReply({
        content: "Sent."
    })
    await interaction.deleteReply()
}
async function staff_demotion(interaction, client) {
    const channel = client.channels.cache.get(client.settings.adjustments);
    const staff = interaction.options.getUser("staff");
    const before = interaction.options.getString("before-rank");
    const after = interaction.options.getString("after-rank");
    const rank = interaction.options.getString("rank");
    const reason = interaction.options.getString("reason");

    const response = `**__Staff Promotion__**\n\n${staff} has been demoted from **${before} to ${after}**. This user has been demoted due to ${reason}\n\n**Date:** <t:${Math.trunc(Date.now() / 1000)}:D>\n\n*Signed,*\n***${rank}, ${interaction.user.tag}***`

    channel.send({ content: response});
    await interaction.editReply({
        content: "Sent."
    })
    await interaction.deleteReply()

}
async function staff_resignation(interaction, client) {
    const channel = client.channels.cache.get(client.settings.adjustments);
    const staff = interaction.options.getUser("staff");
    const rank = interaction.options.getString("rank");

    const response = `**__Staff Resignation__**\n\n${staff} has resigned from the Greenville Community Roleplay Staff Team. We wish this user the best of luck in their future endeavors.\n\n**Date:** <t:${Math.trunc(Date.now() / 1000)}:D>\n\n*Signed,*\n***${rank}, ${interaction.user.tag}***`

    channel.send({ content: response});
    await interaction.editReply({
        content: "Sent."
    })
    await interaction.deleteReply()
}