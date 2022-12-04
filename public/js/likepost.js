const likeBtn = document.querySelector('#like-btn');
const id = document.querySelector('input[name="post-id"]').value;

const likeHandler = async (event) => {
    event.preventDefault();

    if (id) {
        try {            
            const response = await fetch(`/api/like/${id}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            }).then(
                (res) => {
                    return res.json();
                }).then((jsonRes) => {
                    const element = document.getElementById('like-post');
                    const likes = +document.querySelector('.likes-counter').getAttribute('data-value');

                    if (jsonRes.like) {

                        element.innerHTML = '';
                        element.innerHTML = `<i class="fas fa-heart"></i><span class='likes-counter' data-value=${likes + 1}> ${likes + 1} likes</span>`;
                    } 
                    else {
                        element.innerHTML = '';
                        element.innerHTML = `<i class="fas fa-heart"></i><span class='likes-counter' data-value=${likes - 1}> ${likes - 1} likes</span>`;
                    }
                });
            
            
        } catch (err) {
            console.log("Failed!", err);
        } 
    } else {
            console.log("Failed!");
    }
};

likeBtn.addEventListener('click', likeHandler);
