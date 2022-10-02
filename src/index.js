function get(url) {
    return new Promise((resolve, reject) => {
        const req = new XMLHttpRequest();
        req.onload = () => {
            if (req.status === 200 && req.readyState === 4) {
                resolve(JSON.parse(req.response));
            }
        };
        req.onerror = reject;
        req.open("GET", url);
        req.send();
    });
}

function post(url, params) {
    return new Promise((resolve, reject) => {
        const post = new XMLHttpRequest();
        post.onload = () => {
            if (post.status === 200 && post.readyState === 4) {
                resolve(JSON.parse(post.response));
            }
        };
        post.onerror = reject;
        post.open("POST", url);
        post.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        post.send(JSON.stringify(params));
    });
}

export { get, post };
