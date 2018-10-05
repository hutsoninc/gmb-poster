const config = require('./data/config');

document.addEventListener('DOMContentLoaded', function () {
    // const postStoresRow = document.getElementById('post-stores-row');
    // const postStoresSelect = postStoresRow.querySelector('select');
    
    // config.forEach(function(store) {
    //     let el = document.createElement('option');
    //     el.value = store.id;
    //     el.innerText = store.name;
    //     el.selected = true;
    //     postStoresSelect.appendChild(el);
    // });
    
    M.AutoInit();
    
    M.CharacterCounter.init(document.querySelectorAll('.has-character-counter'));
    
    const postButtonRow = document.getElementById('post-button-row');
    const postButtonLinkRow = document.getElementById('post-button-link-row');

    postButtonRow.querySelector('select').addEventListener('change', function (event) {
        event.preventDefault();
        if(!event.target.value || event.target.value === 'CALL_NOW') {
            postButtonLinkRow.style.display = 'none';
        }else {
            postButtonLinkRow.style.display = 'block';
        }
    });
});



