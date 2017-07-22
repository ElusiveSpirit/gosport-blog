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
          if (pushState) {
            history.pushState(null, title, href);
          }
          $('#wrapper').html(html);

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
        $this = $(this);

    // Start transitioning.
    $wrapper.addClass('is-transitioning');
    // Redirect.
    window.setTimeout(function() {
      if ($this.attr('target') == '_blank') {
        window.open(href);
      } else {
        loadPage(href)
          .then(function() {
            $wrapper.removeClass('is-transitioning');
            addLinkListeners();
          })
          .catch(function(error) {
            location.href = href;
          })
      }
    }, 500);
  }

  function addLinkListeners() {
    document.querySelectorAll('a').forEach(function(el) {
      el.addEventListener('click', function(event) {
        if (this.href.indexOf('#') !== -1)
          return false

        // Prevent default.
        event.stopPropagation();
        event.preventDefault();

        animatedPageLoading(this.href);
      })
    })
  }

  document.addEventListener('DOMContentLoaded', function() {
    window.onpopstate = function(event) {
      animatedPageLoading(document.location, false);
    };
    addLinkListeners();
  })
})();
