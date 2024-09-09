document.addEventListener('DOMContentLoaded', function () {

    document.body.addEventListener('click', function(event) {
        event.preventDefault();
    
        if (event.target.matches('.login')) {
            getLogin();
        } else if (event.target.matches('.login-button')) {
            postLogin();
        } else if (event.target.matches('.logout-link')) {
            getLogout();
        }
    });

    document.addEventListener('submit', function (event) {
        event.preventDefault();
        
        if (event.target.matches('#login-form')) {
            alert('submit detectado');

        }
    });


});

function getLogin() {
    fetch('users/login')
    .then(response => {
        if (!response.ok) throw new Error('Invalid response');
        return response.text();
    })
    .then(html => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const newContent = doc.querySelector('#main-content').innerHTML;
        document.querySelector('#main-content').innerHTML = newContent;
    })
    .catch(err => console.error('Error fetching the page', err.message));
}



function getLogout() {
    fetch('users/logout')
    .then(response => {
        if (!response.ok) throw new Error('Invalid response');
        return response.text();
    })
    .then(html => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const newContent = doc.querySelector('#main-content').innerHTML;
        document.querySelector('#main-content').innerHTML = newContent;
    })
    .catch(err => console.error('Error fetching the page', err.message));
}



function postLogin() {
    console.log('inside post login');
    const form = document.querySelector('#login-form'); 

    const formData = new FormData(form);


    fetch('users/login/', {
        method: 'POST',
        headers: {
            'X-CSRFToken': formData.get('csrfmiddlewaretoken') // Inclui o token CSRF
        },
        body: formData 
    })
    .then(response => {
        if (!response.ok) throw new Error('Invalid response');
        console.log(response);
        return response.text();
    })
    .then(html => {
        console.log(html);
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const newContent = doc.querySelector('#main-content').innerHTML;
        document.querySelector('#main-content').innerHTML = newContent;
    })
    .catch(error => {
        console.error('Login error:', error);
    });
}


