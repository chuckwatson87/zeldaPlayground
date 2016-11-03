"use strict";
const path = require('path');
const project = require('./aurelia_project/aurelia.json');

let testSrc = [
  { pattern: project.unitTestRunner.source, included: false },
  { pattern: 'test\\**\\setup.js', included: false},
  { pattern: 'test\\unit\\resources\\**\\*.*', included: false},
  'test/aurelia-karma.js'
];

let output = project.platform.output;
let appSrc = project.build.bundles.map(x => path.join(output, x.name));
let entryIndex = appSrc.indexOf(path.join(output, project.build.loader.configTarget));
let entryBundle = appSrc.splice(entryIndex, 1)[0];
let files = [entryBundle].concat(testSrc).concat(appSrc);

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: [project.testFramework.id, 'jasmine-matchers'],
    files: files,
    exclude: [],
    preprocessors: {
      [project.unitTestRunner.source]: [project.transpiler.id],
      ['test\\**\\setup.js']: [project.transpiler.id],
      ['test\\**\\sprites.js']: [project.transpiler.id]
    },
    'babelPreprocessor': { options: project.transpiler.options },
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    // client.args must be a array of string.
    // Leave 'aurelia-root', project.paths.root in this order so we can find
    // the root of the aurelia project.
    client: {
      args: ['aurelia-root', project.paths.root]
    }
  });
};
