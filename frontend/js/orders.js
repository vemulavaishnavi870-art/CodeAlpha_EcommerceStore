const ordersDiv = document.getElementById("orders");

const user = JSON.parse(localStorage.getItem("user"));

if (!user) {
    alert("Please login first!");
    window.location.href = "login.html";
}

async function loadOrders() {

    try {

        const response = await fetch(`http://127.0.0.1:3000/api/orders/${user._id}`);

        const orders = await response.json();

        if (orders.length === 0) {

            ordersDiv.innerHTML = "<h2>No Orders Found</h2>";
            return;

        }

        ordersDiv.innerHTML = "";

        orders.forEach((order) => {

            let productsHTML = "";

            order.products.forEach((item) => {

                productsHTML += `
                    <li>
                        ${item.product.name}
                        - Quantity: ${item.quantity}
                    </li>
                `;

            });

            ordersDiv.innerHTML += `

                <div class="product">

                    <h2>Order ID</h2>
                    <p>${order._id}</p>

                    <h3>Products</h3>

                    <ul>
                        ${productsHTML}
                    </ul>

                    <p><strong>Total:</strong> ₹${order.totalPrice}</p>

                    <p><strong>Status:</strong> ${order.status}</p>

                    <hr>

                </div>

            `;

        });

    } catch (error) {

        console.error(error);

        ordersDiv.innerHTML = "<h2>Failed to Load Orders</h2>";

    }

}

loadOrders();