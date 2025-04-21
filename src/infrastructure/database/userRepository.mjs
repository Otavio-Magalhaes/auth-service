const users = [];

export const userRepository = {
  findByEmail: async (email) => {
    return users.find(user => user.email === email);
  },

  create: async (user) => {
    users.push(user);
    return user;
  },
};
