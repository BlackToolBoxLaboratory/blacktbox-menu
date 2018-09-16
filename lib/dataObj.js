'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ENVDefaultObj = ENVDefaultObj;
exports.MenuInfoObj = MenuInfoObj;
function ENVDefaultObj() {
  this['env'] = {
    menuArr: [],
    styleObj: {},
    refFn: function refFn() {},
    acticveIndex: '',
    itemOnClickFn: function itemOnClickFn() {},
    featureCollapsible: {
      enable: false,
      itemClickWithCollapseEnable: false,
      defaultCollapse: true,
      customCollapseButton: '',
      customExtendButton: '',
      itemOnCollapseFn: function itemOnCollapseFn() {}
    }
  };
}

function MenuInfoObj(obj, defaultCollapse) {
  var _this = this;

  this['index'] = '';
  this['name'] = '';
  this['children'] = [];
  this['defaultCollapse'] = defaultCollapse;
  Object.keys(obj).map(function (key) {
    _this[key] = obj[key];
  });

  if ('' == this['name']) {
    this['name'] = this['index'];
  }
}