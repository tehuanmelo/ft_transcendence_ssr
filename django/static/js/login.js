document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM fully loaded and parsed');

    document.getElementById('login-form').addEventListener('submit', function (event) {
        event.preventDefault();  // Impede o comportamento padrão de recarregar a página

        const formData = new FormData(this);  // Obtém os dados do formulário
        const url = this.getAttribute('data-url');
        const mainContent = document.querySelector('#main-content');

        console.log('hello');
        console.log(mainContent.innerHTML)

        fetch(url, {
        method: 'POST',
        headers: {
            'X-Requested-With': 'XMLHttpRequest',  // Mark the request as AJAX
            'X-CSRFToken': document.querySelector('[name=csrfmiddlewaretoken]').value  // Include the CSRF token
        },
        body: formData
        })
        .then(response => {
            if (response.ok) {
                return response.text();
            } else {
                throw new Error('Network response was not ok');
            }
        })
        .then(data => {
            history.pushState(null, '', url);
            const parser = new DOMParser();
            const doc = parser.parseFromString(data, 'text/html');
            mainContent.innerHTML = doc.querySelector("#main-content").innerHTML;
        })
        .catch(error => {
            console.error('Login error:', error);
            document.getElementById('login-message').textContent = 'Login failed. Please try again.';
        });
    });

});