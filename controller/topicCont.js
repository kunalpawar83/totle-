const {getAllTopics} = require("../model/topicmodel.js");

exports.getTopics =  async (req,res)=>{
        try{
            const {search,sort} = req.query;
            if(!search||search.trimEnd() === ""){
                return res.status(400).json({
                    status: false,
                    message: "Invalid query: 'search' parameter is required",
                });
            }
            const topics = await getAllTopics();
            const filtered = topics.filter(topic =>
                topic.name.toLowerCase().includes(search.toLowerCase())
            );
            if (sort === "name") {
                filtered.sort((a, b) => a.name.localeCompare(b.name));
            }
            return res.status(200).json({
                status: true,
                count: filtered.length,
                data: filtered,
            });
        }catch (err){
            console.error("Controller Error:", err);
            return res.status(500).json({
                status: false,
                message: "Server error while fetching topics",
            });
        }
}

