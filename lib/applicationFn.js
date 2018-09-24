'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createBasicProps = createBasicProps;
exports.initCollapseStautsFn = initCollapseStautsFn;
exports.searchRecursionFn = searchRecursionFn;
exports.countRecursionFn = countRecursionFn;
exports.expandRecursionFn = expandRecursionFn;
exports.camelCaseTransformerFn = camelCaseTransformerFn;

var _dataObj = require('./dataObj.js');

function createBasicProps(env, name) {
  var obj = {
    key: name,
    className: name,
    style: env.styleObj[name] ? Object.assign({}, env.styleObj[name]) : {}
  };
  return obj;
}

function initCollapseStautsFn(menuThis, source) {
  var infoObj = new _dataObj.MenuInfoObj(source, menuThis.env.featureCollapsible['defaultCollapse']);
  if (0 < infoObj.children.length && 'undefined' == typeof menuThis.collapseStatusList[infoObj.index]) {
    menuThis.collapseStatusList[infoObj.index] = menuThis.env.featureCollapsible.enable;
  }

  for (var i = 0; i < infoObj.children.length; i++) {
    initCollapseStautsFn(menuThis, infoObj.children[i]);
  }
}
function searchRecursionFn(env, source) {
  var infoObj = new _dataObj.MenuInfoObj(source, env.featureCollapsible['defaultCollapse']);
  for (var i = 0; i < infoObj.children.length; i++) {
    if (env.acticveIndex == infoObj.children[i].index || searchRecursionFn(env, infoObj.children[i])) {
      return true;
    }
  }
  return false;
}

function countRecursionFn(menuThis, source) {
  var infoObj = new _dataObj.MenuInfoObj(source, menuThis.env.featureCollapsible['defaultCollapse']);
  var count = 0;
  if (!menuThis.collapseStatusList[infoObj.index]) {
    count = infoObj.children.length;
    for (var i = 0; i < infoObj.children.length; i++) {
      count += countRecursionFn(menuThis, infoObj.children[i]);
    }
  }
  return count;
}
function expandRecursionFn(menuThis, source) {
  var infoObj = new _dataObj.MenuInfoObj(source, menuThis.env.featureCollapsible['defaultCollapse']);
  for (var i = 0; i < infoObj.children.length; i++) {
    if (menuThis.env.acticveIndex == infoObj.children[i].index) {
      menuThis.collapseStatusList[infoObj.index] = false;
      break;
    }
    if (searchRecursionFn(menuThis.env, infoObj.children[i])) {
      menuThis.collapseStatusList[infoObj.index] = false;
      expandRecursionFn(menuThis, infoObj.children[i]);
    }
  }
}

function camelCaseTransformerFn(orinal_name) {
  var newName = '';
  newName = orinal_name.replace(/-(\w)/g, function (all, letter) {
    return letter.toUpperCase();
  });
  return newName;
}