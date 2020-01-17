document.addEventListener("DOMContentLoaded", () => {
  console.log("%c DOM Content Loaded and Parsed!", "color: magenta");
  let imageId = 4414; //Enter the id from the fetched image here
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`;
  fetchImage(imageURL);
  addLikeBtnListener(imageURL);
  addCommentFormListener();
});

function fetchImage(imageURL) {
  fetch(imageURL)
    .then(resp => resp.json())
    .then(image => {
      renderImage(image);
    });
}

function renderImage(image) {
  const imageTag = document.querySelector("#image");
  imageTag.src = image.url;
  const nameTag = document.querySelector("#name");
  nameTag.innerText = image.name;
  const likesTag = document.querySelector("#likes");
  likesTag.innerText = image.like_count;
  const commentsUl = document.querySelector("#comments");
  commentsUl.innerHTML = "";
  image.comments.forEach(comment => renderComment(comment));
}

function renderComment(comment) {
  const commentsUl = document.querySelector("#comments");
  const liEl = document.createElement("li");
  liEl.id = `${comment.id}`;
  liEl.innerText = comment.content;
  const delBtn = document.createElement("button");
  delBtn.id = `delete-${comment.id}`;
  delBtn.innerText = "Delete";
  liEl.appendChild(delBtn);
  commentsUl.appendChild(liEl);
  delBtn.addEventListener("click", function() {
    deleteComment(comment);
  });
}

function addLikeBtnListener(imageURL) {
  const likeBtn = document.querySelector("#like_button");
  likeBtn.addEventListener("click", function() {
    const likeURL = `https://randopic.herokuapp.com/likes`;
    reqObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        image_id: 4414
      })
    };
    fetch(likeURL, reqObj)
      .then(resp => resp.json())
      .then(fetchImage(imageURL));
  });
}

function addCommentFormListener() {
  const commentForm = document.querySelector("#comment_form");
  const comment = document.querySelector("#comment_input").value;
  commentForm.addEventListener("submit", function() {
    event.preventDefault();
    postComment();
    event.target.reset();
  });
}
function postComment() {
  const comment = document.querySelector("#comment_input").value;
  const commentsURL = `https://randopic.herokuapp.com/comments`;
  const reqObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      image_id: 4414,
      content: comment
    })
  };
  fetch(commentsURL, reqObj)
    .then(resp => resp.json())
    .then(comment => {
      renderComment(comment);
    });
}

function deleteComment(comment) {
  liEl = document.getElementById(`${comment.id}`);
  const commentURL = `https://randopic.herokuapp.com/comments/${comment.id}`;
  fetch(commentURL, { method: "DELETE" });
  liEl.remove();
}
