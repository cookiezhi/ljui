define(["require", baseStaticUrl + "js/app.js?v=" + GlobalVariable.changeByPublishVersion, baseStaticUrl + "js/directives/scrollLoad.js?v=" + GlobalVariable.changeByPublishVersion, baseStaticUrl + "js/directives/esfSwitchPricePanel.js?v=" + GlobalVariable.changeByPublishVersion],
function(a, t) {
    t.controller("ChengjiaoListCtrl", ["$scope", "$http", "$rootScope", "$q", "$timeout", "$state", "$stateParams", "$window", "$location", "util", "lj_constants",
    function(a, t, e, n, o, i, s, r, c, l, g) {
        function d(e) {
            var n = {
                userCode: e,
                agentfrom: a.searchparams.agentfrom
            };
            t.get("/agent/getAgent", {
                params: n
            }).success(function(t) {
                if (0 === t.errno) {
                    a.agent = t.data && t.data.agent ? t.data.agent: null;
                    var e = !1;
                    if (e = "sh" == GlobalParameters.city_code ? a.agent && a.agent.display === !0 && 1 === a.agent.positionId && (1 == a.agent.custStatus || 2 == a.agent.custStatus) : a.agent && a.agent.display === !0 && 1 === a.agent.positionId, e && a.agent && a.agent.phone) {
                        a.agentjumpurl = window.location.origin + "/jingjiren/detail/" + a.agent.userCode + ".html?agentfrom=" + a.searchparams.agentfrom,
                        a.agent.realPhone = -1 != a.agent.phone.indexOf(",") ? a.agent.hostNumber + "," + a.agent.extNumber: a.agent.phone,
                        a.agent.showPhone = -1 != a.agent.phone.indexOf(",") ? a.agent.hostNumber + "转" + a.agent.extNumber: a.agent.phone;
                        var n = {
                            title: a.agent.userName + "的历史成交 | " + a.agent.cityName + "链家经纪人 | " + a.agent.orgName,
                            desc: "我最近一年成交" + t.data.soldCountPastYear + "套，欢迎随时联系",
                            url: window.location.href,
                            imgUrl: a.agent.avatar ? a.agent.avatar: window.location.origin + "/sh/static/images/common/agent_default.png"
                        };
                        wx.ready(function() {
                            wx.onMenuShareTimeline({
                                title: n.title,
                                link: n.url,
                                imgUrl: n.imgUrl,
                                success: function() {},
                                cancel: function() {}
                            }),
                            wx.onMenuShareAppMessage({
                                title: n.title,
                                desc: n.desc,
                                link: n.url,
                                imgUrl: n.imgUrl,
                                success: function() {},
                                cancel: function() {}
                            })
                        })
                    }
                }
            }).error(function() {})
        }
        function u() {
            if (!l.isEmptyObject(s) && s.oneFilter && -1 !== s.oneFilter.indexOf("q")) {
                var t = s.oneFilter;
                a.reqdata.community_id = t.substring(1)
            }
            h();
            var n = c.search();
            n.aid && (e.showDownload = !1, d(n.aid))
        }
        function m() {
            var t = angular.copy(a.reqdata);
            for (var e in t) t[e] && t[e] instanceof Array && (t[e] = t[e].join(",")),
            (void 0 === t[e] || "" === t[e] || null === t[e]) && delete t[e];
            return t
        }
        function h(n) {
            var i = m();
            t.get(e.api_host + "/house/chengjiao/search.json", {
                params: i
            }).success(function(t) {
                return a.listLoading = !1,
                t ? 0 !== t.errno ? void(a.feedbackInfo = {
                    show: !0,
                    msg: t.error ? t.error: "请求报错，请重试！"
                }) : (t.data && t.data.list && (n ? a.chengjiaoList = a.chengjiaoList.concat(t.data.list) : (a.showListCount = !0, a.chengjiaoList = t.data.list, o(function() {
                    a.showListCount = !1
                },
                2e3)), a.isLastPage = 1 !== t.data.has_more_data, a.chengjiaoList.forEach(function(a) {
                    a.tagsText = a.tags ? l.buildTagsObj(a.tags, g.constants.tagsObj) : [],
                    a.mainPhotoUrl || (a.mainPhotoUrl = "/images/default_lianjia_small.png")
                })), a.isPageDown = !1, a.totalCount = t.data.total_count ? t.data.total_count: 0, void 0) : void(a.feedbackInfo = {
                    show: !0,
                    msg: "请求出错，请重试！"
                })
            }).error(function() {
                a.listLoading = !1,
                a.feedbackInfo = {
                    show: !0,
                    msg: "服务端出错，请重试！"
                }
            })
        }
        a.feedbackInfo = {
            show: !1,
            msg: ""
        },
        a.pagedata = {},
        a.listLoading = !0,
        a.showListCount = !1,
        a.reqdata = {},
        a.reqdata.cityCode = e.constants.cityCode,
        a.reqdata.channel = "chengjiao",
        a.reqdata.limit_count = 20,
        a.reqdata.limit_offset = 0,
        a.reqdata.client = e.platformObj.client,
        a.reqdata.access_token = "7poanTTBCymmgE0FOn1oKp";
        var f = c.search();
        f.aid && (a.reqdata.soldUserCode = f.aid),
        a.chengjiaoList = [],
        a.searchparams = {},
        a.searchparams.agentfrom = "",
        "news" == e.platformObj.client && (a.searchparams.agentfrom = "JRTT_BROKER"),
        u(),
        a.$watch("isPageDown",
        function(t) {
            t !== !0 || a.isLastPage || (a.listLoading = !0, a.reqdata.limit_offset = a.reqdata.limit_offset + a.reqdata.limit_count, h(!0))
        }),
        a.sendSMS = function() {
            var t = a.agent && a.agent.smsPhone ? a.agent.smsPhone: "",
            n = "【链家网-咨询】我在链家网看到你的成交房源，想咨询一些问题，请尽快与我联系";
            e.trackOutboundLinkAllParam("agent", "contact", "msg"),
            l.sendSMS(t, n)
        }
    }])
});