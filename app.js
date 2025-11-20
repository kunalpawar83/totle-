const express = require("express");
const topicRoutes = require("./routes/topic.js");

const app = express();
app.use(express.json());

app.use("/topics", topicRoutes);

// Not found route
app.use("*", (req, res) => {
    res.status(404).json({ message: "Route not found" });
});

module.exports = app;