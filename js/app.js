const searchInput = document.querySelector('.search');
const moviesWrap = document.querySelector('.movies');
const paginationContainer = document.querySelector('.pagination-container');
let movies = [];
let searchTimeout;

searchInput.addEventListener('input', () => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
        getMovies(1);
    }, 500);
});

const getMovies = (page) => {
    if (!searchInput.value) {
        clearMoviesWrap();
        paginationContainer.innerHTML = '';
        return;
    }

    sendNotification('Loading...');
    paginationContainer.innerHTML = '';

    get('search/movie', {query: searchInput.value, isAdult: false, page: page}).then(res => {
        movies = res.results;
        currentPage = res.page;
        numberOfPages = res.total_pages > 1000 ? 1000 : res.total_pages; // back limitation
        setShownPages();
        renderPagination();

        renderMovies();
    }, err => {
        movies = [];
        paginationContainer.innerHTML = '';
        sendNotification(`Error: ${err}`, true);
    });
};

const renderMovies = () => {
    clearMoviesWrap();
    paginationContainer.innerHTML = '';

    if (!movies.length) {
        sendNotification('Movies not found :(');
        return;
    }

    movies.forEach(movie => {
        renderMovie(movie);
    });
    renderPagination();
};
const renderMovie = movie => {
    const movieTemplate = `
    <div class="movie">
        <h2 class="title">${movie.title}</h2>
        <img src="${imgUrl + movie.poster_path}" alt="">
        <p class="description">
            ${movie.overview}
        </p>
    </div>
    `;

    moviesWrap.innerHTML += movieTemplate;
};

const clearMoviesWrap = () => {
    moviesWrap.innerHTML = '';
};

const sendNotification = (notificationText, isError) => {
    moviesWrap.innerHTML = isError ? `<h1 class="errorMessage">${notificationText}</h1>` : `<h1>${notificationText}</h1>`;
};

const renderPagination = () => {
    const createPageBtn = (value) => {
        const pageBtn = document.createElement('div');
        pageBtn.classList.add('page');
        pageBtn.innerHTML = value;

        return pageBtn;
    };

    paginationContainer.innerHTML = '';

    if (numberOfPages === 1) {
        return;
    }

    const prev = createPageBtn('Prev');
    const next = createPageBtn('Next');
    const first = createPageBtn('First');
    const last = createPageBtn('Last');

    prev.addEventListener('click', () => getMovies(currentPage - 1));
    next.addEventListener('click', () => getMovies(currentPage + 1));
    first.addEventListener('click', () => getMovies(1));
    last.addEventListener('click', () => getMovies(numberOfPages));

    if (shownPages[0] !== 1) {
        paginationContainer.appendChild(first);
    }
    if (isPrevExist) {
        paginationContainer.appendChild(prev);
    }

    shownPages.forEach(p => {
        let page = createPageBtn(p);
        if (p === currentPage) {
            page.classList.add('_active');
        }
        if (p !== currentPage) {
            page.addEventListener('click', () => {
                getMovies(p);
            });
        }
        paginationContainer.appendChild(page);
    });

    if (isNextExist) {
        paginationContainer.appendChild(next);
    }
    if (shownPages[shownPages.length - 1] !== numberOfPages) {
        paginationContainer.appendChild(last);
    }
};
