const orderMessage = document.getElementById("orderMessage");
const placeOrderBtn = document.getElementById("placeOrderBtn");

const user = JSON.parse(localStorage.getItem("user"));

if (!user) {
    alert("Please login first!");
    window.location.href = "login.html";
}

placeOrderBtn.addEventListener("click", async () => {

    try {

        // Get Cart Items
        const cartResponse = await fetch(`http://127.0.0.1:3000/api/cart/${user._id}`);
        const cart = await cartResponse.json();

        if (cart.length === 0) {
            alert("Your cart is empty!");
            return;
        }

        const products = cart.map(item => ({
            product: item.product._id,
            quantity: item.quantity
        }));

        const totalPrice = cart.reduce((total, item) => {
            return total + (item.product.price * item.quantity);
        }, 0);

        // Create Order
        const response = await fetch("http://127.0.0.1:3000/api/orders", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                user: user._id,
                products,
                totalPrice

            })

        });

        const data = await response.json();

        if (response.ok) {

            orderMessage.innerHTML = `
                <h2>✅ Order Placed Successfully!</h2>
                <p>Total Amount: ₹${totalPrice}</p>
                <p>Status: ${data.status}</p>
            `;

        } else {

            alert(data.message || "Failed to place order.");

        }

    } catch (error) {

        console.error(error);
        alert("Server Error");

    }

});