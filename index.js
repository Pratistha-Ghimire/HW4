const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;


app.use(express.static(path.join(__dirname, "public")));


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "dogs.html"));
});


const dogBreeds = {
    golden: ["golden.webp"],
    beagle: ["beagle1.webp", "beagle2.jpg"],
    husky: ["husky1.webp", "husky2.webp"]
};


app.get("/breeds", (req, res) => {
    res.json(Object.keys(dogBreeds));
});


app.get("/image/:breed", (req, res) => {
    const breed = req.params.breed.toLowerCase();
    if (dogBreeds[breed]) {
        const randomImage = dogBreeds[breed][Math.floor(Math.random() * dogBreeds[breed].length)];
        res.json({ imageUrl: `/img/${randomImage}` });
    } else {
        res.status(404).json({ error: "No such breed" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
