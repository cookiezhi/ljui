define(["require", baseStaticUrl + "js/app.js?v=" + GlobalVariable.changeByPublishVersion, "/js/vender/swiper/swiper.min.js"],
function(a, e) {
    e.controller("HomeCtrl", ["$scope", "$http", "$rootScope", "$q", "$timeout", "$cookies", "util", "lj_constants",
    function(a, e, t, o, n, i, s, c) {
        function r() {
            e.get(t.api_host + "/homepage/ad.json", {
                params: {
                    client: t.platformObj.client,
                    cityCode: t.constants.cityCode,
                    access_token: "7poanTTBCymmgE0FOn1oKp"
                }
            }).success(function(e) {
                return e ? void(0 === e.errno && (a.hotHouseListLoading = !1, a.advPicList = e.data && e.data.list && e.data.list.length ? e.data.list: [], a.advPicList.length > 0 && n(function() {
                    new Swiper("#homeSwiper", {
                        autoplay: 5e3,
                        loop: !0,
                        pagination: "#homeSwiper-pagination"
                    })
                },
                30))) : (a.hotHouseListLoading = !1, void(a.ajaxFeedback = {
                    show: !0,
                    msg: "服务端报错，请重试！"
                }))
            }).error(function() {
                a.hotHouseListLoading = !1,
                a.ajaxFeedback = {
                    show: !0,
                    msg: "服务端报错，请重试！"
                }
            })
        }
        function m() {
            e.get(t.api_host + "/homepage/city/hangqing.json", {
                params: {
                    cityCode: t.constants.cityCode,
                    client: t.platformObj.client,
                    access_token: "7poanTTBCymmgE0FOn1oKp"
                }
            }).success(function(e) {
                return e ? void(0 === e.errno && (a.ershoufangMarketInfo = e.data ? e.data: {})) : void(a.ajaxFeedback = {
                    show: !0,
                    msg: "服务端报错，请重试！"
                })
            }).error(function() {
                a.ajaxFeedback = {
                    show: !0,
                    msg: "服务端报错，请重试！"
                }
            })
        }
        function l() {
            var o = {
                cityCode: t.constants.cityCode,
                access_token: "7poanTTBCymmgE0FOn1oKp",
                client: t.platformObj.client
            };
            e.get(t.api_host + "/baike/toutiao/navdocs.json", {
                params: o
            }).success(function(e) {
                return e ? void(a.toutiaoList = e.data) : void(a.ajaxFeedback = {
                    show: !0,
                    msg: "服务端报错，请重试！"
                })
            }).error(function() {
                a.ajaxFeedback = {
                    show: !0,
                    msg: "服务端报错，请重试！"
                }
            })
        }
        function u() {
            e.get(t.api_host + "/house/ershoufang/recomHouse.json", {
                params: {
                    cityCode: t.constants.cityCode,
                    client: t.platformObj.client,
                    access_token: "7poanTTBCymmgE0FOn1oKp"
                }
            }).success(function(e) {
                return e ? void(0 === e.errno && (a.ershoufangList = e.data && e.data.list ? e.data.list: [], a.ershoufangList.forEach(function(a) {
                    a.tagsText = a.tags ? s.buildTagsObj(a.tags, c.constants.tagsObj) : [],
                    a.mainPhotoUrl || (a.mainPhotoUrl = "/sh/static/images/common/default_lianjia_small.png")
                }))) : void(a.ajaxFeedback = {
                    show: !0,
                    msg: "服务端报错，请重试！"
                })
            }).error(function() {
                a.ajaxFeedback = {
                    show: !0,
                    msg: "服务端报错，请重试！"
                }
            })
        }
        var h = {
            development: "http://m." + GlobalParameters.city_code + ".lianjia.net/m",
            test: "http://m." + GlobalParameters.city_code + ".lianjia.net/m",
            integration: "http://m." + GlobalParameters.city_code + ".lianjia.org/m",
            production: "http://m." + GlobalParameters.city_code + ".lianjia.com/m"
        };
        a.curCityCode = GlobalParameters.city_code,
        a.channelBoxs = {
            sh: [{
                cityName: "上海",
                href: "/ershoufang/",
                className: "menu-ershoufang",
                channelName: "二手房"
            },
            {
                cityName: "上海",
                href: h[GlobalParameters.env],
                className: "menu-xinfang",
                channelName: "新房",
                needJump: !0
            },
            {
                cityName: "上海",
                href: "/zufang",
                className: "menu-rent",
                channelName: "租房"
            },
            {
                cityName: "上海",
                href: "/baike/hot/",
                className: "menu-baike",
                channelName: "房产百科"
            }],
            su: [{
                cityName: "苏州",
                href: "/ershoufang/",
                className: "menu-ershoufang",
                channelName: "二手房"
            },
            {
                cityName: "苏州",
                href: "/xiaoqu/",
                className: "menu-xiaoqu",
                channelName: "小区"
            }]
        },
        a.channels = a.channelBoxs[GlobalParameters.city_code],
        a.hotHouseListLoading = !0,
        a.advPicList = [],
        a.ershoufangMarketInfo = {},
        a.ajaxFeedback = {
            show: !1,
            msg: ""
        },
        a.initHomePage = function() {
            r(),
            m(),
            /*l(),*/
            u()
        },
        a.initHomePage(),
        a.jumpToNotNgDetailPage = function(a) {
            window.location.href = window.location.origin + "/toutiao/detail/" + a.id
        }
    }])
});