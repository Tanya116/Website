const cart = [];

function renderCart() {
	const cartItemsDiv = document.getElementById('cart-items');
	cartItemsDiv.innerHTML = '';
	cart.forEach((product, index) => {
		const cartItemDiv = document.createElement('div');
		cartItemDiv.innerHTML = `
			<h2>${product.name}</h2>
			<img src="${product.image}" alt="${product.name}">
			<p>$${product.price}</p>
			<button onclick="removeFromCart(${index})">Remove from Cart</button>
		`;
		cartItemsDiv.appendChild(cartItemDiv);
	});
}

function removeFromCart(index) {
	cart.splice(index, 1);
	saveCart();
	renderCart();
	renderCartCount();
}

function saveCart() {
	localStorage.setItem('cart', JSON.stringify(cart));
}

function loadCart() {
	cart = JSON.parse(localStorage.getItem('cart')) || [];
}

loadCart();
renderCart();
renderCartCount();