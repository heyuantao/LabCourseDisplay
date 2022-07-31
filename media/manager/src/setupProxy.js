const proxy = require('http-proxy-middleware');
module.exports = function (app) {
    app.use(proxy("/api/**", {
        //target: "https://www.easy-mock.com/mock/5c6525d4d758c80490517ac2/eeassu/",
        target: "http://localhost:8000/",
        changeOrigin: true,
    }));
    //app.use(proxy("/media/avatar/**", {
    //    //target: "https://www.easy-mock.com/mock/5c6525d4d758c80490517ac2/eeassu/",
    //    target: "http://localhost:8000/",
    //    changeOrigin: true,
    //}))
}
