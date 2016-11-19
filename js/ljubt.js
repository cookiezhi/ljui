(function() {
    var $Global = {};
    $Global.version = "lj1.0.2u";
    $Global.edtion = "outer";
    var UBT = {
        loggerEvent: function(e) {
            if (UBT.eventFilter(e)) {
                addEvent(e)
            }
        },
        eventFilter: function(e) {
            if (!e) {
                return null
            }
            if (!e.target && !e.srcElement) {
                return null
            }
            if (!arrayContains($Global.event_triggers, e.type)) {
                return null
            }
            var _tag = e.target || e.srcElement;
            var _tagName = _tag.tagName;
            if (!_tagName || !_tagName instanceof String) {
                return null
            }
            var isIncludeTagName = arrayContains($Global.event_listen_elements, _tagName.toLowerCase());
            if (isIncludeTagName) {
                return _tag
            }
            var cursor;
            if (_tag.currentStyle) {
                cursor = _tag.currentStyle["cursor"]
            } else {
                if (window.getComputedStyle) {
                    cursor = window.getComputedStyle(_tag, null)["cursor"]
                } else {
                    cursor = null
                }
            }
            var isCursorPointer = (cursor.toLowerCase() == "pointer");
            if (isCursorPointer) {
                return _tag
            }
            return findElementRecursion(_tag, "a")
        }
    };
    var _win = window;
    var _doc = document;
    var _l = _win.location;
    var _n = _win.navigator;
    $Global.param_utma = "ubta";
    $Global.param_utmb = "ubtb";
    $Global.param_utmc = "ubtc";
    $Global.param_utmd = "ubtd";
    $Global.param_utmeb = "ubteb";
    $Global.param_utmec = "ubtec";
    $Global.param_load_time_b = "ubt_load_interval_b";
    $Global.param_load_time_c = "ubt_load_interval_c";
    $Global.param_request_id = "requestid";
    $Global.param_session_id = "sessionid";
    $Global.param_ubtpid = "ubtpid";
    $Global.param_ip_b = "ubtreadd_b";
    $Global.param_ip_c = "ubtreadd_c";
    $Global.domain = (_l && _l.host) ? _l.host: "localhost";
    $Global.domain_filter = /([\w|\d|_|-]+\.)*(dooioo\.com|lianjia\.org|lianjia\.com)/;
    $Global.protocol = "http:";
    $Global.server_ip = $Global.edtion == "outer" ? "rz.dooioo.com": "fs.dooioo.com";
    $Global.server_port = "80";
    $Global.server_path = "/api/ubt";
    $Global.filter_null = true;
    $Global.event_listen_elements = ["a", "input", "button", "img"];
    $Global.canvas = true;
    $Global.screen_resolution = false;
    $Global.ie_activex = false;
    $Global.event_stack_maxlength = 1;
    $Global.event_triggers = ["click"];
    $Global.cookie_path = "/";
    $Global.cookie_inner_user_id = "ui";
    $Global.cookie_outer_user_id = "deyou_userId";
    $Global.cookie_username_name = "DOOIOO_USERNAME";
    $Global.cookie_c_timeout = 15768000000;
    $Global.cookie_v_timeout = 1800000;
    $Global.cookie_s_timeout = 0;
    $Global.start_time = new Date().getTime();
    $Global.max_load_period = 5 * 60 * 1000;
    $Global.time_unit = "millsec";
    $Global.cstm_node_attr_name = "gahref";
    $Global.ipservice_url = "http://m.sh.lianjia.com/api/system/clientip";
    $Global.currentUrl = _l.href;
    $Global.spider_pattern = ["google", "baidu", "sougou"];
    $Global.mapping = {
        "UBTCC.ubta": $Global.param_utma,
        "UBTCC.ubtb": $Global.param_utmb,
        "UBTCC.ubtc": $Global.param_utmc,
        "UBTCC.ubtd": $Global.param_utmd
    };
    $Global.excludes = ["GeneralInfo.uri", "GeneralInfo.browser", "GeneralInfo.currentTime", "GeneralInfo.ubtn", "UBTEvent.eventTime"];
    var time_format = function(time, time_unit) {
        if (!time instanceof Date) {
            return time
        }
        time_unit = time_unit || $Global.time_unit;
        var millseconds = time.getTime();
        switch (time_unit) {
        case "millsec":
            return millseconds;
        case "sec":
            return Math.floor(millseconds / 1000);
        case "min":
            return Math.floor(millseconds / 60000);
        case "hour":
            return Math.floor(millseconds / 3600000);
        case "day":
            return Math.floor(millseconds / 86400000);
        default:
            return millseconds
        }
    };
    function arrayContains(array, str) {
        if (str == null || !str instanceof String) {
            return false
        }
        if (array.length > 0) {
            for (var i = 0; i < array.length; i++) {
                if (str == array[i]) {
                    return true
                }
            }
        }
        return false
    }
    function findElementRecursion(element, elementName) {
        while (true) {
            if (element.nodeName.toLowerCase() == elementName.toLowerCase()) {
                return element
            }
            if (element.nodeName.toLowerCase() == "html" || element.nodeName.toLowerCase() == "body") {
                return null
            }
            if (element.parentNode) {
                element = element.parentNode
            } else {
                return null
            }
        }
    }
    function getElementPath(element) {
        var path = "";
        while (true) {
            if (element.nodeName.toLowerCase() == "html") {
                break
            }
            path += element ? element.nodeName: "";
            if (element.id) {
                path += "#" + element.id
            }
            if (element.parentNode) {
                element = element.parentNode;
                if (element.nodeName.toLowerCase() != "body") {
                    path += "<"
                } else {
                    break
                }
            } else {
                break
            }
        }
        return path
    }
    var Fingerprint = {
        each: function(obj, iterator, context) {
            var nativeForEach = Array.prototype.forEach;
            if (obj === null) {
                return
            }
            if (nativeForEach && obj.forEach === nativeForEach) {
                obj.forEach(iterator, context)
            } else {
                if (obj.length === +obj.length) {
                    for (var i = 0,
                    l = obj.length; i < l; i++) {
                        if (iterator.call(context, obj[i], i, obj) === {}) {
                            return
                        }
                    }
                } else {
                    for (var key in obj) {
                        if (obj.hasOwnProperty(key)) {
                            if (iterator.call(context, obj[key], key, obj) === {}) {
                                return
                            }
                        }
                    }
                }
            }
        },
        map: function(obj, iterator, context) {
            var results = [];
            var nativeMap = Array.prototype.map;
            if (obj == null) {
                return results
            }
            if (nativeMap && obj.map === nativeMap) {
                return obj.map(iterator, context)
            }
            Fingerprint.each(obj,
            function(value, index, list) {
                results[results.length] = iterator.call(context, value, index, list)
            });
            return results
        },
        get: function() {
            var keys = [];
            keys.push(navigator.userAgent.match(/[^\d\.]/g));
            keys.push(navigator.language);
            keys.push(screen.colorDepth);
            if ($Global.screen_resolution) {
                var resolution = Fingerprint.getScreenResolution();
                if (typeof resolution !== "undefined") {
                    keys.push(Fingerprint.getScreenResolution().join("x"))
                }
            } else {
                keys.push(Fingerprint.getScreenResolution().join("x"))
            }
            keys.push(new Date().getTimezoneOffset());
            keys.push(this.hasLocalStorage());
            keys.push(this.hasSessionStorage());
            keys.push( !! window.indexedDB);
            if (document.body) {
                keys.push(typeof(document.body.addBehavior))
            } else {
                keys.push(typeof undefined)
            }
            keys.push(typeof(window.openDatabase));
            keys.push(navigator.cpuClass);
            keys.push(navigator.platform);
            keys.push(navigator.doNotTrack);
            keys.push(this.getPluginsString());
            if (this.canvas && this.isCanvasSupported()) {
                keys.push(this.getCanvasFingerprint())
            }
            return Fingerprint.murmurhash(keys.join("###"), 31)
        },
        murmurhash: function(key, seed) {
            var remainder, bytes, h1, h1b, c1, c2, k1, i;
            remainder = key.length & 3;
            bytes = key.length - remainder;
            h1 = seed ? seed: 31;
            c1 = 3432918353;
            c2 = 461845907;
            i = 0;
            while (i < bytes) {
                k1 = ((key.charCodeAt(i) & 255)) | ((key.charCodeAt(++i) & 255) << 8) | ((key.charCodeAt(++i) & 255) << 16) | ((key.charCodeAt(++i) & 255) << 24); ++i;
                k1 = ((((k1 & 65535) * c1) + ((((k1 >>> 16) * c1) & 65535) << 16))) & 4294967295;
                k1 = (k1 << 15) | (k1 >>> 17);
                k1 = ((((k1 & 65535) * c2) + ((((k1 >>> 16) * c2) & 65535) << 16))) & 4294967295;
                h1 ^= k1;
                h1 = (h1 << 13) | (h1 >>> 19);
                h1b = ((((h1 & 65535) * 5) + ((((h1 >>> 16) * 5) & 65535) << 16))) & 4294967295;
                h1 = (((h1b & 65535) + 27492) + ((((h1b >>> 16) + 58964) & 65535) << 16))
            }
            k1 = 0;
            switch (remainder) {
            case 3:
                k1 ^= (key.charCodeAt(i + 2) & 255) << 16;
            case 2:
                k1 ^= (key.charCodeAt(i + 1) & 255) << 8;
            case 1:
                k1 ^= (key.charCodeAt(i) & 255);
                k1 = (((k1 & 65535) * c1) + ((((k1 >>> 16) * c1) & 65535) << 16)) & 4294967295;
                k1 = (k1 << 15) | (k1 >>> 17);
                k1 = (((k1 & 65535) * c2) + ((((k1 >>> 16) * c2) & 65535) << 16)) & 4294967295;
                h1 ^= k1
            }
            h1 ^= key.length;
            h1 ^= h1 >>> 16;
            h1 = (((h1 & 65535) * 2246822507) + ((((h1 >>> 16) * 2246822507) & 65535) << 16)) & 4294967295;
            h1 ^= h1 >>> 13;
            h1 = ((((h1 & 65535) * 3266489909) + ((((h1 >>> 16) * 3266489909) & 65535) << 16))) & 4294967295;
            h1 ^= h1 >>> 16;
            return h1 >>> 0
        },
        hasLocalStorage: function() {
            try {
                return !! window.localStorage
            } catch(e) {
                return true
            }
        },
        hasSessionStorage: function() {
            try {
                return !! window.sessionStorage
            } catch(e) {
                return true
            }
        },
        isCanvasSupported: function() {
            var elem = document.createElement("canvas");
            return !! (elem.getContext && elem.getContext("2d"))
        },
        isIE: function() {
            if (navigator.appName === "Microsoft Internet Explorer") {
                return true
            } else {
                if (navigator.appName === "Netscape" && /Trident/.test(navigator.userAgent)) {
                    return true
                }
            }
            return false
        },
        getPluginsString: function() {
            if (Fingerprint.isIE() && $Global.ie_activex) {
                return Fingerprint.getIEPluginsString()
            } else {
                return Fingerprint.getRegularPluginsString()
            }
        },
        getRegularPluginsString: function() {
            return Fingerprint.map(navigator.plugins,
            function(p) {
                var mimeTypes = Fingerprint.map(p,
                function(mt) {
                    return [mt.type, mt.suffixes].join("~")
                }).join(",");
                return [p.name, p.description, mimeTypes].join("::")
            },
            this).join(";")
        },
        getIEPluginsString: function() {
            if (window.ActiveXObject) {
                var names = ["ShockwaveFlash.ShockwaveFlash", "AcroPDF.PDF", "PDF.PdfCtrl", "QuickTime.QuickTime", "rmocx.RealPlayer G2 Control", "rmocx.RealPlayer G2 Control.1", "RealPlayer.RealPlayer(tm) ActiveX Control (32-bit)", "RealVideo.RealVideo(tm) ActiveX Control (32-bit)", "RealPlayer", "SWCtl.SWCtl", "WMPlayer.OCX", "AgControl.AgControl", "Skype.Detection"];
                return Fingerprint.map(names,
                function(name) {
                    try {
                        new ActiveXObject(name);
                        return name
                    } catch(e) {
                        return null
                    }
                }).join(";")
            } else {
                return ""
            }
        },
        getScreenResolution: function() {
            return [screen.width, screen.height]
        },
        getCanvasFingerprint: function() {
            var canvas = document.createElement("canvas");
            var ctx = canvas.getContext("2d");
            var txt = "http://www.dooioo.com";
            ctx.textBaseline = "top";
            ctx.font = "14px 'Arial'";
            ctx.textBaseline = "alphabetic";
            ctx.fillStyle = "#f60";
            ctx.fillRect(125, 1, 62, 20);
            ctx.fillStyle = "#069";
            ctx.fillText(txt, 2, 15);
            ctx.fillStyle = "rgba(102, 204, 0, 0.7)";
            ctx.fillText(txt, 4, 17);
            return canvas.toDataURL()
        }
    };
    var isEmpty = function(obj) {
        return ((undefined == obj) || ("" === obj) || (null == obj))
    };
    var isArray = function(o) {
        return Object.prototype["toString"].call(Object(o)) == "[object Array]"
    };
    var Cookie = {
        getCookieExpires: function(timeout) {
            var date = ( + new Date());
            timeout = new Date(date + timeout);
            return "expires=" + timeout.toUTCString()
        },
        getCookie: function(key) {
            if (isEmpty(key)) {
                return null
            }
            var reg = new RegExp("(^| )" + key + "=([^;]*)(;|$)");
            var arr;
            if (arr = document.cookie.match(reg)) {
                return decodeURIComponent(arr[2])
            } else {
                return null
            }
        },
        setCookie: function(key, value, timeout) {
            Cookie.setCookieByPath(key, value, timeout, Cookie.getCookieDomain(), $Global.cookie_path)
        },
        setCookieByPath: function(key, value, timeout, domain, path) {
            var c = [key + "=" + value];
            if (!isEmpty(domain)) {
                c.push("domain=" + domain)
            } else {
                c.push("domain=" + _l.hostname)
            }
            if (!isEmpty(path)) {
                c.push("path=" + path)
            } else {
                c.push("path=" + $Global.cookie_path)
            }
            if (timeout) {
                c.push(Cookie.getCookieExpires(timeout))
            } else {
                c.push("expires=-1")
            }
            var cookie_value = c.join("; ");
            document.cookie = cookie_value
        },
        getCookieRPL: function(key, len, separate) {
            separate = separate || ".";
            var val = Cookie.getCookie(key);
            if (val) {
                var obj = val.split(separate);
                if (isArray(obj) && obj.length >= len) {
                    return obj
                }
            }
            return false
        },
        getCookieObj: function(key) {
            var ret = {
                __k: key
            };
            var r = new RegExp("(^|; )" + key + "=([^;]*)");
            var m = _doc.cookie.match(r);
            var a = m ? m[2].split("&") : [];
            for (var i = 0; i < a.length; i++) {
                var p = a[i].split("=");
                if (p.length > 1) {
                    ret[p[0]] = decodeURIComponent(p[1])
                }
            }
            return ret
        },
        getCookieDomain: function() {
            var strArray = $Global.domain.split(".");
            if (strArray.length > 2) {
                return strArray[strArray.length - 2] + "." + strArray[strArray.length - 1]
            } else {
                return $Global.domain
            }
        },
        removeCookie: function(key) {
            var now = new Date();
            var arr = document.cookie.match(new RegExp("(^| )" + key + "=([^;]*)(;|$)"));
            var value;
            if (arr != null) {
                value = decodeURIComponent(arr[2])
            }
            if (!value) {
                now.setTime(now.getTime() - (86400 * 1000 * 1));
                document.cookie = key + "=;expires=" + now.toGMTString()
            }
        }
    };
    var REQUEST_SERIES = {
        getRequestId: function() {
            return Cookie.getCookie($Global.param_request_id)
        },
        getSessionId: function() {
            return Cookie.getCookie($Global.param_session_id)
        }
    };
    var UTM = {
        getUTMAValue: function(_isEvent) {
            var value_utma = Cookie.getCookie($Global.param_utma);
            if (!value_utma) {
                value_utma = Fingerprint.murmurhash($Global.domain);
                value_utma += "." + Fingerprint.get();
                value_utma += "." + time_format(new Date());
                value_utma += "." + time_format(new Date());
                value_utma += "." + time_format(new Date());
                value_utma += "." + 1;
                UTM.setUTMA(value_utma, $Global.cookie_c_timeout)
            } else {
                var value_utmas = value_utma.split(".");
                if (value_utmas.length == 6) {
                    value_utmas[0] = Fingerprint.murmurhash($Global.domain);
                    value_utma = value_utmas[0];
                    value_utmas[1] = Fingerprint.get();
                    value_utma += "." + value_utmas[1];
                    value_utma += "." + value_utmas[2];
                    value_utma += "." + value_utmas[4];
                    value_utma += "." + time_format(new Date());
                    if (_isEvent) {
                        value_utma += "." + value_utmas[5]
                    } else {
                        value_utma += "." + (parseInt(value_utmas[5]) + 1)
                    }
                    UTM.setUTMA(value_utma, $Global.cookie_c_timeout)
                } else {
                    value_utma = Fingerprint.murmurhash($Global.domain);
                    value_utma += "." + Fingerprint.get();
                    value_utma += "." + time_format(new Date());
                    value_utma += "." + time_format(new Date());
                    value_utma += "." + time_format(new Date());
                    value_utma += "." + 1;
                    UTM.setUTMA(value_utma, $Global.cookie_c_timeout)
                }
            }
            return value_utma
        },
        getUTMBCValue: function() {
            var value_utmb = Cookie.getCookie($Global.param_utmb);
            var value_utmc = Cookie.getCookie($Global.param_utmc);
            var ubtb;
            if (!value_utmb || !value_utmc || value_utmb != value_utmc) {
                Cookie.removeCookie($Global.param_utmb);
                Cookie.removeCookie($Global.param_utmc);
                UTM.sameSession = false;
                ubtb = UTM.genUTMBCode();
                UTM.setUTMB(ubtb, $Global.cookie_v_timeout);
                UTM.setUTMC(ubtb, $Global.cookie_s_timeout)
            } else {
                ubtb = UTM.renewUTMB(value_utmc);
                UTM.setUTMB(ubtb, $Global.cookie_v_timeout);
                UTM.setUTMC(ubtb, $Global.cookie_s_timeout)
            }
            if (ubtb) {
                var value_utmid = ubtb.split(".");
                if (value_utmid.length == 4) {
                    return value_utmid[1] + "." + value_utmid[3]
                }
            }
            return null
        },
        getUTMDValue: function(_isEvent) {
            var _value_utmd = Cookie.getCookie($Global.param_utmd) || 0;
            if (_isEvent) {
                return _value_utmd
            }
            var _value_utmb = Cookie.getCookie($Global.param_utmb);
            var _value_utmc = Cookie.getCookie($Global.param_utmc);
            if (!_value_utmb && !_value_utmc) {
                return 0
            }
            if (!_value_utmb || !_value_utmc || _value_utmb != _value_utmc) {
                UTM.setUTMD(1, $Global.cookie_s_timeout);
                return 1
            }
            try {
                _value_utmd = parseInt(_value_utmd) + 1;
                UTM.setUTMD(_value_utmd, $Global.cookie_s_timeout);
                return _value_utmd
            } catch(e) {
                return 0
            }
        },
        getUTMEValue: function() {
            if (!Fingerprint.hasLocalStorage()) {
                return null
            }
            var pathid = Fingerprint.murmurhash(_l.pathname);
            var value_utmeb = _win.localStorage.getItem($Global.param_utmeb + "_" + pathid);
            var ubte;
            var needGen = false;
            if (!value_utmeb || !UTM.sameSession) {
                needGen = true
            } else {
                var utmebTime = value_utmeb.split(".")[1];
                if (!utmebTime) {
                    needGen = true
                }
                try {
                    utmebTime = parseInt(utmebTime)
                } catch(e) {
                    return true
                }
                var nowTime = time_format(new Date());
                if ((nowTime - utmebTime) > $Global.cookie_v_timeout) {
                    needGen = true
                }
            }
            if (needGen) {
                _win.localStorage.removeItem($Global.param_utmeb + "_" + pathid);
                ubte = UTM.genUTMECode();
                UTM.setUTME(ubte)
            } else {
                ubte = UTM.renewUTME(value_utmeb);
                UTM.setUTME(ubte)
            }
            if (ubte) {
                var value_utmid = ubte.split(".");
                if (value_utmid.length == 3) {
                    return value_utmid[2]
                }
            }
            return null
        },
        setUTMA: function(value, timeout) {
            timeout = timeout || $Global.cookie_c_timeout;
            Cookie.setCookie($Global.param_utma, value, timeout)
        },
        setUTMB: function(value, timeout) {
            timeout = timeout || $Global.cookie_v_timeout;
            Cookie.setCookie($Global.param_utmb, value, timeout)
        },
        setUTMC: function(value, timeout) {
            timeout = timeout || $Global.cookie_s_timeout;
            Cookie.setCookie($Global.param_utmc, value, timeout)
        },
        setUTMD: function(value, timeout) {
            timeout = timeout || $Global.cookie_s_timeout;
            Cookie.setCookie($Global.param_utmd, value, timeout)
        },
        setUTME: function(value) {
            var pathcode = $Global.param_utmeb + "_" + Fingerprint.murmurhash(_l.pathname);
            _win.localStorage.setItem(pathcode, value)
        },
        genUTMBCode: function() {
            var utmcode = Fingerprint.murmurhash($Global.domain);
            utmcode += "." + Fingerprint.get();
            utmcode += "." + new Date().getTime();
            utmcode += "." + UUID.getUUID();
            return utmcode
        },
        renewUTMB: function(ubtc) {
            var uuid;
            var time;
            if (ubtc) {
                var value_utmid = ubtc.split(".");
                if (value_utmid.length == 4) {
                    try {
                        time = parseInt(value_utmid[2])
                    } catch(e) {
                        time = 0
                    }
                    uuid = value_utmid[3]
                }
            }
            var utmcode = Fingerprint.murmurhash($Global.domain);
            utmcode += "." + Fingerprint.get();
            var nowtime = new Date().getTime();
            utmcode += "." + nowtime;
            if (!uuid || !time || ((nowtime - time) > $Global.cookie_v_timeout)) {
                UTM.sameSession = false;
                utmcode += "." + UUID.getUUID()
            } else {
                UTM.sameSession = true;
                utmcode += "." + uuid
            }
            return utmcode
        },
        genUTMECode: function() {
            var utmcode = Fingerprint.get();
            utmcode += "." + new Date().getTime();
            utmcode += "." + UUID.getUUID();
            return utmcode
        },
        renewUTME: function(ubtc) {
            var uuid;
            var time;
            if (ubtc) {
                var value_utmid = ubtc.split(".");
                if (value_utmid.length == 3) {
                    try {
                        time = parseInt(value_utmid[1])
                    } catch(e) {
                        time = 0
                    }
                    uuid = value_utmid[2]
                }
            }
            var utmcode = Fingerprint.get();
            var nowtime = new Date().getTime();
            utmcode += "." + nowtime;
            if (!uuid || !time || ((nowtime - time) > $Global.cookie_v_timeout)) {
                utmcode += "." + UUID.getUUID()
            } else {
                utmcode += "." + uuid
            }
            return utmcode
        }
    };
    function UBTCC(_isEvent) {
        this.ubta = UTM.getUTMAValue( !! _isEvent);
        this.ubtb = UTM.getUTMBCValue();
        this.ubtd = UTM.getUTMDValue( !! _isEvent);
        this.ubte = UTM.getUTMEValue();
        this.ubtz = null;
        this.ubtv = null;
        this.ubtx = null;
        this.toParams = function(str, isLineHead) {
            return serialize(this, str, !!isLineHead)
        }
    }
    function URI(protocol, host, port, path) {
        this.protocol = protocol ? protocol: _l.protocol;
        this.host = host ? host: _l.host;
        this.port = port ? port: _l.port;
        this.path = path ? path: _l.pathname;
        this.surl = this.protocol + "//" + this.host + ((this.port > 0 && this.port != 80) ? (":" + this.port) : "") + (/^\//.test(this.path) ? this.path: ("/" + this.path));
        this.url = _l.href;
        this.toParams = function(str, isLineHead) {
            return serialize(this, str, !!isLineHead)
        }
    }
    function Browser() {
        this.userAgent = _n.userAgent;
        this.cookieEnabled = _n.cookieEnabled;
        this.language = _n.language;
        this.onLine = _n.onLine;
        this.platform = _n.platform;
        this.product = _n.product;
        this.availHeight = _win.screen.availHeight;
        this.availWidth = _win.screen.availWidth;
        this.colorDepth = _win.screen.colorDepth;
        this.height = _win.screen.height;
        this.width = _win.screen.width;
        this.pixelDepth = _win.screen.pixelDepth
    }
    function parsePlatform() {
        var userAgent = _n.userAgent;
        if (userAgent.indexOf("Android") > -1) {
            return "android"
        } else {
            if (userAgent.indexOf("iPhone") > -1) {
                return "iphone"
            } else {
                if (userAgent.indexOf("Windows Phone") > -1) {
                    return "winphone"
                } else {
                    return "pc"
                }
            }
        }
    }
    var $browser = new Browser();
    var $server = new URI($Global.protocol, $Global.server_ip, $Global.server_port, $Global.server_path);
    var $client = new URI(_l.protocol, _l.host, _l.port, _l.pathname);
    var $userId = $Global.edtion == "outer" ? getOuterUserId() : getInnerUserId();
    function getInnerUserId() {
        if (headerParameters && headerParameters.empNo) {
            return headerParameters.empNo
        }
        return null
    }
    function getOuterUserId() {
        return Cookie.getCookie($Global.cookie_outer_user_id)
    }
    function getLoadPeriod() {
        var loadPeriod;
        var startTime;
        var endTime;
        var p = _win.performance || _win.msPerformance || _win.webkitPerformance || _win.mozPerformance;
        if (p && p.timing) {
            var t = p.timing;
            if (t.navigationStart && t.navigationStart > 0) {
                startTime = t.navigationStart
            } else {
                if (t.requestStart && t.requestStart > 0) {
                    startTime = t.requestStart
                } else {
                    startTime = $Global.start_time ? $Global.start_time: new Date().getTime()
                }
            }
            if (t.domComplete && t.domComplete > 0) {
                endTime = t.domComplete
            } else {
                if (t.loadEventEnd && t.loadEventEnd > 0) {
                    endTime = t.loadEventEnd
                } else {
                    if (t.responseEnd && t.responseEnd > 0) {
                        endTime = t.responseEnd
                    } else {
                        endTime = new Date().getTime()
                    }
                }
            }
        } else {
            endTime = $Global.end_time ? $Global.end_time: new Date().getTime();
            startTime = $Global.start_time ? $Global.start_time: new Date().getTime()
        }
        if (startTime > 0 && endTime > startTime) {
            loadPeriod = endTime - startTime
        } else {
            return 0
        }
        return (loadPeriod > 0 && loadPeriod < $Global.max_load_period) ? loadPeriod: 0
    }
    function getRequestPeriod() {
        var p = _win.performance || _win.msPerformance || _win.webkitPerformance || _win.mozPerformance;
        if (p && p.timing) {
            var t = p.timing;
            if (t.navigationStart > 0 && t.requestStart > t.navigationStart) {
                return t.requestStart - t.navigationStart
            } else {
                return 0
            }
        } else {
            return 0
        }
    }
    function getInterval() {
        var _value_load_time_b = Cookie.getCookie($Global.param_load_time_b);
        var _value_load_time_c = Cookie.getCookie($Global.param_load_time_c);
        var current_load_time = new Date().getTime();
        if (!_value_load_time_b || !_value_load_time_c || _value_load_time_b != _value_load_time_c) {
            Cookie.setCookie($Global.param_load_time_b, current_load_time, $Global.cookie_s_timeout);
            Cookie.setCookie($Global.param_load_time_c, current_load_time, $Global.cookie_v_timeout);
            return 0
        } else {
            Cookie.setCookie($Global.param_load_time_b, current_load_time, $Global.cookie_s_timeout);
            Cookie.setCookie($Global.param_load_time_c, current_load_time, $Global.cookie_v_timeout);
            var load_interval = current_load_time - parseInt(_value_load_time_b);
            return load_interval > 0 ? load_interval: 0
        }
    }
    function LoadInfo() {
        this.ubtty = "load";
        this.ubtldp = getLoadPeriod();
        this.ubtrqstp = getRequestPeriod();
        this.ubtitvl = getInterval();
        this.toParams = function(str, isLineHead) {
            if (this.ubtrqstp > this.ubtldp) {
                this.ubtrqstp = this.ubtldp
            }
            return serialize(this, str, !!isLineHead)
        }
    }
    LoadInfo.prototype.send = function(callback) {
        var params = this.toParams();
        sendParams(false, params, callback)
    };
    function SearchInfo(searchType, searchKeyword, resultNum, selectResult, selectIndex) {
        this.ubtty = "search";
        this.ubtsrchtp = searchType;
        this.ubtsrchkw = searchKeyword;
        this.ubtsrchrsltnum = resultNum;
        this.ubtsrchslctrslt = selectResult;
        this.ubtsrchslcti = selectIndex;
        this.toParams = function(str, isLineHead) {
            return serialize(this, str, !!isLineHead)
        }
    }
    function UBTError(errorMessage, scriptURI, lineNumber, columnNumber, errorObj) {
        this.ubtty = "error";
        this.ubtermsg = JSON.stringify({
            "msg": errorMessage,
            "uri": scriptURI,
            "line": lineNumber,
            "column": columnNumber,
            "obj": errorObj
        });
        this.toParams = function(str, isLineHead) {
            return serialize(this, str, !!isLineHead)
        }
    }
    UBTError.prototype.send = function(callback) {
        var params = this.toParams();
        sendParams(true, params, callback)
    };
    function onError(errorObject) {
        if (errorObject) {
            var $error = new UBTError(errorObject["message"], errorObject["filename"], errorObject["lineno"], errorObject["colno"], errorObject["type"]);
            $error.send()
        }
        return false
    }
    function getUbtni(event, tagObj) {
        var targetObj = tagObj || event.target || event.srcElement;
        if (targetObj.nodeName.toLowerCase() == "img") {
            targetObj = targetObj.parentNode
        }
        var ubtni = null;
        if (targetObj && targetObj.attributes) {
            for (var i = 0; i < targetObj.attributes.length; i++) {
                if (targetObj.attributes[i] && targetObj.attributes[i].name && targetObj.attributes[i].name == $Global.cstm_node_attr_name) {
                    ubtni = targetObj.attributes[i].nodeValue;
                    break
                }
            }
            if (!ubtni) {
                ubtni = targetObj.id
            }
        }
        return ubtni
    }
    function UBTEvent(event, tagObj) {
        this.ubtty = event.type;
        this.eventTime = time_format(new Date());
        this.ubtx = event.screenX;
        this.ubty = event.screenY;
        this.ubtni = getUbtni(event, tagObj);
        var targetObj = event.target || event.srcElement;
        this.ubtnm = targetObj ? targetObj.tagName: "";
        this.ubtdp = getElementPath(targetObj);
        var _nodeContent = targetObj.nodeValue ? targetObj.nodeValue: (targetObj.innerText ? targetObj.innerText: null);
        var _nodeValue = targetObj.getAttribute("value");
        this.ubtdc = _nodeContent || _nodeValue;
        this.ubthf = targetObj.getAttribute("href");
        this.ubtsd = 0;
        this.toParams = function(str, isLineHead) {
            return serialize(this, str, !!isLineHead)
        }
    }
    var Event = {
        event_stack: [],
        toParams: function() {
            var str = "";
            if (Event.event_stack && Event.event_stack.length > 0) {
                str = serialize(Event.event_stack[Event.event_stack.length - 1], str)
            }
            return str
        },
        addEvent: function(event) {
            var tagObj = null;
            if ($Global.event_listen_elements.length > 0) {
                tagObj = UBT.eventFilter(event);
                if (!tagObj) {
                    return
                }
            }
            if (!Event.event_stack) {
                Event.event_stack = []
            }
            var ubtEvent = new UBTEvent(event, tagObj);
            if (Event.event_stack.length > 0) {
                var lastEvent = Event.event_stack.pop();
                ubtEvent.ubtsd = (ubtEvent.eventTime - lastEvent.eventTime)
            }
            Event.event_stack.push(ubtEvent);
            if (ubtEvent.ubtty && arrayContains($Global.event_triggers, ubtEvent.ubtty.toLowerCase())) {
                if (Event.event_stack.length >= $Global.event_stack_maxlength) {
                    Event.sendStack()
                }
            } else {
                if (Event.event_stack.length > $Global.event_stack_maxlength) {
                    Event.sendStack()
                }
            }
        },
        sendStack: function(callback) {
            var params = Event.toParams();
            sendParams(true, params, callback);
            if (Event.event_stack.length > 0) {
                var lastEvent = Event.event_stack.pop();
                Event.event_stack = [];
                Event.event_stack.push(lastEvent)
            }
        }
    };
    var UUID = {
        get: function(len, radix) {
            var CHARS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("");
            var uuid = [],
            i;
            radix = radix || CHARS.length;
            if (len) {
                for (i = 0; i < len; i++) {
                    uuid[i] = CHARS[0 | Math.random() * radix]
                }
            } else {
                var r;
                uuid[8] = uuid[13] = uuid[18] = uuid[23];
                uuid[14] = "4";
                for (i = 0; i < 36; i++) {
                    if (!uuid[i]) {
                        r = 0 | Math.random() * 16;
                        uuid[i] = CHARS[(i == 19) ? (r & 3) | 8 : r]
                    }
                }
            }
            return uuid.join("")
        },
        getUUID: function() {
            return UUID.get(32, 16)
        }
    };
    function GeneralInfo(isEvent, _uri, _browser) {
        this.uri = _uri ? _uri: (isEvent ? $client: new URI(_l.protocol, _l.host, _l.port, _l.pathname));
        this.browser = _browser ? _browser: $browser;
        this.ubtcc = new UBTCC( !! isEvent);
        this.ubthn = _l.host;
        try {
            this.ubtr = _doc.referrer ? _doc.referrer: (_win.opener ? _win.opener.location.href: "")
        } catch(e) {
            this.ubtr = null
        }
        this.ubtreadd = getIp( !! isEvent);
        this.ubtpltfm = parsePlatform();
        this.ubtac = null;
        this.currentTime = 0;
        this.ubtdt = _doc.title ? _doc.title: "";
        this.ubtuid = $userId;
        this.ubtcs = (_doc && _doc.charset) ? _doc.charset: null;
        this.ubtdt = (_doc && _doc.title) ? _doc.title: null;
        this.ubthid = Fingerprint.get();
        this.ubtn = UUID.getUUID();
        this.ubtp = _l.href;
        this.ubtsc = _win.screen.colorDepth;
        this.ubtsr = Fingerprint.getScreenResolution().join("*");
        this.ubtul = this.browser.language;
        this.ubtpid = _doc.getElementById($Global.param_ubtpid) ? _doc.getElementById($Global.param_ubtpid).value: null;
        this.ubtwv = $Global.version;
        this.ubtrqstid = REQUEST_SERIES.getRequestId();
        this.ubtssid = REQUEST_SERIES.getSessionId();
        this.toParams = function(str, isLineHead) {
            return serialize(this, str, !!isLineHead)
        }
    }
    GeneralInfo.prototype.getGeolocation = function() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(getPositionSuccess, getPositionError, {
                timeout: 1000
            })
        }
    };
    function getPositionSuccess(position) {
        var generalInfo = new GeneralInfo();
        generalInfo.ubtglat = position.coords ? position.coords.latitude: null;
        generalInfo.ubtglon = position.coords ? position.coords.longitude: null
    }
    function getPositionError(position) {}
    var sendParams = function(isEvent, params, callback) {
        var generalInfo = new GeneralInfo( !! isEvent);
        if (!isEvent && $Global.currentUrl != _l.href) {
            generalInfo.ubtr = $Global.currentUrl;
            $Global.currentUrl = _l.href
        }
        params = generalInfo.toParams(params);
        requestParams(params, callback)
    };
    var spiderFilter = function() {
        if ($Global.edtion == "outer" && $Global.spider_pattern && $Global.spider_pattern.length > 0) {
            for (var i = 0; i < $Global.spider_pattern.length; i++) {
                if (_n.userAgent && _n.userAgent.toLowerCase().indexOf($Global.spider_pattern[i]) > 0) {
                    return true
                }
            }
        }
        return false
    };
    var requestParams = function(params, callback) {
        if (spiderFilter()) {
            return
        }
        var image = new Image(1, 1);
        image.onload = function() { (callback || emptyFun)()
        };
        image.src = $server.surl + params
    };
    function AjaxInfo(_url, _method, _data, _period) {
        this.ubtty = "ajax";
        this.ubtxhrurl = _url;
        this.ubtxhrmthd = _method;
        this.ubtxhrdt = _data;
        this.ubtldp = _period;
        this.ubtrqstp = _period;
        this.toParams = function(str, isLineHead) {
            var params = serialize(this, str, !!isLineHead);
            return params
        }
    }
    function ajaxDetect(_XHR, callback) {
        if (!callback) {
            return
        }
        if (!_XHR.__proto__) {
            return
        }
        var s_ajaxListener = new Object();
        s_ajaxListener.tempOpen = _XHR.__proto__.open;
        s_ajaxListener.tempSend = _XHR.__proto__.send;
        s_ajaxListener.callback = function() {
            if (this.url && !/http:\\S+\/ubt\\S*/.test(this.url)) {
                var $ajaxInfo = new AjaxInfo(this.url, this.method, this.data);
                s_ajaxListener.endTime = new Date().getTime();
                $ajaxInfo.ubtldp = s_ajaxListener.endTime - s_ajaxListener.startTime;
                if ($ajaxInfo.ubtldp > 1000) {
                    $ajaxInfo.ubtrqstp = $ajaxInfo.ubtldp;
                    var params = $ajaxInfo.toParams();
                    callback(params)
                }
            }
        };
        _XHR.__proto__.open = function(method, url, async) {
            try {
                s_ajaxListener.startTime = new Date().getTime();
                if (!method) {
                    method = ""
                }
                if (!url) {
                    url = ""
                }
                s_ajaxListener.tempOpen.apply(this, arguments);
                s_ajaxListener.method = method;
                s_ajaxListener.url = url;
                s_ajaxListener.async = !!async;
                if (a.toLowerCase() == "get") {
                    s_ajaxListener.data = url.split("?");
                    s_ajaxListener.data = s_ajaxListener.data[1]
                }
            } catch(e) {}
        };
        _XHR.__proto__.send = function(a, b) {
            if (!a) {
                a = ""
            }
            if (!b) {
                b = ""
            }
            try {
                s_ajaxListener.tempSend.apply(this, arguments);
                if (s_ajaxListener.method.toLowerCase() == "post") {
                    s_ajaxListener.data = a
                }
                s_ajaxListener.callback()
            } catch(e) {}
        }
    }
    function xhrDetect() {
        ajaxDetect(XHR, sendParams)
    }
    var AJAX = {
        createStandardXHR: function() {
            try {
                return new window.XMLHttpRequest()
            } catch(e) {}
        },
        createActiveXHR: function() {
            try {
                return new window.ActiveXObject("Microsoft.XMLHTTP")
            } catch(e) {}
        }
    };
    var emptyFun = function() {};
    var getIp = function(isEvent) {
        if ($Global.edtion == "outer") {
            var cookie_ip = Cookie.getCookie($Global.param_ip_b);
            if (!cookie_ip) {
                cookie_ip = fetchIpRemote( !! isEvent);
                Cookie.setCookie($Global.param_ip_b, cookie_ip, $Global.cookie_v_timeout)
            }
            return cookie_ip
        }
        return ""
    };
    var fetchIpRemote = function(isEvent) {
        if (!isEvent) {
            return ""
        }
        try {
            XHR = XHR || createXHR();
            XHR.open("GET", $Global.ipservice_url, false);
            XHR.send();
            var ipObj = JSON.parse(XHR.responseText);
            if (ipObj) {
                return ipObj["ip"]
            }
        } catch(e) {
            console.log(e.message || e || "unknow error")
        }
        return ""
    };
    var createXHR = window.ActiveXObject !== undefined ?
    function() {
        return AJAX.createStandardXHR() || AJAX.createActiveXHR()
    }: AJAX.createStandardXHR;
    var XHR = createXHR();
    xhrDetect();
    function serialize(obj, str, isLinehead) {
        if (!str) {
            str = ""
        }
        for (var prop in obj) {
            if (!$Global.filter_null || obj[prop]) {
                var objName = __typeof__(obj);
                if ($Global.excludes && arrayContains($Global.excludes, (objName + "." + prop))) {
                    continue
                }
                if (obj[prop] instanceof Object) {
                    if (obj[prop].hasOwnProperty("toParams")) {
                        str = (obj[prop].toParams(str))
                    }
                } else {
                    var prefix = "";
                    if (!str || str.length == 0 && isLinehead) {
                        prefix = "?"
                    } else {
                        if (/\?$/.test(str) == false) {
                            prefix = "&"
                        }
                    }
                    var paramName = $Global.mapping[objName + "." + prop] || prop;
                    str += prefix + paramName + "=" + encodeURIComponent(obj[prop])
                }
            }
        }
        return str
    }
    function __typeof__(obj) {
        if (obj && obj.constructor) {
            var strFun = obj.constructor.toString();
            var className = strFun.substr(0, strFun.indexOf("("));
            className = className.replace("function", "");
            return className.replace(/(^\s*)|(\s*$)/ig, "")
        }
        return typeof(obj)
    }
    var ready = function() {
        var rData = {
            type: "domready"
        };
        var readyBound = false,
        readyList = [],
        _doc = document,
        DOMContentLoaded;
        if (_doc.addEventListener) {
            DOMContentLoaded = function() {
                _doc.removeEventListener("DOMContentLoaded", DOMContentLoaded, false);
                ready()
            }
        } else {
            if (_doc.attachEvent) {
                DOMContentLoaded = function() {
                    if (_doc.readyState === "complete") {
                        _doc.detachEvent("onreadystatechange", DOMContentLoaded);
                        ready()
                    }
                }
            }
        }
        function ready() {
            if (!ready.isReady) {
                ready.isReady = true;
                for (var i = 0,
                j = readyList.length; i < j; i++) {
                    readyList[i](rData)
                }
            }
            onLoad()
        }
        function doScrollCheck() {
            try {
                _doc.documentElement.doScroll("left")
            } catch(e) {
                setTimeout(doScrollCheck, 1);
                return
            }
            ready()
        }
        function bindReady() {
            if (readyBound) {
                return
            }
            readyBound = true;
            if (_doc.readyState === "complete") {
                ready.isReady = true
            } else {
                if (_doc.addEventListener) {
                    _doc.addEventListener("DOMContentLoaded", DOMContentLoaded, false);
                    _win.addEventListener("load", ready, false)
                } else {
                    if (_doc.attachEvent) {
                        _doc.attachEvent("onreadystatechange", DOMContentLoaded);
                        _win.attachEvent("onload", ready);
                        var toplevel = false;
                        try {
                            toplevel = _win.frameElement == null
                        } catch(e) {}
                        if (_doc.documentElement.doScroll && toplevel) {
                            doScrollCheck()
                        }
                    }
                }
            }
        }
        bindReady();
        return function(callback) {
            ready.isReady ? callback(rData) : readyList.push(callback)
        }
    } ();
    var listenEvent = function(el, evt, fn, useCapture) {
        if (el.addEventListener) {
            el.addEventListener(evt, fn, !!useCapture)
        } else {
            if (el.attachEvent) {
                el.attachEvent("on" + evt, fn)
            } else {
                addEvent(evt)
            }
        }
    };
    var listen = function(el, evt, fn, useCapture) {
        if (evt == "domready") {
            ready(fn);
            return
        }
        listenEvent(el, evt, fn, useCapture)
    };
    ready.isReady = false;
    var $loadInfo = new LoadInfo();
    var addEvent = function(event) {
        if (_l.href == $Global.currentUrl) {
            Event.addEvent(event)
        } else {
            $loadInfo = new LoadInfo();
            var tagObj = UBT.eventFilter(event);
            if (tagObj) {
                $loadInfo.ubtni = getUbtni(event, tagObj)
            }
            $loadInfo.send()
        }
    };
    var eventInit = function() {
        listen(_doc.documentElement, "click", addEvent);
        listen(_win, "load", onLoad)
    };
    var catchError = function() {
        var $imgs = document.images;
        if ($imgs && $imgs.length > 0) {
            var $imgsLength = $imgs.length;
            for (var i = 0; i < $imgsLength; i++) {
                var $img = $imgs[i];
                $img.onerror = $img.onabort = function(event) {
                    if (event) {
                        var $target = event.srcElement || event.target;
                        if ($target) {
                            try {
                                var $error = new UBTError($target.src + " load error", $target.src, null, null, null);
                                $error.send()
                            } catch(e) {
                                console.log(e.message || e || "unknow error")
                            }
                        }
                    }
                    return false
                }
            }
        }
        var $styleSheets = document.styleSheets;
        if ($styleSheets && $styleSheets.length > 0) {
            var $styleSheetsLength = $styleSheets.length;
            for (var i = 0; i < $styleSheetsLength; i++) {
                var $styleSheet = $styleSheets[i];
                $styleSheet.onerror = $styleSheet.onabort = function(event) {
                    if (event) {
                        var $target = event.srcElement || event.target;
                        if ($target) {
                            try {
                                var $error = new UBTError($target.href + " load error", $target.href, null, null, null);
                                $error.send()
                            } catch(e) {
                                console.log(e.message || e || "unknow error")
                            }
                        }
                    }
                    return false
                }
            }
        }
    };
    var domConReady = function(director) {
        if (!$Global.domain_filter.test($Global.domain)) {
            return
        }
        try {
            if (pageStateCheck) {
                clearInterval(pageStateCheck);
                pageStateCheck = null;
                if (director) {
                    $loadInfo.send()
                }
                eventInit()
            }
        } catch(e) {
            console.log(e.message || e || "unknow error")
        }
    };
    var onLoad = function() {
        $Global.end_time = new Date().getTime()
    };
    var trackPageview = function(uri, ubtty) {
        var _loadInfo = new LoadInfo();
        if (!ubtty) {
            _loadInfo.ubtty = "chart"
        } else {
            _loadInfo.ubtty = ubtty
        }
        var params = _loadInfo.toParams();
        var _generalInfo = new GeneralInfo(false);
        _generalInfo.ubtni = uri;
        params = _generalInfo.toParams(params);
        requestParams(params, emptyFun)
    };
    var pageStateCheck = setInterval(function() {
        domConReady(true)
    },
    1000);
    ready(domConReady);
    var trackSearch = function(searchType, searchKeyword, resultNum, selectResult, selectIndex) {
        var _searchInfo = new SearchInfo(searchType, searchKeyword, resultNum, selectResult, selectIndex);
        var params = _searchInfo.toParams();
        var _generalInfo = new GeneralInfo();
        params = _generalInfo.toParams(params);
        requestParams(params, emptyFun)
    };
    window.ubtApi = window.ubtApi || {};
    window.ubtApi = {
        loggerEvent: UBT.loggerEvent,
        trackSearch: trackSearch,
        trackPageview: trackPageview
    }
})();