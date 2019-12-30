window.mobileAndTabletcheck = function() {
  var check = false;
  (function(a) {
    if (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
        a
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        a.substr(0, 4)
      )
    ) {
      check = true;
    }
  })(navigator.userAgent || navigator.vendor || window.opera);
  return check;
};

function getHashParams() {
  var hashParams = {};
  var e,
    a = /\+/g, // Regex for replacing addition symbol with a space
    r = /([^&;=]+)=?([^&;]*)/g,
    d = function(s) {
      return decodeURIComponent(s.replace(a, " "));
    },
    q = window.location.hash.substring(1);

  while ((e = r.exec(q))) hashParams[d(e[1])] = d(e[2]);

  return hashParams;
}

var mobileDevice = window.mobileAndTabletcheck();
var currentSlideIndex = 0;
var slides = $(".content-slide");
var numSlides = slides.length;
var $openFAQ = $(".disclaimer p");
var $openPlan = $(".disclaimer p");
var founderImages = $("#founders .col-sm-5 img");

var firstSlideData = {
  word: "Dreams",
  target: "#first-main-text"
};

var secondSlideData = {
  word: "People",
  target: "#second-main-text"
};

var thirdSlideData = {
  word: "Transparency",
  target: "#third-main-text"
};

var slideData = [firstSlideData, secondSlideData, thirdSlideData];

var allowScrolling = true;
var scrollTop = false;

var allowMobileScrolling = false;
var xDown = null;
var yDown = null;

function showSlide(direction) {
  var $active = $(".content-slide.active");
  var $next = null;
  var finalTopMargin = 0;

  if (direction === "up") {
    if (currentSlideIndex < numSlides - 1) {
      $next = $active.next();
    } else {
      $next = slides.first(".content-slide");
      currentSlideIndex = -1;
    }

    finalTopMargin = "-100vh";
    $next.css("z-index", 10);

    $active.animate({ marginTop: finalTopMargin }, 900, function() {
      $active.css("z-index", 5);
      $active.css("margin-top", 0);
      $active.removeClass("active");
      $next.addClass("active");
    });

    currentSlideIndex++;
  } else {
    if (currentSlideIndex > 0) {
      $next = $active.prev(".content-slide");
    } else {
      $next = slides.last();
      currentSlideIndex = numSlides;
    }

    $next.css("marginTop", "-100vh");
    $next.css("z-index", 12);
    finalTopMargin = "0px";

    $next.animate({ marginTop: finalTopMargin }, 900, function() {
      $active.css("z-index", 5);
      $active.css("margin-top", 0);
      $active.removeClass("active");
      $next.addClass("active");
    });

    currentSlideIndex--;
  }

  var data = slideData[currentSlideIndex];

  $(".changing-text").fadeOut(500, function() {
    $(this)
      .text(data.word)
      .fadeIn();
  });

  if (mobileDevice) {
    var target = $(data.target);

    $(".main-text p").removeClass("active");
    target.addClass("active");
  }
}

function nextSlide() {
  showSlide("up");
}

function prevSlide() {
  showSlide("down");
}

