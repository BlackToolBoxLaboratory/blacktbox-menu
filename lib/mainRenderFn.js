'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.mainRenderFn = mainRenderFn;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _applicationFn = require('./applicationFn.js');

var _menuRenderFn = require('./menuRenderFn.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function mainRenderFn(menuThis) {
  menuThis.val.hasFoundActive = false;
  menuThis.val.hasFoundActiveTop = false;
  var content = [];
  var menuArr = menuThis.env.menuArr;
  var nextLayer = 0;
  var itemCount = menuArr.length;
  menuArr.map(function (item) {
    itemCount += (0, _applicationFn.countRecursionFn)(menuThis, item);
  });
  var props_menu = (0, _applicationFn.createBasicProps)(menuThis.env, 'btb-menu');
  if (menuThis.props.className) {
    props_menu.className += ' ' + menuThis.props.className;
  }
  var props_content = (0, _applicationFn.createBasicProps)(menuThis.env, 'menu-content');
  var content_height = parseInt(menuThis.env.styleObj['item-content']['height']);
  props_content.style['height'] = itemCount * content_height;
  var props_layer = (0, _applicationFn.createBasicProps)(menuThis.env, 'menu-layer');
  var layerNextName = 'layer-' + nextLayer;
  props_layer.className += ' ' + layerNextName;
  if (menuThis.env.styleObj[layerNextName]) {
    Object.keys(menuThis.env.styleObj[layerNextName]).map(function (config) {
      props_layer.style[config] = menuThis.env.styleObj[layerNextName][config];
    });
  }
  content.push(_react2.default.createElement(
    'div',
    _extends({}, props_menu, { ref: function ref(_ref) {
        _refHandler(menuThis.env, _ref);
      } }),
    _react2.default.createElement(
      'div',
      props_content,
      _react2.default.createElement(
        'ul',
        props_layer,
        menuArr.map(function (item) {
          var content_menu = [];
          content_menu.push((0, _menuRenderFn.menuRenderFn)(menuThis, item, nextLayer));
          return content_menu;
        })
      )
    )
  ));
  return content;
}

function _refHandler(env, ref) {
  env.refFn(ref);
}