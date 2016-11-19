define(["require", baseStaticUrl + "js/app.js?v=" + GlobalVariable.changeByPublishVersion],
function(n, r) {
    r.filter("num2wan2",
    function() {
        return function(n, r) {
            if (void 0 === n || "" === n || null === n) return r ? r: "";
            var e = n % 1e4;
            return 0 === e ? n / 1e4: (n / 1e4).toFixed(2)
        }
    }).filter("num1",
    function() {
        return function(n, r) {
            return void 0 === n || "" === n || null === n ? r ? r: "": parseInt(Number(n)) == Number(n) ? n: Number(n).toFixed(1)
        }
    }).filter("ifNull",
    function() {
        return function(n, r) {
            return void 0 === n || "" === n || null === n ? r ? r: "": n
        }
    }).filter("parseToInt",
    function() {
        return function(n, r) {
            return void 0 === n || "" === n || null === n ? r ? r: "": parseInt(n)
        }
    })
});