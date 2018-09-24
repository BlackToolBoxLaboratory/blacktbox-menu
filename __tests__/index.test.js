import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Menu from '../module/index.js';

configure({ adapter: new Adapter() });

var testProps = {
  'menuArr': [
    {
      'index': 'M1',
      'name': 'Menu: 1',
      'children': [
      {
        'index': 'M1-1',
        'name': 'Menu: 1-1'
      },
      {
        'index': 'M1-2',
        'name': 'Menu: 1-2',
        'defaultCollapse': true,
        'children': [
        {
          'index': 'M1-2-1',
          'name': 'Menu: 1-2-1',
          'defaultCollapse': false,
          'children': [
          {
            'index': 'M1-2-1',
            'name': ''
          }]
        },
        {
          'index': 'M1-2-2',
          'name': 'Menu: 1-2-2'
        }]
      }]
    }
  ]
};

describe('Test Render Menu ... ', () => {
  var render;
  test('With mount', () => {
    render = mount(<Menu className='testCSS'/>);
    render = mount(<Menu {...testProps}/>);
  });
  test('Test styleObj', () => {
    testProps['styleObj'] = {
      'item-content': {
        'height': '90px'
      },
      'layer-0': {
        'background-color': '#85a5ff'
      },
      'layer-1': {
        'background-color': '#adc6ff'
      }
    };
    render.setProps(testProps);

    testProps['styleObj']['item-content'] = {'line-height': '90px'};
    render.setProps(testProps);

    testProps['styleObj']['item-content'] = {'font-size': '90px'};
    render.setProps(testProps);

    testProps['styleObj']['item-content'] = {};
    render.setProps(testProps);
  });
  test('Test acticveIndex', () => {
    testProps['acticveIndex'] = 'M1-2';
    render.setProps(testProps);

    testProps['acticveIndex'] = 'M1-2-1';
    render.setProps(testProps);
  });
  test('Test featureCollapsible', () => {
    testProps['featureCollapsible'] = {
      'enable': true
    };
    render.setProps(testProps);
    render.find('.content-collapse').first().simulate('click');
    
    testProps['featureCollapsible']['customCollapseButton'] = '<div>collapse</div>';
    render.setProps(testProps);
    render.find('.content-custom-collapse').first().simulate('click');

    testProps['featureCollapsible']['customExtendButton'] = '<div>extend</div>';
    render.setProps(testProps);
    render.find('.item-content').first().simulate('click');

    testProps['featureCollapsible']['itemClickWithCollapseEnable'] = true;
    render.setProps(testProps);
    render.find('.item-content').first().simulate('click');
  });
});
