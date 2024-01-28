
function showSignupTab() {
  document.getElementById('loginTab').classList.remove('active');
  document.getElementById('signupTab').classList.add('active');
}

function showLoginTab() {
  document.getElementById('signupTab').classList.remove('active');
  document.getElementById('loginTab').classList.add('active');
}
/*
class Items({
  name: "V-Neck Shirt",
  price: 45.5,
  description: "Description goes here",
  photo: src = "1st product (Men's).jpg",

  name: ,
  price: 99,
  description: "Description goes here",
  photo: src = "1st product (Men's).jpg",
});

class Items{
  constructor()
  {
    let name, price, description, photo;
  }

  getItems()
  {
    return this.name;
    return this.price;
    return this.description;
    return this.photo;
  }

  setItems (name, price, description, photo){
    this.name = name;
    this.price = price;
    this.description = description;
    this.photo = photo;

  }
}
*/