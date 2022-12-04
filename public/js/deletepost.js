const postId = document.querySelector('input[name="post-id"]').value;
const delButton = document.querySelector('#del-post-btn');

const deleteHandler = async () => {
    const response = await fetch(`/api/post/${postId}`, {
        method: 'DELETE'
    });
    if (response.ok) {
    document.location.replace('/');
    } else {
        alert(response.statusText);
    }
};

if(delButton!=null){
    delButton.addEventListener('click', deleteHandler);
}