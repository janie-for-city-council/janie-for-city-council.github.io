const locales = require('./src/locales/locales');

const removeTrailingSlash = path =>
  path === `/` ? path : path.replace(/\/$/, ``)

exports.onCreatePage = ({ page, actions }) => {
	const { createPage, deletePage } = actions

	// First delete the incoming page that was automatically created by Gatsby
	// So everything in src/pages/
	deletePage(page)
	let localeKeys = ['en'];

	if(!['/404/', '/404.html'].includes(page.path)) {
		let localeKeys = Object.keys(locales);
	}
	// Grab the keys ('en' & 'de') of locales and map over them
	Object.keys(locales).map(lang => {
		// Use the values defined in "locales" to construct the path
		const localizedPath = locales[lang].default
		? page.path
		: `${lang}${page.path}`

		return createPage({
			// Pass on everything from the original page
			...page,
			// Since page.path returns with a trailing slash (e.g. "/de/")
			// We want to remove that
			path: removeTrailingSlash(localizedPath),
			// Pass in the locale as context to every page
			// This context also gets passed to the src/components/layout file
			// This should ensure that the locale is available on every page
			context: {
				...page.context,
				locale: lang,
			},
		})
	})

};