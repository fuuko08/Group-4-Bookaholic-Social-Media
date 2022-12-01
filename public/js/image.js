
function addLike(image) {
    let likes = 0;
    fetch(`/api/post/${postId}`)
}

function addPic(data) {
    const likeCount = document.querySelector('.like');
    likeCount.innerHTML = `${data.like} like`;

    const likeBtn = document.querySelector('.like-btn');

    likeBtn.addEventListener('click', function(event) {
        likeCount.innerHTML = addLikes(DataTransfer)
    }); 
}