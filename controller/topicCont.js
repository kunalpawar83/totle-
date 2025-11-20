const fs = require("fs").promises;
const path = require("path");

const DATA_PATH = path.join(__dirname, "../data/topics.json");

exports.getTopics = async (req, res) => {
    try {
        const { search, sort } = req.query;

        if (!search || search.trim() === "") {
            return res.status(400).json({
                status: false,
                message: "Invalid query: 'search' parameter is required",
            });
        }

        // Read JSON directly here (no model folder)
        const fileData = await fs.readFile(DATA_PATH, "utf8");
        const topics = JSON.parse(fileData);

        // Filter
        const filtered = topics.filter(topic =>
            topic.name.toLowerCase().includes(search.toLowerCase())
        );

        // Sort
        if (sort === "name") {
            filtered.sort((a, b) => a.name.localeCompare(b.name));
        }

        return res.status(200).json({
            status: true,
            count: filtered.length,
            data: filtered,
        });

    } catch (err) {
        console.error("Controller Error:", err);
        return res.status(500).json({
            status: false,
            message: "Server error while fetching topics",
        });
    }
};
