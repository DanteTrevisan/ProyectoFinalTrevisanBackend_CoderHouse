export default class ApiUsersDTO {
    users;
  
    constructor(dbUsers) {
      this.users = dbUsers.map((dbUser) => {
        return {
          name: `${dbUser.firstName} ${dbUser.lastName}`,
          email: dbUser.email,
          rol: dbUser.rol,
        };
      });
    }
  }