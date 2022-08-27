import { PermissionFlagsBits, SelectMenuInteraction } from "discord.js";
import { Menu } from "../utils/types";
import { addAbleRolesRole, roleSelections } from "../../configs/roles.config.json";

export default {
    id: "role_selection",
    execute(menu: SelectMenuInteraction<'cached'>) {
        if (!menu.inGuild()) return;
        const values = menu.values;
        let roles = menu.member.roles;
        if (values.length === 0 && roles.cache.has(addAbleRolesRole)) {
            roles.remove(addAbleRolesRole).catch(() => {})
        } else if (values.length > 0 && !roles.cache.has(addAbleRolesRole)) {
            roles.add(addAbleRolesRole).catch(() => {})
        }
        const rolesInSelection = Object.keys(roleSelections)
        const rolesToRemove = rolesInSelection.filter(id =>roles.cache.has(id) && !values.includes(id));
        const rolesToAdd = values.filter(id => rolesInSelection.includes(id) && !roles.cache.has(id))

        rolesToRemove.forEach(id => roles.remove(id).catch(() => {}))
        rolesToAdd.forEach(id => roles.add(id).catch(() => {}))

        menu.reply({content: "Roles changed! You can Dismiss these.", ephemeral: true});
    }
} as Menu;