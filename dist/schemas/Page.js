'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function buildTag(attrs) {
	var tag = '<meta ';

	for (var attr in attrs) {
		tag += attr + '="' + attrs[attr] + '" ';
	}

	tag += '/>';

	return tag;
}

var Page = _mongoose2.default.Schema({
	website: {
		type: String,
		required: true
	},
	title: {
		type: String,
		required: true
	},
	path: {
		type: String,
		required: true
	},
	navLabel: {
		type: String,
		required: true
	},
	meta: {
		charset: {
			type: String,
			default: "UTF-8"
		},
		description: String,
		responsive: Boolean
	},
	content: {
		type: _mongoose2.default.Schema.Types.Mixed,
		required: true
	},
	createdAt: {
		type: Date,
		default: Date.now
	},
	updatedAt: Date
});

Page.pre('update', function () {
	undefined.update({}, { $set: { updatedAt: new Date() } });
});

Page.methods.getHeadMeta = function () {
	var metas = _extends({}, this.meta);
	var metaTags = [];

	// Create/Push default TITLE tag
	metaTags.push({ title: this.title });

	// Create/Push default META tags
	metaTags.push({ 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' });

	if (metas.responsive) {
		metaTags.push({ name: 'HandheldFriendly', content: 'True' });
		metaTags.push({ name: 'viewport', content: 'width=device-width, initial-scale=1.0' });
	}

	for (var meta in metas) {
		if (meta === 'responsive') continue;

		if (meta === 'charset') {
			metaTags.push({ charset: metas[meta] });
			continue;
		}

		if (metas[meta]) {
			if (metas[meta].constructor === String) metaTags.push({ name: meta, content: metas[meta] });
		}
	}

	return metaTags;
};

Page.methods.getHeadMetaAsTags = function () {
	var metas = _extends({}, this.meta);
	var metaTags = [];

	// Create/Push default TITLE tag
	metaTags.push('<title>' + this.title + '</title>');

	// Create/Push default META tags
	metaTags.push(buildTag({ 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' }));

	if (metas.responsive) {
		metas['HandheldFriendly'] = 'True';
		metas['viewport'] = 'width=device-width, initial-scale=1.0';
	}

	for (var meta in metas) {
		if (meta === 'responsive') continue;

		if (meta === 'charset') {
			metaTags.push(buildTag({ charset: metas[meta] }));
			continue;
		}

		if (metas[meta]) {
			if (metas[meta].constructor === String) metaTags.push(buildTag({ name: meta, content: metas[meta] }));
		}
	}

	return metaTags;
};

exports.default = Page;

/*
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">

	<title>Play the long game</title>
	<meta name="description" content="">

	<meta name="HandheldFriendly" content="True">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">

	<meta property="og:site_name" content="Marcos Navarro">
	<meta property="og:type" content="article">
	<meta property="og:title" content="Play the long game">
	<meta property="og:description" content="Looking for success?   Play the long game! Build trust, prepare yourself to go all in, don't look back, don't judge... do you.">
	<meta property="og:url" content="https://marcosn.com/play-the-long-game/">

    <meta property="article:published_time" content="2017-01-30T05:36:36.000Z">
    <meta property="article:modified_time" content="2017-01-30T05:36:36.000Z">

    <meta name="twitter:card" content="summary">
    <meta name="twitter:title" content="Play the long game">
    <meta name="twitter:description" content="Looking for success?   Play the long game! Build trust, prepare yourself to go all in, don't look back, don't judge... do you.">
    <meta name="twitter:url" content="https://marcosn.com/play-the-long-game/">
    <meta name="twitter:label1" content="Written by">
    <meta name="twitter:data1" content="Marcos Navarro">
    <meta name="twitter:creator" content="@marcosaftertype">
    */