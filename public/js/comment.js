//this is the comment form
const postId = document.querySelector('input[name="post-id"]').value;

const commentHandler = async (event) => {
    event.preventDefault();
    const content = document.querySelector('textarea[name="comment-body"]').value;
    console.log(content);

    if (content) {
        const response = await fetch('/api/comment', {
            method: 'POST',
            body: JSON.stringify({
                postId,
                comment,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            document.location.replace(`/posts/${postId}?`);
        } else {
            alert(response.statusText);
        }
    };
} 

//delete comment button

document.querySelector('#new-comment').addEventListener('submit', commentHandler);