var _ = require('underscore');
_.str = require('underscore.string');

module.exports = function (Generator) {
    Generator.prototype.fixAppName = function () {
        this.props.appName = _.str.camelize(this.options['app-name']);
        this.props.appTrainName = _.str.dasherize(_.str.underscored(this.options['app-name']));
    };
    Generator.prototype.fixTempateFileNames = function () {
        this.templateFiles['app/app.module.js'] = 'app/' + this.props.appTrainName + '.module.js';
        this.templateFiles['app/app.less'] = 'app/' + this.props.appTrainName + '.less';
        this.templateFiles['test/app.module.spec.js'] = 'test/' + this.props.appTrainName + '.module.spec.js';
    };
};
