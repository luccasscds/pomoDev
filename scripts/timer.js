let timeInterval = undefined;

const Time = {
    minutos: 0,
    segundos: 0,
    setTime(minutos,segundos) {
        this.minutos = minutos;
        this.segundos = segundos;
    },
}

const Timer = {
    start(){
        DOM.starting();

        let {minutos, segundos} = Time;

        timeInterval = setInterval(()=>{
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
                // mandar notificaçao avisando que acabou o tempo
                new Notification('Hora de descansar!')
            }
        },1000);
    },
    stop() {
        DOM.stopping();
        clearInterval(timeInterval);
    }
}