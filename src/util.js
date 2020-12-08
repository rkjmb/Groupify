export const validateGroup = (group) => {
    let error = "";
    if (!String(group.name).trim()) {
        error = "Group name is required"
    } else if (group.members.length == 0) {
        error = "Cannot continue without having members in group. Please check atleast one user."
    }
    return error;

}