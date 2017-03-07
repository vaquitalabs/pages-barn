'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _setModels = require('./setModels');

var _setModels2 = _interopRequireDefault(_setModels);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
* The connection to be used for Mongo
*/
_mongoose2.default.Promise = global.Promise;

function MongoConnect(mongoUrl) {
	var connection = _mongoose2.default.createConnection(mongoUrl);
	var models = (0, _setModels2.default)(connection);
	return { connection: connection, models: models };
}

exports.default = MongoConnect;