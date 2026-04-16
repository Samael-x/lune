module.exports = {
  admin: (message) => {
    return message.member.permissions.has("Administrator");
  }
};
