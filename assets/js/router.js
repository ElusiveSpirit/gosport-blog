/*
 *
 * Licensed under the MIT:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright (c) 2017, Konstantin Manyakhin
 */
(function() {
  function loadPage (href, pushState=true) {
    return new Promise(function(resolve, reject) {
      axios.get(href)
        .then(function(response) {
          console.log('New url: ' + href);

          var el = document.createElement('html');
          el.innerHTML = response.data;
          title = $('title', el).html();
          html = $('#wrapper', el).html();
          document.title = title;
          if (pushState) {
            history.pushState(null, title, href);
          }

          ga('set', 'page', location.pathname);
          ga('send', 'pageview');

          $('#wrapper').html(html);

          addthis.layers.refresh();

          window.scrollTo(0, 0);
          resolve();
        })
        .catch(function(error) {
          reject(error);
        })
    });
  }

  function animatedPageLoading(href, pushState=true) {
    var $wrapper = $('#wrapper'),
        $menu = $('#menu'),
        $this = $(this),
        timeout = 500;

    if ($this.attr('target') == '_blank') {
      window.open(href);
      return;
    }
    // Start transitioning.
    if (!$this.hasClass('menu-link')) {
      // If not a menu link
      $wrapper.addClass('is-transitioning');
    } else {
      timeout = 4;
    }
    // Redirect.
    window.setTimeout(function() {
      removeLinkListeners();
      loadPage(href, pushState)
        .then(function() {
          $wrapper.removeClass('is-transitioning');

          pageScripts.all();
          addLinkListeners();
        })
        .catch(function(error) {
          location.href = href;
        })
    }, timeout);
  }

  function linkListener(event) {
    if (this.href.indexOf('#') !== -1 || !this.href || this.href === '')
      return false

    // Prevent default.
    event.preventDefault();
    try {
      animatedPageLoading.bind(this)(this.href);
    } catch (e) {
      location.href = this.href;
    }
  }

  function addLinkListeners() {
    document.querySelectorAll('a').forEach(function(el) {
      el.addEventListener('click', linkListener)
    })
  }

  function removeLinkListeners() {
    document.querySelectorAll('a').forEach(function(el) {
      el.removeEventListener('click', linkListener)
    })
  }

  document.addEventListener('DOMContentLoaded', function() {
    window.onpopstate = function(event) {
      animatedPageLoading(document.location, false);
    };
    addLinkListeners();
  })
})();
