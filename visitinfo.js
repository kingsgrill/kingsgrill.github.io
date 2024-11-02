function show_guanggao_fn(a) {
    var b, c = [{
            name: "fh_small",
            link: "https://fliphtml5.com?gad",
            mgName: "mango_small",
            mgLink: "https://mangoanimate.com/ai?utm_source=ad&utm_medium=small-banner&utm_campaign=mangoai",
            width: 320,
            height: 50,
            googleAd: '<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script> <ins class="adsbygoogle" style="display:inline-block;width:320px;height:50px" data-ad-client="ca-pub-9840740068404348" data-ad-slot="2711178962"></ins> <script> (adsbygoogle = window.adsbygoogle || []).push({}); </script>'
        }, {
            name: "fh_middle",
            link: "https://fliphtml5.com?gad",
            mgName: "mango_middle",
            mgLink: "https://mangoanimate.com/ai?utm_source=ad&utm_medium=middle-banner&utm_campaign=mangoai",
            width: 468,
            height: 60,
            googleAd: '<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script> <ins class="adsbygoogle" style="display:inline-block;width:468px;height:60px" data-ad-client="ca-pub-9840740068404348" data-ad-slot="3498836391"></ins> <script> (adsbygoogle = window.adsbygoogle || []).push({}); </script>'
        }, {
            name: "fh_large",
            link: "https://fliphtml5.com?gad",
            mgName: "mango_large",
            mgLink: "https://mangoanimate.com/ai?utm_source=ad&utm_medium=large-banner&utm_campaign=mangoai",
            width: 728,
            height: 90,
            googleAd: '<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script><ins class="adsbygoogle" style="display:inline-block;width:728px;height:90px" data-ad-client="ca-pub-9840740068404348" data-ad-slot="8863807747"></ins> <script> (adsbygoogle = window.adsbygoogle || []).push({}); </script>'
        }],
        d = $(window).width(),
        e = 0;
    d >= 1e3 ? e = 2 : 1e3 > d && d >= 600 && (e = 1), a || (visit_select_ad = e), b = c[visit_select_ad];
    var f = 0,
        g = !1,
        h = 25,
        i = 8,
        j = 0,
        k = 0;
    if ("object" == typeof toolBar && "function" == typeof toolBar.getBottomHeight && !a) {
        var l = 0,
            f = toolBar.getBottomHeight(!0);
        "undefined" == typeof isPhone || "undefined" == typeof isPad || (isPhone() || isPad()) && (l = toolBar.getTopHeight(!0)), g = !0, h = f + i / 2;
        var m = h + i / 2 + b.height,
            n = j + b.height + i;
        j = bookConfig.bottomMargin || 0, k = bookConfig.topMargin || 0, visit_old_buttonMargin = j, visit_old_topMargin = k, visit_hasBar = g, visit_bottom = h, bookConfig.bottomMargin = Math.max(m, n), bookConfig.topMargin = Math.max(k, l), onStageResize()
    }
    var o;
    "localhost" == location.host ? o = "/visit/" + b.name + ".png" : (o = "//static.fliphtml5.com/book/banner/" + b.name + ".png", o = "" + b.mgName + ".png");
    var p = $("body"),
        q = $("<div class='fh5---banner---container'></div>").css({
            display: "none",
            zIndex: 99999,
            position: "fixed",
            width: b.width + "px",
            maxWidth: "100%",
            height: b.height + "px",
            left: "50%",
            marginLeft: -b.width / 2,
            bottom: visit_bottom,
            border: "1px solid #181818",
            background: "white"
        }),
        r = $("<div>Ads</div>").css({
            position: "absolute",
            left: "0",
            bottom: "100%",
            background: "white",
            border: "1px solid gray",
            color: "gray",
            padding: "2px 6px",
            fontSize: "13px",
            lineHeight: "13px",
            marginBottom: "2px"
        }),
        s = $("<div style=''></div>").css({
            cursor: "pointer",
            position: "absolute",
            width: 22,
            height: 22,
            cursor: "pointer",
            background: "url(Vector.svg) 1px 1px no-repeat",
            left: "95%",
            top: "-6px",
            marginLeft: "2px",
            zIndex: 999999
        });
    $(".fh5---banner---container").length > 0 && $(".fh5---banner---container").remove(), q.append(s), 1 != visit_ad_flag && q.append(r);
    var t = $("<a href='" + b.mgLink + "' target='_blank'><img src='" + o + "' alt='' /></a>").css({
        position: "absolute",
        width: "100%",
        height: "100%"
    });
    a ? (1 == visit_ad_flag ? q.append(t).appendTo(p) : "undefined" == typeof isPhone || "undefined" == typeof isPad ? q.append($(b.googleAd)).appendTo(p) : isPhone() || isPad() ? (b = c[0], q.append($(b.googleAd)).appendTo(p)) : q.append($(b.googleAd)).appendTo(p), q.height(b.height).fadeIn(100), s.on("click", function() {
        q.remove(), $(".fh5---banner---container").remove(), visit_hasBar && (bookConfig.bottomMargin = visit_old_buttonMargin, bookConfig.topMargin = visit_old_topMargin, onStageResize())
    })) : (1 == visit_ad_flag ? q.append(t).appendTo(p) : "undefined" == typeof isPhone || "undefined" == typeof isPad ? q.append($(b.googleAd)).appendTo(p) : isPhone() || isPad() ? (b = c[0], q.append($(b.googleAd)).appendTo(p)) : q.append($(b.googleAd)).appendTo(p), setTimeout(function() {
        q.height(b.height).fadeIn(400)
    }, 2e3), s.on("click", function() {
        q.remove(), $(".fh5---banner---container").remove(), g && (bookConfig.bottomMargin = j, bookConfig.topMargin = k, onStageResize())
    }))
}

function visit_flip_page(a, b, c) {
    b != c && 1 == visit_load_flag && (visit_flip_count++, visit_flip_count >= 5 && (show_guanggao_fn($(".fh5---banner---container").length <= 0 ? !1 : !0), visit_flip_count = 0))
}
var visitDate = new Date,
    visitTime = String(Math.floor(visitDate.getTime() / 1e3)),
    visitCode = visitTime.concat(String(Math.floor(10 * Math.random() + 1) - 1)).concat(String(Math.floor(10 * Math.random() + 1) - 1)).concat(String(Math.floor(10 * Math.random() + 1) - 1)).concat(String(Math.floor(10 * Math.random() + 1) - 1)),
    parser = document.createElement("a");
parser.href = window.location.href.replace("s3.amazonaws.com/", "");
var urlHost = parser.host && parser.host.toLowerCase(),
    visitUrl = parser.pathname && parser.pathname,
    visitUrls = visitUrl.split("/"),
    visit_flip_count = 0,
    visit_load_flag = 0,
    visit_ad_flag = 0,
    visit_select_ad = 0,
    visit_hasBar = !1,
    visit_old_buttonMargin = 0,
    visit_old_topMargin = 0,
    visit_bottom = 0;
setTimeout(function() {
    visitUrls.length >= 4 && "online.fliphtml5.com" == urlHost && $.getScript("../getuserinfo.js").done(function() {
        if ("undefined" != typeof userInfo) {
            var a = userInfo.user_type;
            visit_ad_flag = userInfo.disable_ad
        } else {
            var a = user_type;
            visit_ad_flag = disable_ad
        }
        0 == a && (visit_load_flag = 1, show_guanggao_fn(!1))
    }).fail(function() {})
}, 2e3), $(document).ready(function() {});