function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import { createElement, forwardRef, useRef, useImperativeHandle } from 'rax';
import View from 'rax-view';
import cx from 'classnames';
import Timer from '../timer';
import throttle from '../throttle';
import wrapDefaultProperties from '../utils/wrapDefaultProperties';
import indexStyleSheet from '../index.css';
var _styleSheet = indexStyleSheet;
function _getClassName() {
  var className = [];
  var args = arguments[0];
  var type = Object.prototype.toString.call(args).slice(8, -1).toLowerCase();
  if (type === 'string') {
    args = args.trim();
    args && className.push(args);
  } else if (type === 'array') {
    args.forEach(function (cls) {
      cls = _getClassName(cls).trim();
      cls && className.push(cls);
    });
  } else if (type === 'object') {
    for (var k in args) {
      k = k.trim();
      if (k && args.hasOwnProperty(k) && args[k]) {
        className.push(k);
      }
    }
  }
  return className.join(' ').trim();
}
function _getStyle(classNameExpression) {
  var cache = _styleSheet.__cache || (_styleSheet.__cache = {});
  var className = _getClassName(classNameExpression);
  var classNameArr = className.split(/\s+/);
  var style = cache[className];
  if (!style) {
    style = {};
    if (classNameArr.length === 1) {
      style = _styleSheet[classNameArr[0].trim()];
    } else {
      classNameArr.forEach(function (cls) {
        var value = _styleSheet[cls.trim()];
        if (typeof value === 'object') {
          style = Object.assign(style, _styleSheet[cls.trim()]);
        }
      });
    }
    cache[className] = style;
  }
  return style;
}
var FULL_WIDTH = 750;
var ANIMATION_DURATION = 400;
var STYLE_NODE_ID = 'rax-scrollview-style';
var baseCls = 'rax-scrollview';
var pixelRatio;

/**
 * Scroll to some position method
 * @param scrollerRef the scroll container ref
 * @param x offset x
 * @param y offset y
 * @param animated does it need animated
 * @param duration animate duration
 */
