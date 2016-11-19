define(["require", baseStaticUrl + "js/app.js?v=" + GlobalVariable.changeByPublishVersion, "/js/vender/swiper/swiper.min.js", baseStaticUrl + "js/directives/contactAgentDirective.js?v=" + GlobalVariable.changeByPublishVersion],
function(e, o, l) {
    o.controller("ErshoufangDetailCtrl", ["$scope", "$http", "$filter", "$rootScope", "$state", "$stateParams", "$location", "$timeout", "$filter", "util", "lj_constants", "$cookies",
    function(e, o, l, a, i, s, t, n, l, u, r, h) {
        function c(o) {
            e.$apply(function() {
                e.showBigSwiperlayer = !0,
                a.bodyOverflowHidden = !0
            });
            var l = null;
            n(function() {
                l = new Swiper("#detailBigSwiper", {
                    initialSlide: o.activeIndex,
                    lazyLoading: !0,
                    lazyLoadingInPrevNext: !0,
                    onSlideChangeStart: function(o) {
                        e.$apply(function() {
                            e.bigCurrentIndex = Number(o.activeIndex) + 1
                        })
                    }
                })
            })
        }
        var f = t.search();
        a.headerType = f.from && "vip" == f.from ? "": a.headerType,
        e.houseDetailLoading = !0,
        e.house_code = s.house_code,
        e.searchparams = {},
        e.searchparams.agentfrom = "WAP_SALE_RECOM_BROKER",
        "news" == a.platformObj.client && (e.searchparams.agentfrom = "JRTT_BROKER"),
        e.ajaxFeedback = {
            show: !1,
            msg: ""
        };
        var p = {
            0 : "off",
            1 : "sale",
            2 : "sold"
        };
        e.houseDetailInfo = {},
        e.currentIndex = 1,
        e.bigCurrentIndex = 1,
        e.needMultEllip = !0,
        e.switchMultEllipsis = function() {
            e.needMultEllip = !e.needMultEllip
        },
        e.initPage = function() {
            var i = {
                houseSellId: e.house_code,
                sh_access_token: u.getLocalStorage("LJ_M_ACCESS_MSG") ? u.getLocalStorage("LJ_M_ACCESS_MSG").access_token: "",
                cityCode: a.constants.cityCode,
                access_token: "7poanTTBCymmgE0FOn1oKp",
                client: a.platformObj.client
            },
            s = t.search();
            s.aid && (i.userCode = s.aid, e.searchparams.agentfrom = "LJK_BROKER"),
            o.get(a.api_host + "/house/ershoufang/detail.json", {
                params: i
            }).success(function(o) {
                if (!o) return e.houseDetailLoading = !1,
                void(e.ajaxFeedback = {
                    show: !0,
                    msg: "服务端报错，请重试！"
                });
                if ("ok" != o.status) return e.houseDetailLoading = !1,
                void(e.ajaxFeedback = {
                    show: !0,
                    msg: o.error ? o.error: "请求报错，请重试！"
                });
                if (e.houseDetailInfo = angular.copy(o), "" !== e.houseDetailInfo.houseSell.putAway && null !== e.houseDetailInfo.houseSell.putAway && void 0 !== e.houseDetailInfo.houseSell.putAway && (e.houseDetailInfo.houseSell.putAwayText = p[e.houseDetailInfo.houseSell.putAway]), e.houseDetailInfo.houseSell.noDesc = !(e.houseDetailInfo.houseSell.hexinmaidian || e.houseDetailInfo.houseSell.huxingjieshao || e.houseDetailInfo.houseSell.zhuangxiumiaoshu || e.houseDetailInfo.houseSell.shuifeijiexi || e.houseDetailInfo.houseSell.shoufangyuanyin || e.houseDetailInfo.houseSell.touzifenxi || e.houseDetailInfo.houseSell.jiaotongchuxing || e.houseDetailInfo.houseSell.xuequjieshao || e.houseDetailInfo.houseSell.zhoubianpeitao || e.houseDetailInfo.houseSell.xiaoqujieshao), e.houseDetailInfo.picList) {
                    if (0 == e.houseDetailInfo.picList.length) {
                        var a = {
                            fullPhotoUrl: "/sh/static/images/common/default_lianjia_big.png",
                            photoUrl: "/sh/static/images/common/default_lianjia_big.png",
                            parentCategories: ""
                        };
                        e.houseDetailInfo.picList.push(a)
                    }
                    e.houseDetailInfo.picList.forEach(function(e) {
                        e.fullPhotoUrl || (e.fullPhotoUrl = "/sh/static/images/common/default_lianjia_big.png")
                    }),
                    n(function() {
                        new Swiper("#detailSwiper", {
                            autoplay: 5e3,
                            lazyLoading: !0,
                            lazyLoadingInPrevNext: !0,
                            onSlideChangeStart: function(o) {
                                e.$apply(function() {
                                    e.currentIndex = Number(o.activeIndex) + 1
                                })
                            },
                            onClick: function(e) {
                                c(e)
                            }
                        })
                    })
                }
                e.houseDetailInfo.houseSell.tagsText = e.houseDetailInfo.houseSell.tags ? u.buildTagsTextByZh(e.houseDetailInfo.houseSell.tags.split(","), r.constants.tagsZhToEnObj) : [],
                e.houseDetailInfo.property.schoolRemarkArr = e.houseDetailInfo.property.schoolRemark ? e.houseDetailInfo.property.schoolRemark.split(" ") : [],
                e.houseDetailInfo.property.metroRemarkArr = e.houseDetailInfo.property.metroRemark ? e.houseDetailInfo.property.metroRemark.split(" ") : [];
                var i = t.search();
                i.like && !e.houseDetailInfo.houseSell.isFollow && e.follow(!0),
                e.smsContent = "【链家网-二手房】我想咨询房源：" + e.houseDetailInfo.property.propertyName + "," + l("parseToInt")(e.houseDetailInfo.houseSell.acreage) + "平," + e.houseDetailInfo.houseSell.room + "室" + e.houseDetailInfo.houseSell.hall + "厅" + e.houseDetailInfo.houseSell.guard + "卫," + l("number")(e.houseDetailInfo.houseSell.showPrice, 0) + "万(编号" + e.houseDetailInfo.houseSell.cityCode + e.houseDetailInfo.houseSell.id + ")，请尽快与我联系",
                e.mapUrl = "/map/pos?pos=" + e.houseDetailInfo.property.longitude + "," + e.houseDetailInfo.property.latitude;
                var s = l("number")(e.houseDetailInfo.houseSell.showPrice, 0) + "万",
                h = (e.houseDetailInfo.houseSell.room ? e.houseDetailInfo.houseSell.room: 0) + "室",
                f = (e.houseDetailInfo.houseSell.hall ? e.houseDetailInfo.houseSell.hall: 0) + "厅",
                d = e.houseDetailInfo.houseSell.acreage ? l("parseToInt")(e.houseDetailInfo.houseSell.acreage) + "㎡": "",
                g = l("ifNull")(e.houseDetailInfo.property.propertyName),
                S = s + " " + h + f + " " + d + " " + g,
                I = {
                    title: e.houseDetailInfo.houseSell.title,
                    desc: S,
                    url: window.location.href,
                    imgUrl: e.houseDetailInfo.picList[0].fullPhotoUrl
                };
                /* wx.ready(function() {
                    wx.onMenuShareTimeline({
                        title: I.title,
                        link: I.url,
                        imgUrl: I.imgUrl,
                        success: function() {},
                        cancel: function() {}
                    }),
                    wx.onMenuShareAppMessage({
                        title: I.title,
                        desc: I.desc,
                        link: I.url,
                        imgUrl: I.imgUrl,
                        success: function() {},
                        cancel: function() {}
                    })
                }), */
                e.houseDetailLoading = !1
            }).error(function() {
                e.houseDetailLoading = !1,
                e.ajaxFeedback = {
                    show: !0,
                    msg: "服务端报错，请刷新重试！"
                }
            })
        },
        e.initPage(),
        e.hasClick = !1,
        e.follow = function(l) {
            if (!e.hasClick) {
                e.hasClick = !0;
                var i = {
                    houseSellId: e.houseDetailInfo.houseSell.id,
                    sh_access_token: u.getLocalStorage("LJ_M_ACCESS_MSG") ? u.getLocalStorage("LJ_M_ACCESS_MSG").access_token: "",
                    client: a.platformObj.client
                },
                s = a.api_host + "/favor/addFavorHouse?access_token=7poanTTBCymmgE0FOn1oKp";
                e.houseDetailInfo.houseSell.isFollow && (s = a.api_host + "/favor/delFavorHouse?access_token=7poanTTBCymmgE0FOn1oKp");
                var r = [];
                for (var h in i) r.push(h + "=" + i[h]);
                o({
                    method: "POST",
                    url: s,
                    data: r.join("&"),
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    }
                }).success(function(o) {
                    if (!o) return void(e.ajaxFeedback = {
                        show: !0,
                        msg: "服务端报错，请重试！"
                    });
                    if ("ok" == o.status) e.feedback = !0,
                    e.followState = e.houseDetailInfo.houseSell.isFollow ? "取消关注成功": "关注成功",
                    e.houseDetailInfo.houseSell.isFollow = Number(!e.houseDetailInfo.houseSell.isFollow),
                    n(function() {
                        e.feedback = !1
                    },
                    2e3);
                    else {
                        if ( - 1 != o.code) return void(e.ajaxFeedback = {
                            show: !0,
                            msg: o.error ? o.error: "请求报错，请重试！"
                        });
                        if (l) {
                            var a = t.search();
                            delete a.like,
                            t.search(a)
                        } else {
                            var i = window.location.href;
                            i = i.indexOf("?") > -1 ? i + "&like=1": i + "?like=1",
                            t.search("redirect", i).path("/user/login")
                        }
                    }
                    if (e.hasClick = !1, l) {
                        var a = t.search();
                        delete a.like,
                        t.search(a)
                    }
                }).error(function() {
                    e.ajaxFeedback = {
                        show: !0,
                        msg: "服务端报错，请重试！"
                    }
                })
            }
        },
        e.closeImageLayer = function() {
            e.showBigSwiperlayer = !1,
            a.bodyOverflowHidden = !1
        },
        e.gotoSeeRecordPage = function() {
            i.go("ershoufang.jilu", {
                house_code: e.houseDetailInfo.houseSell.id
            })
        }
    }])
});