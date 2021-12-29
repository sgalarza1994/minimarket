const state ={
    loadingShow:false,
    loadingText:"",
    alertaShow:false,
    alertaText:"",
    alertaColor:"",
    alertaTimeout:3000
}

const mutations = {
    mostrarLoading(state,payload)
    {
        state.loadingShow = payload.loadingShow;
        state.loadingText = payload.loadingText;
    },
    mostrarAlerta(state,payload)
    {
        state.alertaShow = payload.alertaShow;
        state.alertaText = payload.alertaText;
        state.alertaTimeout = payload.alertaTimeout;
        state.alertaColor = payload.alertaColor;
    }
}