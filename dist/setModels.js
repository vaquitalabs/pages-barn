'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _schemas = require('./schemas');

function setModels(connection) {
	return {
		Page: connection.model('Page', _schemas.Page),
		Website: connection.model('Website', _schemas.Website)
	};
}

exports.default = setModels;