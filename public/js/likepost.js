const likeBtn = document.querySelector('#like-btn');

const likeHandler = async (event) => {
    event.preventDefault();

    const id = document.querySelector('.card').id;
    if (id) {
        try {
            const response = await fetch(`/api/like/:${id}`, 'POST');
      
            const element = document.getElementById('like-post');
            const likes = document.querySelector('.likes-counter').getAttribute('data-value');

            if (response.like) {
                element.innerHTML = '';
                element.innerHTML = `<i class="fas fa-heart"></i><span class='likes-counter' data-value=${likes + 1}> ${likes + 1} likes</span>`;
            } else {
                element.innerHTML = '';
                element.innerHTML = `<i class="fas fa-heart"></i><span class='likes-counter' data-value=${likes - 1}> ${likes - 1} likes</span>`;
            };
        } catch (err) {
            console.log("Failed!", err);
        } 
    } else {
            console.log("Failed!");
    }
};

likeBtn.addEventListener('click', likeHandler);
