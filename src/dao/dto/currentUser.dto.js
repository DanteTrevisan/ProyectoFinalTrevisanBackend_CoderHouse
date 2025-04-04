export default class CurrentUserDTO {
    currentUser;
  
    constructor(user) {
      this.currentUser = {
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        age: user.age,
        rol: user.rol,
        cart: user.cart,
      };
    }
  }