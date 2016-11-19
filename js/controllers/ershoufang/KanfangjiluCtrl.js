define(["require", baseStaticUrl + "js/app.js?v=" + GlobalVariable.changeByPublishVersion, baseStaticUrl + "js/directives/scrollLoad.js?v=" + GlobalVariable.changeByPublishVersion],
function(e, o) {
    o.controller("KanfangjiluCtrl", ["$scope", "$http", "$rootScope", "$stateParams", "util",
    function(e, o, r, s, a) {
        e.house_code = s.house_code,
        e.searchparams = {},
        e.searchparams.agentfrom = "WAP_BROKER",
        "news" == r.platformObj.client && (e.searchparams.agentfrom = "JRTT_BROKER"),
        e.loading = !0,
        e.seeRecordInfo = {},
        e.ajaxFeedback = {
            show: !1,
            msg: ""
        },
        e.orderbyindex = 20,
        e.jumpToAgentPage = function(o) {
            window.location.href = window.location.origin + "/jingjiren/detail/" + o.userCode + ".html?agentfrom=" + e.searchparams.agentfrom
        },
        e.initPage = function() {
            var s = {
                houseSellId: e.house_code,
                cityCode: r.constants.cityCode,
                limit_offset: 0,
                access_token: "7poanTTBCymmgE0FOn1oKp",
                client: r.platformObj.client
            };
            o.get(r.api_host + "/house/ershoufang/seeRecord.json", {
                params: s
            }).success(function(o) {
                return o ? 0 !== o.errno ? (e.loading = !1, void(e.ajaxFeedback = {
                    show: !0,
                    msg: o.error ? o.error: "请求报错，请重试！"
                })) : (e.seeRecordInfo = o.data ? o.data: {},
                e.seeRecordInfo.see_record_list && e.seeRecordInfo.see_record_list.length && (e.seeRecordInfo.see_record_list.forEach(function(e) {
                    1 === e.status && 1 === e.positionId && 1 === e.display && (e.showPhone = e.phone ? e.phone.replace(",", " 转") : "")
                }), e.orderbyindex = e.seeRecordInfo.see_record_list.length <= 20 ? e.seeRecordInfo.see_record_list.length: 20, e.isLastPage = e.seeRecordInfo.see_record_list.length <= 20 ? !0 : !1, e.showSeeRecordList = angular.copy(e.seeRecordInfo.see_record_list)), e.loading = !1, void 0) : (e.loading = !1, void(e.ajaxFeedback = {
                    show: !0,
                    msg: "服务端报错，请重试！"
                }))
            }).error(function() {
                e.loading = !1,
                e.ajaxFeedback = {
                    show: !0,
                    msg: "服务端报错，请重试！"
                }
            })
        },
        e.initPage(),
        e.$watch("isPageDown",
        function(o) {
            if (o === !0 && !e.isLastPage) {
                var r = e.showSeeRecordList.length;
                e.orderbyindex = e.orderbyindex + 20 > r ? r: e.orderbyindex + 20,
                e.isLastPage = e.orderbyindex >= r ? !0 : !1,
                e.isPageDown = !1
            }
        })
    }])
});