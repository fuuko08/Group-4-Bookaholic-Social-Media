const createBtn = document.querySelector('.btn-post');

function readFile() {
    if (this.files && this.files[0]) {
        var fileRead = new FileReader();
        fileRead.addEventListener('load', function(event) {            
            document.getElementById('img').src = event.target.result;
        });

        fileRead.readAsDataURL(this.files[0]);
        console.log("this is my read file: " + this.files[0]);
    }
}

const fileHandler = (event) => {
    event.preventDefault();

    // create loading to freeze the screen
    const loading = createBtn.classList.add('is-loading');

    // query data in 2 elements (image, textarea)
    const notFile = document.querySelector('input[type=file]')['files'][0];
    const content = document.querySelector('textarea[name="post-content"]').value;

    // make sure it works
    console.log ("first file" + notFile);
    if (!notFile) return;

    // create File Reader to upload to Clodinary
    const reader = new FileReader();
    reader.readAsDataURL(notFile);
    reader.onloadend = async () => {
        console.log("start to Onloadend");

        await createPost(reader.result, content);
        //await uploadContent();
        createBtn.classList.remove('is-loading');
        document.location.replace('/');
    };
    reader.onerror = () => {
        console.log('Failed!');
    };
};

const uploadContent = async (event) => {

    const content = document.querySelector('textarea[name="post-content"]').value;

    const response = await fetch('http://localhost:3001/api/post', {
        method: 'POST',
        body: JSON.stringify({ content }),
        headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) {
        alert(response.statusText);
    };
};

const createPost = async (base64EncodedImage, content) => {
    try {
        console.log('this is my upload post: ' + base64EncodedImage);
        const response = await fetch('http://localhost:3001/api/post/upload', {
            method: 'POST',
            body: JSON.stringify({ file: base64EncodedImage, content: content}),
            headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
            alert(response.statusText);
        };
    } catch (err) {
        console.log('Failed!', err);
    }
};

document.getElementById('inp').addEventListener('change', readFile);
createBtn.addEventListener('click', fileHandler);