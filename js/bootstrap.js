var baseStaticUrl = "/",
GlobalVariable = {
    changeByPublishVersion: "development" != GlobalParameters.env ? GlobalParameters.staticVertion: Number(new Date)
},
requireConfig = {
    waitSeconds: 0,
    baseUrl: "/sh",
    paths: {
        angular: "/js/vender/angular-1.4.8/angular.min",
        "angular-ui-router": "/js/vender/angular-ui-router/angular-ui-router.min",
        "angular-async-loader": "/js/vender/angular-async-loader/angular-async-loader.min",
        "angular-sanitize": "/js/vender/angular-1.4.8/angular-sanitize.min",
        "angular-cookies": "/js/vender/angular-1.4.8/angular-cookies.min"
    },
    shim: {
        angular: {
            exports: "angular"
        },
        "angular-ui-router": {
            deps: ["angular"]
        },
        "angular-sanitize": {
            deps: ["angular"]
        },
        "angular-cookies": {
            deps: ["angular"]
        }
    }
};
require.config(requireConfig),
require(["angular", baseStaticUrl + "js/app.js?v=" + GlobalVariable.changeByPublishVersion, baseStaticUrl + "js/services/util.js?v=" + GlobalVariable.changeByPublishVersion],
function(a) {
    a.element(document).ready(function() {
        a.bootstrap(document, ["wapModule"]),
        a.element(document).find("html").addClass("ng-app")
    })
});