const postId = document.querySelector('input[name="post-id"]').value;

// this is the edit form
const editFormHandler = async (event) => {
    event.preventDefault();
    
    const content = document.querySelector('#post-content').value.trim();

    const response = await fetch(`/api/post/${postId}`, {
        method: 'PUT',
        body: JSON.stringify({
            content,
        }),
        headers: {'Content-Type': 'application/json'}
    });
    if (response.ok) {
        document.location.replace('/');
    } else {
        alert("Something wrong!");
    }
    document.location.replace('/');
};

document.querySelector('.edit-form').addEventListener('submit', editFormHandler);
