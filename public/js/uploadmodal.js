const uploadModal = document.querySelector('.actions-modal.upload');
const triggerModal = document.querySelector('.trigger-modal.upload');

// triggerModal.addEventListener('click', function () {
//     try {
//         uploadModal.classList.add('is-active');
//         const modalBg = document.querySelector('.modal-background.upload');
//         modalBg.addEventListener('click', function () {
//             uploadModal.classList.remove('is-active');
//         });
//         document.querySelector(".cancel").addEventListener('click', function() {
//             uploadModal.classList.remove('is-active');
//         });
//         document.querySelector(".delete").addEventListener('click', function() {
//             uploadModal.classList.remove('is-active');
//         });
//     } catch (err) {
//         console.log(err);
//     }
// });