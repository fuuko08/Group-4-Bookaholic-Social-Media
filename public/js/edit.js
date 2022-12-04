const postId = document.querySelector('input[name="post-id"]').value;
const createBtn = document.querySelector('.btn-post');
const imgTag = document.getElementById('img');
const inpTag=document.getElementById('inp');

const fileRead = async () => {    
    if (inpTag.files && inpTag.files[0]) {
        
        var fileRead = new FileReader();
        fileRead.addEventListener('load', function(event) {            
            console.log('upload image: ' + fileRead.result);
            imgTag.src = event.target.result;
        });

        

        // var uploadReader = new FileReader();
        // uploadReader.readAsDataURL(inpTag.files[0]);
        // console.log(inpTag.files[0]);
        // uploadReader.onloadend = async () => {
        //     const response = await fetch(`http://localhost:3001/api/post/uploadpic`, {
        //         method: 'POST',
        //         body: JSON.stringify({ file: uploadReader.result}),
        //         headers: { 'Content-Type': 'application/json' },
        //     });

        //     if (response.ok) {                
        //         imgTag.src=response.newImageUrl;
        //     }
        // };

        
    }
}

const fileHandler = async (event) => {
    event.preventDefault();

    // create loading to freeze the screen
    const loading = createBtn.classList.add('is-loading');

    // query data in 2 elements (image, textarea)    
    const content = document.querySelector('textarea[name="post-content"]').value;

    if(imgTag.src!=null){
        await updatePost(imgTag.src, content);
    }
};

const updatePost = async (imgUrl, content) => {
    try {
        console.log('this is my upload post: ' + imgUrl);
        const response = await fetch(`http://localhost:3001/api/post/${postId}`, {
            method: 'PUT',
            body: JSON.stringify({ image: imgUrl, content: content}),
            headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
            alert(response.statusText);
        };
    } catch (err) {
        console.log('Failed!', err);
    }
};

inpTag.addEventListener('change', fileRead);
createBtn.addEventListener('click', fileHandler);
