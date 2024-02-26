// DOM Elements
const formEl = document.querySelector('form')
const gridContainer = document.querySelector('.grid-container')
const ApiKey = '49f5a6d6a8af43c1aa6a7df4ecc71b53'

// Fetch News
const fetchNews = (e) => {
  e.preventDefault()

  // Get Values
  const userInputVal = document.querySelector('#search-term').value
  const languageVal = document.querySelector('#language').value
  const sortVal = document.querySelector('#sort').value

  //   Error Handling if there is no User Input
  if (userInputVal === '') {
    document.querySelector('#search-term').placeholder = 'Search term not found'
    return
  }

  // Fetch News
  fetch(
    `https://newsapi.org/v2/everything?q=${userInputVal}&language=${languageVal}&sortBy=${sortVal}&apiKey=${ApiKey}&pageSize=10`
  )
    .then((res) => res.json())
    .then((news) => {
      renderNews(news)
      errorHandling(news)
    })
    .catch((err) => console.log(err))
}

// Render News to Screen
const renderNews = (news) => {
  const template = news.articles

    .map((newArticle) => {
      const {
        title,
        author,
        description,
        urlToImage,
        content,
        url,
        publishedAt
      } = newArticle

      // Transform Date
      const newsDate = new Date(publishedAt)
      const newsDay = newsDate.getDate()
      const newMonth = newsDate.getMonth()
      const newsYear = newsDate.getFullYear()
      const renderDate = `${newsDay < 10 ? `0${newsDay}` : newsDay}.${
        newMonth < 10 ? `0${newMonth}` : newMonth
      }.${newsYear}`

      // Return Template
      return `
    <article>
        <h2>${title}</h2>
        <div class="author-date">
            <p>${author ? author : ''}</p>
            <p>${renderDate ? renderDate : 'Hello'}</p>
        </div>
        <h3>${description ? description : ''}</h3>
        <img src="${urlToImage ? urlToImage : ''}" alt="${title}">
        <p>${content}</p>
        <a href="${url}" target="_blank">Get more Information</a>
    </article>
    `
    })
    .join('')

  // Render innerHTML
  gridContainer.innerHTML = template
}

// Error Handling if there is no News for Users Input
const errorHandling = (news) => {
  if (news.articles.length === 0) {
    document.querySelector('#search-term').value = ''
    document.querySelector('#search-term').placeholder = 'Search term not found'
    return
  }
}

// Event Listeners
formEl.addEventListener('submit', fetchNews)
