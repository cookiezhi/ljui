define(["require", baseStaticUrl + "js/app.js?v=" + GlobalVariable.changeByPublishVersion, baseStaticUrl + "js/directives/scrollLoad.js?v=" + GlobalVariable.changeByPublishVersion, baseStaticUrl + "js/directives/esfSwitchPricePanel.js?v=" + GlobalVariable.changeByPublishVersion],
function(t, a) {
    a.controller("ErshoufangListCtrl", ["$scope", "$http", "$rootScope", "$q", "$timeout", "$state", "$stateParams", "$window", "$location", "util", "lj_constants",
    function(t, a, e, r, i, c, s, o, n, d, l) {
        function u() {
            var a = function() {
                delete t.searchFilters.cityCode,
                p(),
                T()
            },
            i = d.getLocalStorage("_solrCode_ershoufang_", !0),
            c = d.getLocalStorage("_DISTDATA_ershoufang_", !0),
            s = c && c.cityCode == e.constants.cityCode,
            o = i && i.cityCode == e.constants.cityCode,
            n = f,
            l = g;
            s && o ? (t.districtlist = angular.copy(c), t.searchFilters = angular.copy(i), a()) : s && !o ? (t.districtlist = angular.copy(c), n().then(function() {
                a()
            })) : !s && o ? (t.searchFilters = angular.copy(i), l().then(function() {
                a()
            })) : r.all([l(), n()]).then(function() {
                a()
            })
        }
        function f() {
            var i = r.defer(),
            c = {
                client: e.platformObj.client,
                range: "ershoufang",
                access_token: "7poanTTBCymmgE0FOn1oKp",
                cityCode: e.constants.cityCode
            };
            return a.get(e.api_host + "/dict/solrCode/info.json", {
                params: c
            }).success(function(a) {
                if (!a) return void(t.feedbackInfo = {
                    show: !0,
                    msg: "服务端报错，请重试"
                });
                if (0 !== a.errno) return void(t.feedbackInfo = {
                    show: !0,
                    msg: a.error ? a.error: "请求报错，请重试！"
                });
                var r = null;
                a.data && a.data.info && e.constants.cityCode == a.data.info.cityCode && (r = angular.copy(a.data.info), d.setLocalStorage("_solrCode_ershoufang_", r, !0)),
                t.searchFilters = r ? angular.copy(r) : {},
                i.resolve()
            }).error(function() {
                t.feedbackInfo = {
                    show: !0,
                    msg: "服务端报错，请重试"
                }
            }),
            i.promise
        }
        function g() {
            var i = r.defer(),
            c = {
                client: e.platformObj.client,
                range: "ershoufang",
                access_token: "7poanTTBCymmgE0FOn1oKp",
                cityCode: e.constants.cityCode
            };
            return a.get(e.api_host + "/dict/city/info.json", {
                params: c
            }).success(function(a) {
                if (!a) return void(t.feedbackInfo = {
                    show: !0,
                    msg: "服务端报错，请重试！"
                });
                if (0 !== a.errno) return void(t.feedbackInfo = {
                    show: !0,
                    msg: a.error ? a.error: "请求报错，请重试！"
                });
                if (a.data && a.data.info && a.data.info.length) {
                    var r = a.data.info.filter(function(t) {
                        return t.cityCode == e.constants.cityCode
                    });
                    d.setLocalStorage("_DISTDATA_ershoufang_", r[0], !0),
                    t.districtlist = r[0] ? angular.copy(r[0]) : {}
                }
                i.resolve()
            }).error(function() {
                t.feedbackInfo = {
                    show: !0,
                    msg: "服务端报错，请重试！"
                }
            }),
            i.promise
        }
        function p() { ! d.isEmptyObject(s) && s.district && s.filter ? (b(s.district, t.districtlist.district), y(s.filter), m(), h()) : !d.isEmptyObject(s) && s.oneFilter && (b(s.oneFilter, t.districtlist.district), d.isEmptyObject(t.pagedata.district) && d.isEmptyObject(t.pagedata.bizcircle) ? (y(s.oneFilter), h()) : m())
        }
        function b(a, e) {
            var r = [];
            if (e && e.length && (r = e.filter(function(t) {
                return t.district_quanpin === a
            })), r.length > 0) t.reqdata.district_id = r[0].district_id,
            t.reqdata.district_name = r[0].district_name,
            t.pagedata.district = r[0];
            else for (var i = e.length,
            c = 0; i > c && !t.reqdata.bizcircle_id; c++) for (var s = e[c].bizcircle.length, o = e[c].bizcircle, n = 0; s > n; n++) if (o[n].bizcircle_quanpin === a) {
                t.reqdata.district_id = e[c].district_id,
                t.reqdata.district_name = e[c].district_name,
                t.reqdata.bizcircle_id = o[n].bizcircle_id,
                t.reqdata.bizcircle_name = o[n].bizcircle_name,
                t.pagedata.district = e[c],
                t.pagedata.bizcircle = o[n];
                break
            }
        }
        function m() {
            d.isEmptyObject(t.pagedata.bizcircle) ? t.pagedata.tabObjText.area = d.isEmptyObject(t.pagedata.district) ? "": t.pagedata.district.district_name: t.pagedata.tabObjText.area = t.pagedata.bizcircle.bizcircle_name
        }
        function h() {
            t.pagedata.filters && t.pagedata.filters.prices && t.pagedata.filters.prices.length > 0 ? t.pagedata.tabObjText.prices = t.pagedata.filters.prices[0].text: t.pagedata.filters && t.pagedata.filters.customPrice ? t.pagedata.tabObjText.prices = t.pagedata.filters.customPrice.text: t.pagedata.tabObjText.prices = "",
            t.pagedata.filters && t.pagedata.filters.roomCount && t.pagedata.filters.roomCount.length > 1 ? t.pagedata.tabObjText.roomCount = "多选": t.pagedata.filters && t.pagedata.filters.roomCount && 1 == t.pagedata.filters.roomCount.length ? t.pagedata.tabObjText.roomCount = t.pagedata.filters.roomCount[0].text: t.pagedata.tabObjText.roomCount = "",
            !t.showAreaPanel && t.pagedata.filters && t.pagedata.filters.acreages && t.pagedata.filters.acreages.length > 0 && (t.pagedata.tabObjText.acreages = t.pagedata.filters.acreages[0].text);
            var a = 0;
            for (var e in t.pagedata.filters) t.showAreaPanel && "prices" !== e && "roomCount" !== e && "communityId" !== e && "queryStr" !== e && "customPrice" !== e ? a++:t.showAreaPanel || "prices" === e || "roomCount" === e || "acreages" === e || "communityId" === e || "queryStr" === e || "customPrice" === e || a++;
            t.pagedata.tabObjText.more = a > 0 ? "更多": ""
        }
        function y(a) {
            t.showAreaPanel = !0;
            var e = a;
            if ( - 1 !== a.indexOf("rs")) {
                var r = a.indexOf("rs");
                e = a.substring(0, r),
                v("rs", a.substring(r), a.substring(r + 2))
            }
            var i = e.match(/(rs[\s\S]*)|((b|m)[0-9]+([_][0-9]+){0,1}to[0-9]+([_][0-9]+){0,1})|([a-z][0-9]{1,})/g),
            c = i ? i: [];
            c.forEach(function(t) {
                var a = t.match(/([a-z]+)(\d+)/),
                e = a[1],
                r = a[2];
                v(e, t, r)
            })
        }
        function v(a, e, r) {
            switch (a) {
            case "rs":
                t.pagedata.filters.queryStr = {
                    key: "rs",
                    value: r,
                    reqdata: "query=" + r,
                    urldata: e,
                    text: ""
                },
                t.reqdata.query = r,
                t.searchKeyword = r;
                break;
            case "q":
                t.pagedata.filters.communityId = {
                    key: "q",
                    value: r,
                    reqdata: "community_id=" + r,
                    urldata: e,
                    text: ""
                },
                t.reqdata.community_id = r,
                t.showAreaPanel = !1,
                t.showCommunityInfo = !0;
                break;
            case "b":
                delete t.pagedata.filters.prices;
                var i = e.substring(1).replace(/_/g, ".").split("to");
                if (2 == i.length) {
                    var c = isNaN(i[0]) ? -1 : Math.round(Number(i[0])),
                    s = isNaN(i[1]) ? -1 : Math.round(Number(i[1])),
                    o = "",
                    n = "";
                    0 >= c && 0 >= s ? (delete t.pagedata.filters.customPrice, t.customPriceStart = "", t.customPriceEnd = "", n = "") : 0 == c && s > 0 ? (o = s + "万以下", n = "b0to" + s) : c > 0 && 0 == s ? (o = c + "万以上", n = "b" + c + "to999999") : (o = c + "-" + s + "万", n = "b" + c + "to" + s),
                    o && (t.customPriceStart = c ? c: "", t.customPriceEnd = s ? s: "", t.pagedata.filters.customPrice = {
                        key: "b",
                        value: e,
                        urldata: e,
                        reqdata: n,
                        text: o
                    },
                    t.reqdata.b = n)
                } else delete t.pagedata.filters.customPrice,
                t.reqdata.b = "",
                t.customPriceStart = "",
                t.customPriceEnd = "";
                break;
            case "a":
                _("a", "acreages", e);
                break;
            case "c":
                _("c", "floor_level", e);
                break;
            case "f":
                _("f", "orientation", e);
                break;
            case "l":
                _("l", "roomCount", e);
                break;
            case "p":
                _("p", "prices", e);
                break;
            case "s":
                _("s", "sort", e);
                break;
            case "t":
                _("t", "tags", e);
                break;
            case "u":
                _("u", "tags", e);
                break;
            case "v":
                _("v", "tags", e);
                break;
            case "y":
                _("y", "house_year", e)
            }
        }
        function _(a, e, r) {
            t.reqdata[a] = t.reqdata[a] ? t.reqdata[a] : [],
            t.reqdata[a].push(r),
            t.searchFilters[e].forEach(function(a) {
                r == a.urldata && (a.checked = !0, t.pagedata.filters[e] = t.pagedata.filters[e] ? t.pagedata.filters[e] : [], t.pagedata.filters[e].push(a))
            });
            var i = t.searchFilters[e].filter(function(t) {
                return 1 == t.checked
            });
            t.pagedata.subTab[e] = i.length > 0
        }
        function P() {
            var a = angular.copy(t.reqdata);
            for (var e in a) a[e] && a[e] instanceof Array && (a[e] = a[e].join(",")),
            (void 0 === a[e] || "" === a[e] || null === a[e]) && delete a[e];
            return a
        }
        function T(r) {
            var c = P();
            a.get(e.api_host + "/house/ershoufang/search.json", {
                params: c
            }).success(function(a) {
                return t.listLoading = !1,
                a ? 0 !== a.errno ? void(t.feedbackInfo = {
                    show: !0,
                    msg: a.error ? a.error: "请求报错，请重试！"
                }) : (a.data && a.data.list && (r ? t.ershoufangList = t.ershoufangList.concat(a.data.list) : (t.showListCount = !0, t.ershoufangList = a.data.list, a.data && a.data.property && (t.curCommunityInfo = a.data.property), i(function() {
                    t.showListCount = !1
                },
                2e3)), t.isLastPage = 1 !== a.data.has_more_data, t.ershoufangList.forEach(function(t) {
                    t.tagsText = t.tags ? d.buildTagsObj(t.tags, l.constants.tagsObj) : [],
                    t.mainPhotoUrl || (t.mainPhotoUrl = "/sh/static/images/common/default_lianjia_small.png")
                })), t.isPageDown = !1, t.totalCount = a.data.total_count ? a.data.total_count: 0, void 0) : void(t.feedbackInfo = {
                    show: !0,
                    msg: "请求出错，请重试！"
                })
            }).error(function() {
                t.listLoading = !1,
                t.feedbackInfo = {
                    show: !0,
                    msg: "服务端出错，请重试！"
                }
            })
        }
        function q(a) {
            var e = {},
            r = "",
            i = "",
            c = "",
            s = "";
            if (a) {
                for (var o in a)"queryStr" === o ? c = t.pagedata.filters.queryStr.urldata: "communityId" === o ? s = t.pagedata.filters.communityId.urldata: "customPrice" === o ? r = t.pagedata.filters.customPrice.urldata: e[o] = t.pagedata.filters[o];
                for (var o in e) {
                    var n = e[o].map(function(t) {
                        return t.urldata
                    });
                    i += n.join("")
                }
                c && (i += c),
                s && (i += s),
                r && (i = r + i)
            }
            return i
        }
        function C(t) {
            var a = !d.isEmptyObject(t.district),
            e = !d.isEmptyObject(t.bizcircle),
            r = !d.isEmptyObject(t.filters),
            i = a ? t.district.district_quanpin: "",
            s = e ? t.bizcircle.bizcircle_quanpin: "",
            o = r ? t.filters: "";
            e && r ? c.go("ershoufang.listTwoFilter", {
                district: s,
                filter: q(o)
            }) : a && !e && r ? c.go("ershoufang.listTwoFilter", {
                district: i,
                filter: q(o)
            }) : e && !r ? c.go("ershoufang.oneFilter", {
                oneFilter: s
            }) : !a || e || r ? a || e || !r ? c.go("ershoufang.listNoFilter") : c.go("ershoufang.oneFilter", {
                oneFilter: q(o)
            }) : c.go("ershoufang.oneFilter", {
                oneFilter: i
            })
        }
        function k(a, e) {
            "prices" == a && (delete t.pagedata.filters.customPrice, t.reqdata.b = ""),
            e ? (t.searchFilters[a].forEach(function(t) {
                t.checked = e && e.urldata === t.urldata ? !0 : !1
            }), t.pagedata.filters[a] = t.searchFilters[a].filter(function(t) {
                return t.checked
            })) : (t.searchFilters[a].forEach(function(t) {
                t.checked = !1
            }), delete t.pagedata.filters[a]),
            t.pagedata.subTab[a] = t.pagedata.filters[a] ? !0 : !1
        }
        function j(a, e) {
            e || t.searchFilters[a].forEach(function(t) {
                t.checked = !1
            }),
            t.searchFilters[a].forEach(function(t) {
                e && t.urldata === e.urldata && (t.checked = !t.checked)
            });
            var r = t.searchFilters[a].filter(function(t) {
                return t.checked
            });
            r.length > 0 ? t.pagedata.filters[a] = r: delete t.pagedata.filters[a],
            t.pagedata.subTab[a] = t.pagedata.filters[a] ? !0 : !1
        }
        function w(t, a) {
            function e(t) {
                return /^\d+$/.test(Number(t))
            }
            function r(t) {
                return /^\d+$/.test(Number(t)) ? (("" === t || void 0 === t || null === t) && (t = 0), Number(t) <= 999999) : !0
            }
            var i = "",
            c = !0;
            return d.isFalseNotZero(t) && d.isFalseNotZero(a) ? (i = "未填写价格", c = !1) : r(a) && r(t) ? d.isFalseNotZero(t) || e(t) ? d.isFalseNotZero(a) || e(a) || (i = "最大价格必须是正整数", c = !1) : (i = "最小价格必须是正整数", c = !1) : (i = "价格不能超过999999", c = !1),
            {
                msg: i,
                isPass: c
            }
        }
        t.feedbackInfo = {
            show: !1,
            msg: ""
        },
        t.pagedata = {},
        t.pagedata.tabActive = !1,
        t.pagedata.searchTab = !1,
        t.listLoading = !0,
        t.showListCount = !1,
        t.showAreaPanel = !0,
        t.showCommunityInfo = !1,
        t.reqdata = {},
        t.reqdata.cityCode = e.constants.cityCode,
        t.reqdata.channel = "ershoufang",
        t.reqdata.limit_count = 20,
        t.reqdata.limit_offset = 0,
        t.reqdata.client = e.platformObj.client,
        t.reqdata.access_token = "7poanTTBCymmgE0FOn1oKp",
        t.pagedata.tabObjText = {},
        t.pagedata.filters = {},
        t.pagedata.subTab = {},
        t.districtlist = {},
        t.searchFilters = {},
        t.ershoufangList = [],
        u(),
        t.hideMasker = function() {
            t.pagedata.tabActive = !1,
            t.pagedata.tabType = ""
        },
        t.activeTab = function(a) {
            t.pagedata.tabActive = !0,
            t.pagedata.tabType = a,
            "more" == t.pagedata.tabType && (t.pagedata.subTabType = "sort")
        },
        t.activeMoreTab = function(a) {
            t.pagedata.subTabType = a
        },
        t.selectDistrict = function(a) {
            a ? (t.pagedata.district = a, t.pagedata.bizcircle = {}) : (t.pagedata.district = {},
            t.pagedata.bizcircle = {},
            t.pagedata.tabActive = !1, t.pagedata.tabType = "", C(t.pagedata))
        },
        t.selectBizcircle = function(a) {
            if (a) t.pagedata.bizcircle = a;
            else {
                t.pagedata.bizcircle = {};
                t.districtlist.district.filter(function(a) {
                    return a.district_id == t.pagedata.district.district_id
                })
            }
            t.pagedata.tabActive = !1,
            t.pagedata.tabType = "",
            C(t.pagedata)
        },
        t.selectPrice = function(a) {
            k("prices", a),
            t.pagedata.tabActive = !1,
            t.pagedata.tabType = "",
            C(t.pagedata)
        },
        t.selectSort = function(t) {
            k("sort", t)
        },
        t.selectAcreage = function(t) {
            k("acreages", t)
        },
        t.selectTabAcreage = function(a) {
            k("acreages", a),
            t.pagedata.tabActive = !1,
            t.pagedata.tabType = "",
            C(t.pagedata)
        },
        t.selectHouseYear = function(t) {
            k("house_year", t)
        },
        t.selectRoomCount = function(t) {
            j("roomCount", t)
        },
        t.selectOrientation = function(t) {
            j("orientation", t)
        },
        t.selectTags = function(t) {
            j("tags", t)
        },
        t.selectFloorLevel = function(t) {
            j("floor_level", t)
        },
        t.submitPrice = function() {
            var a = w(t.customPriceStart, t.customPriceEnd);
            if (!a.isPass) return void(t.feedbackInfo = {
                show: !0,
                msg: a.msg
            });
            var e = "";
            0 === Number(t.customPriceStart) && Number(t.customPriceEnd) >= 1 ? e = t.customPriceEnd + "万以下": 0 === Number(t.customPriceEnd) && Number(t.customPriceStart) >= 1 ? e = t.customPriceStart + "万以上": Number(t.customPriceEnd) >= 1 && Number(t.customPriceStart) >= 1 && (e = t.customPriceStart + "-" + t.customPriceEnd + "万"),
            t.pagedata.filters.customPrice = {
                urldata: "b" + (t.customPriceStart ? Number(t.customPriceStart) : 0) + "to" + (t.customPriceEnd ? Number(t.customPriceEnd) : 0),
                reqdata: "b" + (t.customPriceStart ? Number(t.customPriceStart) : 0) + "to" + (t.customPriceEnd ? Number(t.customPriceEnd) : 999999),
                text: e
            },
            delete t.pagedata.filters.prices,
            t.pagedata.tabActive = !1,
            t.pagedata.tabType = "",
            C(t.pagedata)
        },
        t.submitRoomCount = function() {
            t.pagedata.tabActive = !1,
            t.pagedata.tabType = "",
            C(t.pagedata)
        },
        t.submitMoreFilters = function() {
            t.pagedata.tabActive = !1,
            t.pagedata.tabType = "",
            C(t.pagedata)
        },
        t.$watch("pagedata.tabActive",
        function(t) {
            t === !0 ? e.bodyOverflowHidden = !0 : e.bodyOverflowHidden = !1
        }),
        t.$watch("isPageDown",
        function(a) {
            a !== !0 || t.isLastPage || (t.listLoading = !0, t.reqdata.limit_offset = t.reqdata.limit_offset + t.reqdata.limit_count, T(!0))
        })
    }])
});