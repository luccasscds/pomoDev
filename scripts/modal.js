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
    },
    deactive() {
        closeModal.removeAttribute('onclick');
    },
    activate() {
        closeModal.setAttribute('onclick','modal.close()');
    }
}

const Form = {
    pomodoro: document.querySelector('input#pomodoro'),
    short: document.querySelector('input#shortBreak'),
    long: document.querySelector('input#longBreak'),

    getValues(){
        return {
            pomodoro: Form.pomodoro.value,
            short: Form.short.value,
            long: Form.long.value,
        }
    },
    validateDatas() {
        let {pomodoro,short,long} = this.getValues();
        if(pomodoro == '' ||
            short == '' ||
            long == ''){
                modal.deactive();
                throw new Error('Campo vazio!por favor, preencha todos os campos.');
        }else {
            modal.activate();
        }
        if(pomodoro <= 0 ||
            short <= 0 ||
            long <= 0){
                modal.deactive();
                throw new Error('Dados incorretos!por favor, preencha os campos.');
        }else {
            modal.activate();
        }
        
    },
    formatDatas() {
        let {pomodoro,short,long} = Form.getValues();
        pomodoro = tools.formatpomodoro(pomodoro);
        short = tools.formatpomodoro(short);
        long = tools.formatpomodoro(long);
        return {
            pomodoro,
            short,
            long,
        }
    },
    submit(event) {
        event.preventDefault();
        try {
            Form.validateDatas();
            modal.close();
            classButtons.pomodoro();
        } catch(error){
            alert(error);
        }
    },
}