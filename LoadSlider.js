var dynamicLoading = {
    css: function (path) {
      var head = document.getElementsByTagName('head')[0];
      var link = document.createElement('link');
      link.href = path;
      link.rel = 'stylesheet';
      link.type = 'text/css';
      head.appendChild(link);
    },
    js: function (path, callback) {
      var head = document.getElementsByTagName('head')[0];
      var script = document.createElement('script');
      script.src = path;
      script.type = 'text/javascript';
      script.async = false;
      script.onload = script.onreadystatechange = function () {
        callback && callback();
      };
      head.appendChild(script);
    },
    type: 't2021082401',
    time: new Date().getTime()
  };
  
  dynamicLoading.css('hiSlider2.min.css');
  dynamicLoading.js('flipHtml5.hiSlider2.min.js');