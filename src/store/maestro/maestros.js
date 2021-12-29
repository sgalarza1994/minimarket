const state ={
    productosAgregados : []
}

const mutations  ={
    addProduct(state,payload)
    {
       payload.cantidad = 1;
       state.productosAgregados.push(payload);
    },
    deleteProduct(state,payload)
    {
        var index = state.productosAgregados.indexOf(payload);
        console.log('index eliminar',index);
        state.productosAgregados.splice(index,1);
       
    },
    deleteProductAll(state)
    {
      
        state.productosAgregados = [];
       
    },
    
}

export {state,mutations};