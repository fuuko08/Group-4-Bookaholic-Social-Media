// check commentcard and modal 
const actionsModal = document.querySelector('.actions-modal.actions');
const modalTrigger = document.querySelector('.modal-trigger.actions');
const deletePost = document.querySelector('.delete-post');

modalTrigger.addEventListener('click', async function () {
    try {
        const userId = modalTrigger.getAttribute('user.id');
        const postId = modalTrigger.parentElement.parentElement.parentElement.id;
        const getUser = await getRequest(`api/users/user`);
        if (+userId === +getUser.user) {
            deletePost.classList.remove('is-hidden');
        }
        deletePost.addEventListener('click', async (event) => {
            event.preventDefault();
            try {
                const postData = await makeRequest(`/api/posts/${postId}`, 'DELETE');
                window.location.replace('/');
            } catch (err) {
                console.log('Failed to login', err);
            }
        });

        actionsModal.classList.add('is-active');

        const modalBg = document.querySelector('.modal-background.actions');
        modalBg.addEventListener('click', function () {
            actionsModal.classList.remove('is-active');
        });
        document.querySelector('.cancel.actions').addEventListener('click', function () {
            actionsModal.classList.remove('is-active');
        });
    } catch (err) {
        console.log(err);
    }
});