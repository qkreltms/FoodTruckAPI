import express from 'express'
import config from '../config'
import middleware from '../middleware'
import initializeDb from '../db' //dbConnection 만듦
import foodtruck from '../controller/foodtruck'

let router = express()

// connect to db
initializeDb(db => {
  // internal middleware
  router.use(middleware({ config, db }))
  // api routes v1 (/v1)
  router.use('/foodtruck', foodtruck({ config, db }))
})

export default router
