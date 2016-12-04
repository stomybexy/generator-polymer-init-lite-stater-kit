'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var path = require('path');

module.exports = yeoman.Base.extend({
  prompting: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the supreme ' + chalk.red('generator-polymer-init-lite-stater-kit') + ' generator!'
    ));

    var prompts = [{
      type: 'input',
      name: 'appName',
      message: 'How would you like to call your app?',
      default: process.cwd().split(path.sep).pop()
    }, {
      type: 'input',
      name: 'rootElement',
      message: 'What would you like your root element to be called?',
      default: process.cwd().split(path.sep).pop() + '-app'
    }];

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
    }.bind(this));
  },

  writing: function () {

    const rootElement = this.props.rootElement;
    const appName = this.props.appName;
    const homeElement = `${appName}-home`;
    const view404Element = `${appName}-view404`;

    this.props.homeElement = homeElement;
    this.props.view404Element = view404Element;

    this.fs.copyTpl([
      `${this.templatePath()}/**/!(_)*`,
      `!${this.templatePath()}/_images`,
      `!${this.templatePath()}/_images/**`,
    ],

      this.destinationPath(),
      this.props
    );

    this.fs.copy(
      this.templatePath('_images/**/*'),
      this.destinationPath('images')
    );

    this.fs.copyTpl(
      this.templatePath('src/_element.html'),
      this.destinationPath(`src/${rootElement}.html`),
      this.props
    );

    this.fs.copyTpl(
      this.templatePath('src/_home.html'),
      this.destinationPath(`src/${homeElement}.html`),
      this.props
    );

    this.fs.copyTpl(
      this.templatePath('src/_view404.html'),
      this.destinationPath(`src/${view404Element}.html`),
      this.props
    );


    this.fs.copyTpl(
      this.templatePath('test/_home.html'),
      this.destinationPath(`test/${homeElement}.html`),
      this.props
    );
  },

  install: function () {
    this.bowerInstall();
  }
});
