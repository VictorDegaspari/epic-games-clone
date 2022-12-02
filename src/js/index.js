async function get(url = '') {
    const response = await fetch(url, {
        headers: new Headers(
            {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        )
    });
    
    if (response.ok) return response.json();
    const responseError = {
        type: 'Error',
        message: 'Something went wrong',
    };
  
    const error = new Error();
    error.info = responseError;

    return (error);
}

async function post(url = '', data = {}) {
    const response = await fetch(url, {
        method: 'POST',
        headers: new Headers({
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }),
        body: JSON.stringify(data)
    });

    if (response.ok) return response.json();
    const responseError = {
        type: 'Error',
        message: 'Something went wrong',
    };
  
    const error = new Error();
    error.info = responseError;

    return (error);
}


async function update(url = '', data = {}) {
    const response = await fetch(url, {
        method: 'PATCH',
        headers: new Headers({
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }),
        body: JSON.stringify(data)
    });

    if (response.ok) return response.json();
    const responseError = {
        type: 'Error',
        message: 'Something went wrong',
    };
  
    const error = new Error();
    error.info = responseError;

    return (error);
}

export { get, post, update };
