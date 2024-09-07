

document.addEventListener('DOMContentLoaded', () => {

    const navLinks = document.querySelectorAll('.nav-link');
    const mainContent = document.querySelector('#main-content');

    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const url = this.getAttribute('href');

            history.pushState(null, '', url);

            fetch(url)
            .then(response => {
                if (!response.ok) throw new Error('Invalid response');
                return response.text();
            })
            .then(html => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                mainContent.innerHTML = doc.querySelector("#main-content").innerHTML;
            })
            .catch(err => console.error('Error fecthing the page', err.message));
        })
    })

    window.addEventListener('popstate', function () {
        const url = location.pathname;
        fetch(url)
            .then(response => {
                if (!response.ok) throw new Error('Invalid response');
                return response.text();
            })
            .then(html => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                mainContent.innerHTML = doc.querySelector("#main-content").innerHTML;
                
            })
            .catch(err => console.error('Error fecthing the page', err.message));
    });


})