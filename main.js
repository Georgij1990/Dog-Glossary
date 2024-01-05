'use strict';
const container = document.getElementById('content');
const button = document.getElementById('button-random-dog');
button.addEventListener('click', addRandomImage);
async function addRandomImage() {
    try {
        const response = await fetch('https://dog.ceo/api/breeds/image/random');
        const responseObject = await response.json();
        const imageURL = responseObject.message;
        const image = document.createElement('img');
        image.src = imageURL;
        const firstChild = container.firstChild;
        if (firstChild) {
            firstChild.remove();
            container.appendChild(image);
        } else {
            container.appendChild(image);
        }
    } catch(error)  {
        console.log(error.errorMessage);
    }
}