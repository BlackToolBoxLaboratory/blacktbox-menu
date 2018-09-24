'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.menuRenderFn = menuRenderFn;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _dataObj = require('./dataObj.js');

var _applicationFn = require('./applicationFn.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function menuRenderFn(menuThis, source, layerCounter) {
  var infoObj = new _dataObj.MenuInfoObj(source, menuThis.env.featureCollapsible['defaultCollapse']);
  var content = [];
  var isMatch = false;
  var hasChildren = 0 < infoObj.children.length ? true : false;
  var layerPaddingLeft = layerCounter * 15;
  var nextLayer = layerCounter + 1;
  var props_item = (0, _applicationFn.createBasicProps)(menuThis.env, 'layer-item');
  if (!menuThis.val.hasFoundActive) {
    if (menuThis.env.acticveIndex == infoObj.index) {
      props_item.className += ' active';
      menuThis.val.hasFoundActive = true;
      isMatch = true;
    } else {
      if (hasChildren && (0, _applicationFn.searchRecursionFn)(menuThis.env, infoObj)) {
        props_item.className += ' activeParent';
        isMatch = true;
      }
    }
    if (isMatch && !menuThis.val.hasFoundActiveTop) {
      props_item.className += ' activeTop';
      menuThis.val.hasFoundActiveTop = true;
    }
  }
  var props_content = (0, _applicationFn.createBasicProps)(menuThis.env, 'item-content');
  props_content.style['paddingLeft'] = layerPaddingLeft;
  props_content.onClick = function (event) {
    _itemOnClickHandler(event, menuThis, infoObj);
  };
  var props_name = (0, _applicationFn.createBasicProps)(menuThis.env, 'content-name');
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
        if (hasChildren && menuThis.env.featureCollapsible.enable) {
          if ('' == menuThis.env.featureCollapsible.customCollapseButton) {
            var props_collapse = (0, _applicationFn.createBasicProps)(menuThis.env, 'content-collapse');
            if (menuThis.collapseStatusList[infoObj.index]) {
              props_collapse.className += ' collapsed';
            }
            props_collapse.onClick = function (event) {
              _itemOnCollapseHandler(event, menuThis, infoObj);
            };
            var props_arrow = (0, _applicationFn.createBasicProps)(menuThis.env, 'collapse-arrow');
            content_collapse.push(_react2.default.createElement(
              'div',
              props_collapse,
              _react2.default.createElement('div', props_arrow)
            ));
          } else {
            var props_custom_collapse = (0, _applicationFn.createBasicProps)(menuThis.env, 'content-custom-collapse');
            if (menuThis.collapseStatusList[infoObj.index]) {
              props_custom_collapse.className += ' collapsed';
            }
            props_custom_collapse.onClick = function (event) {
              _itemOnCollapseHandler(event, menuThis, infoObj);
            };
            content_collapse.push(_react2.default.createElement(
              'div',
              props_custom_collapse,
              menuThis.collapseStatusList[infoObj.index] || '' == menuThis.env.featureCollapsible.customExtendButton ? menuThis.env.featureCollapsible.customCollapseButton : menuThis.env.featureCollapsible.customExtendButton
            ));
          }
        }
        return content_collapse;
      }()
    ),
    function () {
      var content_submenu = [];
      if (hasChildren) {
        var props_submenu = (0, _applicationFn.createBasicProps)(menuThis.env, 'item-submenu');
        if (menuThis.env.featureCollapsible.enable && menuThis.collapseStatusList[infoObj.index]) {
          props_submenu.className += ' collapsed';
        }
        var content_height = parseInt(menuThis.env.styleObj['item-content']['height']);
        props_submenu.style['height'] = (0, _applicationFn.countRecursionFn)(menuThis, infoObj) * content_height;
        var props_layer = (0, _applicationFn.createBasicProps)(menuThis.env, 'menu-layer');
        var layerNextName = 'layer-' + nextLayer;
        props_layer.className += ' ' + layerNextName;
        if (menuThis.env.styleObj[layerNextName]) {
          Object.keys(menuThis.env.styleObj[layerNextName]).map(function (config) {
            props_layer.style[config] = menuThis.env.styleObj[layerNextName][config];
          });
        }
        content_submenu.push(_react2.default.createElement(
          'div',
          props_submenu,
          _react2.default.createElement(
            'ul',
            props_layer,
            infoObj.children.map(function (item) {
              var content_menu = [];
              content_menu.push(menuRenderFn(menuThis, item, nextLayer));
              return content_menu;
            })
          )
        ));
      }
      return content_submenu;
    }()
  ));
  return content;
}

function _itemOnClickHandler(event, menuThis, infoObj) {
  event.stopPropagation();
  if (0 < infoObj.children.length && menuThis.env.featureCollapsible.itemClickWithCollapseEnable) {
    menuThis.collapseStatusList[infoObj.index] = !menuThis.collapseStatusList[infoObj.index];
    infoObj.collapseValue = menuThis.collapseStatusList[infoObj.index];
    menuThis.env.featureCollapsible.itemOnCollapseFn(infoObj);
  } else {
    menuThis.env.acticveIndex = infoObj.index;
  }
  infoObj.collapseValue = menuThis.collapseStatusList[infoObj.index];
  menuThis.env.itemOnClickFn(infoObj);
  menuThis.forceUpdate();
}

function _itemOnCollapseHandler(event, menuThis, infoObj) {
  event.stopPropagation();
  menuThis.collapseStatusList[infoObj.index] = !menuThis.collapseStatusList[infoObj.index];
  infoObj.collapseValue = menuThis.collapseStatusList[infoObj.index];
  menuThis.env.featureCollapsible.itemOnCollapseFn(infoObj);
  menuThis.forceUpdate();
}