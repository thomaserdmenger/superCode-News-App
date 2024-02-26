// DOM Elements
const formEl = document.querySelector('form')
const ApiKey = '49f5a6d6a8af43c1aa6a7df4ecc71b53'

// Fetch News
const fetchNews = (e) => {
  e.preventDefault()

  // Get Values
  const userInputVal = document.querySelector('#search-term').value
  const languageVal = document.querySelector('#language').value
  const sortVal = document.querySelector('#sort').value

  //   Error Handling if there is no User Input
  const seachPlaceholder = document.querySelector('#search-term').placeholder

  if (userInputVal === '') {
    document.querySelector('#search-term').placeholder = 'Search term not found'
    return
  }

  // Fetch News
  fetch(
    `https://newsapi.org/v2/everything?q=${userInputVal}&language=${languageVal}&sortBy=${sortVal}&apiKey=${ApiKey}`
  )
    .then((res) => res.json())
    .then((news) => {
      renderNews(news)
      errorHandling(news)
    })
}

// Render News to Screen
const renderNews = (news) => {
  if (news.articles.length === 0) {
    document.querySelector('#search-term').value = ''
    document.querySelector('#search-term').placeholder = 'Search term not found'
    return
  }
}

// Error Handling
const errorHandling = (news) => {
  console.log(news)
}

// Event Listeners
formEl.addEventListener('submit', fetchNews)
