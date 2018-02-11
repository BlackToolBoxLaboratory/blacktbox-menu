'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CONTENT_HEIGHT = 30;
var menuThis = void 0;

function MenuInfoObj(obj) {
  var _this = this;

  this['index'] = '';
  this['name'] = '';
  this['children'] = [];
  this['defaultCollapse'] = true;
  Object.keys(obj).map(function (key) {
    _this[key] = obj[key];
  });

  if ('' == this['name']) {
    this['name'] = this['index'];
  };
};

var Menu = function (_React$Component) {
  _inherits(Menu, _React$Component);

  function Menu(props) {
    _classCallCheck(this, Menu);

    var _this2 = _possibleConstructorReturn(this, (Menu.__proto__ || Object.getPrototypeOf(Menu)).call(this, props));

    _this2.env = {
      menuArr: [],
      styleObj: {},
      inputRefFn: function inputRefFn() {},
      acticveIndex: '',
      itemOnClickFn: function itemOnClickFn() {},
      featureCollapsible: {
        enable: false,
        customCollapseButton: '',
        itemOnCollapseFn: function itemOnCollapseFn() {}
      }
    };
    _this2.val = {
      hasFoundActive: false,
      hasFoundActiveTop: false
    };
    _this2.collapseStatusList = {};
    return _this2;
  }

  _createClass(Menu, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.updateENVFn(this.props);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.updateENVFn(nextProps);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      this.val.hasFoundActive = false;
      this.val.hasFoundActiveTop = false;
      var content = [];
      var menuArr = this.env.menuArr;
      var nextLayer = 0;
      var itemCount = menuArr.length;
      menuArr.map(function (item) {
        itemCount += _this3.countRecursionFn(item);
      });
      var props_menu = this.createBasicProps('btb-menu');
      if (this.props.className) {
        props_menu.className += ' ' + this.props.className;
      };
      var content_height = parseInt(!this.env.styleObj['item-content'] ? CONTENT_HEIGHT : this.env.styleObj['item-content']['height'] ? this.env.styleObj['item-content']['height'] : this.env.styleObj['item-content']['line-height'] ? this.env.styleObj['item-content']['line-height'] : CONTENT_HEIGHT);
      props_menu.style['height'] = itemCount * content_height;
      var props_layer = this.createBasicProps('menu-layer');
      var layerNextName = 'layer-' + nextLayer;
      props_layer.className += ' ' + layerNextName;
      if (this.env.styleObj[layerNextName]) {
        Object.keys(this.env.styleObj[layerNextName]).map(function (config) {
          props_layer.style[config] = _this3.env.styleObj[layerNextName][config];
        });
      };
      content.push(_react2.default.createElement(
        'div',
        _extends({}, props_menu, { ref: function ref(_ref) {
            _this3._refHandler(_ref);
          } }),
        _react2.default.createElement(
          'ul',
          props_layer,
          menuArr.map(function (item) {
            var content_menu = [];
            content_menu.push(_this3.menuRenderFn(item, nextLayer));
            return content_menu;
          })
        )
      ));
      return content;
    }
  }, {
    key: 'updateENVFn',
    value: function updateENVFn(source) {
      var _this4 = this;

      this.env = {
        menuArr: [],
        acticveIndex: '',
        styleObj: {},
        itemOnClickFn: function itemOnClickFn() {},
        inputRefFn: function inputRefFn() {},
        featureCollapsible: {
          enable: false,
          customCollapseButton: '',
          itemOnCollapseFn: function itemOnCollapseFn() {}
        }
      };
      var isChanged = source['acticveIndex'] && source['acticveIndex'] != this.env['acticveIndex'] ? true : false;
      Object.keys(source).map(function (entry) {
        switch (entry) {
          case 'featureCollapsible':
            Object.keys(source.featureCollapsible).map(function (collapse_entry) {
              _this4.env.featureCollapsible[collapse_entry] = source.featureCollapsible[collapse_entry];
            });
            break;
          default:
            _this4.env[entry] = source[entry];
            break;
        };
      });
      menuThis = this;

      var menuArr = this.env.menuArr;
      menuArr.map(function (item) {
        var infoObj = new MenuInfoObj(item);
        _this4.initCollapseStautsFn(infoObj);
        if (isChanged) {
          _this4.expandRecursionFn(infoObj);
        }
      });
    }
  }, {
    key: 'initCollapseStautsFn',
    value: function initCollapseStautsFn(source) {
      var infoObj = new MenuInfoObj(source);
      if (0 < infoObj.children.length && 'undefined' == typeof this.collapseStatusList[infoObj.index]) {
        this.collapseStatusList[infoObj.index] = menuThis.env.featureCollapsible.enable ? infoObj.defaultCollapse : false;
      };

      for (var i = 0; i < infoObj.children.length; i++) {
        this.initCollapseStautsFn(infoObj.children[i]);
      };
    }
  }, {
    key: 'createBasicProps',
    value: function createBasicProps(name) {
      var obj = {
        className: name,
        style: this.env.styleObj[name] ? this.env.styleObj[name] : {}
      };
      return obj;
    }
  }, {
    key: 'menuRenderFn',
    value: function menuRenderFn(source, layerCounter) {
      var _this5 = this;

      var infoObj = new MenuInfoObj(source);
      var content = [];
      var isMatch = false;
      var hasChildren = 0 < infoObj.children.length ? true : false;
      var layerPaddingLeft = layerCounter * 15;
      var nextLayer = layerCounter + 1;
      var props_item = this.createBasicProps('layer-item');
      if (!this.val.hasFoundActive) {
        if (this.env.acticveIndex == infoObj.index) {
          props_item.className += ' active';
          this.val.hasFoundActive = true;
          isMatch = true;
        } else {
          if (hasChildren && this.searchRecursionFn(infoObj)) {
            props_item.className += ' activeParent';
            isMatch = true;
          };
        };
        if (isMatch && !this.val.hasFoundActiveTop) {
          props_item.className += ' activeTop';
          this.val.hasFoundActiveTop = true;
        };
      };
      var props_content = this.createBasicProps('item-content');
      props_content.style['padding-left'] = layerPaddingLeft;
      props_content.onClick = function (event) {
        _this5._itemOnClickHandler(event, infoObj);
      };
      var props_name = this.createBasicProps('content-name');
      content.push(_react2.default.createElement(
        'li',
        props_item,
        _react2.default.createElement(
          'div',
          props_content,
          _react2.default.createElement(
            'div',
            props_name,
            infoObj.name
          ),
          function () {
            var content_collapse = [];
            if (hasChildren && _this5.env.featureCollapsible.enable) {
              if ('' == _this5.env.featureCollapsible.customCollapseButton) {
                var props_collapse = _this5.createBasicProps('content-collapse');
                if (_this5.collapseStatusList[infoObj.index]) {
                  props_collapse.className += ' collapsed';
                };
                props_collapse.onClick = function (event) {
                  _this5._itemOnCollapseHandler(event, infoObj);
                };
                var props_arrow = _this5.createBasicProps('collapse-arrow');
                content_collapse.push(_react2.default.createElement(
                  'div',
                  props_collapse,
                  _react2.default.createElement('div', props_arrow)
                ));
              } else {
                var props_custom_collapse = _this5.createBasicProps('content-custom-collapse');
                if (_this5.collapseStatusList[infoObj.index]) {
                  props_custom_collapse.className += ' collapsed';
                };
                props_custom_collapse.onClick = function (event) {
                  _this5._itemOnCollapseHandler(event, infoObj);
                };
                content_collapse.push(_react2.default.createElement(
                  'div',
                  props_custom_collapse,
                  _this5.env.featureCollapsible.customCollapseButton
                ));
              }
            };
            return content_collapse;
          }()
        ),
        function () {
          var content_submenu = [];
          if (hasChildren) {
            var props_submenu = _this5.createBasicProps('item-submenu');
            if (_this5.env.featureCollapsible.enable && _this5.collapseStatusList[infoObj.index]) {
              props_submenu.className += ' collapsed';
            };
            var content_height = parseInt(!_this5.env.styleObj['item-content'] ? CONTENT_HEIGHT : _this5.env.styleObj['item-content']['height'] ? _this5.env.styleObj['item-content']['height'] : _this5.env.styleObj['item-content']['line-height'] ? _this5.env.styleObj['item-content']['line-height'] : CONTENT_HEIGHT);
            props_submenu.style['height'] = _this5.countRecursionFn(infoObj) * content_height;
            var props_layer = _this5.createBasicProps('menu-layer');
            var layerNextName = 'layer-' + nextLayer;
            props_layer.className += ' ' + layerNextName;
            if (_this5.env.styleObj[layerNextName]) {
              Object.keys(_this5.env.styleObj[layerNextName]).map(function (config) {
                props_layer.style[config] = _this5.env.styleObj[layerNextName][config];
              });
            };
            content_submenu.push(_react2.default.createElement(
              'div',
              props_submenu,
              _react2.default.createElement(
                'ul',
                props_layer,
                infoObj.children.map(function (item) {
                  var content_menu = [];
                  content_menu.push(_this5.menuRenderFn(item, nextLayer));
                  return content_menu;
                })
              )
            ));
          };
          return content_submenu;
        }()
      ));
      return content;
    }
  }, {
    key: 'searchRecursionFn',
    value: function searchRecursionFn(source) {
      var infoObj = new MenuInfoObj(source);
      for (var i = 0; i < infoObj.children.length; i++) {
        if (this.env.acticveIndex == infoObj.children[i].index || this.searchRecursionFn(infoObj.children[i])) {
          return true;
        };
      };
      return false;
    }
  }, {
    key: 'countRecursionFn',
    value: function countRecursionFn(source) {
      var infoObj = new MenuInfoObj(source);
      var count = 0;
      if (!this.collapseStatusList[infoObj.index]) {
        count = infoObj.children.length;
        for (var i = 0; i < infoObj.children.length; i++) {
          count += this.countRecursionFn(infoObj.children[i]);
        };
      };
      return count;
    }
  }, {
    key: 'expandRecursionFn',
    value: function expandRecursionFn(source) {
      var infoObj = new MenuInfoObj(source);
      for (var i = 0; i < infoObj.children.length; i++) {
        if (this.env.acticveIndex == infoObj.children[i].index) {
          this.collapseStatusList[infoObj.index] = false;
          break;
        };
        if (this.searchRecursionFn(infoObj.children[i])) {
          this.collapseStatusList[infoObj.index] = false;
          this.expandRecursionFn(infoObj.children[i]);
        };
      };
    }
  }, {
    key: '_refHandler',
    value: function _refHandler(ref) {
      this.env.inputRefFn(ref);
    }
  }, {
    key: '_itemOnClickHandler',
    value: function _itemOnClickHandler(event, infoObj) {
      if (event.stopPropagation) {
        // standard
        event.stopPropagation();
      } else {
        // IE6-8
        event.cancelBubble = true;
      };
      this.env.acticveIndex = infoObj.index;
      this.env.itemOnClickFn(infoObj);

      if (0 < infoObj.children.length) {
        this.collapseStatusList[infoObj.index] = false;
        infoObj.event = { value: false };
        this.env.featureCollapsible.itemOnCollapseFn(infoObj);
      };
      this.forceUpdate();
    }
  }, {
    key: '_itemOnCollapseHandler',
    value: function _itemOnCollapseHandler(event, infoObj) {
      if (event.stopPropagation) {
        // standard
        event.stopPropagation();
      } else {
        // IE6-8
        event.cancelBubble = true;
      };
      this.collapseStatusList[infoObj.index] = !this.collapseStatusList[infoObj.index];
      infoObj.event = { value: !this.collapseStatusList[infoObj.index] };
      this.env.featureCollapsible.itemOnCollapseFn(infoObj);
      this.forceUpdate();
    }
  }]);

  return Menu;
}(_react2.default.Component);

;

Menu.propTypes = {
  menuArr: _propTypes2.default.array.isRequired,
  styleObj: _propTypes2.default.object,
  inputRefFn: _propTypes2.default.func,
  acticveIndex: _propTypes2.default.string,
  itemOnClickFn: _propTypes2.default.func,
  featureCollapsible: _propTypes2.default.object
};

Menu.defaultProps = {
  menuArr: [],
  styleObj: {},
  inputRefFn: function inputRefFn() {},
  acticveIndex: '',
  itemOnClickFn: function itemOnClickFn() {},
  featureCollapsible: {}
};

exports.default = Menu;