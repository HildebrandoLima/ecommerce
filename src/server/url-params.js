const urlParams = (params) => {
    const urlParams = new URLSearchParams();

    for (const key in params) {
        if (params[key] !== undefined && params[key] !== null) {
            urlParams.append(key, params[key]);
        }
    }
    return urlParams.toString();
};

export default urlParams;