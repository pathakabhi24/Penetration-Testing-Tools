/* Copy the below line to your bookmarklet: */
javascript:(function(){MAX_URLS_TO_FETCH = 512; limit_reached = false; function decodeHtml(html) {txt = document.createElement('textarea'); txt.innerHTML = html; return txt.value; } String.prototype.endsWith = function(suffix) {return this.indexOf(suffix, this.length - suffix.length) !== -1; }; function normalizeUri(uri) {if (!uri || uri.length < 1) {return ''; } if(uri.toLowerCase().startsWith('javascript:') || uri.toLowerCase().startsWith('mailto:') || uri.toLowerCase().startsWith('phone:') || uri.toLowerCase().startsWith('tel:') || uri.toLowerCase().startsWith('phone:') || uri.toLowerCase().startsWith('#') ) {return ''; } orig = location.origin; if (uri.startsWith('http') && !uri.startsWith(orig)) {if (uri.substr(uri.indexOf(':')).startsWith(orig.substr(orig.indexOf(':')))) {return uri; } return ''; } if (uri.startsWith(orig)) {return uri; } if (uri.startsWith('//')) {return location.protocol + uri; } if (uri.startsWith('"') || uri.startsWith("'") ) {return ''; } if (!uri.startsWith('/')) {var h = location.href; return h.substr(0, h.lastIndexOf('/') + 1) + uri; } else {return orig + uri; } return ''; } function collectUrls(code) {if (!code || code.length < 64) {return new Array(); } origin = location.origin; arr = new Set(); excluded = ['png', 'bmp', 'ico', 'jpeg', 'jpg', 'tiff', 'woff', 'css', 'gif']; askedAlready = false; includeLogouts = false; logoutRex = /.*wylog|signoff|signout|exit|logout|logoff|byebye.*$/i; rexes = [/(?:href|src|action)="([^"]+)"/gi, /(?:href|src|action)='([^']+)'/gi, /'((?:https?:\/\/)?(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b(?:[-a-zA-Z0-9@:%_\+\".~#?&\/\/=]*))'/gi, /"((?:https?:\/\/)?(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b(?:[-a-zA-Z0-9@:%_\+'.~#?&\/\/=]*))"/gi, /((?:https?:\/\/)(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b(?:[-a-zA-Z0-9@:%_\+.~#?&\/\/=]*))/gi ]; n = rexes.length; for (var i = 0; i < rexes.length; i++) {r = new RegExp(rexes[i]); match = r.exec(code); while (match != null) {uri2 = ''; if (typeof match[1] !== 'undefined') uri2 += match[1]; if (typeof match[2] !== 'undefined') uri2 += match[2]; if (typeof match[3] !== 'undefined') uri2 += match[3]; uri = decodeHtml(uri2) || uri2; uri = normalizeUri(uri); in_scope_wo_scheme = uri.substr(uri.indexOf(':')).startsWith(orig.substr(orig.indexOf(':'))); if(uri.startsWith(orig) != in_scope_wo_scheme) {uri = location.protocol + uri.substr(uri.indexOf(':')+1); } if (uri && uri.length > 0 && uri.startsWith(orig)) {good = true; excluded.forEach(function(ext) {if (uri.endsWith(ext)) {good = false; } else if (logoutRex.test(uri)) {if (!askedAlready) {askedAlready = true; if (confirm('Logout URL has been found, do you want to issue it as well?')) {includeLogouts = true; } } good = includeLogouts; } }); if(good) {arr.add(uri); if(arr.size > MAX_URLS_TO_FETCH) {if(!limit_reached) {alert('Parsed maximum number of URLs: ' + MAX_URLS_TO_FETCH + '. Skipping the rest...'); limit_reached = true; } return arr; } } } else if (uri.length > 0) {console.log('Skipping: ' + uri); } match = r.exec(code); } } return arr; } function fetchUrls(arr) {if(arr.size < 1) {return false; } var i = 0; arr.forEach(function(uri){i += 1; console.log('Requesting #' + i + ': "' + uri + '"'); xhr = new XMLHttpRequest(); xhr.open('get', uri, true); xhr.send(); }); return i; } html = document.documentElement.innerHTML; urls = collectUrls(html); len = fetchUrls(urls); alert('Asynchronously requested ' + len + ' URLs.'); xhr = new XMLHttpRequest(); xhr.onload = function() {if(xhr.readyState == xhr.DONE && xhr.status == 200) {console.log('Got sitemap.xml. Parsing...'); urls2 = collectUrls(this.responseText); len2 = fetchUrls(urls2); alert('Fetched ' + len2 + ' URLs from sitemap.xml'); } }; xhr.open('GET', location.origin + '/sitemap.xml', true); xhr.responseType = 'text'; xhr.send(); })()


/* Full code:
javascript:(function(){

  MAX_URLS_TO_FETCH = 512;
  limit_reached = false;

  function decodeHtml(html) {
    txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  }

  String.prototype.endsWith = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
  };

  function normalizeUri(uri) {
    if (!uri || uri.length < 1) { 
      return '';
    }

    if(uri.toLowerCase().startsWith('javascript:')
      || uri.toLowerCase().startsWith('mailto:')
      || uri.toLowerCase().startsWith('phone:')
      || uri.toLowerCase().startsWith('tel:')
      || uri.toLowerCase().startsWith('phone:')
      || uri.toLowerCase().startsWith('#')
    ) {
      return '';
    }

    orig = location.origin;
    if (uri.startsWith('http') && !uri.startsWith(orig)) {
      if (uri.substr(uri.indexOf(':')).startsWith(orig.substr(orig.indexOf(':')))) {
        return uri;
      }
      return '';
    }
    if (uri.startsWith(orig)) {
      return uri;
    }
    if (uri.startsWith('//')) {
      return location.protocol + uri;
    }
    if (uri.startsWith('"') || uri.startsWith("'") ) {
      return '';
    }
    if (!uri.startsWith('/')) {
      var h = location.href;
      return h.substr(0, h.lastIndexOf('/') + 1) + uri;
    }
    else {
      return orig + uri;
    }
    return '';
  }

  function collectUrls(code) {
    if (!code || code.length < 64) {
      return new Array();
    }

    origin = location.origin;
    arr = new Set();
    excluded = ['png', 'bmp', 'ico', 'jpeg', 'jpg', 'tiff', 'woff', 'css', 'gif'];
    askedAlready = false;
    includeLogouts = false;
    logoutRex = /.*wylog|signoff|signout|exit|logout|logoff|byebye.*$/i;

    rexes = [
      /(?:href|src|action)="([^"]+)"/gi,
      /(?:href|src|action)='([^']+)'/gi,
      /'((?:https?:\/\/)?(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b(?:[-a-zA-Z0-9@:%_\+\".~#?&\/\/=]*))'/gi,
      /"((?:https?:\/\/)?(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b(?:[-a-zA-Z0-9@:%_\+'.~#?&\/\/=]*))"/gi,
      /((?:https?:\/\/)(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b(?:[-a-zA-Z0-9@:%_\+.~#?&\/\/=]*))/gi
    ];

    n = rexes.length;
    for (var i = 0; i < rexes.length; i++) {

      r = new RegExp(rexes[i]);
      match = r.exec(code);

      while (match != null) {

        uri2 = '';
        if (typeof match[1] !== 'undefined') uri2 += match[1];
        if (typeof match[2] !== 'undefined') uri2 += match[2];
        if (typeof match[3] !== 'undefined') uri2 += match[3];

        uri = decodeHtml(uri2) || uri2;
        uri = normalizeUri(uri);

        in_scope_wo_scheme = uri.substr(uri.indexOf(':')).startsWith(orig.substr(orig.indexOf(':')));
        if(uri.startsWith(orig) != in_scope_wo_scheme) {
          uri = location.protocol + uri.substr(uri.indexOf(':')+1);
        }

        if (uri && uri.length > 0 && uri.startsWith(orig)) {
          good = true;
          excluded.forEach(function(ext) {
            if (uri.endsWith(ext)) {
              good = false;
            } else if (logoutRex.test(uri)) {
              if (!askedAlready) {
                askedAlready = true;
                if (confirm('Logout URL has been found, do you want to issue it as well?')) {
                  includeLogouts = true;
                }
              }
              good = includeLogouts;
            }
          });

          if(good) {
            arr.add(uri);

            if(arr.size > MAX_URLS_TO_FETCH) {
              if(!limit_reached) {
                alert('Parsed maximum number of URLs: ' + MAX_URLS_TO_FETCH + '. Skipping the rest...');
                limit_reached = true;
              }
              return arr;
            }
          }
        }
        else if (uri.length > 0) {
          console.log('Skipping: ' + uri);
        }
        match = r.exec(code);
      }
    }
    return arr;
  }

  function fetchUrls(arr) {
    if(arr.size < 1) {
      return false;
    }

    var i = 0;
    arr.forEach(function(uri){
      i += 1;
      console.log('Requesting #' + i + ': "' + uri + '"');
      xhr = new XMLHttpRequest();
      xhr.open('get', uri, true);
      xhr.send();
    });
    return i;
  }

  html = document.documentElement.innerHTML;
  urls = collectUrls(html);
  len = fetchUrls(urls);
  alert('Asynchronously requested ' + len + ' URLs.');

  xhr = new XMLHttpRequest();
  xhr.onload = function() {
    if(xhr.readyState == xhr.DONE && xhr.status == 200) {
      console.log('Got sitemap.xml. Parsing...');
      urls2 = collectUrls(this.responseText);
      len2 = fetchUrls(urls2);

      alert('Fetched ' + len2 + ' URLs from sitemap.xml');
    }
  };
  xhr.open('GET', location.origin + '/sitemap.xml', true);
  xhr.responseType = 'text';
  xhr.send();

})()
*/