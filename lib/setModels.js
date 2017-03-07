import { Page, Website } from './schemas'

function setModels(connection) {
	return {
		Page: connection.model('Page', Page),
		Website: connection.model('Website', Website)
	}
}

export default setModels
