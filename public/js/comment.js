const commentHandler = async (event) => {
    event.preventDefault();
    const comment = document.querySelector('#comment-text').value.trim();
    const postId = document.querySelector('#commentBtn').value.trim();
    
    if (comment) {
        const response = await fetch('/api/comment', {
            method: 'POST',
            body: JSON.stringify({               
                comment,
                postId,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            document.location.replace(`/post/${id}`);
        } else {
            alert(response.statusText);
        }
    };
} 
document.querySelector('.comment-form').addEventListener('submit', commentHandler);