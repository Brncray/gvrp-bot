import { Collection } from "discord.js";
import { Bot } from "./bot.js";
import { config } from "dotenv";
config();
//process.on("uncaughtException", (e) => console.log("[ UNCAUGHT EXCEPTION ] →", e));
//process.on("unhandledRejection", (e) => console.log("[ UNHANDLED REJECTION ] →"), e);
(async () => {
    const client = new Bot({
        intents: 3276799, // ALL intents via - https://discord-intents-calculator.vercel.app/
    });
    client.settings = {
        color: 0x121212, // put color hex here for embeds n shit wo #
        iconURL: '',
        vehicles: (await import("./data/vehicles.json", { assert: { type: "json" } })).default,
        vehicleColors: (await import("./data/vehicleColors.json", { assert: { type: "json" } })).default,
        vehicleLimits: {
            regular: 6,
            special: 8
        },
        reports_channel: '1209293485862293524',
        guild_id: `965820805592272947`,
        unbtoken: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBfaWQiOiIxMjA2NjU5MzE5MDk4MTE3MjcxIiwiaWF0IjoxNzA3NzYwNDAwfQ.A3Vmf_95_pNFNnhz4Us4Jq1t0ziNtyRL89ZXpvqhxYQ`,
        db_name: `gvrp`,
        adjustments: `1225263947569959074`,
        log_channel: `1211419993992859749`,
        staff_role: `1190338623200051371`,
        emergency_role: `1225459912318910585`,
        admin_role: `1193280442573525022`
    };
    await client.init();
})();
