'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _dataObj = require('./dataObj.js');

var _applicationFn = require('./applicationFn.js');

var _mainRenderFn = require('./mainRenderFn.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CONTENT_HEIGHT = 30;

var Menu = function (_React$Component) {
  _inherits(Menu, _React$Component);

  function Menu(props) {
    _classCallCheck(this, Menu);

    var _this = _possibleConstructorReturn(this, (Menu.__proto__ || Object.getPrototypeOf(Menu)).call(this, props));

    _this.env = new _dataObj.ENVDefaultObj().env;
    _this.val = {
      hasFoundActive: false,
      hasFoundActiveTop: false
    };
    _this.collapseStatusList = {};
    return _this;
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
      return (0, _mainRenderFn.mainRenderFn)(this);
    }
  }, {
    key: 'updateENVFn',
    value: function updateENVFn(source) {
      var _this2 = this;

      this.env = new _dataObj.ENVDefaultObj().env;
      var isChanged = source['acticveIndex'] && source['acticveIndex'] != this.env['acticveIndex'] ? true : false;
      Object.keys(source).map(function (entry) {
        switch (entry) {
          case 'styleObj':
            Object.keys(source.styleObj).map(function (node_entry) {
              _this2.env.styleObj[node_entry] = {};
              Object.keys(source.styleObj[node_entry]).map(function (style_entry) {
                var camelCaseStyleName = (0, _applicationFn.camelCaseTransformerFn)(style_entry);
                _this2.env.styleObj[node_entry][camelCaseStyleName] = source.styleObj[node_entry][style_entry];
              });
            });
            break;
          case 'featureCollapsible':
            Object.keys(source.featureCollapsible).map(function (collapse_entry) {
              _this2.env.featureCollapsible[collapse_entry] = source.featureCollapsible[collapse_entry];
            });
            break;
          default:
            _this2.env[entry] = source[entry];
            break;
        }
      });

      var menuArr = this.env.menuArr;
      menuArr.map(function (item) {
        var infoObj = new _dataObj.MenuInfoObj(item, _this2.env.featureCollapsible['defaultCollapse']);
        (0, _applicationFn.initCollapseStautsFn)(_this2, infoObj);
        if (isChanged) {
          (0, _applicationFn.expandRecursionFn)(_this2, infoObj);
        }
      });
      if (this.env.styleObj['item-content']) {
        this.env.styleObj['item-content']['height'] = this.env.styleObj['item-content']['height'] ? this.env.styleObj['item-content']['height'] : this.env.styleObj['item-content']['lineHeight'] ? this.env.styleObj['item-content']['lineHeight'] : this.env.styleObj['item-content']['fontSize'] ? this.env.styleObj['item-content']['fontSize'] : CONTENT_HEIGHT + 'px';
      } else {
        this.env.styleObj['item-content'] = {
          'height': CONTENT_HEIGHT + 'px'
        };
      }
    }
  }]);

  return Menu;
}(_react2.default.Component);

Menu.propTypes = {
  menuArr: _propTypes2.default.array.isRequired
};

Menu.defaultProps = {
  menuArr: []
};

exports.default = Menu;