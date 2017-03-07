import chalk from 'chalk'

const c = chalk.red

const errorMessages = {
	WEBSITE_NOT_STRING: (type) => c(`"websiteUrl" passed to PagesBarn fixture must be a String, got ${type} instead`),
	PAGES_NOT_ARRAY: (type) => c(`"pages" passed to PagesBarn fixture should be an Array, got ${type} instead`),
	WEBSITE_MISSING: () => c(`"websiteUrl" is missing to PagesBarn fixture`),
	PAGE_INCOMPLETE: () => c(`A "page" passed to PagesBarn fixture is incomplete`),
}

module.exports = errorMessages
