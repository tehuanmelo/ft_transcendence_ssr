document.addEventListener('DOMContentLoaded', function () {

    document.body.addEventListener('click', function(event) {
        event.preventDefault();
        const target = event.target;

        if (target.matches('.spa-link')) {
            const method = target.getAttribute('data-method');
            const url = target.getAttribute('href');
            const formSelector = target.getAttribute('data-form');

            if (method === 'GET') {
                getPage(url);
            } else if (method === 'POST' && formSelector) {
                postForm(formSelector, url);
            }
        }
    });

    window.addEventListener('popstate', function(event) {
        const url = document.location.pathname;
        getPage(url);
    })

});

function updateURL(url, title) {
    history.pushState(null, title, url);
    document.title = title;
}


function getPage(url) {
    fetch(url)
    .then(response => {
        if (!response.ok) throw new Error('Invalid response');
        return response.text();
    })
    .then(html => {
        console.log(html);
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const newContent = doc.querySelector('#main-content').innerHTML;
        const newTitlle = doc.querySelector('title').innerHTML;

        document.querySelector('#main-content').innerHTML = newContent;
        document.title = newTitlle;
        updateURL(url, newTitlle);
    })
    .catch(err => console.error('Error fetching the page', err.message));
}


function postForm(formSelector, url) {
    const form = document.querySelector(formSelector);
    const formData = new FormData(form);
    const redirectUrl = form.getAttribute('data-redirect');

    fetch(url, {
        method: 'POST',
        headers: {
            'X-CSRFToken': formData.get('csrfmiddlewaretoken')
        },
        body: formData
    })
    .then(response => {
        if (!response.ok) throw new Error('Invalid login post request');
        return response.text();
    })
    .then(html => {
        console.log(html);
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const newContent = doc.querySelector('#main-content').innerHTML;
        const newTitlle = doc.querySelector('title').innerHTML;

        document.querySelector('#main-content').innerHTML = newContent;
        document.title = newTitlle;

        updateURL(redirectUrl, newTitlle);
    })
    .catch(error => {
        console.error('Login error:', error);
    });
}


