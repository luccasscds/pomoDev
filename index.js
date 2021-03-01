const DOM = {
    setTime(minutos,segundos) {
        Time.setTime(minutos,segundos);
        document.querySelector('.time').innerHTML = minutos+':'+segundos;
    },
    starting(){
        document.querySelector('.button-start').innerHTML = 'STOP';
        document.querySelector('.button-start').setAttribute('onclick','timeTowork.stopTime()');
        som.start();
    },
    stopping(){
        document.querySelector('.button-start').innerHTML = 'START';
        document.querySelector('.button-start').setAttribute('onclick','timeTowork.startTime()');
    },
    openMenu() {
        document.querySelector('.menu-setting').classList.add('active');
    },
    closeMenu() {
        document.querySelector('.menu-setting').classList.remove('active');
    },
    deactiveX() {
        document.querySelector('.x').removeAttribute('onclick');
    },
    activeX() {
        document.querySelector('.x').setAttribute('onclick','DOM.closeMenu()');
    },
    setColorButtons(value){
        if(value == "pomodoro"){
            document.querySelector('.button.pomodoro').classList.add('active');
            document.querySelector('.button.short').classList.remove('active');
            document.querySelector('.button.long').classList.remove('active');
        }

        if(value == "short"){
            document.querySelector('.button.pomodoro').classList.remove('active');
            document.querySelector('.button.short').classList.add('active');
            document.querySelector('.button.long').classList.remove('active');
        }

        if(value == "long"){
            document.querySelector('.button.pomodoro').classList.remove('active');
            document.querySelector('.button.short').classList.remove('active');
            document.querySelector('.button.long').classList.add('active');
        }
    },
    addEvents() {
        document.querySelector('body').setAttribute('onload','classButtons.pomodoro()');
        document.querySelector('.button-config').setAttribute('onclick','DOM.openMenu()');
        document.querySelector('.button.pomodoro').setAttribute('onclick','classButtons.pomodoro()');
        document.querySelector('.button.short').setAttribute('onclick','classButtons.shortBreak()');
        document.querySelector('.button.long').setAttribute('onclick','classButtons.longBreak()');
        document.querySelector('.button-start').setAttribute('onclick','timeTowork.startTime()');
        document.querySelector('.x').setAttribute('onclick','DOM.closeMenu()');
    },
    addValues() {
        document.querySelector('#pomodoro').value = 25;
        document.querySelector('#shortBreak').value = 5;
        document.querySelector('#longBreak').value = 15;
    },
}

const Time = {
    minutos: 0,
    segundos: 0,
    setTime(minutos,segundos) {
        this.minutos = minutos;
        this.segundos = segundos;
    },
}

const tools = {
    formatpomodoro(value) {
        return value > 9 ? parseInt(value) : this.formatNumber(value);
    },
    formatshort(value) {
        return value > 9 ? parseInt(value) : this.formatNumber(value);
    },
    formatlong(value) {
        return value > 9 ? parseInt(value) : this.formatNumber(value);
    },
    formatNumber(value) {
        let number;
        value = parseInt(value)
        if(value > -1 &&
        value < 10) {
            number = '0'+value;
        }else {
            number = value;
        }
        return number;
    },
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
                DOM.deactiveX();
                throw new Error('Campo vazio!por favor, preencha todos os campos.');
        }else {
            DOM.activeX();
        }
        if(pomodoro <= 0 ||
            short <= 0 ||
            long <= 0){
                DOM.deactiveX();
                throw new Error('Dados incorretos!por favor, preencha os campos.');
        }else {
            DOM.activeX();
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
            DOM.closeMenu();
            classButtons.pomodoro();//nao sei se ta certo
        } catch(error){
            alert(error);
        }
    },
}

const classButtons = {
    Background: document.querySelector('body').style,
    letISgo: undefined,
    pomodoro(){
        timeTowork.stopTime();
        this.Background.background = 'rgb(219, 82, 77)';
        DOM.setColorButtons('pomodoro');
        let minutos = Form.formatDatas().pomodoro;
        let segundos = tools.formatNumber(0);
        DOM.setTime(minutos,segundos);
        classButtons.letISgo = 'work';
    },
    shortBreak(){
        timeTowork.stopTime();
        
        let minutos = Form.formatDatas().short;
        let segundos = tools.formatNumber(0);
        DOM.setColorButtons('short');
        DOM.setTime(minutos,segundos);
        this.Background.background = 'rgb(70, 142, 145)';
        classButtons.letISgo = 'break';
    },
    longBreak(){
        timeTowork.stopTime();
        this.Background.background = 'rgb(67, 126, 168)';
        let minutos = Form.formatDatas().long;
        let segundos = tools.formatNumber(0);
        DOM.setColorButtons('long');
        DOM.setTime(minutos,segundos);
        classButtons.letISgo = 'break';
    },
    workORbreak(){
        let I = classButtons.letISgo;
        if(I == 'work'){
            classButtons.shortBreak();
        }
        if(I == 'break') {
            classButtons.pomodoro();
        }
    },
}

const som = {
    start() {
        let som = document.querySelector('.audio-1');
        som.src = './som/som1.mp3';
        som.play();
    },
    endOFtime() {
        let som = document.querySelector('.audio-2');
        som.src = './som/som2.mp3';
        som.play();
    },
}

const timeTowork = {
    timeInterval: undefined,

    startTime(){
        DOM.starting();

        let {minutos, segundos} = Time;

        timeTowork.timeInterval = setInterval(()=>{
            if(segundos < 60 && segundos > -1) {
                segundos --;
            }
            if(segundos == -1){
                segundos = 59;
                if(minutos > 0){
                    minutos --;
                }
            }
            
            DOM.setTime(tools.formatNumber(minutos),tools.formatNumber(segundos));
            if(minutos == 0 && segundos == 0){
                classButtons.workORbreak();
                som.endOFtime();
            }
        },1000);
    },
    stopTime() {
        DOM.stopping();
        clearInterval(timeTowork.timeInterval);
    },
}

const app = {
    init(){
        DOM.addValues();
        //adicionando eventos
        DOM.addEvents();
    },
    reload(){
        app.init();
        console.log('reload()');
    },
}

app.init();