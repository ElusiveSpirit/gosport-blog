(function() {

  var currentTab = location.hash || '#organization';

  var banner      = $('#banner');
  var bannerImage = $('#bannerImage');
  var bannerTitle = $('#banner h1');

  $('.js-tabs').css('display', 'none');

  openTab(currentTab);


  function openTab (tab) {
    $('a[href="' + tab + '"]').parent().addClass('active');
    var currentTabEl = $(tab);
    currentTabEl.css('display', 'block');
    bannerImage.attr('src', currentTabEl.attr('data-src'));

    setTimeout(function runBannerAnimation () {
      try {
        window.animateBanner(banner);
      } catch (e) {
        console.log(window.animateBanner)
        setTimeout(runBannerAnimation, 100);
      }
    }, 100);

    bannerTitle.html(currentTabEl.find('h3').html());
  }

  function closeTab (tab) {
    $(tab).css('display', 'none');
    $('a[href="' + tab + '"]').parent().removeClass('active');
  }

  $('a[data-toggle="pill"]').click(function (event) {
    event.preventDefault();

    var newTab = $(this).attr('href');
    console.log('New tab', newTab);
    closeTab(currentTab);
    openTab(newTab);
    currentTab = newTab;
  });
})();
