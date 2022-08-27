import { PermissionFlagsBits, SelectMenuInteraction } from "discord.js";
import { Menu } from "../utils/types";
import { messages } from "../../configs/support.config.json";

export default {
    id: "support",
    execute(menu: SelectMenuInteraction<'cached'>) {
        const value = menu.values[0];
        if (!value) return menu.reply({content:"No selection given", ephemeral: true});

        if (value.startsWith("message_")) {
            // @ts-ignore
            return menu.reply(messages[value.replace("message_", "")].message);
        }

        menu.client.channels.fetch(value).then(channel => {
            if (!channel || !channel.isThread()) return menu.reply({content: "Support channel received wanted the correct format report this to @ThatGravyBoat", ephemeral: true});
            if (channel.archived){
                channel.setArchived(false, `Restoring for user <@${menu.member.id}>`)
                    .then(() => menu.reply({content: `Click on this <#${channel.id}> to go to the proper support channel.`, ephemeral: true}));
            }else {
                menu.reply({content: `Click on this <#${channel.id}> to go to the proper support channel.`, ephemeral: true});
            }
        });
    }
} as Menu;