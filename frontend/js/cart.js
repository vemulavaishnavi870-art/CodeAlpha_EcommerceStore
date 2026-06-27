const cartDiv = document.getElementById("cartItems");

const user = JSON.parse(localStorage.getItem("user"));

if (!user) {
    alert("Please login first!");
    window.location.href = "login.html";
}

async function loadCart() {

    try {

        const response = await fetch(`http://127.0.0.1:3000/api/cart/${user._id}`);

        const cart = await response.json();

        if (cart.length === 0) {

            cartDiv.innerHTML = "<h2>Your Cart is Empty</h2>";
            return;

        }

        let total = 0;

        cartDiv.innerHTML = "";

        cart.forEach((item) => {

            total += item.product.price * item.quantity;

            cartDiv.innerHTML += `
                <div class="product">

                    <h3>${item.product.name}</h3>

                    <p>${item.product.description}</p>

                    <p>Price: ₹${item.product.price}</p>

                    <p>Quantity: ${item.quantity}</p>

                    <button onclick="removeItem('${item._id}')">
                        Remove
                    </button>

                </div>

                <br>
            `;

        });

        cartDiv.innerHTML += `
            <h2>Total: ₹${total}</h2>
        `;

    } catch (error) {

        console.error(error);

        cartDiv.innerHTML = "<h2>Failed to Load Cart</h2>";

    }

}

loadCart();

async function removeItem(cartId) {

    await fetch(`http://127.0.0.1:3000/api/cart/${cartId}`, {

        method: "DELETE"

    });

    alert("Item Removed");

    loadCart();

}