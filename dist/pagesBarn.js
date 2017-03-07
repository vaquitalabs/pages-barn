'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongoConnect = require('./mongoConnect');

var _mongoConnect2 = _interopRequireDefault(_mongoConnect);

var _error = require('./messages/error');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* ==============================
*	Start PagesBarn
============================== */
function PagesBarn(config) {
	var mongoUrl = config.mongoUrl,
	    websiteId = config.websiteId;

	/* ==============================
 *	Handle Website
 ============================== */

	if (!websiteId) websiteId = 'pagesbarn-website';

	websiteId = websiteId.replace(/ /g, '-').toLowerCase();

	/* ==============================
 *	Handle Mongourl
 ============================== */
	if (!mongoUrl) mongoUrl = 'mongodb://localhost:27017/' + websiteId;

	/* ==============================
 *	Establish Connection &
 * 	expose models
 ============================== */
	var db = (0, _mongoConnect2.default)(mongoUrl);
	var _db$models = db.models,
	    Page = _db$models.Page,
	    Website = _db$models.Website;

	/* ==============================
 *	Get Website Pages
 ============================== */

	this.get = function (cb) {
		Page.find({}, cb);
	};

	/* ==============================
 *	Run Fixture to set pages
 ============================== */
	this.runFixture = function (fixture, methodCallback) {
		var websiteUrl = fixture.websiteUrl,
		    pages = fixture.pages;


		if (websiteUrl.constructor !== String) return methodCallback(new Error(WEBSITE_NOT_STRING(websiteUrl.constructor.name)));

		if (pages.constructor !== Array) return methodCallback(new Error((0, _error.PAGES_NOT_ARRAY)(pages.constructor.name)));

		if (!websiteUrl) return methodCallback(new Error((0, _error.WEBSITE_MISSING)()));

		for (var i = 0; i < pages.length; i += 1) {
			var pageData = pages[i];
			pageData.website = websiteUrl;
		}

		var verifyOrSaveWebsite = function verifyOrSaveWebsite(callback) {
			var websiteData = { url: websiteUrl };

			Website.findOne(websiteData, function (err, record) {
				if (err) return callback(err);

				if (record) return callback(null, record);

				var websiteToSave = new Website(websiteData);
				websiteToSave.save(callback);
			});
		};

		var saveAllPages = function saveAllPages(index) {
			var pageIndex = index || 0;
			var page = new Page(pages[pageIndex]);
			page.save(function (err, pageSaved) {
				if (err) return methodCallback(err);

				pageIndex += 1;

				if (pageIndex < pages.length) return saveAllPages(pageIndex);

				return Page.find({}, methodCallback);
			});
		};

		verifyOrSaveWebsite(function (err, res) {
			if (err) return methodCallback(err);

			saveAllPages();
		});
	};

	/* ==============================
 *	Spacehorn Router
 ============================== */
	this.spacehornRouter = function (routerCallback) {
		var routes = [];

		var pageToRoute = function pageToRoute(page) {
			// Return page as Spacehorn Route
		};

		Page.find({}, function (err, pages) {
			if (err) return routerCallback(err);

			pages.forEach(function (page) {
				routes.push(pageToRoute(page));
			});

			return routerCallback(null, routes);
		});
	};
}

exports.default = PagesBarn;