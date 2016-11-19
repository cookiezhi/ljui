define(["require", baseStaticUrl + "js/app.js?v=" + GlobalVariable.changeByPublishVersion],
function(t, a) {
    a.controller("CitySelectCtrl", ["$scope", "$http", "$rootScope", "$timeout",
    function(t, a, l, i) {
        var n = {
            development: "net",
            test: "net",
            integration: "org",
            production: "com"
        };
        t.cityObj = {
            common: [{
                text: "北京",
                url: "http://m.lianjia.com/bj/"
            },
            {
                text: "天津",
                url: "http://m.lianjia.com/tj/"
            },
            {
                text: "上海",
                url: "http://m.sh.lianjia." + n[GlobalParameters.env] + "/"
            },
            {
                text: "苏州",
                url: "http://m.su.lianjia." + n[GlobalParameters.env] + "/"
            },
            {
                text: "成都",
                url: "http://m.lianjia.com/cd/"
            },
            {
                text: "南京",
                url: "http://m.lianjia.com/nj/"
            },
            {
                text: "杭州",
                url: "http://m.lianjia.com/hz/"
            },
            {
                text: "青岛",
                url: "http://m.lianjia.com/qd/"
            },
            {
                text: "大连",
                url: "http://m.lianjia.com/dl/"
            },
            {
                text: "厦门",
                url: "http://m.lianjia.com/xm/"
            },
            {
                text: "武汉",
                url: "http://m.lianjia.com/wh/"
            },
            {
                text: "深圳",
                url: "http://m.lianjia.com/sz/"
            },
            {
                text: "重庆",
                url: "http://m.lianjia.com/cq/"
            },
            {
                text: "长沙",
                url: "http://m.lianjia.com/cs/"
            },
            {
                text: "西安",
                url: "http://m.lianjia.com/xa/"
            },
            {
                text: "济南",
                url: "http://m.lianjia.com/jn/"
            },
            {
                text: "石家庄",
                url: "http://m.lianjia.com/sjz/"
            },
            {
                text: "广州",
                url: "http://m.lianjia.com/gz/"
            },
            {
                text: "东莞",
                url: "http://m.lianjia.com/dg/loupan/fang/"
            },
            {
                text: "佛山",
                url: "http://m.lianjia.com/fs/"
            },
            {
                text: "惠州",
                url: "http://m.lianjia.com/hui/loupan/fang/"
            },
            {
                text: "沈阳",
                url: "http://m.lianjia.com/sy/loupan/fang/"
            },
            {
                text: "烟台",
                url: "http://m.lianjia.com/yt/loupan/fang/"
            },
            {
                text: "中山",
                url: "http://m.lianjia.com/zs/loupan/fang/"
            },
            {
                text: "珠海",
                url: "http://m.lianjia.com/zh/loupan/fang/"
            },
            {
                text: "扬州",
                url: "http://m.lianjia.com/yz/loupan/fang/"
            },
            {
                text: "南通",
                url: "http://m.lianjia.com/nt/loupan/fang/"
            },
            {
                text: "潍坊",
                url: "http://m.lianjia.com/wf/loupan/fang/"
            },
            {
                text: "无锡",
                url: "http://m.lianjia.com/wx/loupan/fang/"
            },
            {
                text: "温州",
                url: "http://m.lianjia.com/wz/loupan/fang/"
            },
            {
                text: "唐山",
                url: "http://m.lianjia.com/ts/loupan/fang/"
            },
            {
                text: "嘉兴",
                url: "http://m.lianjia.com/jx/loupan/fang/"
            },
            {
                text: "太原",
                url: "http://m.lianjia.com/ty/loupan/fang/"
            },
            {
                text: "海口",
                url: "http://m.lianjia.com/hk/loupan/fang/"
            },
            {
                text: "临沂",
                url: "http://m.lianjia.com/lin/loupan/fang/"
            },
            {
                text: "徐州",
                url: "http://m.lianjia.com/xz/loupan/fang/"
            },
            {
                text: "三亚",
                url: "http://m.lianjia.com/san"
            },
            {
                text: "陵水",
                url: "http://m.lianjia.com/ls"
            },
            {
                text: "万宁",
                url: "http://m.lianjia.com/wn"
            },
            {
                text: "琼海",
                url: "http://m.lianjia.com/qh"
            },
            {
                text: "文昌",
                url: "http://m.lianjia.com/wc"
            }],
            newsarticle_ershoufang: [{
                text: "北京",
                url: "http://m.lianjia.com/bj/ershoufang"
            },
            {
                text: "天津",
                url: "http://m.lianjia.com/tj/ershoufang"
            },
            {
                text: "上海",
                url: "http://m.sh.lianjia." + n[GlobalParameters.env] + "/ershoufang"
            },
            {
                text: "苏州",
                url: "http://m.su.lianjia." + n[GlobalParameters.env] + "/ershoufang"
            },
            {
                text: "成都",
                url: "http://m.lianjia.com/cd/ershoufang"
            },
            {
                text: "南京",
                url: "http://m.lianjia.com/nj/ershoufang"
            },
            {
                text: "杭州",
                url: "http://m.lianjia.com/hz/ershoufang"
            },
            {
                text: "青岛",
                url: "http://m.lianjia.com/qd/ershoufang"
            },
            {
                text: "大连",
                url: "http://m.lianjia.com/dl/ershoufang"
            },
            {
                text: "厦门",
                url: "http://m.lianjia.com/xm/ershoufang"
            },
            {
                text: "武汉",
                url: "http://m.lianjia.com/wh/ershoufang"
            },
            {
                text: "深圳",
                url: "http://m.lianjia.com/sz/ershoufang"
            },
            {
                text: "重庆",
                url: "http://m.lianjia.com/cq/ershoufang"
            },
            {
                text: "长沙",
                url: "http://m.lianjia.com/cs/ershoufang"
            },
            {
                text: "济南",
                url: "http://m.lianjia.com/jn/ershoufang"
            },
            {
                text: "广州",
                url: "http://m.lianjia.com/gz/ershoufang"
            }],
            newsarticle_baike: [{
                text: "北京",
                url: "http://app.m.lianjia.com/bj/wenda"
            },
            {
                text: "广州",
                url: "http://app.m.lianjia.com/gz/wenda"
            },
            {
                text: "深圳",
                url: "http://app.m.lianjia.com/sz/wenda"
            },
            {
                text: "天津",
                url: "http://app.m.lianjia.com/tj/wenda"
            },
            {
                text: "上海",
                url: "http://m.sh.lianjia." + n[GlobalParameters.env] + "/baike/"
            },
            {
                text: "成都",
                url: "http://app.m.lianjia.com/cd/wenda"
            },
            {
                text: "南京",
                url: "http://app.m.lianjia.com/nj/wenda"
            },
            {
                text: "青岛",
                url: "http://app.m.lianjia.com/qd/wenda"
            },
            {
                text: "大连",
                url: "http://app.m.lianjia.com/dl/wenda"
            },
            {
                text: "重庆",
                url: "http://app.m.lianjia.com/cq/wenda"
            },
            {
                text: "济南",
                url: "http://app.m.lianjia.com/jn/wenda"
            }]
        };
        var e = l.platformObj.channelType ? l.platformObj.channelType: "common";
        t.cityList = t.cityObj[e],
        t.isGpsSuccess = !1,
        t.gpsText = "定位中...",
        t.initCityListPage = function() {
            navigator.geolocation ? (navigator.geolocation.getCurrentPosition(function(l) {
                if (t.gpsinfo = l, t.gpsFlag = !0, l.coords.longitude && l.coords.latitude) {
                    var i = l.coords.latitude + "," + l.coords.longitude,
                    n = "http://api.map.baidu.com/geocoder/v2/?ak=C93b5178d7a8ebdb830b9b557abce78b&callback=JSON_CALLBACK&location=" + i + "&output=json&pois=0";
                    a.jsonp(n).success(function(a, l, i, n) {
                        if (!a) return t.gpsFlag = !0,
                        t.gpsText = "定位失败",
                        !1;
                        if (0 == a.status) {
                            t.isGpsSuccess = !0,
                            t.gpsText = a.result.addressComponent.city;
                            for (var e = 0; e < t.cityList.length; e++) {
                                var o = t.cityList[e];
                                if (o.text + "市" == a.result.addressComponent.city) {
                                    t.gpsUrl = o.url;
                                    break
                                }
                            }
                        } else t.gpsFlag = !0,
                        t.gpsText = "定位失败"
                    }).error(function(a) {
                        t.gpsFlag = !0,
                        t.gpsText = "定位失败"
                    })
                } else t.gpsText = "定位失败"
            },
            function(a) {
                t.gpsFlag = !0,
                t.gpsText = "定位失败"
            }), i(function() {
                t.gpsFlag || (t.gpsText = "定位失败")
            },
            1e4)) : t.gpsText = "定位失败"
        },
        t.initCityListPage()
    }])
});