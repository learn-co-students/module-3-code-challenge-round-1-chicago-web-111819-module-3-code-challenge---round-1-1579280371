


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

}
