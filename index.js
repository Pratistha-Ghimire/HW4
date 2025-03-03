const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// ✅ 1. Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, "public")));

// ✅ 2. Handle the home route and serve index.html
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "dogs.html"));
});

// ✅ 3. Object storing breeds and their images
const dogBreeds = {
    golden: ["golden.webp"],
    beagle: ["beagle1.webp", "beagle2.jpg"],
    husky: ["husky1.webp", "husky2.webp"]
};

// ✅ 4. Route to return available breeds
app.get("/breeds", (req, res) => {
    res.json(Object.keys(dogBreeds));
});

// ✅ 5. Route to return a random image for a breed
app.get("/image/:breed", (req, res) => {
    const breed = req.params.breed.toLowerCase();
    if (dogBreeds[breed]) {
        const randomImage = dogBreeds[breed][Math.floor(Math.random() * dogBreeds[breed].length)];
        res.json({ imageUrl: `/img/${randomImage}` });
    } else {
        res.status(404).json({ error: "No such breed" });
    }
});

// ✅ 6. Start the Express server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
