"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    name: "guildMemberAdd",
    execute(member) {
        if (member.guild.id === "738561073916936333" && !member.user.bot) {
            member.roles.add("747019602860441630").catch(() => { });
            member.roles.add("874096315489992714").catch(() => { });
        }
    }
};
//# sourceMappingURL=memberjoined.js.map