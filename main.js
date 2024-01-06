'use strict';

const container = document.getElementById('content');
const button = document.getElementById('button-random-dog');
let dogBreed;
const inputField = document.getElementById('input-breed');
const showBreedButton = document.getElementById('button-show-breed');


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
    } catch (error) {
        console.log(error.errorMessage);
    }
}

async function showDog() {
    try {
        const url = 'https://dog.ceo/api/breed/' + dogBreed + '/images';
        const response = await fetch(url);
        const responseObject = await response.json();
        const firstChild = container.firstChild;
        const paragraph = document.createElement('p');
        paragraph.textContent = 'Breed not found!';
        if (responseObject.status === 'error') {
            if (firstChild) {
                firstChild.remove();
                container.appendChild(paragraph);
                return;
            } else {
                container.appendChild(paragraph);
                return;
            }
        }
        const imageURL = responseObject.message;
        const image = document.createElement('img');
        const random = imageURL.length > 1 ? Math.floor(Math.random() * imageURL.length) : 0;
        image.src = imageURL[random];
        if (firstChild) {
            firstChild.remove();
            container.appendChild(image);
            const img = document.body.querySelector("img");
            console.log(img);
        } else {
            container.appendChild(image);
            const img = document.body.querySelector("img");
            console.log(img);
        }
    } catch (error) {
        console.log(error.errorMessage);
    }
}

button.addEventListener('click', addRandomImage);

inputField.addEventListener('change', (e) => {
    dogBreed = e.target.value.toLowerCase();
});

showBreedButton.addEventListener('click', showDog);