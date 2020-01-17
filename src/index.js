let imageId = 4415 //Enter the id from the fetched image here
const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
const likeURL = `https://randopic.herokuapp.com/likes/`
const commentsURL = `https://randopic.herokuapp.com/comments/`

function fetchImage(){
  return fetch(imageURL)
    .then(resp => resp.json())
    .then(json => displayImageInfo(json))
};

function displayImageInfo(obj){
  let parentDiv = document.getElementById('image_card')
  let img = document.createElement('img');
  img.src = obj.url;
  parentDiv.insertBefore(img, parentDiv.children[2]);

  let findH4 = document.getElementById('name');
  findH4.innerText = obj.name;

  let numLikes = document.getElementById('likes');
  numLikes.innerText = obj.like_count;

  for (const comment of obj.comments){
    let ul = document.getElementById('comments');
    let li = document.createElement('li');
    li.innerText = comment.content;
    ul.append(li);
  };
};

function incrementLike(){
  let numLikes = document.getElementById('likes');
  numInt = parseInt(numLikes.innerText);
  numInt++;
  numLikes.innerText = numInt;

  let imgConfig = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      image_id: 4415,
      like_count: numLikes.innerText
    })
  };

  fetch(likeURL, imgConfig)
    .then(resp => resp.json())
    .then(json => console.log(json))
};

function addComment(){
  console.log('general kenobi')
  let commentInput = document.querySelector('input');
  let commentContent = commentInput.value;
  let commentData = {
    content: commentContent
  };

  let ul = document.getElementById('comments');
  let li = document.createElement('li');
  li.innerText = commentContent;
  ul.append(li);

  commentInput.value = ''

  let liValues = document.querySelectorAll('li')
  let commentData = []
  for (const comment of liValues){
    
  }

  let imgConfig = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      image_id: 4415,
      comments: commentData
    })
  };

  fetch(likeURL, imgConfig)
    .then(resp => resp.json())
    .then(json => console.log(json))
};


function globalListener(){
  document.addEventListener('click', function(e){
    e.preventDefault();
    console.log(e.target);
    let likeBtn = document.getElementById('like_button');
    let inputList = document.querySelectorAll('input');
    let submitBtn = inputList[1];
    if (e.target === likeBtn){
      incrementLike();
    } else if (e.target === submitBtn) {
      addComment();
      
    }
  })
};

document.addEventListener('DOMContentLoaded', function(){
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta');

  fetchImage();
  globalListener();
})
