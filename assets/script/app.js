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

            // Show the chosen file container
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

    // Get post text and other form data
    const postContent = postText.value;

    // Check if both post text and image are empty
    if (!(postContent.trim() || chosenImage.src)) {
        // Display an error by focusing on the textarea
        postText.focus();
        return; // Prevent further execution
    }

    // Create a post header with user information
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

    // Create a post element
    const post = document.createElement('div');
    post.className = 'post';
    post.innerHTML = `
        ${postHeader.outerHTML}
        <p>${postContent}</p>
    `;

    // Check if there is a chosen image
    if (chosenImage.src && chosenImage.src !== '#') {
        const postImage = document.createElement('img');
        postImage.src = chosenImage.src;
        postImage.alt = '';
        postImage.style.width = '100%';
        postImage.style.maxWidth = '100%';
        postImage.style.borderRadius = '5px';
        post.appendChild(postImage);
    }

    // Append the post to the posts section
    postsSection.appendChild(post);

    // Clear the text area after posting
    postText.value = '';

    // Hide the chosen file container
    chosenFileContainer.style.display = 'none';
    // Clear the chosen image source
    chosenImage.src = '';

    // Clear the chosen filename and hide it
    chosenFileName.textContent = '';
    chosenFileName.style.visibility = 'hidden';
});

// Event listener for file input change
imageInput.addEventListener('change', () => {
    document.getElementById('post').disabled = !imageInput.files[0] && !postText.value.trim();
});

// Event listener for file input change
imageInput.addEventListener('change', handleFileSelect);
