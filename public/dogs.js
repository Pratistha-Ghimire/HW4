document.getElementById("show-images").addEventListener("click", async () => {
    const breedInput = document.getElementById("breed-input").value.toLowerCase();
    const imageContainer = document.getElementById("dog-images");
    imageContainer.innerHTML = "";  
    try {
        const response = await fetch(`/image/${breedInput}`);
        if (!response.ok) throw new Error("No such breed");

        const data = await response.json();
        const imgElement = document.createElement("img");
        imgElement.src = data.imageUrl;
        imgElement.alt = breedInput;
        imageContainer.appendChild(imgElement);
    } catch (error) {
        imageContainer.textContent = error.message;
    }
});


async function loadBreeds() {
    const response = await fetch("/breeds");
    const breeds = await response.json();
    const dataList = document.getElementById("breeds");

    breeds.forEach(breed => {
        let option = document.createElement("option");
        option.value = breed;
        dataList.appendChild(option);
    });
}

loadBreeds();