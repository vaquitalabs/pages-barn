'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Website = _mongoose2.default.Schema({
	url: String,
	created_at: {
		type: Date,
		default: Date.now
	},
	updated_at: Date
});

exports.default = Website;