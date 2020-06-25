import axios from 'axios';
import {
  shallow, render, mount, configure
} from 'enzyme';
import { t } from './i18n/mocks';
import Adapter from 'enzyme-adapter-react-16';
jest.mock('axios');

// React 16 Enzyme adapter
configure({ adapter: new Adapter() });// Make Enzyme functions available in all test files without importing


global.shallow = shallow;
global.render = render;
global.mount = mount;
global.t = t;
axios.get.mockImplementation(() => Promise.resolve());
axios.post.mockImplementation(() => Promise.resolve());
