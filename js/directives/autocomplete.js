define(["require", baseStaticUrl + "js/app.js?v=" + GlobalVariable.changeByPublishVersion],
function(e, a) {
    a.directive("ljShAutocomplete", ["$http", "$filter", "$timeout", "util", "$rootScope",
    function(e, a, s, t, l) {
        return {
            restrict: "A",
            require: "?ngModel",
            template: '<div class="table-layout search-header">							<a class="table-cell" href="javascript:history.back();"><span class="icon-back"></span></a>							<input type="hidden" name="channel_id" ng-model="channel_id">							<div class="table-cell">								<input type="text" autocomplete="off" class="autoSuggest js_keyword" ng-model="query" placeholder="{{placeholder}}">							</div>							<a class="table-cell" href="javascript:;" ng-click="clickSearchBtn()"><span class="icon-search"></span></a>						</div>						<div class="p-list search-list suggestList js_resultPopup" ng-show="searchList.length > 0">							<ul>								<li ng-repeat="list in searchList" ng-click="clickItem(list)"><span class="suggestname">{{list.showName}}</span><span class="typename">{{list.typeName}}</span><span class="sub-title">约{{list.sellCount}}套</span></li>							</ul>						</div>						<div class="search-list historyDiv" ng-show="showHisotryList">							<p class="list-title icon_history">搜索历史</p>							<div class="hisotryList p-list">								<ul>									<li ng-repeat="list in hisotryList" ng-click="clickHisItem(list)"><a href="/{{pageType}}{{list.url}}">{{list.showName}}<span class="typename">{{list.typeName}}</span></a></li>								</ul>							</div>							<p class="clear-history">								<a href="javascript:;" ng-click="clearHistory()"><span class="icon-delete"></span>清空搜索历史</a>							</p>						</div>						<div class="search-list hotSearchDiv" ng-show="showHotSearchList">							<p class="list-title icon_hotsearch">热门搜索</p>							<div class="hotSearchList p-list">								<ul>									<li ng-repeat="list in hotSearchHouseList" ng-click="clickHotSearchItem(list)">{{list.showName}}</li>								</ul>							</div>						</div>',
            scope: {
                url: "@",
                params: "=",
                resultKey: "@",
                optionKey: "@",
                placeholder: "@",
                modelValue: "@",
                selectCallback: "&"
            },
            link: function(a, c, i, o) {
                function r(e) {
                    s.cancel(g);
                    var l = t.getLocalStorage("searchHistory_" + a.pageType) ? t.getLocalStorage("searchHistory_" + a.pageType) : {};
                    a.hisotryList = l[GlobalParameters.city_code] ? angular.copy(l[GlobalParameters.city_code]) : [],
                    e ? (a.showHisotryList = !1, a.showHotSearchList = !1, g = s(function() {
                        h()
                    },
                    200)) : (a.searchList = [], a.showHisotryList = a.hisotryList.length > 0, a.showHisotryList || 0 != a.hotSearchHouseList.length || u())
                }
                function n(e) {
                    var s = [],
                    l = t.getLocalStorage("searchHistory_" + a.pageType) ? t.getLocalStorage("searchHistory_" + a.pageType) : {},
                    c = l[GlobalParameters.city_code] ? angular.copy(l[GlobalParameters.city_code]) : [];
                    c || (c = []);
                    for (var i = null,
                    o = 0; o < c.length; o++) {
                        var r = c[o];
                        if (r.showName == e.showName) {
                            i = o;
                            break
                        }
                    }
                    null != i && c.splice(i, 1),
                    c.unshift(e),
                    s = c.filter(function(e, a) {
                        return 10 > a
                    }),
                    l[GlobalParameters.city_code] = angular.copy(s),
                    t.setLocalStorage("searchHistory_" + a.pageType, l)
                }
                function h() {
                    var s = {};
                    s.client = l.platformObj.client,
                    s.access_token = "7poanTTBCymmgE0FOn1oKp",
                    s[y] = a.query,
                    angular.extend(s, a.params),
                    e.get(a.url, {
                        params: s
                    }).success(function(e) {
                        if (!e) return ! 1;
                        if (e) {
                            if (a.resultKey) {
                                for (var s = a.resultKey.split("."), t = e, l = 0; l < s.length; l++) {
                                    var c = angular.copy(s[l]);
                                    t = angular.copy(t[c])
                                }
                                a.searchList = angular.copy(t)
                            } else a.searchList = angular.copy(e);
                            a.searchList.forEach(function(e) {
                                "school" == e.type && (e.oldUrl = e.url, e.url = "/rs" + e.showName)
                            })
                        }
                    }).error(function() {})
                }
                function u() {
                    var s = {};
                    s.client = l.platformObj.client,
                    s.access_token = "7poanTTBCymmgE0FOn1oKp",
                    s.type = a.pageType,
                    s.cityCode = GlobalParameters.city_code,
                    e.get(l.api_host + "/homepage/city/hotsearch.json", {
                        params: s
                    }).success(function(e) {
                        return e ? void(e && (a.hotSearchHouseList = e.data ? e.data: [], a.showHotSearchList = a.hotSearchHouseList.length > 0)) : (a.hotSearchHouseList = [], a.showHotSearchList = !1, !1)
                    }).error(function() {
                        a.hotSearchHouseList = [],
                        a.showHotSearchList = !1
                    })
                }
                var p = c[0].querySelector(".js_keyword"),
                y = i.keyword || "keyword";
                a.hisotryList = [],
                a.hotSearchHouseList = [],
                a.pageType = a.params.channel_id ? a.params.channel_id: "ershoufang",
                a.modelValue && (a.query = a.modelValue),
                s(function() {
                    p.focus()
                });
                var g = null;
                a.$watch("query",
                function(e) {
                    r(e)
                }),
                angular.element(p).on("click",
                function() {
                    r(a.query)
                }),
                a.clickItem = function(e) {
                    n(e),
                    a.keyword = e[a.optionKey],
                    a.searchList = [e],
                    a.selectCallback && a.selectCallback({
                        item: e
                    })
                },
                a.clickHotSearchItem = function(e) {
                    var s = {
                        sellCount: null,
                        showName: e.showName,
                        url: "/rs" + e.showName
                    };
                    n(e),
                    a.selectCallback && a.selectCallback({
                        item: s
                    })
                },
                a.clickHisItem = function(e) {
                    n(e)
                },
                a.clickSearchBtn = function() {
                    var e = {};
                    a.query ? (e = {
                        sellCount: null,
                        showName: a.query.replace(/[:.\/#?\\]/g, ""),
                        url: "/rs" + a.query.replace(/[:.\/#?\\]/g, "")
                    },
                    n(e)) : e = {
                        sellCount: null,
                        showName: a.query,
                        url: "/"
                    },
                    a.selectCallback && a.selectCallback({
                        item: e
                    })
                },
                a.clearHistory = function() {
                    t.removeLocalStorage("searchHistory_" + a.pageType),
                    a.hisotryList = [],
                    a.showHisotryList = !1
                }
            }
        }
    }])
});