const getParams = () => {
    const queryString = window.location.href.split("?")[1];
    const queryParams = queryString.split("&");
    const params = {};
    queryParams.forEach((param) => {
        const [key, value] = param.split("=");
        params[key] = value;
    });
    return params;
};
export default getParams;