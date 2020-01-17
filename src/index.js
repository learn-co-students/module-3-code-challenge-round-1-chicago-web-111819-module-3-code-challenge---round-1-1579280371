function main() {
  document.addEventListener('DOMContentLoaded', () => {
    console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

    let imageId = 4420 //Enter the id from the fetched image here

    const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

    const likeURL = `https://randopic.herokuapp.com/likes/`

    const commentsURL = `https://randopic.herokuapp.com/comments/`

    fetchImage(imageURL)

  })
}

function fetchImage(imageURL) {
  fetch(imageURL)
  .then(resp => resp.json())
  .then(renderImage)
}

function renderImage(imageObj) {
  const img = document.querySelector('img#image')
  img.src = imageObj.url
  img.dataset.id = imageObj.id

  const title = document.querySelector('h4#name')
  title.innerText = imageObj.name

  const likes = document.querySelector('span#likes')
  likes.innerText = imageObj.like_count

  imageObj.comments.forEach(renderComment)
}

function renderComment(comment) {
  const commentList = document.querySelector('ul#comments')

  const li = document.createElement('li')
  li.dataset.id = comment.id
  li.innerText = comment.content

  commentList.append(li)
}

main()