function onScroll(e) {
  scrollTop = $(window).scrollTop();

  if (allowScrolling) {
    var active = $(".main-menu li .active");
    var div = $(active.attr("href"));
    var topOfDiv = $(div).offset().top;
    var bottomOfDiv = topOfDiv + div.outerHeight();

    var divDifference = bottomOfDiv - topOfDiv;
    var treshold = divDifference - $(window).innerHeight();

    if (scrollTop > topOfDiv + treshold) {
      allowScrolling = false;//changes here

      setTimeout(function() {
        $("#menu").css("margin-left", "0");

        var nextHref = active
          .parent()
          .next()
          .find("a");
        var nextDiv = $(nextHref.attr("href"));
//changes
        if (nextDiv.length > 50) {
          $("html, body")
            .stop()
            .animate(
              { scrollTop: nextDiv.offset().top },
              950,
              "swing",
              function() {
                active.removeClass("active");
                nextHref.addClass("active");
                allowScrolling = true;
              }
            );
        } else {
          allowScrolling = true;
        }
      }, 500);
    } else if (scrollTop < topOfDiv - 15) {
      allowScrolling = false;

      setTimeout(function() {
        var prevHref = active
          .parent()
          .prev()
          .find("a");
        var prevDiv = $(prevHref.attr("href"));

        $("html, body")
          .stop()
          .animate(
            { scrollTop: prevDiv.offset().top },
            950,
            "swing",
            function() {
              active.removeClass("active");
              prevHref.addClass("active");
              allowScrolling = true;

              if ($(".main-menu li .active").attr("href") === "#start") {
                $("#menu").css("margin-left", "-100%");
              } else {
                $("#menu").css("margin-left", "0");
              }
            }
          );
      }, 500);
    }
  } else {
    return false;
  }
}

function changeFounder() {
  if ($("#andrew-container").css("margin-left") === "0px") {
    $("#andrew-container").animate({ "margin-left": "-100%" });
  } else {
    $("#andrew-container").animate({ "margin-left": "0px" });
  }
}

function handleTouchStart(evt) {
  xDown = evt.touches[0].clientX;
  yDown = evt.touches[0].clientY;
}

function handleTouchMove(evt) {
  if ($("#start").position().top <= 0 && currentSlideIndex < 2) {
    evt.preventDefault();
  }

  if (!xDown || !yDown) {
    return;
  }

  var xUp = evt.touches[0].clientX;
  var yUp = evt.touches[0].clientY;

  var xDiff = xDown - xUp;
  var yDiff = yDown - yUp;

  if (Math.abs(xDiff) + Math.abs(yDiff) > 150) {
    if (!allowMobileScrolling) {
      if (yDiff > 0) {
        if (currentSlideIndex === 2) {
          setTimeout(function() {
            allowMobileScrolling = true;
          }, 600);

          $("html, body")
            .css("overflow", "visible")
            .promise();
          $("html, body").animate(
            { scrollTop: $("#founders").offset().top },
            950
          );

          return true;
        }

        nextSlide();
      } else {
        if (currentSlideIndex === 0) {
          return;
        }

        prevSlide();
      }
    } else {
      if ($("#start").position().top <= 0) {
        $("html, body").css("overflow", "hidden");
        allowMobileScrolling = false;
        if (currentSlideIndex !== 0) {
          prevSlide();
        }
      }
    }

    xDown = null;
    yDown = null;
  }
}

