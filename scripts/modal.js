const menu = document.querySelector('.menu-setting');
const buttonConfig = document.querySelector('.button-config');
const closeModal = document.querySelector('.close');

// add events
buttonConfig.setAttribute('onclick','modal.open()');
closeModal.setAttribute('onclick','modal.close()');

const modal = {
    open() {
        menu.classList.add('active');
    },
    close() {
        menu.classList.remove('active');
    }
}