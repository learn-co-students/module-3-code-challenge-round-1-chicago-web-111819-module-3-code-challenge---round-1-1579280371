let imageId = 4416 //Enter the id from the fetched image here
const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
const likeURL = `https://randopic.herokuapp.com/likes/`
const commentsURL = `https://randopic.herokuapp.com/comments/`

const main = () => {
	document.addEventListener('DOMContentLoaded', () => {
		console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

		fetchImage(imageURL)
		likeImg()
		commentImg()
	  })
}

const fetchImage = (imageURL) => {
	fetch(imageURL)
		.then(resp => resp.json())
		.then(imgObj => renderImage(imgObj))
}

const renderImage = (imgObj) => {
	const imgCardDiv = document.querySelector('div#image_card')
	
	const imgTag = imgCardDiv.children[0]
	imgTag.src = imgObj.url

	const h4 = imgCardDiv.children[1]
	h4.innerText = imgObj.name

	const likesSpan = imgCardDiv.children[2].firstElementChild
	likesSpan.innerText = imgObj.like_count
}

const likeImg = () => {
	const likeBtn = document.querySelector('#like_button')
	likeBtn.addEventListener('click', (e) => {
		const likesCount = e.target.previousElementSibling.firstElementChild
		const newLikeCount = parseInt(likesCount.innerText)+1

		likesCount.innerText = newLikeCount

		reqObj = {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json"
			},
			body: JSON.stringify({like_count: newLikeCount})
		}

		// fetch(likeURL, reqObj) //WHAT ROUTE TO USE FOR PATCH?!!?!
	})
}

const commentImg = () => {
	const commentForm = document.querySelector('form#comment_form')

	commentForm.addEventListener('submit', (e) => {
		e.preventDefault()
		const ul = document.querySelector('ul#comments')
		const li = document.createElement('li')
		const commentText = e.target.firstElementChild.value
		li.innerText = commentText
		ul.append(li)

		// postNewComment(commentText)
	})
}

// const postNewComment = (commentText) => {

// 	const bodyObj = {
// 		comments: {
// 			content: aaaa,
// 			image_id: ssss,
// 		}
// 	}
// 	reqObj = {
// 		method: "POST",
// 		headers: {
// 			"Content-Type": "application/json",
// 			Accept: "application/json"
// 		},
// 		body: JSON.stringify()
// 	}
// }

main()