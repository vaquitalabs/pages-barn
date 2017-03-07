/*
* The connection to be used for Mongo
*/
import mongoose from 'mongoose'
import setModels from './setModels'

mongoose.Promise = global.Promise

function MongoConnect(mongoUrl) {
	const connection = mongoose.createConnection(mongoUrl)
	const models = setModels(connection)
	return { connection, models }
}

export default MongoConnect
