const likePostHandler = async (event) => {
    event.preventDefault();

    let likes = 0;

    await fetch(`/api/post/${postId}`)
        .then(resource => resource.json())
        .then((data) => { likes = data.likes });
    
    let newLikes = likes + 1;

    await fetch('/api/post/1', {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ "likes": newLikes })
    });
    if (response.ok) {
        document.location.reload();
    } else {
        alert(response.statusText);
    };

    let likesText = `${newLikes} likes`;
    return likesText;
};

document.querySelector('.like-btn').addEventListener('click', likePostHandler);
