const postId = document.querySelector('input[name="post-id"]').value;
const saveBtn = document.querySelector('.btn-post');
const imgTag = document.getElementById('img');
const inpTag=document.getElementById('inp');

const fileRead = async () => {    
    if (inpTag.files && inpTag.files[0]) {
        
        var fileRead = new FileReader();
        fileRead.addEventListener('load', function(event) {            
            console.log('upload image: ' + fileRead.result);
            imgTag.src = event.target.result;
        });
    }
}

const fileHandler = async (event) => {
    event.preventDefault();

    // create loading to freeze the screen
    const loading = saveBtn.classList.add('is-loading');

    // query data in 2 elements (image, textarea)    
    const content = document.querySelector('textarea[name="post-content"]').value;

    if(imgTag.src!=null){
        await updatePost(imgTag.src, content);
    }
};

const updatePost = async (imgUrl, content) => {
    try {
        const postId = document.querySelector('input[name="post-id"]').value;
        const response = await fetch(`/api/post/${postId}`, {
            method: 'PUT',
            body: JSON.stringify({ image: imgUrl, content: content, postId: postId, }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace(`/post/${postId}`);
        } else {
            alert(response.statusText);
        };
    } catch (err) {
        console.log('Failed!', err);
    }
};

inpTag.addEventListener('change', fileRead);
saveBtn.addEventListener('click', fileHandler);
