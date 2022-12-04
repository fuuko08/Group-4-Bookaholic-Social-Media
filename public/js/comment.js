const commentHandler = async (event) => {
    event.preventDefault();
    console.log("start upload comment");
    const comment = document.querySelector('#comment-text').value.trim();
    const postId = document.querySelector('input[name="post-id"]').value;
    console.log(postId);
    if (comment) {
        const response = await fetch('/api/comment', {
            method: 'POST',
            body: JSON.stringify({               
                comment: comment,
                postId: postId,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            document.location.replace(`/post/${postId}`);
        } else {
            alert(response.statusText);
        }
    };
} 
if(document.querySelector('.comment-form') !=null){
    document.querySelector('.comment-form').addEventListener('submit', commentHandler);
}

