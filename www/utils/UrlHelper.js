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
    Object.entries(json).map(([key, value]) => {
        Object.keys(value).map(function(k) {
            t.push(encodeURIComponent(k) + '=' + encodeURIComponent(value[k]));
        });
    });
    return t.join('&');
}