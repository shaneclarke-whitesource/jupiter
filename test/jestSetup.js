import Enzyme, { shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';// React 16 Enzyme adapter
import { JSDOM } from 'jsdom';
const jsdom = new JSDOM('<!doctype html><html><body></body></html>');
const { window } = jsdom;
Enzyme.configure({ adapter: new Adapter() });// Make Enzyme functions available in all test files without importing

global.shallow = shallow;
global.render = render;
global.mount = mount;
global.document = window;
global.window = window.defaultView;
