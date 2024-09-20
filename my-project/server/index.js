const express = require("express");
const path = require("path");
const cors = require("cors"); // Import cors
const userModel = require("./models/model");
const mongoDB = require("./db/mongoose");
const data = require("./data.json");

const app = express();
app.use(cors({ origin: "http://localhost:5173" })); 
app.use(express.json()); // to handle JSON data
app.use(express.static(path.join(__dirname, '../client/assets')));

mongoDB();

app.get("/", (req, res) => {
    res.send("ok");
});

app.post('/users', async (req, res) => {
    try {
        const newUser = await userModel.create({
            name: data.name, // Use name from JSON
            image: '/assets/coverpage.jpg',
            title: data.title, // Use title from JSON
            description: data.description // Use description from JSON
        });

        console.log(newUser); // Log the new user
        res.status(201).json(newUser); // Respond with the created user
    } catch (error) {
        console.error(error);
        res.status(500).send("Error creating user");
    }
});

app.get('/users/:name', async (req, res) => {
    try {
        const userName = req.params.name;
        const user = await userModel.findOne({ name: userName });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