$(document).ready(function() {
  var hash = getHashParams();

  if (!mobileDevice) {
    $(window).on({
      "DOMMouseScroll mousewheel": onScroll
    });

    if (!jQuery.isEmptyObject(hash)) {
      $("#menu").css("marginLeft", 0);
    }
  } else {
    document.addEventListener("touchstart", handleTouchStart, false);
    document.addEventListener("touchmove", handleTouchMove, false);

    $(".jonathan-button").addClass("hidden");
    $(".andrew-button").addClass("hidden");

    $(".andrew-bio2").removeClass("hidden");
    $("#andrew2").removeClass("hidden");

    $(".andrew-bio").addClass("hidden");
    $("#andrew").addClass("hidden");

    $(".jonathan-bio").removeClass("hidden");

    $(".jonathan-bio span").addClass("hidden");

    $("html, body").css("overflow", "hidden");

    if (!jQuery.isEmptyObject(hash)) {
      $("html, body").css("overflow", "visible");
      allowMobileScrolling = true;
      currentSlideIndex = 2;
    }
  }

  $(".jonathan-button span").click(function() {
    $(".andrew-button").addClass("hidden");
    $(".jonathan-bio").removeClass("hidden");
    $(".andrew-bio").addClass("hidden");
    $("#andrew").addClass("hidden");
  });

  $(".andrew-button span").click(function() {
    $(".jonathan-button").addClass("hidden");
    $(".andrew-bio").removeClass("hidden");
    $(".jonathan-bio").addClass("hidden");
    $("#jonathan").addClass("hidden");
  });

  $("#founders .col-sm-5 span").click(function() {
    $("#andrew").removeClass("hidden");
    $("#jonathan").removeClass("hidden");
    $(".andrew-bio").addClass("hidden");
    $(".jonathan-bio").addClass("hidden");
    $(".andrew-button").removeClass("hidden");
    $(".jonathan-button").removeClass("hidden");
  });

  $(".small-menu").click(function() {
    $("#menu").css("margin-left", "0");
  });
  $(".cross").click(function() {
    $("#menu").css("margin-left", "-100%"); //custoom..........................cross
  });

  $("#menu-toggle").click(function() {
    $("#menu").toggleClass("open");
  });

  $(".menu-content .main-menu li a").click(function() {
    if (mobileDevice) {
      $("#menu").toggleClass("open");
    }

    var $target = $($(this).attr("href"));
    var offset = $target.offset().top;

    var anchor = $(this.hash);

    if (mobileDevice) {
      $("html, body").css("overflow", "visible");
    }

    if ($target === "#start" && !mobileDevice) {
      $("#menu").css("margin-left", "-100%");
    }

    $("html, body").animate({ scrollTop: offset }, 800, "swing", function() {
      $(".menu-content .main-menu li a").removeClass("active");

      allowMobileScrolling = true;

      anchor.addClass("active");
    });
    return false;
  });

  if (!mobileDevice) {
    setInterval(function() {
      nextSlide();
    }, 4000);
  }

  setInterval(function() {
    $.each(founderImages, function(index, image) {
      var src = image.getAttribute("src");

      if (src.indexOf("_01") > 0) {
        src = src.replace("_01", "_02");
      } else {
        src = src.replace("_02", "_01");
      }

      founderImages.fadeOut(1000, function() {
        image.setAttribute("src", src);
        founderImages.fadeIn(1000);
      });
    });
  }, 4000);

  var $faqTile = $(".faqs p");

  $(".faqs .faq-tile").click(function() {
    $faqTile.slideUp();

    if ($openFAQ === null || !$openFAQ.is($(this))) {
      $(this)
        .find("p")
        .slideDown();
      $openFAQ = $(this);
    } else {
      $openFAQ = null;
    }
  });

  var $planTile = $(".plan-tile p");

  $(".plan-tile").click(function() {
    $planTile.slideUp();

    if ($openPlan === null || !$openPlan.is($(this))) {
      $(this)
        .find("p")
        .slideDown();
      $openPlan = $(this);
    } else {
      $openPlan = null;
    }
  });
  /*
  var $planTile = $(".plan-tile p");

  $(".plan-tile ").click(function() {
    $planTile.slideUp();

    if ($openPlan === null || !$openPlan.is($(this))) {
      $(this)
        .find("p")
        .slideDown();
      $openPlan = $(this);
    } else {
      $openPlan = null;
    }
  });
   */

  //custom

  $(".changer a").click(function(e) {
    e.preventDefault();

    if ($(this).is(".active")) {
      $(".changer a").toggleClass("active");
      changeFounder();
    }
  });

  $("#contactForm").submit(function(e) {
    e.preventDefault(); // avoid to execute the actual submit of the form.

    var url = "backend/mailer.php"; // the script where you handle the form input.
    var values = $("#contactForm").serialize();
    var formData = new FormData();

    for (var key in values) {
      formData.append(key, values[key]);
    }

    $.ajax({
      type: "POST",
      url: url,
      data: values, // serializes the form's elements.
      processData: false,
      success: function(data) {
        json = JSON.parse(data);

        if (json.status === "success") {
          $("#contactForm").html(
            "Your message has been sent. Thank you for contacting us."
          );
        } else {
          $("#feedback").html(json.message);
        }
      }
    });
  });
});
