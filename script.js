// Sample data for products
const products = [
  { id: 1, name: 'Beras', price: 12000, image: 'd:\\semester5\\utspapk\\download (1).jpg' },
  { id: 2, name: 'Garam', price: 5000, image: 'd:\\semester5\\utspapk\\garam.jpg' },
  { id: 3, name: 'Minyak Tropical', price: 17000, image: 'd:\\semester5\\utspapk\\tropical.jpg' },
  { id: 4, name: 'Gula Pasir', price: 8000, image: 'd:\\semester5\\utspapk\\gulaku.jpg' },
  { id: 5, name: 'Tepung Terigu', price: 12000, image: 'd:\\semester5\\utspapk\\tepung terigu.jpg' },
];

// Cart data
let cartItems = [];

// Function to add a product to the cart
function addToCart(productId) {
  const product = products.find(item => item.id === productId);

  if (product) {
    cartItems.push(product);
    updateCart();
  }
}

// Function to update the cart display
function updateCart() {
  const cartItemsElement = document.getElementById('cart-items');
  const totalElement = document.getElementById('total');

  // Clear the cart display before updating it
  cartItemsElement.innerHTML = '';

  // Display each item in the cart
  cartItems.forEach(item => {
    const listItem = document.createElement('li');
    listItem.textContent = `${item.name} - Rp. ${item.price.toLocaleString()}`;
    cartItemsElement.appendChild(listItem);
  });

  // Calculate and display the total price
  const total = cartItems.reduce((sum, item) => sum + item.price, 0);
  totalElement.textContent = `Rp. ${total.toLocaleString()}`;
}

// Function to handle the checkout process
function checkout() {
  // Perform checkout logic here (e.g., send data to the server)
  alert('Terima kasih atas pembelian Anda! Total belanja: Rp. ' + getTotal());
  // Clear the cart after checkout
  clearCart();
  updateCart();
}

// Function to handle product editing
function editProduct() {
  const productId = prompt('Masukkan ID produk yang ingin diubah:');
  const product = products.find(item => item.id === parseInt(productId, 10));

  if (product) {
    const newName = prompt(`Edit nama produk "${product.name}":`, product.name);
    const newPrice = prompt(`Edit harga produk "${product.name}":`, product.price);

    if (newName !== null && newPrice !== null) {
      product.name = newName.trim();
      product.price = parseInt(newPrice, 10);
      displayProducts();
    }
  }
}

// Function to handle product deletion
function deleteProduct() {
  const productId = prompt('Masukkan ID produk yang ingin dihapus:');
  const productIndex = products.findIndex(item => item.id === parseInt(productId, 10));

  if (productIndex !== -1) {
    products.splice(productIndex, 1);
    displayProducts();
  }
}

// Function to get the total price of items in the cart
function getTotal() {
  return cartItems.reduce((sum, item) => sum + item.price, 0).toLocaleString();
}

// Function to clear the cart
function clearCart() {
  cartItems = [];
}

// Function to display products
function displayProducts() {
  const productsContainer = document.getElementById('products');
  productsContainer.innerHTML = ''; // Clear existing content

  products.forEach(product => {
    const productElement = document.createElement('div');
    productElement.classList.add('product');

    productElement.innerHTML = `
      <img src="${product.image}" alt="${product.name} Icon" class="product-icon">
      <h3>${product.name}</h3>
      <p class="price">Rp. ${product.price.toLocaleString()}</p>
      <button onclick="addToCart(${product.id})">Tambah ke Keranjang</button>
    `;

    productsContainer.appendChild(productElement);
  });
}

// Initial display of products
displayProducts();
