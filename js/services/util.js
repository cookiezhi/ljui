define(["require", baseStaticUrl + "js/app.js?v=" + GlobalVariable.changeByPublishVersion],
function(r, e) {
    e.factory("util", ["$window", "$timeout",
    function(r, e) {
        return {
            checkIsWeiXin: function() {
                var r = navigator.userAgent.toLowerCase();
                return "micromessenger" == r.match(/MicroMessenger/i) ? !0 : !1
            },
            isEmptyObject: function(r) {
                if (void 0 === r || "" === r || null === r) return ! 0;
                for (var e in r) return ! 1;
                return ! 0
            },
            isFalseNotZero: function(r) {
                return void 0 === r || "" === r || null === r
            },
            parseTo2ToObj: function(r) {
                for (var e = r.toString(2).split("").reverse(), o = {},
                n = 0; n < e.length; n++) {
                    var t = e[n];
                    1 === Number(t) && (o[Math.pow(2, n)] = Math.pow(2, n))
                }
                return o
            },
            dealPostParams: function(r) {
                var e = [];
                for (var o in r) e.push(o + "=" + r[o]);
                return e.join("&")
            },
            getCookie: function(r) {
                for (var e = document.cookie.split(";"), o = 0; o < e.length; o++) {
                    var n = e[o].split("=");
                    if (r == n[0]) return unescape(n[1])
                }
                return null
            },
            getLocalStorage: function(r, e) {
                try {
                    if (!window.localStorage) return null;
                    var o = window.localStorage[r];
                    if (!o) return null;
                    if (e) {
                        var n = JSON.parse(window.localStorage[r]).version;
                        return Number(n) === Number(GlobalVariable.changeByPublishVersion) ? JSON.parse(window.localStorage[r]).data: null
                    }
                    return JSON.parse(window.localStorage[r])
                } catch(t) {
                    return "production" != GlobalParameters.env && alert("隐身模式下，本地缓存无法操作！"),
                    null
                }
            },
            setLocalStorage: function(r, e, o) {
                try {
                    if (window.localStorage) if (o) {
                        var n = {
                            version: GlobalVariable.changeByPublishVersion,
                            data: e
                        };
                        window.localStorage[r] = JSON.stringify(n)
                    } else window.localStorage[r] = JSON.stringify(e)
                } catch(t) {
                    return "production" != GlobalParameters.env && alert("隐身模式下，本地缓存无法操作！"),
                    null
                }
            },
            removeLocalStorage: function(r) {
                try {
                    window.localStorage.removeItem(r)
                } catch(e) {
                    "production" != GlobalParameters.env && alert("隐身模式下，本地缓存无法操作！")
                }
            },
            getSessionStorage: function(r, e) {
                try {
                    return window.sessionStorage ? e ? window.sessionStorage[r] ? window.sessionStorage[r] : null: window.sessionStorage[r] ? JSON.parse(window.sessionStorage[r]) : null: null
                } catch(o) {
                    return "production" != GlobalParameters.env && alert("隐身模式下，本地缓存无法操作！"),
                    null
                }
            },
            setSessionStorage: function(r, e) {
                try {
                    window.sessionStorage && (window.sessionStorage[r] = "object" == typeof e ? JSON.stringify(e) : e)
                } catch(o) {
                    return "production" != GlobalParameters.env && alert("隐身模式下，本地缓存无法操作！"),
                    null
                }
            },
            removeSessionStorage: function(r) {
                try {
                    window.sessionStorage.removeItem(r)
                } catch(e) {
                    "production" != GlobalParameters.env && alert("隐身模式下，本地缓存无法操作！")
                }
            },
            parseUrlSearch: function(r) {
                function e(r) {
                    for (var e in r) return ! 1;
                    return ! 0
                }
                var o = {};
                if (r && r.length > 1) for (var r = r.substring(1), n = r.split("&"), t = 0; t < n.length; t++) if (n[t]) {
                    var a = n[t].split("=");
                    o[a[0]] = "undefined" == typeof a[1] ? "": a[1]
                }
                return e(o) ? null: o
            },
            errorFeedBack: function(r, o) {
                r.show = !0,
                r.msg = o,
                e(function() {
                    r.show = !1,
                    r.msg = ""
                },
                2e3)
            },
            buildTagsTextByZh: function(r, e) {
                var o = [];
                for (var n in e) r.forEach(function(r) {
                    r == n && o.push(e[n])
                });
                return o
            },
            buildTagsObj: function(r, e) {
                var o = [];
                for (var n in e) r.forEach(function(r) {
                    r == n && o.push(e[n])
                });
                return o
            },
            sendSMS: function(r, e, o) {
                var n = Zepto.os.ios,
                t = parseInt(Zepto.os.version),
                a = Zepto.os.android,
                i = navigator.userAgent.toLowerCase().indexOf("micromessenger") >= 0,
                s = "";
                n ? i ? (s = "sms:" + r + "/&body=" + e, r || (s = "")) : s = t >= 8 ? "sms:" + r + "/&body=" + e: "sms:" + r + "/;body=" + e: a && (s = "sms:" + r + "?body=" + e),
                s && (o && (s += o || window.location.href), window.open(s))
            }
        }
    }])
});