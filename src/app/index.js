/**
 * @file  JavaScript entry point of the project
 */

// Import the whole Bootstrap JS bundle
import 'bootstrap';

// Or import only what you need to keep your vendor bundle small
// import 'bootstrap/js/dist/util';
// import 'bootstrap/js/dist/dropdown';

// Import polyfills
import {applyPolyfills} from './base/polyfills';

// Import methods from the base module
import {consoleErrorFix, ieViewportFix} from './base/base';

// Import our Sass entrypoint to create the CSS app bundle
import '../assets/scss/index.scss';

$(async () => {
	// Wait with further execution until needed polyfills are loaded.
	await applyPolyfills();

	consoleErrorFix();
	ieViewportFix();


  $.ajaxPrefilter( function (options) {
      if (options.crossDomain && jQuery.support.cors) {
        var http = (window.location.protocol === 'http:' ? 'http:' : 'https:');
        options.url = http + '//cors-anywhere.herokuapp.com/' + options.url;
      //options.url = "http://cors.corsproxy.io/url=" + options.url;
    }
  });

  $.get(
    "https://cagnotte.me/201-margaux-30-ans-a-l-etang",
    function (response) {
      let price = $(response).find('.collected-amount-label').text()
      let others = $("#others").text()

      $( "#cagnotte" ).html( price );

      price = parseInt(price, 10)
      price += parseInt(others, 10)

      $(".gift").each(function() {
        const itemPrice = parseInt($(this).find('.price').text(), 10)
        const progress = $(this).find('.progress')
        if(price <= 0) return
        if(itemPrice <= price) {
          price -= itemPrice
          progress.width('100%').text('100%')
          $(this).addClass('bg-success done')
        } else {
          const percent = Math.floor((price / itemPrice) * 100)
          progress.width(percent+'%').text(percent+'%')
          price -= itemPrice
        }
      })


    });

});
