const fs = require('fs');
const { GLTFLoader } = require('three-stdlib');
const THREE = require('three');
const { JSDOM } = require('jsdom');

// We need a fake DOM for THREE.js to work in Node
const { window } = new JSDOM();
global.window = window;
global.document = window.document;

// We can also just read the GLTF file if it's a glTF JSON, but it's a GLB.
// So we'd need to parse it. Let's write a simple script to parse it.
