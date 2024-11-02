(function() {
    var dynamicLoading = {
        css: function(path) {
            var head = document.getElementsByTagName('head')[0];
            var link = document.createElement('link');
            link.href = path;
            link.rel = 'stylesheet';
            link.type = 'text/css';
            head.appendChild(link);
        },
        js: function(path, callback, onFailed) {
            var head = document.getElementsByTagName('head')[0];
            var script = document.createElement('script');
            script.src = path;
            script.type = 'text/javascript';
            script.async = false
            script.onload = script.onreadystatechange = function() {
                callback && callback()
            };
            if (onFailed && typeof(onFailed) == "function") {
                script.onerror = onFailed;
            }
            head.appendChild(script);
        },
        type: 'template',
        time: '1717732938'
    }

    dynamicLoading.js('deString.js');
    dynamicLoading.js('jquery-3.5.1.min.js')
    dynamicLoading.css('style.css')
    dynamicLoading.js('book.min.js')

    var time = new Date().getTime()
    var pageEditorJs = './files/pageEditor.js?' + time;
    var editorTextSvgConfigJs = './files/textSvgConfig.js?' + time;
    var indexEditorAppCss = 'app.css';
    var indexEditorChunkVendorsCss = 'chunk-vendors.css';
    var indexEditorAppJs = 'app.js';
    var indexEditorChunkVendorsJs = 'chunk-vendors.js';

    window.website_domian_wc = 'https://fliphtml5.com';
    var loadPageEditorJs = true;
    if (typeof htmlConfig != 'undefined' && typeof htmlConfig['fileExist'] != 'undefined' && typeof htmlConfig['fileExist']['pageEditor'] != 'undefined') {
        loadPageEditorJs = htmlConfig['fileExist']['pageEditor'] == 1 ? true : false;
    }
    if (loadPageEditorJs) {
        dynamicLoading.js(pageEditorJs, function() {
            window.readerConfigLoaded = true;
            if (window.readerConfig &&
                window.readerConfig.pages.length > 0
            ) {
                dynamicLoading.css(indexEditorAppCss)
                dynamicLoading.css(indexEditorChunkVendorsCss)
                dynamicLoading.js(editorTextSvgConfigJs)
                dynamicLoading.js(indexEditorAppJs)
                dynamicLoading.js(indexEditorChunkVendorsJs)
            }
        }, function() {
            window.readerConfigLoaded = true;
        })
    } else {
        window.readerConfigLoaded = true;
    }

    if (window.htmlConfig && window.htmlConfig.pageEditor) window.pageEditor = window.htmlConfig.pageEditor;
    window.pageEditorUrl = 'pageItems.min.js';
    if (window.pageEditor &&
        ((!pageEditor.pageAnnos && pageEditor.length > 0) ||
            (pageEditor.pageAnnos && pageEditor.pageAnnos.length > 0))) {
        dynamicLoading.js(pageEditorUrl)
    }
    window.pageEditorUrl = null;

    window.pageSliderUrl = 'flipHtml5.hiSlider2.min.js';
    window.pageSliderCssUrl = 'hiSlider2.min.css';
    if (window.sliderJS &&
        window.sliderJS.length > 0) {
        dynamicLoading.js(pageSliderUrl)
        dynamicLoading.css(pageSliderCssUrl)
    }
    window.pageSliderUrl = null;


    // window.pageSliderUrl = 'LoadSlider.js';
    // if (window.sliderJS &&
    //     window.sliderJS.length > 0) {
    //     dynamicLoading.js(pageSliderUrl)
    // }
    // window.pageSliderUrl = null;

    dynamicLoading.js('main.min.js')

    var loadPlugin = true;
    if (typeof htmlConfig != 'undefined' && typeof htmlConfig['fileExist'] != 'undefined' && typeof htmlConfig['fileExist']['plugin'] != 'undefined') {
        loadPlugin = htmlConfig['fileExist']['plugin'] == 1 ? true : false;
    }
    var interval = window.setInterval(function() {
        if (!window.bookConfig) return;

        window.clearInterval(interval);
        dynamicLoading.js('encryption.min.js')
        if (loadPlugin) {
            dynamicLoading.js('plugin.js')
        }
        dynamicLoading.js('statistic.js')
        dynamicLoading.js('writeLog.js')
        dynamicLoading.js('visitinfo.js')
        dynamicLoading.js('FlipBookPlugins.min.js')
    }, 100);
})();