function _scrollTo(scrollerRef, x, y, animated, duration) {
  var scrollView = scrollerRef.current;
  var scrollLeft = scrollView.scrollLeft;
  var scrollTop = scrollView.scrollTop;
  if (animated) {
    var timer = new Timer({
      duration: duration,
      easing: 'easeOutSine',
      onRun: function onRun(e) {
        if (scrollerRef && scrollerRef.current) {
          if (x >= 0) {
            scrollerRef.current.scrollLeft = scrollLeft + e.percent * (x - scrollLeft);
          }
          if (y >= 0) {
            scrollerRef.current.scrollTop = scrollTop + e.percent * (y - scrollTop);
          }
        }
      }
    });
    timer.run();
  } else {
    if (x >= 0) {
      scrollerRef.current.scrollLeft = x;
    }
    if (y >= 0) {
      scrollerRef.current.scrollTop = y;
    }
  }
}
function getPixelRatio() {
  if (pixelRatio) {
    return pixelRatio;
  }
  pixelRatio = document.documentElement.clientWidth / FULL_WIDTH;
  return pixelRatio;
}
function translateToPx(origin) {
  var pixelRatio = getPixelRatio();
  if (typeof origin === 'number') {
    return origin * pixelRatio;
  }
  var matched = /^(\d+)(r{0,1}px){0,1}$/.exec(origin);
  if (matched) {
    if (!matched[2]) {
      return parseInt(matched[1]) * pixelRatio;
    }
    if (matched[2] === 'rpx') {
      return parseInt(matched[1]) * pixelRatio;
    }
    if (matched[2] === 'px') {
      return parseInt(matched[1]);
    }
  }
  return 0;
}
var ScrollView = forwardRef(function (props, ref) {
  var _cx;
  var className = props.className,
    style = props.style,
    horizontal = props.horizontal,
    contentContainerStyle = props.contentContainerStyle,
    disableScroll = props.disableScroll,
    scrollEventThrottle = props.scrollEventThrottle,
    showsHorizontalScrollIndicator = props.showsHorizontalScrollIndicator,
    showsVerticalScrollIndicator = props.showsVerticalScrollIndicator,
    onEndReached = props.onEndReached,
    onEndReachedThreshold = props.onEndReachedThreshold,
    onScroll = props.onScroll,
    children = props.children;
  var lastScrollDistance = useRef(0);
  var lastScrollContentSize = useRef(0);
  var scrollerNodeSize = useRef(0);
  var scrollerRef = useRef(null);
  var contentContainerRef = useRef(null);
  var handleScroll = function (e) {
    if (props.onScroll) {
      var elm = e.target || e.srcElement || {};
      e.nativeEvent = {
        get contentOffset() {
          return {
            x: elm.scrollLeft,
            y: elm.scrollTop
          };
        },
        get contentSize() {
          return {
            width: elm.scrollWidth,
            height: elm.scrollHeight
          };
        }
      };
      onScroll(e);
    }
    if (onEndReached) {
      var scrollerNode = scrollerRef.current;
      if (!scrollerNode) return;
      scrollerNodeSize.current = horizontal ? scrollerNode.offsetWidth : scrollerNode.offsetHeight;
      // NOTE：in iOS7/8 offsetHeight/Width is is inaccurate （ use scrollHeight/Width ）
      var scrollContentSize = horizontal ? scrollerNode.scrollWidth : scrollerNode.scrollHeight;
      var scrollDistance = horizontal ? scrollerNode.scrollLeft : scrollerNode.scrollTop;
      var endReachedThreshold = translateToPx(onEndReachedThreshold);
      var isEndReached = scrollContentSize - scrollDistance - scrollerNodeSize.current < endReachedThreshold;
      var isScrollToEnd = scrollDistance > lastScrollDistance.current;
      var isLoadedMoreContent = scrollContentSize != lastScrollContentSize.current;
      if (isEndReached && isScrollToEnd && isLoadedMoreContent) {
        lastScrollContentSize.current = scrollContentSize;
        props.onEndReached(e);
      }
      lastScrollDistance.current = scrollDistance;
    }
  };
  useImperativeHandle(ref, function () {
    return {
      _nativeNode: scrollerRef.current,
      resetScroll: function resetScroll() {
        lastScrollContentSize.current = 0;
        lastScrollDistance.current = 0;
      },
      scrollTo: function scrollTo(options) {
        var _ref = options || {},
          _ref$x = _ref.x,
          x = _ref$x === void 0 ? 0 : _ref$x,
          _ref$y = _ref.y,
          y = _ref$y === void 0 ? 0 : _ref$y,
          _ref$animated = _ref.animated,
          animated = _ref$animated === void 0 ? true : _ref$animated,
          _ref$duration = _ref.duration,
          duration = _ref$duration === void 0 ? ANIMATION_DURATION : _ref$duration;
        _scrollTo(scrollerRef, translateToPx(x), translateToPx(y), animated, duration);
      },
      scrollIntoView: function scrollIntoView(options) {
        var _ref2 = options || {},
          id = _ref2.id,
          _ref2$animated = _ref2.animated,
          animated = _ref2$animated === void 0 ? true : _ref2$animated,
          _ref2$duration = _ref2.duration,
          duration = _ref2$duration === void 0 ? ANIMATION_DURATION : _ref2$duration,
          offsetX = _ref2.offsetX,
          offsetY = _ref2.offsetY;
        if (!id) {
          throw new Error('Params missing id.');
        }
        var targetElement = document.getElementById(id);
        if (targetElement && contentContainerRef.current) {
          // @NOTE: targetElement's offsetParent is not scrollerRef.current, so do not use
          // offsetLeft/offsetTop to calculate distance.
          var targetRect = targetElement.getBoundingClientRect();
          var contentContainerRect = contentContainerRef.current.getBoundingClientRect();
          var scrollX = targetRect.x - contentContainerRect.x + translateToPx(offsetX);
          var scrollY = targetRect.y - contentContainerRect.y + translateToPx(offsetY);
          _scrollTo(scrollerRef, scrollX, scrollY, animated, duration);
        }
      }
    };
  });
  if (style) {
    var childLayoutProps = ['alignItems', 'justifyContent'].filter(function (prop) {
      return style[prop] !== undefined;
    });
    if (childLayoutProps.length !== 0) {
      console.warn('ScrollView child layout (' + JSON.stringify(childLayoutProps) + ') must be applied through the contentContainerStyle prop.');
    }
  }
  var contentContainer = createElement(View, {
    ref: contentContainerRef,
    className: cx((_cx = {}, _cx[baseCls + "-content-container-horizontal"] = horizontal, _cx[baseCls + "-webcontainer"] = !horizontal, _cx)),
    style: Object.assign({}, _getStyle(cx((_cx = {}, _cx[baseCls + "-content-container-horizontal"] = horizontal, _cx[baseCls + "-webcontainer"] = !horizontal, _cx))), contentContainerStyle)
  }, children);
  var scrollerStyle = _extends({}, style);
  if (scrollerStyle.height === null || scrollerStyle.height === undefined) {
    scrollerStyle.flex = 1;
  }
  var cls = cx(baseCls, baseCls + "-" + (horizontal ? 'horizontal' : 'vertical'), className);
  var showsScrollIndicator = horizontal ? showsHorizontalScrollIndicator : showsVerticalScrollIndicator;
  {
    if (!showsScrollIndicator && typeof document !== 'undefined' && typeof document.getElementById === 'function' && !document.getElementById(STYLE_NODE_ID)) {
      var styleNode = document.createElement('style');
      styleNode.id = STYLE_NODE_ID;
      document.head.appendChild(styleNode);
      styleNode.innerHTML = "." + baseCls + "::-webkit-scrollbar{display: none;}";
    }
    scrollerStyle.WebkitOverflowScrolling = 'touch';
    if (horizontal) {
      // Don't use scrollerStyle.overflow = 'scroll hidden';
      // Multiple keyword syntax for overflow-x and overflow-y is not work in iOS
      // https://caniuse.com/mdn-css_properties_overflow_multiple_keywords
      scrollerStyle.overflowX = 'scroll';
      scrollerStyle.overflowY = 'hidden';
    } else {
      scrollerStyle.overflowX = 'hidden';
      scrollerStyle.overflowY = 'scroll';
    }
    if (disableScroll) {
      scrollerStyle.overflowX = 'hidden';
      scrollerStyle.overflowY = 'scroll';
    }
    var webProps = _extends({}, props);
    delete webProps.onEndReachedThreshold;
    return createElement(View, _extends({}, webProps, {
      ref: scrollerRef,
      className: cls,
      style: Object.assign({}, _getStyle(cls), scrollerStyle),
      onScroll: scrollEventThrottle ? throttle(handleScroll, scrollEventThrottle) : handleScroll
    }), contentContainer);
  }
});
export default wrapDefaultProperties(ScrollView);