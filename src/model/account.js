import mongoose from 'mongoose'
const Schema = mongoose.Schema
import passprotLocalMongoose from 'passport-local-mongoose'

let Account = new Schema({
  email: {
    type: String,
    required: true
  }
  passport: {
    type: String.
    required: true
  }
})

Account.plugin(passprotLocalMongoose)
module.exports = mongoose.model('Account', Account)
