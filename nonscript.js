const API_KEY = "pub_45361695c12fc36aa84589c6c69e2fb33b32f";
const URL = `https://api.thenewsapi.com/v1/news/top?api_token=${API_KEY}&locale=us&limit=3`;

document.addEventListener('load', () => fetchNews()); // Updated to use DOMContentLoaded for better timing

function reload() {
    window.location.reload();
}

async function fetchNews() {
    try {
        const response = await fetch(URL);
        const data = await response.json();
        bindData(data.data);
    } catch (error) {
        console.error('Error fetching news:', error); // Added error handling
    }
}

function bindData(data) {
    const cardsContainer = document.getElementById('cards-container');
    const newsTemplate = document.getElementById('template-news-card').content;
    cardsContainer.innerHTML = "";

    data.forEach(item => {
        if (!item.image_url) return;

        const cardClone = newsTemplate.cloneNode(true);
        fillDataInCard(cardClone, item);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector('.news-img');
    const newsTitle = cardClone.querySelector('.news-title');
    const newsSource = cardClone.querySelector('.news-source');
    const newsDesc = cardClone.querySelector('.news-desc');

    newsImg.src = article.image_url;
    newsTitle.textContent = article.title;
    newsDesc.textContent = article.description;
    const date = new Date(article.published_at).toLocaleString("en-US", { timeZone: "Asia/Jakarta" });
    newsSource.textContent = `${article.source} - ${date}`;

    cardClone.querySelector('.card').addEventListener('click', () => {
        window.open(article.url, "_blank");
    });
}

let currentNavItem = null;

function navClick(id) {
    fetchCategoryNews(id);
    const navItem = document.getElementById(id);
    currentNavItem?.classList.remove('active');
    currentNavItem = navItem;
    currentNavItem.classList.add('active');
}

const searchButton = document.getElementById('search-button');
const searchText = document.getElementById('search-text');

searchButton.addEventListener('click', () => {
    const query = searchText.value;
    if (!query) return;
    fetchCategoryNews(query);
    currentNavItem?.classList.remove('active');
    currentNavItem = null;
});

async function fetchCategoryNews(query) {
    try {
        const response = await fetch(`https://newsdata.io/api/1/news?apikey=${API_KEY}&q=${query}&language=en`);
        const data = await response.json();
        bindCategoryData(data.results);
    } catch (error) {
        console.error('Error fetching category news:', error); // Added error handling
    }
}

function bindCategoryData(articles) {
    const cardsContainer = document.getElementById('cards-container');
    const newsTemplate = document.getElementById('template-news-card').content;
    cardsContainer.innerHTML = "";

    result.forEach(article => {
        if (!article.image_url) return;

        const cardClone = newsTemplate.cloneNode(true);
        fillCategoryDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}

function fillCategoryDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector('.news-img');
    const newsTitle = cardClone.querySelector('.news-title');
    const newsSource = cardClone.querySelector('.news-source');
    const newsDesc = cardClone.querySelector('.news-desc');

    newsImg.src = article.image_url;
    newsTitle.textContent = article.title;
    newsDesc.textContent = article.description;
    const date = new Date(article.pubDate).toLocaleString("en-US", { timeZone: "Asia/Jakarta" });
    newsSource.textContent = `${article.source_id} - ${date}`;

    cardClone.querySelector('.card').addEventListener('click', () => {
        window.open(article.link, "_blank");
    });
}
