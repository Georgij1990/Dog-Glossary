const container = document.querySelector('#content');
let dogBreed;

async function eventHandler(url) {
    try {
        const response = await fetch(url);
        const responseObject = await response.json();
        if (responseObject.status === 'error') {
            container.innerHTML = '<p>Breed not found!</p>';
            return;
        }
        const imageURL = responseObject.message;
        if (url.includes('/list') && !url.includes('/all')) {
            imageURL.length === 0 ? container.innerHTML = '<p>No sub-breeds found!</p>' : container.innerHTML = returnOrderedList(imageURL);
        } else if (url.includes('/all')) {
            container.innerHTML = returnAllBreedsWithSubBreeds(imageURL);
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

function returnAllBreedsWithSubBreeds(obj) {
    let orderedList = '<ol type="1">';
    for (let i in obj) {
        if (obj[i].length === 0) {
            orderedList += '<li>' + i + '</li>';
        } else {
            orderedList += '<li>' + i;
            orderedList += '<ul style="list-style-type:circle;">';
            obj[i].forEach(e => {
                orderedList += '<li>' + e + '</li>';
            });
            orderedList += '</ul>' + '</li>';
        }
    }
    return orderedList + '</ol>';
}

document.getElementById('button-random-dog').addEventListener('click', function () {
    eventHandler('https://dog.ceo/api/breeds/image/random');
});

document.getElementById('input-breed').addEventListener('input', (e) => {
    dogBreed = e.target.value.toLowerCase();
});

document.getElementById('button-show-breed').addEventListener('click', function () {
    const breedDogUrl = 'https://dog.ceo/api/breed/' + dogBreed + '/images';
    eventHandler(breedDogUrl);
});

document.getElementById('button-show-sub-breed').addEventListener('click', function () {
    const subBreedUrl = 'https://dog.ceo/api/breed/' + dogBreed + '/list';
    eventHandler(subBreedUrl);
});

document.getElementById('button-show-all').addEventListener('click', function () {
    eventHandler('https://dog.ceo/api/breeds/list/all');
});