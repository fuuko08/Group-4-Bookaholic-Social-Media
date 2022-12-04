const postId = document.querySelector('input[name="post-id"]').value;

const deleteHandler = async () => {
    await fetch(`/api/post/${postId}`, {
        method: 'DELETE'
    });
    document.location.replace('/');
};

document.querySelector('#del-post-btn').addEventListener('click', deleteHandler);