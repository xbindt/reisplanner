import url from 'url';

export const absoluteUrl = (req, setLocalhost) => {
    let protocol = 'https'
    let host = req ? req.headers.host : window.location.hostname
    if (host.indexOf('localhost') > -1) {
        if (setLocalhost) host = setLocalhost
        protocol = 'http'
    }

    return url.format({
        protocol,
        host,
        pathname: '/' // req.url
    })
};

export const jsonToRequestParams = (json) => {
    const t = [];
    for (let [key, value] of Object.entries(json)) {
        t.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
    }
    return t.join('&');
}