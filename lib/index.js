"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function MenuInfoDBO(obj) {
  var _this = this;

  /*
    obj = {
      index = '',
      name = '',
      children = []
    }
  */
  Object.keys(obj).map(function (item) {
    _this[item] = obj[item];
  });
};

var _menuRenderFn = function _menuRenderFn(source, layerCounter) {
  var _this2 = this;

  var content = [];
  var isParent = false;
  var infoObj = new MenuInfoDBO(source);

  isParent = infoObj.children && 0 < infoObj.children.length;
  content.push(_react2.default.createElement(
    "li",
    { className: "menu-item", onClick: function onClick() {} },
    _react2.default.createElement(
      "div",
      { className: "item-name" },
      infoObj.name
    ),
    function () {
      var content_li = [];
      if (isParent) {
        content_li.push(_react2.default.createElement(
          "ul",
          { className: "menu-layer-" + layerCounter },
          function () {
            var content_layer = [];
            infoObj.children.map(function (item) {
              content_layer.push(_this2.menuRenderFn(item, layerCounter + 1));
            });
            return content_layer;
          }()
        ));
      };
      return content_li;
    }()
  ));
  return content;
};

var Menu = function (_React$Component) {
  _inherits(Menu, _React$Component);

  function Menu(props) {
    _classCallCheck(this, Menu);

    var _this3 = _possibleConstructorReturn(this, (Menu.__proto__ || Object.getPrototypeOf(Menu)).call(this, props));

    _this3.state = {
      "active": ""
    };
    _this3.menuRenderFn = _menuRenderFn;
    return _this3;
  }

  _createClass(Menu, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      this.setState({
        "active": this.props.defaultActicveStr
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      var menuList = this.props.menuList;
      var layerCounter = 0;
      return _react2.default.createElement(
        "div",
        { className: "btb-menu " + this.props.className },
        _react2.default.createElement(
          "ul",
          { className: "menu-layer-" + layerCounter },
          function () {
            var content_layer = [];
            menuList.map(function (item) {
              content_layer.push(_this4.menuRenderFn(item, layerCounter + 1));
            });
            return content_layer;
          }()
        )
      );
    }
  }]);

  return Menu;
}(_react2.default.Component);

;

Menu.propTypes = {
  menuList: _propTypes2.default.array.isRequired,
  defaultActicveStr: _propTypes2.default.str,
  styleObj: _propTypes2.default.obj,
  onClickItemFn: _propTypes2.default.func
};

Menu.defaultProps = {
  menuList: [],
  defaultActicveStr: "",
  styleObj: {},
  onClickItemFn: function onClickItemFn() {}
};

exports.default = Menu;