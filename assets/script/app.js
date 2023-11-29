'use strict'

class User {
    #id;
    #name;
    #userName;
    #email;

    constructor(id, name, userName, email) {
        this.#id = id;
        this.#name = name;
        this.#userName = userName;
        this.#email = email;
    }

    getId() {
        return this.#id;
    }

    getName() {
        return this.#name;
    }

    getUserName() {
        return this.#userName;
    }

    getEmail() {
        return this.#email;
    }

    getInfo() {
        return `ID: ${this.getId()}, Name: ${this.getName()}, Username: ${this.getUserName()}, Email: ${this.getEmail()}`;
    }
}

class Subscriber extends User {
    #pages;
    #groups;
    #canMonetize;

    constructor(id, name, userName, email, pages, groups, canMonetize) {
        super(id, name, userName, email);
        this.#pages = pages;
        this.#groups = groups;
        this.#canMonetize = canMonetize;
    }

    getPages() {
        return this.#pages;
    }

    getGroups() {
        return this.#groups;
    }

    getCanMonetize() {
        return this.#canMonetize;
    }

    getInfo() {
        return `${super.getInfo()}, Pages: ${this.getPages()}, Groups: ${this.getGroups()}, Can Monetize: ${this.getCanMonetize()}`;
    }
}

function handleFileSelect() {
    const file = imageInput.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = function (e) {
            chosenImage.src = e.target.result;

            chosenFileContainer.style.visibility = 'visible';
            chosenFileName.textContent = file.name;
            chosenFileName.style.visibility = 'visible';
        };

        reader.readAsDataURL(file);
    }
}

const postForm = document.getElementById('postForm');
const postText = document.getElementById('postText');
const postsSection = document.getElementById('postsSection');
const chosenFileContainer = document.getElementById('chosenFileContainer');
const chosenImage = document.getElementById('chosenImage');
const imageInput = document.getElementById('image');

const subscriber = new Subscriber(
    1,
    'Nifemi Leye',
    'nifemi_leye',
    'john.doe@example.com',
    ['Page 1', 'Page 2'],
    ['Group 1', 'Group 2'],
    true
);

postForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const postContent = postText.value;

    if (!(postContent.trim() || chosenImage.src)) {
        postText.focus();
        return;
    }

    const postHeader = document.createElement('div');
    postHeader.className = 'post-header';

    const date = { month: 'short', day: 'numeric', year: 'numeric' };
    postHeader.innerHTML = `
        <div class="profile-container">
            <img src="./assets/img/profile-picture.jpg" alt="Profile Pic" class="profile-picture">
            <div class="user-info">
                <h3>${subscriber.getName()}</h3>
                <p>${new Date().toLocaleDateString('en-US', date)}</p>
            </div>
        </div>
    `;

    const post = document.createElement('div');
    post.className = 'post';
    post.innerHTML = `
        ${postHeader.outerHTML}
        <p>${postContent}</p>
    `;

    if (chosenImage.src && chosenImage.src !== '#') {
        const postImage = document.createElement('img');
        postImage.src = chosenImage.src;
        postImage.alt = '';
        postImage.style.width = '100%';
        postImage.style.maxWidth = '100%';
        postImage.style.borderRadius = '5px';
        post.appendChild(postImage);
    }

    postsSection.appendChild(post);

    postText.value = '';

    chosenFileContainer.style.display = 'none';
    chosenImage.src = '';

    chosenFileName.textContent = '';
    chosenFileName.style.visibility = 'hidden';
});

imageInput.addEventListener('change', () => {
    document.getElementById('post').disabled = !imageInput.files[0] && !postText.value.trim();
});

imageInput.addEventListener('change', handleFileSelect);
