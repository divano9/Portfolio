$(document).ready(function(){
    
    //Animation
     function animation() {
        var windowHeight = $(window).height();
        var scroll = $(window).scrollTop();
        $('.animation').each(function () {
            var pozicija = $(this).offset().top;
            var animacija = $(this).attr('data-animation');
            if (pozicija < scroll + windowHeight - 100) {
                $(this).addClass(animacija);
            }
        });
    }

    animation();
    $(window).scroll(function () {
        animation();
    });
    
    
        
    $('.toggle-menu').click(function(){
        $('.menu-overlay').fadeIn();
        $('.menu').addClass('active');
        $('body').addClass('inactive');
    });
    
    
    $('.menu-overlay, .fa-close').click(function(){
        $('.menu-overlay').fadeOut();
        $('.menu').removeClass('active');
        $('body').removeClass('inactive');
    });
    
});


     /* === ) Mini grid === */
$(window).on('resize', function() {
	minigrid({ container: '.masonery', item: '.masonery > *', gutter: 0});
});
	var transformProp;
	var loaded;

	(function () {
		var style = document.createElement('a').style;
		var prop;
		if (style[prop = 'webkitTransform'] !== undefined) {
			transformProp = prop;
		}
		if (style[prop = 'msTransform'] !== undefined) {
			transformProp = prop;
		}
		if (style[prop = 'transform'] !== undefined) {
			transformProp = prop;
		}
	}());

	function minigrid(props) {
		var containerEle = props.container instanceof Node ?
			props.container : document.querySelector(props.container);

		if (!containerEle) {
			return false;
		}

		var itemsNodeList = props.item instanceof NodeList ?
			props.item : containerEle.querySelectorAll(props.item);
		if (!itemsNodeList || itemsNodeList.length === 0) {
			return false;
		}

		if (!props.containerLoaded || typeof props.containerLoaded !== 'string') {
			props.containerLoaded = false;
		}

		if (!props.containerLoaded || typeof props.itemLoaded !== 'string') {
			props.itemLoaded = false;
		}

		if (loaded || props.skipWindowOnLoad) {
			init(containerEle, itemsNodeList, props);
			return;
		}

		if (/webkit/.test(navigator.userAgent.toLowerCase())) {
			window.addEventListener('load', function(){
				init(containerEle, itemsNodeList, props);
			});
		} else {
			window.onload = function() {
				init(containerEle, itemsNodeList, props);
			};
		}
	}

	function init(containerEle, itemsNodeList, props) {
		if (props.containerLoaded) {
			containerEle.classList.add(props.containerLoaded);
		} else if (!/loaded/.test(containerEle.className)) {
			containerEle.classList.add(containerEle.className.split(' ')[0] + '--loaded');
		}

		loaded = true;

		var gutter = (
			typeof props.gutter === 'number' &&
			isFinite(props.gutter) &&
			Math.floor(props.gutter) === props.gutter
		) ? props.gutter : 0;
		var done = props.done;

		containerEle.style.width = '';

		var forEach = Array.prototype.forEach;
		var containerWidth = containerEle.getBoundingClientRect().width;
		var firstChildWidth = itemsNodeList[0].getBoundingClientRect().width + gutter;
		var cols = Math.max(Math.floor((containerWidth - gutter) / firstChildWidth), 1);
		var count = 0;

		var itemsGutter = [];
		var itemsPosX = [];

		for ( var g = 0 ; g < cols ; ++g ) {
			itemsPosX.push(g * firstChildWidth + gutter);
			itemsGutter.push(gutter);
		}

		forEach.call(itemsNodeList, function (item) {
			var itemIndex = itemsGutter
			.slice(0)
			.sort(function (a, b) {
				return a - b;
			})
			.shift();
			itemIndex = itemsGutter.indexOf(itemIndex);

			var posX = Math.round(itemsPosX[itemIndex]);
			var posY = Math.round(itemsGutter[itemIndex]);

			item.style.position = 'absolute';
			item.style.webkitBackfaceVisibility = item.style.backfaceVisibility = 'hidden';
			if (props.itemLoaded) {
				item.classList.add(props.itemLoaded);
			} else if (!/loaded/.test(item.className)) {
				item.classList.add(item.className.split(' ')[0] + '--loaded');
			}

			if (!props.animate && transformProp) {
				item.style[transformProp] = 'translate3D(' + posX + 'px,' + posY + 'px, 0)';
			}

			itemsGutter[itemIndex] += item.getBoundingClientRect().height + gutter;
			count = count + 1;

			if (props.animate) {
				return props.animate(item, posX, posY, count);
			}

		});

		var containerHeight = itemsGutter
			.slice(0)
			.sort(function (a, b) {
				return a - b;
			})
			.pop();

		containerEle.style.height = containerHeight + 'px';

		if (typeof done === 'function') {
			done(itemsNodeList);
		}
	}

	minigrid({ container: '.masonery', item: '.masonery > *', gutter: 0});