const productDiv = document.getElementById("productDetails");

// Get product ID from URL
const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

// Load Product Details
async function loadProduct() {
  try {
    const response = await fetch(`http://127.0.0.1:3000/api/products/${productId}`);
    const product = await response.json();

    productDiv.innerHTML = `
      <div class="product">
        <h2>${product.name}</h2>
        <p>${product.description}</p>
        <p><strong>Category:</strong> ${product.category}</p>
        <p><strong>Price:</strong> ₹${product.price}</p>
        <p><strong>Stock:</strong> ${product.stock}</p>

        <button onclick="addToCart('${product._id}')">
          Add to Cart
        </button>
      </div>
    `;
  } catch (error) {
    console.error(error);
    productDiv.innerHTML = "<h2>Product not found.</h2>";
  }
}

loadProduct();

// Add Product to Cart
async function addToCart(productId) {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    alert("Please login first!");
    window.location.href = "login.html";
    return;
  }

  try {
    const response = await fetch("http://127.0.0.1:3000/api/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: user._id,
        product: productId,
        quantity: 1,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      alert("Product Added to Cart!");
    } else {
      alert(data.message || "Failed to add product to cart.");
    }
  } catch (error) {
    console.error(error);
    alert("Server Error");
  }
}