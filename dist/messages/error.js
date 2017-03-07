'use strict';

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var c = _chalk2.default.red;

var errorMessages = {
	WEBSITE_NOT_STRING: function WEBSITE_NOT_STRING(type) {
		return c('"websiteUrl" passed to PagesBarn fixture must be a String, got ' + type + ' instead');
	},
	PAGES_NOT_ARRAY: function PAGES_NOT_ARRAY(type) {
		return c('"pages" passed to PagesBarn fixture should be an Array, got ' + type + ' instead');
	},
	WEBSITE_MISSING: function WEBSITE_MISSING() {
		return c('"websiteUrl" is missing to PagesBarn fixture');
	},
	PAGE_INCOMPLETE: function PAGE_INCOMPLETE() {
		return c('A "page" passed to PagesBarn fixture is incomplete');
	}
};

module.exports = errorMessages;