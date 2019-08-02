const apiUrl = 'https://api.themoviedb.org/3';
const token = '0adbb34bf81e230a73e19aaaeee72637';
const imgUrl = 'https://image.tmdb.org/t/p/w500';

const get = (url, params) => {
    url = `${apiUrl}/${url}?api_key=${token}`;

    Object.keys(params).forEach(key => {
        url += `&${key}=${params[key]}`;
    });

    return fetch(url).then(res => res.json());
};