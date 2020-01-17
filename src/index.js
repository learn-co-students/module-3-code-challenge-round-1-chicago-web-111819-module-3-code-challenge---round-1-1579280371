let imageId = '4418'

const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

const likeURL = `https://randopic.herokuapp.com/likes/`

const commentsURL = `https://randopic.herokuapp.com/comments/`


document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')



// fetchPicture()

fetch (imageURL)
.then(resp => resp.json())
.then(image => 
  // console.log(image))
  renderImage(image))

  newComment()

})

function renderImage(imageObj){
  const card =  document.getElementById('image_card')
  const img = document.querySelector('img')
  const h4Name = document.getElementById('name')
  const likes = document.getElementById('likes')

  img.setAttribute('src', `${imageObj.url}`)
  h4Name.innerText = imageObj.name
  likes.innerText = imageObj.like_count
}

function newComment(){
  document.getElementById('comment_form').addEventListener("submit",
  function(event) {
      event.preventDefault();
    //hook form into new comment
    fetchNewComment(event.target.comment.value)
  }
)}

function fetchNewComment(formData){
  fetch(imageURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
  body: JSON.stringify(formData)
  })
  .then(resp => resp.json())
  .then(comment => renderNewComment(comment))
}

//^gets the comment object from the fetch post^
function renderNewComment(comObj){
  const ul = document.getElementById("comments")
  const li = document.createElement("li")

  li.innerText = comObj

  ul.append(li)
}