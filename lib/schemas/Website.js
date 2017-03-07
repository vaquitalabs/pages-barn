import mongoose from 'mongoose'

const Website = mongoose.Schema({
	url: String,
	created_at: {
		type: Date,
		default: Date.now
	},
	updated_at: Date
})

export default Website
