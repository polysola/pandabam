var app = app || {};
let scrollTop, scrollLeft = 0;

app.init = function () {
	app.accordion();
	app.showMenu();
	app.tokenHover();
	app.anchorLink();
};
app.tokenHover = function () {
	$(".token-area__image area").hover(
		function () {
			var tokenId = $(this).attr('href').substring(1);
			$('.item[data-token="' + tokenId + '"]').addClass('active'); 
			$('.token-head__item[data-token="' + tokenId + '"]').addClass('active'); 
			$('.token-head__item.primary').addClass('hide'); 
			$('.token-info').addClass('show'); 
			$('.token-info__item[data-token="' + tokenId + '"]').addClass('active'); 
		},
		function () {
			var tokenId = $(this).attr('href').substring(1);
			$('.item[data-token="' + tokenId + '"]').removeClass('active'); 
			$('.token-head__item[data-token="' + tokenId + '"]').removeClass('active'); 
			$('.token-head__item.primary').removeClass('hide'); 
			$('.token-info').removeClass('show'); 
			$('.token-info__item[data-token="' + tokenId + '"]').removeClass('active'); 
		}
	);
	if($("area").length) {

		$('area').imageMapResize();
	}
}
app.accordion = function () {
	$('.js-accordion dt').click(function () {
		$(this).next().slideToggle();
		$(this).toggleClass('active');
	});
}
app.showMenu = function () {
	let menuBtn = $(".js-show-menu"),
		header = $(".header-box");

	menuBtn.on("click", function () {
		const m = $(this);
		if (m.hasClass("is-active")) {
			app.resumeScroll();
			m.removeClass("is-active");
			header.removeClass("is-active");
		} else {
			app.stopScroll()
			m.addClass("is-active");
			header.addClass("is-active");
		}
	});
	$(".header-menu__item a").click(function () {
		app.resumeScroll();
		$(".js-show-menu").removeClass("is-active");
		header.removeClass("is-active");
	});
	$(document).on("click", function (e) {
		if (!$(e.target).closest(".header-box, .js-show-menu").length) {
			app.resumeScroll();
			$(".js-show-menu").removeClass("is-active");
			header.removeClass("is-active");
		}
	});
	$(window).on("scroll", function () {
		let scrollTop = $(this).scrollTop();
		if (scrollTop > 100) {
			$(".header").addClass("is-active");
		} else {
			$(".header").removeClass("is-active");
		}
	});
};

app.anchorLink = function () {
	$('.anchor-link').click(function () {
		var headerHeight = $('.header').outerHeight() + 30;
		if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			if (target.length) {
				$('html,body').animate({
					scrollTop: target.offset().top - headerHeight
				}, 1000);
				return false;
			}
		}
	});
}

app.stopScroll = function () {
	scrollTop = $(window).scrollTop();
	scrollLeft = $(window).scrollLeft();
	$("html")
		.addClass("noscroll")
		.css("top", -scrollTop + "px");
};

app.resumeScroll = function () {
	$("html").removeClass("noscroll");
	$(window).scrollTop(scrollTop);
	$(window).scrollLeft(scrollLeft);
};

$(document).ready(function () {
	$('.page-top a').click(function () {
		$('html, body').animate({ scrollTop: 0 });
		return false;
	});

	app.init();
});