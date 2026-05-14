const THREE = require('three');
const { JSDOM } = require('jsdom');
const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
global.window = dom.window;
global.document = dom.window.document;

// Mock enough of three/examples/jsm/loaders/GLTFLoader for our purposes
const width = 0.0745 * 10;
const htmlScale = 0.0022 * 10;
const htmlCSSWidth = 320;
const htmlWorldWidth = htmlCSSWidth * htmlScale;

console.log('Phone World Width:', width);
console.log('HTML World Width:', htmlWorldWidth);
