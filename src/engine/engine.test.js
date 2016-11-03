import engine from './engine';
import sprite from 'spries/sprites';
import {spriteAtlas} from '../../test/unit/resources/images/sprites.js';

describe('engineVM', () => {
  let canvas = document.createElement('canvas'),
      _engineVM
    beforeEach(() => {
      _engineVM = new Engine(canvas);
    });
    it('exists', () => {
        expect(_engineVM).toBeDefined();
    });
});
