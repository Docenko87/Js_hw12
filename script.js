
let currentPage = 1;

function displayMovies(response) {
    const movies = response.Search;
    const totalResults = parseInt(response.totalResults);
    const totalPages = Math.ceil(totalResults / 10); // Предполагаем, что на каждой странице 10 результатов

    const movieList = document.createElement('ul');
    movies.forEach(function(movie) {
        const listItem = document.createElement('li');
        listItem.textContent = movie.Title;
        movieList.appendChild(listItem);
    });

    // Очищаем контейнер перед отображением новых результатов
    const container = document.querySelector('.container');
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    // Вставляем список фильмов под форму поиска
    container.appendChild(movieList);

    // Добавляем кнопки пагинации
    const pagination = document.createElement('div');
    pagination.className = 'pagination';
    if (currentPage > 1) {
        const prevButton = document.createElement('button');
        prevButton.textContent = 'Previous';
        prevButton.addEventListener('click', function() {
            currentPage--;
            searchMovies();
        });
        pagination.appendChild(prevButton);
    }
    if (currentPage < totalPages) {
        const nextButton = document.createElement('button');
        nextButton.textContent = 'Next';
        nextButton.addEventListener('click', function() {
            currentPage++;
            searchMovies();
        });
        pagination.appendChild(nextButton);
    }
    container.appendChild(pagination);
}

function searchMovies() {
    const movieTitle = document.getElementById('movieTitle').value;
    const type = document.getElementById('type').value;
    const apiKey = '4506c676'; // Замените YOUR_OMDB_API_KEY на ваш собственный ключ API

    // Создание запроса
    const xhr = new XMLHttpRequest();
    const url = `http://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(movieTitle)}&type=${type}&page=${currentPage}`;

    // Отправка запроса
    xhr.open('GET', url, true);

    xhr.onload = function() {
        if (xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            if (response.Response === 'True') {
                displayMovies(response);
            } else {
                const container = document.querySelector('.container');
                container.textContent = 'Movie not found!';
            }
        } else {
            console.error('Ошибка запроса');
        }
    };

    xhr.send();
}

// Вызываем функцию поиска при отправке формы
document.getElementById('searchForm').addEventListener('submit', function(e) {
    e.preventDefault();
    currentPage = 1;
    searchMovies();
});

