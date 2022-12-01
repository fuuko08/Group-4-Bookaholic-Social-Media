const createBtn = document.querySelector('.create-btn');

function readFile() {
    if (this.files && this.files[0]) {
        var fileRead = new FileReader();
        fileRead.addEventListener('load', function(event) {
            document.getElementById('img').src = event.target.result;
        });

        fileRead.readAsDataURL(this.files[0]);
    }
}

const fileHandler = (event) => {
    event.preventDefault();

    const loading = document.querySelector('.create-btn').classList.add('is-loading');
    const notFile = document.querySelector('input[type=file]')['files'][0];
    if (!notFile) return;

    const reader = new FileReader();
    reader.readAsDataURL(notFile);
    reader.onloadend = async () => {
        await uploadImage(reader.result);
        await uploadContent();
        loading;
        document.location.replace('/');
    };
    reader.onerror = () => {
        console.log('Failed!');
    };
};

const uploadContent = async (event) => {
    event.preventDefault();

    const content = document.querySelector('input[name="content"]').value;

    const response = await fetch(`api/post`, {
        method: 'POST',
        body: JSON.stringify({ content }),
        headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) {
        alert(response.statusText);
    };
};

const uploadImage = async (base64EncodedImage) => {
    try {
        await fetch('api/posts/upload', {
            method: 'POST',
            body: JSON.stringify({ data: base64EncodedImage }),
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (err) {
        console.log('Failed!', err);
    }
};

document.getElementById('dropdown').addEventListener('change', readFile);
createBtn.addEventListener('click', fileHandler);