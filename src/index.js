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

export { get };
