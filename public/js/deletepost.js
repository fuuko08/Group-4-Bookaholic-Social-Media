const postId = document.querySelector('input[name="post-id"]').value;
const delButton = document.querySelector('#del-post-btn');

const deleteHandler = async () => {
    await fetch(`/api/post/${postId}`, {
        method: 'DELETE'
    });
    document.location.replace('/');
};

if(delButton!=null){
    delButton.addEventListener('click', deleteHandler);
}


