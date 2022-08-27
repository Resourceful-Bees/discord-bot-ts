"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const roles_config_json_1 = require("../../configs/roles.config.json");
exports.default = {
    id: "role_selection",
    execute(menu) {
        if (!menu.inGuild())
            return;
        const values = menu.values;
        let roles = menu.member.roles;
        if (values.length === 0 && roles.cache.has(roles_config_json_1.addAbleRolesRole)) {
            roles.remove(roles_config_json_1.addAbleRolesRole).catch(() => { });
        }
        else if (values.length > 0 && !roles.cache.has(roles_config_json_1.addAbleRolesRole)) {
            roles.add(roles_config_json_1.addAbleRolesRole).catch(() => { });
        }
        const rolesInSelection = Object.keys(roles_config_json_1.roleSelections);
        const rolesToRemove = rolesInSelection.filter(id => roles.cache.has(id) && !values.includes(id));
        const rolesToAdd = values.filter(id => rolesInSelection.includes(id) && !roles.cache.has(id));
        rolesToRemove.forEach(id => roles.remove(id).catch(() => { }));
        rolesToAdd.forEach(id => roles.add(id).catch(() => { }));
        menu.reply({ content: "Roles changed! You can Dismiss these.", ephemeral: true });
    }
};
//# sourceMappingURL=role_selection.js.map