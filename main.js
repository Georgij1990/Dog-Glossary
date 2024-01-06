const container = document.querySelector('#content');
let dogBreed;
const randomDogUrl = 'https://dog.ceo/api/breeds/image/random';

async function showDogImage(url) {
    try {
        const response = await fetch(url);
        const responseObject = await response.json();
        if (responseObject.status === 'error') {
            container.innerHTML = '<p>Breed not found!</p>';
            return;
        }
        const imageURL = responseObject.message;
        if (!Array.isArray(imageURL)) {
            container.innerHTML = `<img src="${imageURL}">`;
        } else {
            const random = imageURL.length > 1 ? Math.floor(Math.random() * imageURL.length) : 0;
            container.innerHTML = `<img src="${imageURL[random]}">`;
        }
    } catch (error) {
        console.log(error.errorMessage);
    }
}

document.getElementById('button-random-dog').addEventListener('click', function () {
    showDogImage(randomDogUrl);
});

document.getElementById('input-breed').addEventListener('input', (e) => {
    dogBreed = e.target.value.toLowerCase();
});

document.getElementById('button-show-breed').addEventListener('click', function () {
    const breedDogUrl = 'https://dog.ceo/api/breed/' + dogBreed + '/images';
    showDogImage(breedDogUrl);
});