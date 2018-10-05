const createPost = require('./post');
const { dialog } = require('electron').remote;

const createPostButton = document.getElementById('create-post');
const createOfferPostButton = document.getElementById('create-offer-post');
const postContainer = document.getElementById('post-container');
const offerPostContainer = document.getElementById('offer-post-container');
const selectPostPhotoButton = document.getElementById('select-post-photo');
const postPhotoInput = document.getElementById('post-photo');

createPostButton.addEventListener('click', function (event) {
    event.preventDefault();
    postContainer.style.display = 'block';
    offerPostContainer.style.display = 'none';
});

createOfferPostButton.addEventListener('click', function (event) {
    event.preventDefault();
    postContainer.style.display = 'none';
    offerPostContainer.style.display = 'block';
});

selectPostPhotoButton.addEventListener('click', openFile);

postContainer.querySelector('form').addEventListener('submit', function (event) {
    event.preventDefault();

    let { "post-summary": postSummary, "post-photo": postPhoto, "post-button": postButton, "post-button-link": postButtonLink } = this;

    postSummary = postSummary.value;
    postPhoto = postPhoto.value;

    let postData = {
        postSummary,
        postPhoto
    };

    if (postButton) {
        postButton = postButton.value;
        postButtonLink = postButtonLink.value;

        Object.assign(postData, {
            postButton,
            postButtonLink
        });
    }

    console.log(postData);

    createPost(postData);
});

function openFile() {
    dialog.showOpenDialog({
        filters: [
            { name: 'Images', extensions: ['jpg', 'png'] }
        ]
    }, function (fileNames) {
        if (fileNames === undefined) return;
        var fileName = fileNames[0];
        postPhotoInput.value = fileName;
        M.updateTextFields();
    });
}