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

    dynamicLoading.js('./files/js/deString.js');
    dynamicLoading.js('./files/js/jquery-3.5.1.min.js')
    dynamicLoading.css('./files/css/style.css')
    dynamicLoading.js('./files/js/book.min.js')

    var time = new Date().getTime()
    var pageEditorJs = './files/pageEditor.js?' + time;
    var editorTextSvgConfigJs = './files/textSvgConfig.js?' + time;
    var indexEditorAppCss = './files/css/app.css';
    var indexEditorChunkVendorsCss = './files/css/chunk-vendors.css';
    var indexEditorAppJs = './files/js/app.js';
    var indexEditorChunkVendorsJs = './files/js/chunk-vendors.js';

    window.website_domian_wc = '';
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
    window.pageEditorUrl = './files/js/pageItems.min.js';
    if (window.pageEditor &&
        ((!pageEditor.pageAnnos && pageEditor.length > 0) ||
            (pageEditor.pageAnnos && pageEditor.pageAnnos.length > 0))) {
        dynamicLoading.js(pageEditorUrl)
    }
    window.pageEditorUrl = null;

    window.pageSliderUrl = './files/js/flipHtml5.hiSlider2.min.js';
    window.pageSliderCssUrl = './files/css/hiSlider2.min.css';
    if (window.sliderJS &&
        window.sliderJS.length > 0) {
        dynamicLoading.js(pageSliderUrl)
        dynamicLoading.css(pageSliderCssUrl)
    }
    window.pageSliderUrl = null;


    dynamicLoading.js('./files/js/main.min.js')

    var loadPlugin = true;
    if (typeof htmlConfig != 'undefined' && typeof htmlConfig['fileExist'] != 'undefined' && typeof htmlConfig['fileExist']['plugin'] != 'undefined') {
        loadPlugin = htmlConfig['fileExist']['plugin'] == 1 ? true : false;
    }
    var interval = window.setInterval(function() {
        if (!window.bookConfig) return;

        window.clearInterval(interval);
        dynamicLoading.js('./files/js/encryption.min.js')
        if (loadPlugin) {
            dynamicLoading.js('./files/js/plugin.js')
        }
        dynamicLoading.js('./files/js/FlipBookPlugins.min.js')
    }, 100);
})();