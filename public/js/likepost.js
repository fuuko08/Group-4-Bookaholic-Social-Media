const likeBtn = document.querySelector('#like-btn');
const id = document.querySelector('input[name="post-id"]').value;

const likeHandler = async (event) => {
    event.preventDefault();

    if (id) {
        try {            
            const response = await fetch('http://localhost:3001/api/like/13', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            }).then(
                (res) => {
                    return res.json();
                }).then((jsonRes) => {
                    console.log("my parse JSON: " + jsonRes.like);
                    const element = document.getElementById('like-post');
                    const likes = +document.querySelector('.likes-counter').getAttribute('data-value');

                    console.log("how many: " + likes);
                    console.log("Like value: " + jsonRes.like);
                    console.log("message: "+jsonRes.message);

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
