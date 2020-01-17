


  // https://randopic.herokuapp.com/images/4419
  let imageId = 4419; //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`;

  const likeURL = `https://randopic.herokuapp.com/likes/`;

  const commentsURL = `https://randopic.herokuapp.com/comments/`;

document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: gold');

  loadImage();
});

function loadImage() {
  fetch(imageURL)
    .then(response => response.json())
    .then(imageData => {
      console.log(imageData);
      renderImage(imageData);
    });
}

function renderImage(imageData) {
  // locate Elements.
  let imgTag = document.querySelector("#image");
  let imgName = document.querySelector("#name");
  let imgLikes = document.querySelector("#likes");
  let imgCommentsDisplay = document.querySelector("#comments");
  let likeBtn = document.querySelector("#like_button");
  let commentForm = document.forms["comment_form"];
  let commentField = document.querySelector("#comment_input");
  

  // insert data
  imgTag.src = imageData.url;
  imgName.innerHTML = imageData.name;
  imgLikes.innerHTML = imageData.like_count;

  let comments = imageData.comments;
  for(let comment of comments) {
    let li = document.createElement("li");
    li.innerHTML = comment.content;
    imgCommentsDisplay.appendChild(li);
  }

  // set up click listening
  likeBtn.addEventListener("click", (e) => {
    e.preventDefault();
    let currentLikesCount = imgLikes.innerHTML;
    let newLikesCount = Number.parseInt(currentLikesCount) + 1;
    imgLikes.innerHTML = newLikesCount;

    let likesData = {
      image_id: imageData.id,
      like_count: newLikesCount
    }

    // backend
    let likesConfig = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(likesData)
    }

    fetch(likeURL, likesConfig)
      .then(res => res.json())
      .then(likes => console.log(likes));
  });

  // comment
  commentForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let comment = commentField.value;

    
    let li = document.createElement("li");
    li.innerHTML = comment;
    imgCommentsDisplay.appendChild(li);

    let commentData = {
      image_id: imageData.id,
      content: comment
    }
    let commentConfig = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(commentData)
    }

    fetch(commentsURL, commentConfig)
      .then(res => res.json())
      .then(comment => console.log(comment));

    e.target.reset();
  });

}
