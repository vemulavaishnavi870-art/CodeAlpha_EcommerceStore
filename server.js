const express = require("express");

const app = express();

app.get("/", (req, res) => {
    res.send("Welcome to CodeAlpha E-Commerce Store");
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});