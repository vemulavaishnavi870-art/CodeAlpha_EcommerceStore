const productsDiv = document.getElementById("products");

async function loadProducts() {
  try {
    const response = await fetch("http://127.0.0.1:3000/api/products");
    const products = await response.json();

    productsDiv.innerHTML = "";

    products.forEach((product) => {
      productsDiv.innerHTML += `
        <div class="product">
          <h3>${product.name}</h3>
          <p>${product.description}</p>
          <p><strong>₹${product.price}</strong></p>

          <button onclick="viewProduct('${product._id}')">
            View Details
          </button>
        </div>
      `;
    });
  } catch (error) {
    console.error("Error loading products:", error);
    productsDiv.innerHTML = "<p>Failed to load products.</p>";
  }
}

function viewProduct(id) {
  window.location.href = `product.html?id=${id}`;
}

loadProducts();