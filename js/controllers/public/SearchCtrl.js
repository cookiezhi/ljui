define(["require", baseStaticUrl + "js/app.js?v=" + GlobalVariable.changeByPublishVersion],
function(e, a) {
    a.controller("SearchCtrl", ["$scope", "$http", "$rootScope", "$location", "util",
    function(e, a, o, n, r) {
        e.searchUrl = o.api_host + "/house/suggestion/index",
        e.otherParams = {
            cityCode: o.constants.cityCode,
            channel_id: "ershoufang",
            type: "ershoufang"
        },
        e.placeholder = "请输入小区或板块名";
        var l = {
            home: {
                channel_id: "ershoufang",
                placeholder: "请输入小区或板块名"
            },
            ershoufang: {
                channel_id: "ershoufang",
                placeholder: "请输入小区或板块名"
            },
            xuequfangyuan: {
                channel_id: "ershoufang",
                placeholder: "请输入小区或板块名"
            },
            xuequfang: {
                channel_id: "school",
                placeholder: "请输入划片学校或小区名"
            },
            zufang: {
                channel_id: "zufang",
                placeholder: "请输入小区或板块名"
            },
            xiaoqu: {
                channel_id: "xiaoqu",
                placeholder: "请输入小区或板块名"
            }
        },
        h = n.search();
        h.from && (e.otherParams.channel_id = l[h.from].channel_id, e.otherParams.type = l[h.from].channel_id, e.placeholder = l[h.from].placeholder),
        h.keyword && (e.modelValue = h.keyword),
        e.searchCallback = function(e) {
            window.location.href = (h.from ? "/" + h.from: "/ershoufang") + e.url
        }
    }])
});