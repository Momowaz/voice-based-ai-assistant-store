const carts = {}; 

// Function to create a new cart and associate it with a session
function createCart(sessionId) {
  carts[sessionId] = [];
}

// Function to add an item to a cart
function addItemToCart(sessionId, item) {
  if (!carts[sessionId]) {
    createCart(sessionId);
  }
  carts[sessionId].push(item);
}

// Function to update thexa quantity of an item in a cart
function updateCartItemQuantity(sessionId, itemId, newQuantity) {
  if (!carts[sessionId]) {
    createCart(sessionId);
  }

  const cart = carts[sessionId];
  const itemToUpdate = cart.find((item) => item.id === itemId);

  if (itemToUpdate) {
    itemToUpdate.quantity = newQuantity;
  }
}

// Function to remove an item from a cart
function removeItemFromCart(sessionId, itemId) {
  if (!carts[sessionId]) {
    createCart(sessionId);
  }

  const cart = carts[sessionId];
  const itemIndex = cart.findIndex((item) => item.id === itemId);

  if (itemIndex !== -1) {
    cart.splice(itemIndex, 1);
  }
}

// Function to get cart contents
function getCartContents(sessionId) {
  return carts[sessionId] || [];
}

module.exports = {
  createCart,
  addItemToCart,
  updateCartItemQuantity,
  removeItemFromCart,
  getCartContents,
};
