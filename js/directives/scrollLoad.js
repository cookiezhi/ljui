define(["require", baseStaticUrl + "js/app.js?v=" + GlobalVariable.changeByPublishVersion],
function(e, o) {
    o.directive("scrollLoad", ["$http", "$filter", "$timeout",
    function(e, o, n) {
        var t = null,
        l = null;
        return {
            restrict: "A",
            scope: {
                isLastPage: "=",
                isPageDown: "=",
                showLoading: "=",
                searchTab: "="
            },
            link: function(e, o, c) {
                function a() {
                    if (n.cancel(t), e.isLastPage) return ! 1;
                    var o = 50;
                    return e.showLoading ? !1 : void(t = n(function() {
                        var n = document.body.scrollHeight,
                        t = document.body.scrollTop,
                        l = document.documentElement.clientHeight;
                        o >= n - (t + l) && (e.isPageDown = !0)
                    },
                    1e3 / 60))
                }
                function r() {
                    n.cancel(l),
                    l = n(function() {
                        var n = document.body.scrollTop;
                        n >= o[0].offsetTop ? e.searchTab = !0 : e.searchTab = !1
                    },
                    1e3 / 60)
                }
                e.$watch("isLastPage",
                function(e) {
                    return void 0 === e ? !1 : (e && angular.element(document).off("scroll", a), void(e === !1 && angular.element(document).on("scroll", a)))
                }),
                angular.element(document).off("scroll", a).on("scroll", a),
                void 0 !== c.searchTab && angular.element(document).off("scroll", r).on("scroll", r)
            }
        }
    }])
});