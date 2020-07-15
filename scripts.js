let newsList = []
let categories = ['All', 'Business', 'Entertainment', 'General', 'Health', 'Science', 'Sports', 'Technology'];
let selectedCategory = "";
let selectedKw = "";

const callApi = async () => {

  let url = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=876bcc6bf4764a6db0d9a6495d4b32af&pageSize=10'
  let data = await fetch(url)
  let result = await data.json()

  newList = result.articles
  console.log("this is your newslist:", newList)

  render(newList)
}




//6. make it pretty

const render = (list) => {
  let newsHTML = list.map(item => {
    let publishedAt = moment(item['publishedAt']).fromNow()
    return ` <div class="card" style="width: 18rem;">
        <img src="${item.urlToImage}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title"><a href="${item.url}">${item.title}</h5>
          <p class="card-text">${item.description}</p>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">${publishedAt}</li>
          <li class="list-group-item">${item.source.name}</li>
          <li class="list-group-item">${item.author}</li>
        </ul>
      </div>`
  })


  document.getElementById("newListArea").innerHTML = newsHTML
}

const callApiByCategory = async (category) => {
  selectedCategory = category
  let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=876bcc6bf4764a6db0d9a6495d4b32af&category=${category}&pageSize=10`
  let data = await fetch(url)
  let result = await data.json()

  newList = result.articles
  console.log("this is your newslist:", newList)

  render(newList)
}

const callApiByKeyword = async (kw) => {
  selectedKw = kw
  let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=876bcc6bf4764a6db0d9a6495d4b32af&q=${kw}&pageSize=10`
  let data = await fetch(url)
  let result = await data.json()

  newList = result.articles
  console.log("this is your newslist:", newList)

  render(newList)
}

callApi()

window.onscroll = function (ev) {
  let n = 1;
  console.log(window.innerHeight + window.scrollY)
  if ((window.innerHeight + window.scrollY) + 1 >= document.body.scrollHeight) {
    // you're at the bottom of the page
    n++
    loadMore(n, selectedCategory, selectedKw);
  }
};

const loadMore = async (num, category, keyword) => {
  console.log(category, keyword)
  let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=876bcc6bf4764a6db0d9a6495d4b32af&pageSize=10&page=${num}&category=${category}&q=${keyword}`
  let data = await fetch(url)
  let result = await data.json()

  newList.push(...result.articles)
  console.log("this is your newslist:", newList)

  render(newList)
}

const callApiBySource = async (source) => {
  let url = `https://newsapi.org/v2/top-headlines?apiKey=876bcc6bf4764a6db0d9a6495d4b32af&pageSize=10&sources=${source}`
  let data = await fetch(url)
  let result = await data.json()

  newList = result.articles
  console.log("this is your newslist:", newList)

  render(newList)
}
