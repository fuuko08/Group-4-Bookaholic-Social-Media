const likeBtn = document.querySelector('#like-btn');

const likeHandler = async (event) => {
    event.prevenDefault();

    const id = document.querySelector('.post').id;
    if (id) {
        try {
            const response = await fetch(`/api/like/${id}`, {
                method: 'POST',
            });
            const element = document.getElementById('like-post');
            const likes = document.querySelector('.likes-counter').getAttribute('data-value');

            if (response.like) {
                element.innerHTML = '';
                element.innerHTML = `<i class="fas fa-heart"></i><span class='likes-counter' data-value=${likes + 1}> ${likes + 1} likes</span>`;
            } else {
                element.innerHTML = '';
                element.innerHTML = `<i class="fas fa-heart"></i><span class='likes-counter' data-value=${likes - 1}> ${likes - 1} likes</span>`;
            }
        } catch (err) {
            console.log("Failed!", err);
        } 
    } else {
            console.log("Failed!", err);
    }
};

likeBtn.addEventListener('click', likeHandler);
