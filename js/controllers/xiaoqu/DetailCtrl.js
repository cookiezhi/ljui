define(["require", baseStaticUrl + "js/app.js?v=" + GlobalVariable.changeByPublishVersion, "/js/vender/swiper/swiper.min.js"],
function(e, o, a) {
    o.controller("XiaoquDetailCtrl", ["$scope", "$http", "$rootScope", "$state", "$stateParams", "$location", "$timeout", "$filter", "util", "lj_constants", "$cookies",
    function(e, o, a, t, n, i, r, s, l, c, u) {
        function h(o) {
            e.$apply(function() {
                e.showBigSwiperlayer = !0,
                a.bodyOverflowHidden = !0
            });
            var t = null;
            r(function() {
                t = new Swiper("#detailBigSwiper", {
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
        var p = i.search();
        a.headerType = p.from && "vip" == p.from ? "": a.headerType,
        e.houseDetailLoading = !0,
        e.community_id = n.community_id,
        e.searchparams = {},
        e.searchparams.agentfrom = "WAP_XQ_RECOM_BROKER",
        "news" == a.platformObj.client && (e.searchparams.agentfrom = "JRTT_BROKER"),
        e.ajaxFeedback = {
            show: !1,
            msg: ""
        },
        e.houseDetailInfo = {},
        e.currentIndex = 1,
        e.bigCurrentIndex = 1,
        e.initPage = function() {
            var t = {
                propertyNo: e.community_id,
                sh_access_token: l.getLocalStorage("LJ_M_ACCESS_MSG") ? l.getLocalStorage("LJ_M_ACCESS_MSG").access_token: "",
                cityCode: a.constants.cityCode,
                access_token: "7poanTTBCymmgE0FOn1oKp",
                client: a.platformObj.client
            },
            n = i.search();
            n.aid && (t.userCode = n.aid, e.searchparams.agentfrom = "LJK_BROKER"),
            o.get(a.api_host + "/house/xiaoqu/detail.json", {
                params: t
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
                if (e.houseDetailInfo = angular.copy(o.data), e.houseDetailInfo.picList) {
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
                    r(function() {
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
                                h(e)
                            }
                        })
                    }),
                    e.mapUrl = "/map/pos?pos=" + e.houseDetailInfo.property.longitude + "," + e.houseDetailInfo.property.latitude
                }
                e.houseDetailInfo.agent = e.houseDetailInfo.empList && e.houseDetailInfo.empList[0] ? e.houseDetailInfo.empList[0] : null,
                e.houseDetailInfo.agent && 1 === e.houseDetailInfo.agent.status && 1 === e.houseDetailInfo.agent.display && 1 === e.houseDetailInfo.agent.positionId && e.houseDetailInfo.agent && e.houseDetailInfo.agent.phone && (e.houseDetailInfo.agent.realPhone = -1 != e.houseDetailInfo.agent.phone.indexOf(",") ? e.houseDetailInfo.agent.hostNumber + "," + e.houseDetailInfo.agent.extNumber: e.houseDetailInfo.agent.phone, e.houseDetailInfo.agent.showPhone = -1 != e.houseDetailInfo.agent.phone.indexOf(",") ? e.houseDetailInfo.agent.hostNumber + "转" + e.houseDetailInfo.agent.extNumber: e.houseDetailInfo.agent.phone, e.agentjumpurl = window.location.origin + "/jingjiren/detail/" + e.houseDetailInfo.agent.userCode + ".html?agentfrom=" + e.searchparams.agentfrom + "&propertyno=" + e.community_id);
                var t = i.search();
                t.like && !e.houseDetailInfo.property.isFollow && e.follow(!0),
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
        e.follow = function(t) {
            if (!e.hasClick) {
                e.hasClick = !0;
                var n = {
                    propertyNo: e.houseDetailInfo.property.propertyNo,
                    sh_access_token: l.getLocalStorage("LJ_M_ACCESS_MSG") ? l.getLocalStorage("LJ_M_ACCESS_MSG").access_token: "",
                    client: a.platformObj.client
                },
                s = a.api_host + "/favor/addFavorProperty?access_token=7poanTTBCymmgE0FOn1oKp";
                e.houseDetailInfo.property.isFollow && (s = a.api_host + "/favor/delFavorProperty?access_token=7poanTTBCymmgE0FOn1oKp");
                var c = [];
                for (var u in n) c.push(u + "=" + n[u]);
                o({
                    method: "POST",
                    url: s,
                    data: c.join("&"),
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    }
                }).success(function(o) {
                    if (!o) return void(e.ajaxFeedback = {
                        show: !0,
                        msg: "服务端报错，请重试！"
                    });
                    if ("ok" == o.status) e.feedback = !0,
                    e.followState = e.houseDetailInfo.property.isFollow ? "取消关注成功": "关注成功",
                    e.houseDetailInfo.property.isFollow = Number(!e.houseDetailInfo.property.isFollow),
                    r(function() {
                        e.feedback = !1
                    },
                    2e3);
                    else {
                        if ( - 1 != o.code) return void(e.ajaxFeedback = {
                            show: !0,
                            msg: o.error ? o.error: "请求报错，请重试！"
                        });
                        if (t) {
                            var a = i.search();
                            delete a.like,
                            i.search(a)
                        } else {
                            var n = window.location.href;
                            n = n.indexOf("?") > -1 ? n + "&like=1": n + "?like=1",
                            i.search("redirect", n).path("/user/login")
                        }
                    }
                    if (e.hasClick = !1, t) {
                        var a = i.search();
                        delete a.like,
                        i.search(a)
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
        e.sendSMS = function() {
            var o = e.houseDetailInfo.agent.phoneNumber,
            t = "【链家网-小区】我想了解小区：" + e.houseDetailInfo.property.propertyName + "，请尽快与我联系";
            a.trackOutboundLinkAllParam("agent", "contact", "msg"),
            l.sendSMS(o, t)
        }
    }])
});