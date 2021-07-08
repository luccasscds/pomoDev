// total de linhas são de 244

const DOM = {
    setTime(minutos,segundos) {
        Time.setTime(minutos,segundos);
        document.querySelector('.time').innerHTML = `${minutos}:${segundos}`;
        document.querySelector('head title').innerHTML = `Pomodoro ${minutos}:${segundos}`;
    },
    starting(){
        document.querySelector('.button-start').innerHTML = 'Parar';
        document.querySelector('.button-start').setAttribute('onclick','Timer.stop()');
        som.start();
    },
    stopping(){
        document.querySelector('.button-start').innerHTML = 'Começar';
        document.querySelector('.button-start').setAttribute('onclick','Timer.start()');
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
        document.querySelector('.button.pomodoro').setAttribute('onclick','classButtons.pomodoro()');
        document.querySelector('.button.short').setAttribute('onclick','classButtons.shortBreak()');
        document.querySelector('.button.long').setAttribute('onclick','classButtons.longBreak()');
        document.querySelector('.button-start').setAttribute('onclick','Timer.start()');
    },
    addValues() {
        document.querySelector('#pomodoro').value = 25;
        document.querySelector('#shortBreak').value = 5;
        document.querySelector('#longBreak').value = 15;
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

const classButtons = {
    body: document.querySelector('body').style,
    letISgo: undefined,
    pomodoro(){
        Timer.stop();

        this.body.background = 'rgb(219, 82, 77)';
        DOM.setColorButtons('pomodoro');
        let minutos = Form.formatDatas().pomodoro;
        let segundos = tools.formatNumber(0);
        DOM.setTime(minutos,segundos);
        classButtons.letISgo = 'work';
    },
    shortBreak(){
        Timer.stop();
        
        let minutos = Form.formatDatas().short;
        let segundos = tools.formatNumber(0);
        DOM.setColorButtons('short');
        DOM.setTime(minutos,segundos);
        this.body.background = 'rgb(70, 142, 145)';
        classButtons.letISgo = 'break';
    },
    longBreak(){
        Timer.stop();

        this.body.background = 'rgb(67, 126, 168)';
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
    async start() {
        let som = document.querySelector('.audio-1');
        som.src = 'sounds/start.mp3';
        await som.play();
    },
    async endOFtime() {
        let som = document.querySelector('.audio-2');
        som.src = 'sounds/stop.mp3';
        await som.play();
    }
}

const app = {
    init(){
        DOM.addValues();
        //adicionando eventos
        DOM.addEvents();
    }
}

app.init();