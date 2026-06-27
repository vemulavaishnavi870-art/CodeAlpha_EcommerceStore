const form = document.getElementById("registerForm");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch("http://127.0.0.1:3000/api/users/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
                email,
                password,
            }),
        });

        const data = await response.json();

        if (response.ok) {
            alert("Registration Successful!");

            window.location.href = "login.html";
        } else {
            alert(data.message || "Registration Failed");
        }
    } catch (error) {
        console.error(error);
        alert("Server Error");
    }
});