function main() {
  document.addEventListener('DOMContentLoaded', () => {
    console.log('%c DOM Content Loaded and Parsed!', 'color: magenta');

    let imageId = 4420 //Enter the id from the fetched image here

    const imageURL = `https://randopic.herokuapp.com/images/${imageId}`;

    const likeURL = `https://randopic.herokuapp.com/likes/`;

    const commentsURL = `https://randopic.herokuapp.com/comments/`;

    fetchImage(imageURL);
    likeListener(likeURL);
    commentSubmitter(commentsURL);

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

function likeListener(likeURL) {
  const button = document.querySelector('button#like_button');
  button.addEventListener('click', (e) => {
    renderLike();
    const likeObj = {
      image_id: e.target.parentNode.firstElementChild.dataset.id
    };
    postLike(likeObj,likeURL);
  });
};

function renderLike() {
  //optimistically renders likes
  const likes = document.querySelector('span#likes');
  likes.innerText = parseInt(likes.innerText) + 1;
};

function postLike(likeObj,URL) {
  const reqObj = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(likeObj)
  };
  fetch(URL,reqObj)
  .catch(console.log);
};

function commentSubmitter(commentsURL) {
  const form = document.querySelector('form#comment_form')
  form.addEventListener('submit', e => {
    e.preventDefault();
    console.log(e.target.parentNode.firstElementChild.dataset.id);
    //optimistically renders comment
    const comment = e.target.comment.value;
    renderComment(comment);
    const imageId = e.target.parentNode.firstElementChild.dataset.id;
    const commentObj = {
      content: comment,
      image_id: imageId
    };
    postComment(commentObj,commentsURL);
    form.reset();
  });
};

function postComment(commentObj,URL) {
  const reqObj = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(commentObj)
  };

  fetch(URL, reqObj)
  .catch(console.log);
};

main();
