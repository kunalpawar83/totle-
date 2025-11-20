const fs = require("fs").promises;
const path = require("path");

const DATA_PATH = path.join(__dirname, "../data/topics.json");

exports.getAllTopics = async() =>{
    try{
        const fileData = await fs.readFile(DATA_PATH, "utf8");
        return JSON.parse(fileData);
    }catch(err){
        console.error("Model File Read Error:", err);
        throw new Error("Unable to load topics data");
    }
};

