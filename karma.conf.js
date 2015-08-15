module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'browserify'],
    files: [
      'src/**/*.js',
      'test/**/*_spec.js'
    ],
    exclude: [
    ],
    preprocessors: {
      'src/**/*.js': ['browserify'],
      'test/**/*_spec.js': ['browserify']
    },
    browserify: {
      debug: false,
      transform: [
        ['babelify', {plugins: ['object-assign', 'espower']}]
      ]
    },
    reporters: ['mocha'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false
  })
}
