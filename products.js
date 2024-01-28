/*
const express = require('express');
const app = express();

app.use(express.static('public'));

app.get('/api/products', (req, res) => {
	const products = [
		{ name: 'Product 1', price: '$19.99' },
		{ name: 'Product 2', price: '$29.99' },
		{ name: 'Product 3', price: '$39.99' },
		// ... add more products here
	];
	res.json(products);
});

app.listen(3000, () => {
	console.log('Server listening on port 3000');
})
*/
const products = [
	{ id: 1, name: 'Product 1', image: 'media/1st product .jpg', price: 10 },
	{ id: 2, name: 'Product 2', image: 'media/2nd product.webp', price: 20 },
	{ id: 3, name: 'Product 3', image: 'product3.jpg', price: 30 }
];
/*
const productsElement= document.getElementById('products');
function displayProducts() {
    productsElement.innerHTML = '';
    products.forEach((products) => {
      const productElement = document.createElement('div');
      productElement.classList.add('card', 'mb-3');
      productElement.innerHTML = `
        <div class="card-body">
            <img src=${products.name} class="card-img-top">
          <h5 class="card-title">${products.name}</h5>
          <p class="card-text">$${products.price}</p>
          <button class="btn btn-primary" onclick="addToCart(${products.id})">Add to Cart</button>
        </div>
      `;
      productsElement.appendChild(productElement);
    });
  }
 */ 

function renderProducts() {
	const productsDiv = document.getElementById('products');
	productsDiv.innerHTML = '';
	products.forEach(product => {
		const productDiv = document.createElement('div');
		productDiv.innerHTML = `
            <div class="card" style="width:18rem;">
			        <img src="${product.image}" alt="${product.name}" class="card-img-top">
                <div class= "col-md-8">
                    <div class="card-body">
                        <h2 class="card-title">${product.name}</h2>
                        <p class="card-text">$${product.price}</p>
                        <button class="btn-primary" onclick="addToCart(${product.id})">Add to Cart</button>
                    </div>
                </div>
            </div>
		`;
		productsDiv.appendChild(productDiv);
	});
}

function addToCart(productId) {
	const product = products.find(p => p.id === productId);
	cart.push(product);
	saveCart();
	renderCartCount();
}

function saveCart() {
	localStorage.setItem('cart', JSON.stringify(cart));
}

function loadCart() {
	cart = JSON.parse(localStorage.getItem('cart')) || [];
}

function renderCartCount() {
	loadCart();
	document.getElementById('cartCounter').innerText = cart.length;
}

renderProducts();
renderCartCount();