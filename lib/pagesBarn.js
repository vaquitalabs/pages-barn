import MongoConnect from './MongoConnect'
import {
	WEBSITE_NOT_OBJECT,
	PAGES_NOT_ARRAY,
	WEBSITE_MISSING,
	PAGE_INCOMPLETE
} from './messages/error'

/* ==============================
*	Start PagesBarn
============================== */
function PagesBarn(config) {
	let {
		mongoUrl,
		websiteId
	} = config

	/* ==============================
	*	Handle Website
	============================== */
	if (!websiteId)
		websiteId = 'pagesbarn-website'

	websiteId = websiteId.replace(/ /g, '-').toLowerCase()

	/* ==============================
	*	Handle Mongourl
	============================== */
	if (!mongoUrl)
		mongoUrl = `mongodb://localhost:27017/${websiteId}`

	/* ==============================
	*	Establish Connection &
	* 	expose models
	============================== */
	const db = MongoConnect(mongoUrl)
	const { Page, Website } = db.models	

	/* ==============================
	*	Get Website Pages
	============================== */
	this.get = (cb) => {
		Page.find({}, cb)
	}

	/* ==============================
	*	Run Fixture to set pages
	============================== */
	this.runFixture = (fixture, methodCallback) => {
		const { websiteUrl, pages } = fixture

		if (websiteUrl.constructor !== String)
			return methodCallback(new Error(WEBSITE_NOT_STRING(websiteUrl.constructor.name)))

		if (pages.constructor !== Array)
			return methodCallback(new Error(PAGES_NOT_ARRAY(pages.constructor.name)))

		if (!websiteUrl)
			return methodCallback(new Error(WEBSITE_MISSING()))

		for (let i = 0; i < pages.length; i += 1) {
			let pageData = pages[i]
			pageData.website = websiteUrl
		}

		const verifyOrSaveWebsite = (callback) => {
			const websiteData = { url: websiteUrl }

			Website.findOne(websiteData, (err, record) => {
				if (err)
					return callback(err)

				if (record)
					return callback(null, record)

				const websiteToSave = new Website(websiteData)
				websiteToSave.save(callback)
			})
		}

		const saveAllPages = (index) => {
			let pageIndex = index || 0
			const page = new Page(pages[pageIndex])
			page.save((err, pageSaved) => {
				if (err)
					return methodCallback(err)

				pageIndex += 1

				if (pageIndex < pages.length)
					return saveAllPages(pageIndex)

				return Page.find({}, methodCallback)
			})
		}

		verifyOrSaveWebsite((err, res) => {
			if (err)
				return methodCallback(err)

			saveAllPages()
		})
	}

	/* ==============================
	*	Spacehorn Router
	============================== */
	this.spacehornRouter = (routerCallback) => {
		let routes = []

		const pageToRoute = (page) => {
			// Return page as Spacehorn Route
		}

		Page.find({}, (err, pages) => {
			if (err)
				return routerCallback(err)

			pages.forEach((page) => {
				routes.push(pageToRoute(page))
			})

			return routerCallback(null, routes)
		})
	}
}

export default PagesBarn
