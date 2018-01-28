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

var menuThis = void 0;

function MenuInfoObj(obj) {
  var _this = this;

  this['index'] = '';
  this['name'] = '';
  this['children'] = [];
  this['defaultCollapse'] = menuThis.env.featureCollapse.enable ? true : false;
  Object.keys(obj).map(function (key) {
    _this[key] = obj[key];
  });
};

var Menu = function (_React$Component) {
  _inherits(Menu, _React$Component);

  function Menu(props) {
    _classCallCheck(this, Menu);

    var _this2 = _possibleConstructorReturn(this, (Menu.__proto__ || Object.getPrototypeOf(Menu)).call(this, props));

    _this2.env = {
      menuList: [],
      acticveIndex: '',
      styleObj: {},
      itemOnClickFn: function itemOnClickFn() {},
      inputRefFn: function inputRefFn() {},
      featureCollapse: {
        enable: false,
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
      var menuList = this.env.menuList;
      var nextLayer = 0;
      var itemCount = menuList.length;
      menuList.map(function (item) {
        itemCount += _this3.countRecursionFn(item);
      });
      var props = {
        className: 'btb-menu ' + (this.props.className ? this.props.className : ''),
        style: { 'height': itemCount * 30 }
      };
      content.push(_react2.default.createElement(
        'div',
        _extends({}, props, { ref: function ref(_ref) {
            _this3._refHandler(_ref);
          } }),
        _react2.default.createElement(
          'div',
          { className: 'item-filter' },
          _react2.default.createElement(
            'ul',
            { className: 'menu-layer-' + nextLayer },
            function () {
              var content_layer = [];
              menuList.map(function (item) {
                content_layer.push(_this3.menuRenderFn(item, nextLayer));
              });
              return content_layer;
            }()
          )
        )
      ));
      return content;
    }
  }, {
    key: 'updateENVFn',
    value: function updateENVFn(source) {
      var _this4 = this;

      this.env = {
        menuList: [],
        acticveIndex: '',
        styleObj: {},
        itemOnClickFn: function itemOnClickFn() {},
        inputRefFn: function inputRefFn() {},
        featureCollapse: {
          enable: false,
          itemOnCollapseFn: function itemOnCollapseFn() {}
        }
      };
      var isChanged = source['acticveIndex'] && source['acticveIndex'] != this.env['acticveIndex'] ? true : false;
      Object.keys(source).map(function (entry) {
        switch (entry) {
          case 'featureCollapse':
            Object.keys(source.featureCollapse).map(function (collapse_entry) {
              _this4.env.featureCollapse[collapse_entry] = source.featureCollapse[collapse_entry];
            });
            break;
          default:
            _this4.env[entry] = source[entry];
            break;
        };
      });
      menuThis = this;

      var menuList = this.env.menuList;
      menuList.map(function (item) {
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
        this.collapseStatusList[infoObj.index] = infoObj.defaultCollapse;
      };

      for (var i = 0; i < infoObj.children.length; i++) {
        this.initCollapseStautsFn(infoObj.children[i]);
      };
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
      var props = {
        className: 'menu-item'
      };
      if (!this.val.hasFoundActive) {
        if (this.env.acticveIndex == infoObj.index) {
          props.className += ' active';
          this.val.hasFoundActive = true;
          isMatch = true;
        } else {
          if (hasChildren && this.searchRecursionFn(infoObj)) {
            props.className += ' activeParent';
            isMatch = true;
          };
        };
        if (isMatch && !this.val.hasFoundActiveTop) {
          props.className += ' activeTop';
          this.val.hasFoundActiveTop = true;
        };
      };
      content.push(_react2.default.createElement(
        'li',
        props,
        _react2.default.createElement(
          'div',
          { className: 'item-content', style: { 'padding-left': layerPaddingLeft }, onClick: function onClick(event) {
              _this5._itemOnClickHandler(event, infoObj);
            } },
          _react2.default.createElement(
            'div',
            { className: 'content-name' },
            infoObj.name
          ),
          function () {
            var content_collapse = [];
            if (hasChildren && _this5.env.featureCollapse.enable) {
              var _props = {};
              _props.className = 'content-collapse ' + (_this5.collapseStatusList[infoObj.index] ? 'collapse' : '');
              content_collapse.push(_react2.default.createElement(
                'div',
                _extends({}, _props, { onClick: function onClick(event) {
                    _this5._itemOnCollapseHandler(event, infoObj);
                  } }),
                _react2.default.createElement('div', { className: 'collapse-arror' })
              ));
            };
            return content_collapse;
          }()
        ),
        function () {
          var content_submenu = [];
          if (hasChildren) {
            var props_submenu = {
              className: 'item-submenu ' + (_this5.env.featureCollapse.enable && _this5.collapseStatusList[infoObj.index] ? 'collapsed' : ''),
              style: { 'height': _this5.countRecursionFn(infoObj) * 30 }
            };
            content_submenu.push(_react2.default.createElement(
              'div',
              props_submenu,
              _react2.default.createElement(
                'div',
                { className: 'item-filter' },
                _react2.default.createElement(
                  'ul',
                  { className: 'menu-layer-' + nextLayer },
                  function () {
                    var content_layer = [];
                    infoObj.children.map(function (item) {
                      content_layer.push(_this5.menuRenderFn(item, nextLayer));
                    });
                    return content_layer;
                  }()
                )
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
        this.env.featureCollapse.itemOnCollapseFn(infoObj);
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
      this.env.featureCollapse.itemOnCollapseFn(infoObj);
      this.forceUpdate();
    }
  }]);

  return Menu;
}(_react2.default.Component);

;

Menu.propTypes = {
  menuList: _propTypes2.default.array.isRequired,
  acticveIndex: _propTypes2.default.string,
  styleObj: _propTypes2.default.object,
  itemOnClickFn: _propTypes2.default.func,
  inputRefFn: _propTypes2.default.func,
  featureCollapse: _propTypes2.default.object
};

Menu.defaultProps = {
  menuList: [],
  acticveIndex: '',
  styleObj: {},
  itemOnClickFn: function itemOnClickFn() {},
  inputRefFn: function inputRefFn() {},
  featureCollapse: {}
};

exports.default = Menu;