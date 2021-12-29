const state ={
    userAuth:false,
    usuarioId:"",
    token:"",
    
}

const mutations = {
    usuarioLogin(state,payload)
    {
        state.userAuth = true;
        state.usuarioId = payload.usuarioId;
        state.token = payload.token;
        localStorage.setItem("token",payload.token);
    },
    usuarioLogout(state)
    {
        state.userAuth = false;
        state.usuarioId = "";
        state.token = "";
        localStorage.removeItem("token");
        localStorage.removeItem("vuex");
    }
}

export {state,mutations};