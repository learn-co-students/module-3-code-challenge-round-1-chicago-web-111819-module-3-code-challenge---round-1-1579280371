function main() {
  document.addEventListener('DOMContentLoaded', () => {
    console.log('%c DOM Content Loaded and Parsed!', 'color: magenta');

    let imageId = 4420 //Enter the id from the fetched image here

    const imageURL = `https://randopic.herokuapp.com/images/${imageId}`;

    const likeURL = `https://randopic.herokuapp.com/likes/`;

    const commentsURL = `https://randopic.herokuapp.com/comments/`;

    fetchImage(imageURL);
    likeListener();
    commentSubmitter();

  });
};

function fetchImage(imageURL) {
  fetch(imageURL)
  .then(resp => resp.json())
  .then(renderImage);
};

function renderImage(imageObj) {
  const img = document.querySelector('img#image');
  img.src = imageObj.url;
  img.dataset.id = imageObj.id;

  const title = document.querySelector('h4#name');
  title.innerText = imageObj.name;

  const likes = document.querySelector('span#likes');
  likes.innerText = imageObj.like_count;

  imageObj.comments.forEach( comment => renderComment(comment.content));
};

function renderComment(comment) {
  const commentList = document.querySelector('ul#comments');

  const li = document.createElement('li');
  li.innerText = comment;

  commentList.append(li);
};

function likeListener() {
  const button = document.querySelector('button#like_button');
  button.addEventListener('click', () => {
    renderLike();
    postLike();
  })
};

function renderLike() {
  //optimistically renders likes
  const likes = document.querySelector('span#likes');
  likes.innerText = parseInt(likes.innerText) + 1;
};

function postLike() {

};

function commentSubmitter() {
  const form = document.querySelector('form#comment_form')
  form.addEventListener('submit', e => {
    e.preventDefault();
    console.log(e.target.comment.value);
    //optimistically renders comment
    const comment = e.target.comment.value;
    renderComment(comment);
    form.reset();
  });
  
};

main();
