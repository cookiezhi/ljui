define(["require", baseStaticUrl + "js/app.js?v=" + GlobalVariable.changeByPublishVersion],
function(e, a) {
    a.directive("esfSwitchPricePanel", ["$timeout",
    function(e) {
        return {
            restrict: "A",
            link: function(a, n, r) {
                function l() {
                    return navigator.userAgent.match(/iPhone/) ? "iphone": (navigator.userAgent.match(/Android/), "android")
                }
                var i = !1,
                t = document.querySelector(".js_directivePrice");
                angular.element(n).find("input").on("focus",
                function() {
                    "android" == l() && e(function() {
                        i = !0,
                        angular.element(t).hasClass("packupPriceHalf") || (angular.element(t).removeClass("packdownPriceHalf"), angular.element(t).addClass("packupPriceHalf"))
                    })
                }),
                angular.element(n).find("input").on("blur",
                function() {
                    "android" == l() && e(function() {
                        angular.element(t).hasClass("packdownPriceHalf") || (angular.element(t).removeClass("packupPriceHalf"), angular.element(t).addClass("packdownPriceHalf"))
                    })
                }),
                angular.element(n).find("button").on("focus",
                function() {
                    "android" == l() && e(function() {
                        i && (angular.element(t).hasClass("packupPriceHalf") || (angular.element(t).removeClass("packdownPriceHalf"), angular.element(t).addClass("packupPriceHalf")))
                    })
                })
            }
        }
    }])
});