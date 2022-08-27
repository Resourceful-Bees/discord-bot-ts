import { GuildMember } from "discord.js";
import { DiscordEvent } from "../utils/types";

export default {
    name: "guildMemberAdd",
    execute(member: GuildMember) {
        if (member.guild.id === "738561073916936333" && !member.user.bot){
            member.roles.add("747019602860441630").catch(() => {})
            member.roles.add("874096315489992714").catch(() => {})
        }
    }
} as DiscordEvent;