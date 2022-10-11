async function get(url = '') {
    const response = await fetch(url);
    
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
        headers: {
            'Content-Type': 'application/json'
        },
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

export { get, post };
