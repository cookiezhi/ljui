define(["require", baseStaticUrl + "js/app.js?v=" + GlobalVariable.changeByPublishVersion],
function(e, s) {
    s.factory("lj_constants", ["$window",
    function(e) {
        var s = {};
        return s.tagsObj = {
            is_five_sole: {
                value: "is_five_sole",
                text: "满五唯一",
                className: "man_wu_wei_yi"
            },
            is_five_year: {
                value: "is_five_year",
                text: "满五",
                className: "man_wu_wei_yi"
            },
            is_two_year: {
                value: "is_two_year",
                text: "满二",
                className: "man_er"
            },
            is_school_house: {
                value: "is_school_house",
                text: "学区",
                className: "xue_qu_fang"
            },
            is_subway_house: {
                value: "is_subway_house",
                text: "地铁房",
                className: "di_tie_fang"
            },
            is_rent_subway_house: {
                value: "is_rent_subway_house",
                text: "近地铁",
                className: "rent_di_tie_fang"
            },
            is_new_house_source: {
                value: "is_new_house_source",
                text: "新上",
                className: "xin_shang"
            },
            is_rent_new_house_source: {
                value: "is_rent_new_house_source",
                text: "新上",
                className: "xin_shang"
            },
            is_quick_acting: {
                value: "is_quick_acting",
                text: "独家",
                className: "du_jia"
            },
            is_rent_key: {
                value: "is_rent_key",
                text: "随时看",
                className: "rent_you_yao_shi"
            },
            is_price_decrease: {
                value: "is_price_decrease",
                text: "降价",
                className: "jiang_jia"
            },
            is_rent_price_decrease: {
                value: "is_rent_price_decrease",
                text: "降价",
                className: "jiang_jia"
            },
            is_key: {
                value: "is_key",
                text: "有钥匙",
                className: "you_yao_shi"
            }
        },
        s.tagsZhToEnObj = {
            "满五唯一": {
                value: "is_five_sole",
                text: "满五唯一",
                className: "man_wu_wei_yi"
            },
            "满五": {
                value: "is_five_year",
                text: "满五",
                className: "man_wu_wei_yi"
            },
            "满二": {
                value: "is_two_year",
                text: "满二",
                className: "man_er"
            },
            "学区": {
                value: "is_school_house",
                text: "学区",
                className: "xue_qu_fang"
            },
            "地铁房": {
                value: "is_subway_house",
                text: "地铁房",
                className: "di_tie_fang"
            },
            "近地铁": {
                value: "is_rent_subway_house",
                text: "近地铁",
                className: "di_tie_fang"
            },
            "新上": {
                value: "is_new_house_source",
                text: "新上",
                className: "xin_shang"
            },
            "独家": {
                value: "is_quick_acting",
                text: "独家",
                className: "du_jia"
            },
            "随时看": {
                value: "is_rent_key",
                text: "随时看",
                className: "you_yao_shi"
            },
            "降价": {
                value: "is_price_decrease",
                text: "降价",
                className: "jiang_jia"
            },
            "最新降价": {
                value: "is_rent_price_decrease",
                text: "降价",
                className: "jiang_jia"
            },
            "有钥匙": {
                value: "is_key",
                text: "有钥匙",
                className: "you_yao_shi"
            }
        },
        {
            constants: s
        }
    }])
});