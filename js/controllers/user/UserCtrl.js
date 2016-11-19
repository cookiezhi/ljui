define(["require", baseStaticUrl + "js/app.js?v=" + GlobalVariable.changeByPublishVersion],
function(e, o) {
    o.controller("UserCtrl", ["$scope", "$http", "$rootScope", "$location", "$timeout", "util", "$cookies",
    function(e, o, t, a, n, i, r) {
        e.isLogin = !1,
        e.city_code = GlobalParameters.city_code;
        var s = {
            development: "net",
            test: "net",
            integration: "org",
            production: "com"
        },
        l = new Date;
        l.setDate(l.getDate() + 15),
        e.showErrFeedBack = {
            show: !1,
            msg: ""
        },
        e.registerRef = encodeURIComponent(t.href_host + "/user/login.json"),
        e.initPage = function() {
            var o = i.getLocalStorage("LJ_M_ACCESS_MSG");
            e.userInfo = angular.copy(o),
            e.isLogin = o ? !0 : !1,
            e.isLogin && !r.get("lianjia_token") && r.put("lianjia_token", e.userInfo.access_token, {
                path: "/",
                domain: ".lianjia." + s[GlobalParameters.env],
                expires: l
            }),
            e.refUrl = a.absUrl()
        },
        e.initPage(),
        e.checkIsLogin = function() {
            e.showErrFeedBack = {
                show: !0,
                msg: "请先登录"
            }
        },
        e.logout = function() {
            i.removeLocalStorage("LJ_M_ACCESS_MSG"),
            r.remove("lianjia_token", {
                path: "/",
                domain: ".lianjia." + s[GlobalParameters.env]
            })
        }
    }])
});