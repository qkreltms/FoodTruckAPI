import mongoose from 'mongoose'
import { Router } from 'express'
import FoodTruck from '../model/foodtruck'
import Review from '../model/review'

export default({ config, db }) => {
  let api = Router()

  // '/v1/foodtruck/add' -create data
  api.post('/add', (req, res) => {
    let newFoodTruck = new FoodTruck()
    newFoodTruck.name = req.body.name
    newFoodTruck.foodtype = req.body.foodtype
    newFoodTruck.avgcost = req.body.avgcost
    newFoodTruck.geometry.coordinates = req.body.geometry.coordinates

    newFoodTruck.save(err => {
      if (err) {
        res.send(err)
      }
      res.json({ message: req.body.name+' FoodTruck saved successfully' })
    })
  })

// '/v1/foodtruck' - read
  api.get('/', (req, res) => {
    FoodTruck.find({}, (err, foodtrucks) => {
      if (err) {
        res.send(err)
      }
      res.json(foodtrucks)
    })
  })

  // 'v1/foodtruck/:id' - Read by id
  api.get('/:id', (req, res) => {
    FoodTruck.findById(req.params.id, (err, foodtruck) => {
      if (err) {
        res.send(err)
      }
      res.json(foodtruck)
    })
  })

  api.put('/:id', (req, res) => {
    //id를 찾은 후
    FoodTruck.findById(req.params.id, (err, foodtruck) => {
      if (err) {
        res.send(err)
      }
      //수정할 값을 받고
      foodtruck.name = req.body.name
      //수정한다.
      foodtruck.save(err => {
        if (err) {
          res.send(err)
        }
        res.json({ message: "FoodTruck info updated" })
      })
    })
  })

  api.delete('/:id', (req, res) => {
    FoodTruck.remove({
      //id를 찾는다
      _id: req.params.id
      //삭제를 콜백으로 알려줌
    }, (err, foodtruck) => {
      if (err) {
        res.send(err)
      }
      res.json({ message: "FoodTruck successfully removed"})
    })
  })

  //add review for a specific foodtruck id
  //'v1/foodtruck/reviews/add/:id'
  api.post('/reviews/add/:id', (req, res) => {
    FoodTruck.findById(req.params.id, (err, foodtruck) => {
      if (err) {
        res.send(err)
      }
      let newReview = new Review()

      newReview.title = req.body.title
      newReview.text = req.body.text
      newReview.foodtruck = foodtruck._id //주소창에 입력한 id값 가져옴
      newReview.save((err, review) => {
        if (err) {
          res.send(err)
        }
        foodtruck.reviews.push(newReview)
        foodtruck.save(err => {
          if (err) {
            res.send(err)
          }
          res.json({ message: 'FoodTruck review saved!' })
        })
      })
    })
  })

  return api
}
