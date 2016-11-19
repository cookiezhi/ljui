define(["angular", "require", "angular-async-loader", "angular-ui-router", "angular-sanitize", "angular-cookies"],
function(e, a, t, l) {
    var o = e.module("wapModule", ["ui.router", "ngSanitize", "ngCookies"]);
    return o.directive("downloadShow", ["$http", "$filter", "$timeout", "$rootScope", "util",
    function(e, a, t, l, o) {
        return {
            restrict: "A",
            replace: !0,
            template: '<div class="down-layer" style="display:block" ng-show="canShowDownload">						<a href="javascript:;" class="icon-close" ng-click="closeDownlayer()"></a>						<img src="/images/lianjia_client_logo.png">						<div class="down-slog">							<p class="title">下载app,在线咨询更方便</p>							<p class="sub-title">找真房源，上链家</p>						</div>						<a ng-if="!isWeixinOpen" href="{{downloadUrl}}wapdbhf" target="_blank" class="gotodown" ng-click="clickDownloadCallback()">立即下载</a>						<a class="gotodown" href="javascript:;" ng-click="downAppBtn()" ng-if="isWeixinOpen" >立即下载</a>					</div>',
            scope: {
                showDownload: "=",
                closeDownlayer: "&",
                downloadUrl: "@",
                pagename: "@",
                clickDownloadCallback: "&"
            },
            link: function(e, a, t) {
                function s() {
                    var e = navigator.userAgent.toLowerCase();
                    return "micromessenger" == e.match(/MicroMessenger/i) ? !0 : !1
                }
                e.isWeixinOpen = s(),
                e.downAppBtn = function() {
                    l.showWeixinTips = !0
                },
                e.canShowDownload = !1,
                e.$watch("showDownload",
                function(a) {
                    if (a === !0) {
                        var t = o.getSessionStorage("lj_sh_wap_showDownload", !0);
                        e.canShowDownload = t && "close" === t ? !1 : !0
                    } else e.canShowDownload = !1
                }),
                e.clickDownloadCallback = function() {
                    window.ga && (window.ga("send", "event", "button", "click", "shLianjia_wap_fixbar_downloadApp"), "su" == GlobalParameters.city_code && window.ga("su.send", "event", "button", "click", "shLianjia_wap_fixbar_downloadApp"))
                },
                e.closeDownlayer = function() {
                    e.canShowDownload = !1,
                    o.setSessionStorage("lj_sh_wap_showDownload", "close")
                }
            }
        }
    }]),
    o.directive("feedbackBox", ["$timeout",
    function(e) {
        var a = null;
        return {
            restrict: "A",
            replace: !0,
            template: '<div style="position: fixed; left: 0px;" class="toast-info" ng-show="feedback.show">						<div class="info-con">							<div class="{{feedback.status ? feedback.status : \'fail\'}}">							<span class="info-icon"></span>							<p>{{feedback.msg}}</p>					</div>					</div>					</div>',
            scope: {
                feedback: "="
            },
            link: function(t, l, o) {
                e.cancel(a),
                t.$watch("feedback.show",
                function(l) {
                    l === !0 && (a = e(function() {
                        t.feedback.show = !1,
                        t.feedback.msg = ""
                    },
                    2e3))
                })
            }
        }
    }]),
    t.configure(o),
    o.run(["$state", "$stateParams", "$rootScope", "$window", "$location", "$timeout", "util", "$cookies", "$http",
    function(e, a, t, l, o, s, i, r, n) {
        function c() {
            return navigator.userAgent.match(/iPhone/) ? "https://itunes.apple.com/cn/app/shang-hai-lian-jia/id1074753582?source=": (navigator.userAgent.match(/Android/), "http://sh.lianjia.com/public/download/lianjia-shanghai.apk?source=")
        }
        t.shareUrl = window.location.href,
        t.showWeixinTips = !1,
        t.historyUrlArr = i.getSessionStorage("bk_history_back_url") ? i.getSessionStorage("bk_history_back_url") : [],
        t.$state = e,
        t.$stateParams = a,
        t.constants = {},
        t.constants.cityCode = GlobalParameters.city_code;
        var h = {
            test: "/",
            development: "http://soa.dooioo.net/api/v4/online",
            integration: "http://onlineapitest.dooioo.net/api/v4/online",
            production: "/data"
        }; ({
            test: "http://m.sh.lianjia.net/",
            development: window.location.origin,
            integration: "http://m.sh.lianjia.org",
            production: "http://m.sh.lianjia.com"
        });
        t.loginApiFlag = !0;
        var b = {
            1 : {
                test: "http://m.api.lianjia.com",
                development: "http://m.api.lianjia.com",
                integration: "http://m.api.lianjia.com",
                production: "http://m.api.lianjia.com"
            },
            0 : {
                test: "http://soa.dooioo.org/api/v4/online",
                development: "http://soa.dooioo.org/api/v4/online",
                integration: "http://soa.dooioo.org/api/v4/online",
                production: "http://soa.dooioo.com/api/v4/online"
            }
        };
        t.api_host = h[GlobalParameters.env],
        t.href_host = window.location.origin,
        t.login_api_host = b[Number(t.loginApiFlag)][GlobalParameters.env],
        t.getWeixinConfig = function() {
            n({
                method: "POST",
                url: "/weChat/config",
                data: "curUrl=" + encodeURIComponent(t.shareUrl),
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }).success(function(e) {
                var a = {
                    appId: e.appId,
                    timestamp: e.timestamp,
                    nonceStr: e.nonceStr,
                    signature: e.signature,
                    jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage"]
                };
                wx.config(a)
            })
        },
        t.$on("$stateChangeStart",
        function(e, a, t, l, o) {
            l && l.statisticsFlag && window.$ULOG && window.$ULOG.send("2")
        }),
        t.$on("$stateChangeSuccess",
        function(e, a, r, n, c) {
            if (window.clearInterval(t.loginTimer), window.scrollTo(0, 0), t.hideBack = !1, t.bodyOverflowHidden = !1, t.showWeixinTips = !1, t.isWeixinOpen = t.checkIsWeiXin(), t.downAppBtn = function() {
                t.showWeixinTips = !0
            },
            t.platformObj = {
                client: "wap",
                platformType: "common",
                hideGuideDownBtn: !1,
                utm_source: "",
                utm_medium: "",
                utm_content: "",
                utm_campaign: ""
            },
            a) if (t.title = a.pageTitle, t.hideUserIcon = a.hideUserIcon ? a.hideUserIcon: !1, t.checkIsNewsArticle()) {
                t.platformObj.client = "news",
                t.platformObj.platformType = "newsarticle";
                var h = o.search().utm_medium && "xinxiliu" == o.search().utm_medium ? !1 : !0;
                t.headerType = "HomeCtrl" !== a.controller ? "newsarticle": a.headerType,
                t.showFootCopyRight = a.showFootCopyRight,
                t.showDownload = h ? !1 : a.showDownload,
                t.platformObj.hideGuideDownBtn = h,
                a.channelType && i.setSessionStorage("LJ_wap_newsarticle_channelType", a.channelType),
                t.platformObj.channelType = i.getSessionStorage("LJ_wap_newsarticle_channelType", !0) ? "newsarticle_" + i.getSessionStorage("LJ_wap_newsarticle_channelType", !0) : "common"
            } else t.checkIsShLianjia() ? (t.platformObj.client = "shLianjia", t.platformObj.platformType = "shLianjia", t.platformObj.hideGuideDownBtn = !0, t.showFootCopyRight = !1, t.headerType = "", t.showDownload = !1) : (t.platformObj.client = "wap", t.platformObj.platformType = "common", t.platformObj.hideGuideDownBtn = !1, t.showFootCopyRight = a.showFootCopyRight, t.headerType = t.checkIsAdvNeedHideBar() ? "": a.headerType, t.showDownload = t.checkIsAdvNeedHideBar() ? !1 : a.showDownload);
            a && a.statisticsFlag && s(function() {
                window.ga && (window.ga("send", "pageview", {
                    page: l.location.pathname + l.location.search
                }), "su" == GlobalParameters.city_code && window.ga("su.send", "pageview", {
                    page: l.location.pathname + l.location.search
                })),
                window.$ULOG && window.$ULOG.send("1,3")
            })
        }),
        t.checkIsWeiXin = function() {
            var e = navigator.userAgent.toLowerCase();
            return "micromessenger" == e.match(/MicroMessenger/i) ? !0 : !1
        },
        t.checkIsNewsArticle = function() {
            var e = navigator.userAgent.toLowerCase();
            return "newsarticle" == e.match(/NewsArticle/i) ? !0 : !1
        },
        t.checkUrlHasNoUTM = function() {
            var e = window.location.search;
            return - 1 === e.indexOf("utm_") ? !0 : !1
        },
        t.checkIsShLianjia = function() {
            var e = navigator.userAgent.match(/lianjia_sh_app/) || window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.jsCallOC && window.webkit.messageHandlers.jsCallOC.postMessage;
            return e ? !0 : !1
        },
        t.checkIsFromGuangDianTong = function() {
            return o.search().utm_medium && "guangdiantong" === o.search().utm_medium ? !0 : !1
        },
        t.checkIsAdvNeedHideBar = function() {
            var e = {
                guangdiantong: !0,
                xinxiliu: !0
            },
            a = o.search().utm_medium ? o.search().utm_medium: "";
            return e[a] ? !0 : !1
        },
        t.downloadUrl = c(),
        t.trackOutboundLink = function(e) {
            window.ga && (window.ga("send", "event", "button", "click", e), "su" == GlobalParameters.city_code && window.ga("su.send", "event", "button", "click", e))
        },
        t.trackOutboundLinkAllParam = function(e, a, t) {
            window.ga && (window.ga("send", "event", e, a, t), "su" == GlobalParameters.city_code && window.ga("su.send", "event", e, a, t))
        },
        t.jumpToNotNgPage = function(e, a) {
            e ? window.location.href = e: window.location.href = a ? window.location.origin + a: window.location.origin
        }
    }]),
    o.config(["$stateProvider", "$urlRouterProvider", "$locationProvider", "$httpProvider", "$compileProvider",
    function(e, a, t, l, o) {
        o.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|tel|file|sms):/),
        t.html5Mode(!0),
        a.when("/ershoufang", "/ershoufang/").when("/ershoufang/:district/:filter/", "/ershoufang/:district/:filter").when("/ershoufang/:district/", "/ershoufang/:district").when("/chengjiao", "/chengjiao/").when("/chengjiao/:district/:filter/", "/chengjiao/:district/:filter").when("/chengjiao/:district/", "/chengjiao/:district").when("/xiaoqu", "/xiaoqu/").when("/xiaoqu/:district/:filter/", "/xiaoqu/:district/:filter").when("/xiaoqu/:district/", "/xiaoqu/:district").when("/zufang", "/zufang/").when("/zufang/:district/:filter/", "/zufang/:district/:filter").when("/zufang/:district/", "/zufang/:district").when("/user", "/user/index").when("/user/", "/user/index").when("/user/favorHouse/", "/user/favorHouse").when("/user/login/", "/user/login").when("/user/register/", "/user/register").when("/user/forget/", "/user/forget").when("/user/index/", "/user/index").when("/baike", "/baike/hot/").when("/baike/", "/baike/hot/").when("/baike/hot", "/baike/hot/").when("/toutiao/list", "/toutiao/list/"),
        a.otherwise(function(e) {
            var a = e.get("$state");
            a.go("404", null, {
                location: !1
            })
        }),
        e.state("home", {
            url: "/",
            templateUrl: "/template/home.html?v=" + GlobalVariable.changeByPublishVersion,
            controllerUrl: baseStaticUrl + "js/controllers/HomeCtrl.js?v=" + GlobalVariable.changeByPublishVersion,
            controller: "HomeCtrl",
            pageTitle: "首页",
            showDownload: !0,
            headerType: "home",
            showFootCopyRight: !0,
            statisticsFlag: !0,
            dependencies: [baseStaticUrl + "js/services/constans.js?v=" + GlobalVariable.changeByPublishVersion, baseStaticUrl + "js/filters/wapFilter.js?v=" + GlobalVariable.changeByPublishVersion]
        }).state("ershoufang", {
            "abstract": !0,
            url: "/ershoufang",
            template: "<div ui-view></div>"
        }).state("ershoufang.listNoFilter", {
            url: "/",
            templateUrl: "/template/ershoufang/list.html?v=" + GlobalVariable.changeByPublishVersion,
            controllerUrl: baseStaticUrl + "js/controllers/ershoufang/ListCtrl.js?v=" + GlobalVariable.changeByPublishVersion,
            controller: "ErshoufangListCtrl",
            pageTitle: "二手房列表",
            channelType: "ershoufang",
            showDownload: !0,
            headerType: "common",
            showFootCopyRight: !0,
            statisticsFlag: !0,
            dependencies: [baseStaticUrl + "js/services/constans.js?v=" + GlobalVariable.changeByPublishVersion, baseStaticUrl + "js/filters/wapFilter.js?v=" + GlobalVariable.changeByPublishVersion]
        }).state("ershoufang.jilu", {
            url: "/jilu/{house_code:[A-Z]{0,6}[0-9]+}.html",
            templateUrl: "/template/ershoufang/kanfangjilu.html?v=" + GlobalVariable.changeByPublishVersion,
            controllerUrl: baseStaticUrl + "js/controllers/ershoufang/KanfangjiluCtrl.js?v=" + GlobalVariable.changeByPublishVersion,
            controller: "KanfangjiluCtrl",
            pageTitle: "客户看房记录",
            channelType: "ershoufang",
            showDownload: !1,
            headerType: "common",
            statisticsFlag: !0,
            showFootCopyRight: !1
        }).state("ershoufang.detail", {
            url: "/{cityCode:[a-zA-Z]+}{house_code:[0-9]+}.html",
            templateUrl: "/template/ershoufang/detail.html?v=" + GlobalVariable.changeByPublishVersion,
            controllerUrl: baseStaticUrl + "js/controllers/ershoufang/DetailCtrl.js?v=" + GlobalVariable.changeByPublishVersion,
            controller: "ErshoufangDetailCtrl",
            pageTitle: "二手房详情",
            channelType: "ershoufang",
            showDownload: !1,
            headerType: "common",
            showFootCopyRight: !0,
            statisticsFlag: !0,
            dependencies: [baseStaticUrl + "js/services/constans.js?v=" + GlobalVariable.changeByPublishVersion, baseStaticUrl + "js/filters/wapFilter.js?v=" + GlobalVariable.changeByPublishVersion]
        }).state("ershoufang.listTwoFilter", {
            url: "/:district/:filter",
            templateUrl: "/template/ershoufang/list.html?v=" + GlobalVariable.changeByPublishVersion,
            controllerUrl: baseStaticUrl + "js/controllers/ershoufang/ListCtrl.js?v=" + GlobalVariable.changeByPublishVersion,
            controller: "ErshoufangListCtrl",
            pageTitle: "二手房列表",
            channelType: "ershoufang",
            showDownload: !0,
            headerType: "common",
            showFootCopyRight: !0,
            statisticsFlag: !0,
            dependencies: [baseStaticUrl + "js/services/constans.js?v=" + GlobalVariable.changeByPublishVersion, baseStaticUrl + "js/filters/wapFilter.js?v=" + GlobalVariable.changeByPublishVersion]
        }).state("ershoufang.oneFilter", {
            url: "/:oneFilter",
            templateUrl: "/template/ershoufang/list.html?v=" + GlobalVariable.changeByPublishVersion,
            controllerUrl: baseStaticUrl + "js/controllers/ershoufang/ListCtrl.js?v=" + GlobalVariable.changeByPublishVersion,
            controller: "ErshoufangListCtrl",
            pageTitle: "二手房列表",
            channelType: "ershoufang",
            showDownload: !0,
            headerType: "common",
            showFootCopyRight: !0,
            statisticsFlag: !0,
            dependencies: [baseStaticUrl + "js/services/constans.js?v=" + GlobalVariable.changeByPublishVersion, baseStaticUrl + "js/filters/wapFilter.js?v=" + GlobalVariable.changeByPublishVersion]
        }).state("chengjiao", {
            "abstract": !0,
            url: "/chengjiao",
            template: "<div ui-view></div>"
        }).state("chengjiao.detail", {
            url: "/{cityCode:[a-zA-Z]+}{house_code:[0-9]+}.html",
            templateUrl: "/template/chengjiao/detail.html?v=" + GlobalVariable.changeByPublishVersion,
            controllerUrl: baseStaticUrl + "js/controllers/chengjiao/DetailCtrl.js?v=" + GlobalVariable.changeByPublishVersion,
            controller: "ChengjiaoDetailCtrl",
            pageTitle: "成交房详情",
            channelType: "ershoufang",
            showDownload: !1,
            headerType: "common",
            showFootCopyRight: !1,
            statisticsFlag: !0,
            dependencies: [baseStaticUrl + "js/services/constans.js?v=" + GlobalVariable.changeByPublishVersion, baseStaticUrl + "js/filters/wapFilter.js?v=" + GlobalVariable.changeByPublishVersion]
        }).state("chengjiao.oneFilter", {
            url: "/:oneFilter",
            templateUrl: "/template/chengjiao/list.html?v=" + GlobalVariable.changeByPublishVersion,
            controllerUrl: baseStaticUrl + "js/controllers/chengjiao/ListCtrl.js?v=" + GlobalVariable.changeByPublishVersion,
            controller: "ChengjiaoListCtrl",
            pageTitle: "成交房列表",
            channelType: "ershoufang",
            showDownload: !0,
            headerType: "common",
            showFootCopyRight: !1,
            statisticsFlag: !0,
            dependencies: [baseStaticUrl + "js/services/constans.js?v=" + GlobalVariable.changeByPublishVersion, baseStaticUrl + "js/filters/wapFilter.js?v=" + GlobalVariable.changeByPublishVersion]
        }).state("zufang", {
            "abstract": !0,
            url: "/zufang",
            template: "<div ui-view></div>"
        }).state("zufang.listNoFilter", {
            url: "/",
            templateUrl: "/template/zufang/list.html?v=" + GlobalVariable.changeByPublishVersion,
            controllerUrl: baseStaticUrl + "js/controllers/zufang/ListCtrl.js?v=" + GlobalVariable.changeByPublishVersion,
            controller: "ZufangListCtrl",
            pageTitle: "租房列表",
            showDownload: !0,
            headerType: "common",
            showFootCopyRight: !0,
            statisticsFlag: !0,
            dependencies: [baseStaticUrl + "js/services/constans.js?v=" + GlobalVariable.changeByPublishVersion, baseStaticUrl + "js/filters/wapFilter.js?v=" + GlobalVariable.changeByPublishVersion]
        }).state("zufang.jilu", {
            url: "/jilu/{house_code:[A-Z]{0,6}[0-9]+}.html",
            templateUrl: "/template/zufang/kanfangjilu.html?v=" + GlobalVariable.changeByPublishVersion,
            controllerUrl: baseStaticUrl + "js/controllers/zufang/KanfangjiluCtrl.js?v=" + GlobalVariable.changeByPublishVersion,
            controller: "KanfangjiluCtrl",
            pageTitle: "客户看房记录",
            showDownload: !1,
            headerType: "common",
            statisticsFlag: !0,
            showFootCopyRight: !1
        }).state("zufang.similar", {
            url: "/similar/{house_code:[A-Z]{0,6}[0-9]+}.html",
            templateUrl: "/template/zufang/similar.html?v=" + GlobalVariable.changeByPublishVersion,
            controllerUrl: baseStaticUrl + "js/controllers/zufang/SimilarHouseCtrl.js?v=" + GlobalVariable.changeByPublishVersion,
            controller: "SimilarHouseCtrl",
            pageTitle: "相似房源",
            showDownload: !1,
            headerType: "centerLayer",
            statisticsFlag: !0,
            showFootCopyRight: !1,
            dependencies: [baseStaticUrl + "js/services/constans.js?v=" + GlobalVariable.changeByPublishVersion, baseStaticUrl + "js/filters/wapFilter.js?v=" + GlobalVariable.changeByPublishVersion]
        }).state("zufang.detail", {
            url: "/{cityCode:[a-zA-Z]+}{house_code:[0-9]+}.html",
            templateUrl: "/template/zufang/detail.html?v=" + GlobalVariable.changeByPublishVersion,
            controllerUrl: baseStaticUrl + "js/controllers/zufang/DetailCtrl.js?v=" + GlobalVariable.changeByPublishVersion,
            controller: "ZufangDetailCtrl",
            pageTitle: "租房详情",
            showDownload: !1,
            headerType: "common",
            showFootCopyRight: !0,
            statisticsFlag: !0,
            dependencies: [baseStaticUrl + "js/services/constans.js?v=" + GlobalVariable.changeByPublishVersion, baseStaticUrl + "js/filters/wapFilter.js?v=" + GlobalVariable.changeByPublishVersion]
        }).state("zufang.listTwoFilter", {
            url: "/:district/:filter",
            templateUrl: "/template/zufang/list.html?v=" + GlobalVariable.changeByPublishVersion,
            controllerUrl: baseStaticUrl + "js/controllers/zufang/ListCtrl.js?v=" + GlobalVariable.changeByPublishVersion,
            controller: "ZufangListCtrl",
            pageTitle: "租房列表",
            showDownload: !0,
            headerType: "common",
            showFootCopyRight: !0,
            statisticsFlag: !0,
            dependencies: [baseStaticUrl + "js/services/constans.js?v=" + GlobalVariable.changeByPublishVersion, baseStaticUrl + "js/filters/wapFilter.js?v=" + GlobalVariable.changeByPublishVersion]
        }).state("zufang.oneFilter", {
            url: "/:oneFilter",
            templateUrl: "/template/zufang/list.html?v=" + GlobalVariable.changeByPublishVersion,
            controllerUrl: baseStaticUrl + "js/controllers/zufang/ListCtrl.js?v=" + GlobalVariable.changeByPublishVersion,
            controller: "ZufangListCtrl",
            pageTitle: "租房列表",
            showDownload: !0,
            headerType: "common",
            showFootCopyRight: !0,
            statisticsFlag: !0,
            dependencies: [baseStaticUrl + "js/services/constans.js?v=" + GlobalVariable.changeByPublishVersion, baseStaticUrl + "js/filters/wapFilter.js?v=" + GlobalVariable.changeByPublishVersion]
        }).state("xiaoqu", {
            "abstract": !0,
            url: "/xiaoqu",
            template: "<div ui-view></div>"
        }).state("xiaoqu.listNoFilter", {
            url: "/",
            templateUrl: "/template/xiaoqu/list.html?v=" + GlobalVariable.changeByPublishVersion,
            controllerUrl: baseStaticUrl + "js/controllers/xiaoqu/ListCtrl.js?v=" + GlobalVariable.changeByPublishVersion,
            controller: "XiaoquListCtrl",
            pageTitle: "小区列表",
            channelType: "ershoufang",
            showDownload: !0,
            headerType: "common",
            showFootCopyRight: !0,
            statisticsFlag: !0,
            dependencies: [baseStaticUrl + "js/services/constans.js?v=" + GlobalVariable.changeByPublishVersion, baseStaticUrl + "js/filters/wapFilter.js?v=" + GlobalVariable.changeByPublishVersion]
        }).state("xiaoqu.detail", {
            url: "/{community_id:[0-9]+}.html",
            templateUrl: "/template/xiaoqu/detail.html?v=" + GlobalVariable.changeByPublishVersion,
            controllerUrl: baseStaticUrl + "js/controllers/xiaoqu/DetailCtrl.js?v=" + GlobalVariable.changeByPublishVersion,
            controller: "XiaoquDetailCtrl",
            pageTitle: "小区详情",
            channelType: "ershoufang",
            showDownload: !1,
            headerType: "common",
            showFootCopyRight: !0,
            statisticsFlag: !0,
            dependencies: [baseStaticUrl + "js/services/constans.js?v=" + GlobalVariable.changeByPublishVersion, baseStaticUrl + "js/filters/wapFilter.js?v=" + GlobalVariable.changeByPublishVersion]
        }).state("xiaoqu.listTwoFilter", {
            url: "/:district/:filter",
            templateUrl: "/template/xiaoqu/list.html?v=" + GlobalVariable.changeByPublishVersion,
            controllerUrl: baseStaticUrl + "js/controllers/xiaoqu/ListCtrl.js?v=" + GlobalVariable.changeByPublishVersion,
            controller: "XiaoquListCtrl",
            pageTitle: "小区列表",
            channelType: "ershoufang",
            showDownload: !0,
            headerType: "common",
            showFootCopyRight: !0,
            statisticsFlag: !0,
            dependencies: [baseStaticUrl + "js/services/constans.js?v=" + GlobalVariable.changeByPublishVersion, baseStaticUrl + "js/filters/wapFilter.js?v=" + GlobalVariable.changeByPublishVersion]
        }).state("xiaoqu.oneFilter", {
            url: "/:oneFilter",
            templateUrl: "/template/xiaoqu/list.html?v=" + GlobalVariable.changeByPublishVersion,
            controllerUrl: baseStaticUrl + "js/controllers/xiaoqu/ListCtrl.js?v=" + GlobalVariable.changeByPublishVersion,
            controller: "XiaoquListCtrl",
            pageTitle: "二手房列表",
            channelType: "ershoufang",
            showDownload: !0,
            headerType: "common",
            showFootCopyRight: !0,
            statisticsFlag: !0,
            dependencies: [baseStaticUrl + "js/services/constans.js?v=" + GlobalVariable.changeByPublishVersion, baseStaticUrl + "js/filters/wapFilter.js?v=" + GlobalVariable.changeByPublishVersion]
        }).state("citys", {
            url: "/citys",
            templateUrl: "/template/public/citySelect.html",
            controllerUrl: baseStaticUrl + "js/controllers/public/CitySelectCtrl.js?v=" + GlobalVariable.changeByPublishVersion,
            controller: "CitySelectCtrl",
            pageTitle: "选择城市",
            showDownload: !1,
            headerType: "centerLayer",
            statisticsFlag: !0,
            showFootCopyRight: !1
        }).state("search", {
            url: "/search",
            templateUrl: "/template/public/search.html",
            controllerUrl: baseStaticUrl + "js/controllers/public/SearchCtrl.js?v=" + GlobalVariable.changeByPublishVersion,
            controller: "SearchCtrl",
            pageTitle: "搜索",
            showDownload: !1,
            headerType: "",
            showFootCopyRight: !1,
            statisticsFlag: !0,
            dependencies: [baseStaticUrl + "js/directives/autocomplete.js?v=" + GlobalVariable.changeByPublishVersion]
        }).state("takewatch", {
            "abstract": !0,
            url: "/takewatch",
            template: "<div ui-view ng-class=\"{'bodyOverflowHidden':bodyOverflowHidden}\"></div>"
        }).state("takewatch.comment", {
            url: "/comment/:watchid",
            templateUrl: "/template/takewatch/watchRemark.html?v=" + GlobalVariable.changeByPublishVersion,
            controllerUrl: baseStaticUrl + "js/controllers/takewatch/WatchRemarkCtrl.js?v=" + GlobalVariable.changeByPublishVersion,
            controller: "WatchRemarkCtrl",
            pageTitle: "链家带看评价",
            showDownload: !1,
            headerType: "centerLayer",
            showFootCopyRight: !1,
            statisticsFlag: !0,
            dependencies: [baseStaticUrl + "js/services/constans.js?v=" + GlobalVariable.changeByPublishVersion, baseStaticUrl + "js/filters/wapFilter.js?v=" + GlobalVariable.changeByPublishVersion]
        }).state("takewatch.accuracy", {
            url: "/accuracy/:watchid",
            templateUrl: "/template/takewatch/accuracyRemark.html?v=" + GlobalVariable.changeByPublishVersion,
            controllerUrl: baseStaticUrl + "js/controllers/takewatch/AccuracyRemarkCtrl.js?v=" + GlobalVariable.changeByPublishVersion,
            controller: "AccuracyRemarkCtrl",
            pageTitle: "反馈内容",
            showDownload: !1,
            headerType: "centerLayer",
            showFootCopyRight: !1,
            statisticsFlag: !0,
            dependencies: [baseStaticUrl + "js/services/constans.js?v=" + GlobalVariable.changeByPublishVersion, baseStaticUrl + "js/filters/wapFilter.js?v=" + GlobalVariable.changeByPublishVersion]
        }).state("user", {
            "abstract": !0,
            url: "/user",
            template: "<div ui-view></div>"
        }).state("user.index", {
            url: "/index",
            templateUrl: "/template/user/user.html?v=" + GlobalVariable.changeByPublishVersion,
            controllerUrl: baseStaticUrl + "js/controllers/user/UserCtrl.js?v=" + GlobalVariable.changeByPublishVersion,
            controller: "UserCtrl",
            pageTitle: "个人中心",
            showDownload: !1,
            headerType: "common",
            showFootCopyRight: !1,
            statisticsFlag: !0,
            hideUserIcon: !0
        }).state("user.favorHouse", {
            url: "/favorHouse",
            templateUrl: "/template/user/favorHouse.html?v=" + GlobalVariable.changeByPublishVersion,
            controllerUrl: baseStaticUrl + "js/controllers/user/FavorHouseCtrl.js?v=" + GlobalVariable.changeByPublishVersion,
            controller: "FavorHouseCtrl",
            pageTitle: "我关注的房源",
            showDownload: !1,
            headerType: "common",
            showFootCopyRight: !1,
            statisticsFlag: !0,
            dependencies: [baseStaticUrl + "js/services/constans.js?v=" + GlobalVariable.changeByPublishVersion, baseStaticUrl + "js/filters/wapFilter.js?v=" + GlobalVariable.changeByPublishVersion]
        }).state("user.favorProperty", {
            url: "/favorProperty",
            templateUrl: "/template/user/favorProperty.html?v=" + GlobalVariable.changeByPublishVersion,
            controllerUrl: baseStaticUrl + "js/controllers/user/FavorPropertyCtrl.js?v=" + GlobalVariable.changeByPublishVersion,
            controller: "FavorPropertyCtrl",
            pageTitle: "我关注的小区",
            showDownload: !1,
            headerType: "common",
            showFootCopyRight: !1,
            statisticsFlag: !0,
            dependencies: [baseStaticUrl + "js/services/constans.js?v=" + GlobalVariable.changeByPublishVersion, baseStaticUrl + "js/filters/wapFilter.js?v=" + GlobalVariable.changeByPublishVersion]
        }).state("user.favorZufang", {
            url: "/favorZufang",
            templateUrl: "/template/user/favorZufang.html?v=" + GlobalVariable.changeByPublishVersion,
            controllerUrl: baseStaticUrl + "js/controllers/user/FavorZufangCtrl.js?v=" + GlobalVariable.changeByPublishVersion,
            controller: "FavorZufangCtrl",
            pageTitle: "我关注的租房",
            showDownload: !1,
            headerType: "common",
            showFootCopyRight: !1,
            statisticsFlag: !0,
            dependencies: [baseStaticUrl + "js/services/constans.js?v=" + GlobalVariable.changeByPublishVersion, baseStaticUrl + "js/filters/wapFilter.js?v=" + GlobalVariable.changeByPublishVersion]
        }).state("user.favorXinfang", {
            url: "/favorXinfang",
            templateUrl: "/template/user/favorXinfang.html?v=" + GlobalVariable.changeByPublishVersion,
            controllerUrl: baseStaticUrl + "js/controllers/user/FavorXinfangCtrl.js?v=" + GlobalVariable.changeByPublishVersion,
            controller: "FavorXinfangCtrl",
            pageTitle: "我关注的新房",
            showDownload: !1,
            headerType: "common",
            showFootCopyRight: !1,
            statisticsFlag: !0,
            dependencies: [baseStaticUrl + "js/services/constans.js?v=" + GlobalVariable.changeByPublishVersion, baseStaticUrl + "js/filters/wapFilter.js?v=" + GlobalVariable.changeByPublishVersion]
        }).state("user.login", {
            url: "/login",
            templateUrl: "/template/user/login.html?v=" + GlobalVariable.changeByPublishVersion,
            controllerUrl: baseStaticUrl + "js/controllers/user/LoginCtrl.js?v=" + GlobalVariable.changeByPublishVersion,
            controller: "LoginCtrl",
            pageTitle: "登录",
            showDownload: !1,
            headerType: "",
            statisticsFlag: !0,
            showFootCopyRight: !1
        }).state("user.forget", {
            url: "/forget",
            templateUrl: "/template/user/forget.html?v=" + GlobalVariable.changeByPublishVersion,
            controllerUrl: baseStaticUrl + "js/controllers/user/ForgetCtrl.js?v=" + GlobalVariable.changeByPublishVersion,
            controller: "ForgetCtrl",
            pageTitle: "忘记密码",
            showDownload: !1,
            headerType: "",
            statisticsFlag: !0,
            showFootCopyRight: !1
        }).state("user.register", {
            url: "/register",
            templateUrl: "/template/user/register.html?v=" + GlobalVariable.changeByPublishVersion,
            controllerUrl: baseStaticUrl + "js/controllers/user/RegisterCtrl.js?v=" + GlobalVariable.changeByPublishVersion,
            controller: "RegisterCtrl",
            pageTitle: "注册",
            showDownload: !1,
            headerType: "",
            statisticsFlag: !0,
            showFootCopyRight: !1
        }).state("baikeHome", {
            url: "/baike",
            templateUrl: "/template/baike/home.html?v=" + GlobalVariable.changeByPublishVersion,
            controllerUrl: baseStaticUrl + "js/controllers/baike/BaikeHomeCtrl.js?v=" + GlobalVariable.changeByPublishVersion,
            controller: "BaikeHomeCtrl",
            pageTitle: "百科首页",
            channelType: "baike",
            showDownload: !1,
            headerType: "common",
            statisticsFlag: !0,
            showFootCopyRight: !1,
            bk_session: !0
        }).state("baikeHome.hot", {
            url: "/hot/:catalogCode",
            templateUrl: "/template/baike/homeRight.html?v=" + GlobalVariable.changeByPublishVersion,
            controllerUrl: baseStaticUrl + "js/controllers/baike/BaikeHomeRightCtrl.js?v=" + GlobalVariable.changeByPublishVersion,
            controller: "BaikeHomeRightCtrl",
            pageTitle: "百科首页",
            channelType: "baike",
            showDownload: !1,
            headerType: "common",
            statisticsFlag: !0,
            showFootCopyRight: !1,
            bk_session: !0
        }).state("baikeDetail", {
            url: "/baike/detail/{id}.html",
            templateUrl: "/template/baike/detail.html?v=" + GlobalVariable.changeByPublishVersion,
            controllerUrl: baseStaticUrl + "js/controllers/baike/BaikeDetailCtrl.js?v=" + GlobalVariable.changeByPublishVersion,
            controller: "BaikeDetailCtrl",
            pageTitle: "百科详情",
            channelType: "baike",
            showDownload: !1,
            headerType: "common",
            statisticsFlag: !0,
            showFootCopyRight: !1,
            bk_session: !0
        }).state("baikeCata", {
            url: "/baike/:catalogCode",
            templateUrl: "/template/baike/baikeCatalogList.html?v=" + GlobalVariable.changeByPublishVersion,
            controllerUrl: baseStaticUrl + "js/controllers/baike/BaikeCataListCtrl.js?v=" + GlobalVariable.changeByPublishVersion,
            controller: "BaikeCataListCtrl",
            pageTitle: "百科二级列表",
            channelType: "baike",
            showDownload: !1,
            headerType: "common",
            statisticsFlag: !0,
            showFootCopyRight: !1,
            bk_session: !0,
            dependencies: [baseStaticUrl + "js/services/constans.js?v=" + GlobalVariable.changeByPublishVersion, baseStaticUrl + "js/filters/wapFilter.js?v=" + GlobalVariable.changeByPublishVersion]
        }).state("xuequ", {
            "abstract": !0,
            url: "/xuequ",
            template: "<div ui-view></div>"
        }).state("xuequ.doc", {
            url: "/doc/{docId}.html",
            templateUrl: "/template/xuequ/docDetail.html?v=" + GlobalVariable.changeByPublishVersion,
            controllerUrl: baseStaticUrl + "js/controllers/xuequ/XuequDocDetailCtrl.js?v=" + GlobalVariable.changeByPublishVersion,
            controller: "XuequDocDetailCtrl",
            pageTitle: " 招生简章",
            showDownload: !1,
            headerType: "common",
            statisticsFlag: !0,
            showFootCopyRight: !1,
            dependencies: [baseStaticUrl + "js/services/constans.js?v=" + GlobalVariable.changeByPublishVersion, baseStaticUrl + "js/filters/wapFilter.js?v=" + GlobalVariable.changeByPublishVersion]
        }).state("toutiaoHome", {
            url: "/toutiao/list",
            templateUrl: "/template/toutiao/home.html?v=" + GlobalVariable.changeByPublishVersion,
            controllerUrl: baseStaticUrl + "js/controllers/toutiao/ToutiaoHomeCtrl.js?v=" + GlobalVariable.changeByPublishVersion,
            controller: "ToutiaoHomeCtrl",
            pageTitle: "头条首页",
            showDownload: !1,
            headerType: "common",
            statisticsFlag: !0,
            showFootCopyRight: !1,
            dependencies: [baseStaticUrl + "js/filters/wapFilter.js?v=" + GlobalVariable.changeByPublishVersion]
        }).state("toutiaoHome.cate", {
            url: "/:catalogCode",
            templateUrl: "/template/toutiao/homelist.html?v=" + GlobalVariable.changeByPublishVersion,
            controllerUrl: baseStaticUrl + "js/controllers/toutiao/ToutiaoListCtrl.js?v=" + GlobalVariable.changeByPublishVersion,
            controller: "ToutiaoListCtrl",
            pageTitle: "头条首页",
            showDownload: !1,
            headerType: "common",
            statisticsFlag: !0,
            showFootCopyRight: !1,
            dependencies: [baseStaticUrl + "js/filters/wapFilter.js?v=" + GlobalVariable.changeByPublishVersion]
        }).state("404", {
            templateUrl: "/template/public/404.html?v=" + GlobalVariable.changeByPublishVersion,
            pageTitle: "",
            showDownload: !1,
            headerType: "centerLayer",
            statisticsFlag: !0,
            showFootCopyRight: !1
        })
    }]),
    o
});