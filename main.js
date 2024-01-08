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
        if (url.includes('/list')) {
            imageURL.length === 0 ? container.innerHTML = '<p>No sub-breeds found!</p>' : container.innerHTML = returnOrderedList(imageURL);
        } else {
            if (!Array.isArray(imageURL)) {
                container.innerHTML = `<img src="${imageURL}">`;
            } else {
                const random = imageURL.length > 1 ? Math.floor(Math.random() * imageURL.length) : 0;
                container.innerHTML = `<img src="${imageURL[random]}">`;
            }
        }
    } catch (error) {
        console.log(error.errorMessage);
    }
}

function returnOrderedList(arr) {
    let orderedList = '<ol type="1">';
    arr.forEach(e => {
        orderedList += '<li>' + e + '</li>';
    });
    return orderedList + '</ol>';
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

document.getElementById('button-show-sub-breed').addEventListener('click', function () {
    const subBreedUrl = 'https://dog.ceo/api/breed/' + dogBreed + '/list';
    showDogImage(subBreedUrl);
});