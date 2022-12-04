//delete comment button
const deleteComment = async (event) => {
    event.preventDefault();

    const id = window.location.toString().split('/')[window.location.toString().split('/').length - 1];
    console.log("what is" + id);

    const currentTarget = $(event.currentTarget);
    const commentId = currentTarget.attr('data-id');

    const response = await fetch(`/api/comment/${commentId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json'},
    });

    if (response.ok) {
        document.location.replace(`/post/${id}`);
    } else {
        alert (response.statusText);
    }
}
 
document.querySelector('#delComBtn').addEventListener('click', deleteComment);