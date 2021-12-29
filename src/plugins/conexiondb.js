
async function ObtenerAsync(url,axios)
{
    var response;
    console.log('llegamos al a conexion')
    try
    {
        let {data} = await axios({
            method : 'GET',
            url : url
        });
        console.log
        response = data;
    }
    catch(error)
    {
        console.log(error);
       response = error;
    }
    return response;
}


async function ObtenerJsonAsync(url,parameters, axios)
{
    var response= null;
    try
    {
        let {data} = await axios({
            method : 'POST',
            url : url,
            data : parameters
        });
        response = data;
    }
    catch(error)
    {
        response = error;
    }
    return response;
}

async function SaveAsync(url,json,axios)
{
    var response;
    try
    {
        let {data} = await axios({
            method : 'POST',
            url : url,
            data : json
        })
        response = data;
    }
    catch(error)
    {
        response = error;
    }
    return response;
}


export {ObtenerAsync,ObtenerJsonAsync,SaveAsync}