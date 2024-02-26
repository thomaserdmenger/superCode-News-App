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

  // Fetch Data
  fetch(
    `https://newsapi.org/v2/everything?q=${userInputVal}&language=${languageVal}&sortBy=${sortVal}&apiKey=${ApiKey}`
  )
    .then((res) => res.json())
    .then((news) => console.log(news))
}

// Event Listeners
formEl.addEventListener('submit', fetchNews)
