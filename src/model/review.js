import mongoose from 'mongoose'
import FoodTruck from './foodtruck'
let Schema = mongoose.Schema

let ReviewSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  text: String,
  foodtruck: {
    type: Schema.Types.ObjectId,
    ref: 'FoodTruck', //테이블 조인할때 쓰는것?
    require: true
  }
})

module.exports = mongoose.model('Review', ReviewSchema)
