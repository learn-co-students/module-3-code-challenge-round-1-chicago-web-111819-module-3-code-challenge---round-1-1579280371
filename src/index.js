let imageId = 4417 //Enter the id from the fetched image here
const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
const likeURL = `https://randopic.herokuapp.com/likes/`
const commentsURL = `https://randopic.herokuapp.com/comments/`


function main() {

  document.addEventListener('DOMContentLoaded', () => {
    console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

    getImage()
    addNewCommentListener()

  })
}

function addNewCommentListener() {
    const commentForm = document.querySelector('#comment_form')
    commentForm.addEventListener('submit', event => {
      event.preventDefault()

      const newComment = {
        content = event.target.[0].value
      }

      postComment(newComment)

    })
}

function postComment(commentData) {

  

}

function getImage() {
  fetch(imageURL)
    .then(resp => resp.json())
    .then(image => renderImage(image))
}

function renderImage(image) {
  const myImg = document.querySelector('#image')
  myImg.src = image.url

  const imgName = document.querySelector('#name')
  imgName.innerText = image.name

  const likes = document.querySelector('#likes')
  likes.innerText = image.like_count

  const likeButton = document.querySelector('#like_button')
  likeButton.addEventListener('click', likeHandler)

  renderComments(image)
}

function likeHandler(event) {
  let likes = document.querySelector('#likes')
  let newLikes = likes.value + 1

  const likesObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({"likes": newLikes, "image_id": imageId})
  }

  fetch(likeURL, likesObj)
    .then(resp => resp.json())
    .then(likes)

}

function renderComments(image) {
  const commentsList = document.querySelector('#comments')
  const commentLi = document.createElement('li')
  image.comments.forEach(comment => {
    commentLi.innerText = comment.content
  })
  commentsList.append(commentLi)
}


main();