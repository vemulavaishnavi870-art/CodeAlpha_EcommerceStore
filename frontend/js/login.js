const form = document.getElementById("loginForm");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch("http://127.0.0.1:3000/api/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });

        const data = await response.json();

        if (response.ok) {

            // Save token and user information
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data));

            alert("Login Successful!");

            window.location.href = "index.html";

        } else {
            alert(data.message);
        }

    } catch (error) {
        console.error(error);
        alert("Server Error");
    }
});