import mongoose from 'mongoose'
import { Router } from 'express'
import FoodTruck from '../model/foodtruck'


export default({ config, db }) => {
  let api = Router()

  // '/v1/foodtruck/add' -create data
  api.post('/add', (req, res) => {
    let newFoodTruck = new FoodTruck()
    newFoodTruck.name = req.body.name

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
  return api
}
