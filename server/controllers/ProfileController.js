import express from "express";
import UserService from "../services/UserService.js";
import { Authorize } from "../middleware/authorize.js";

let _userService = new UserService().repository

export default class ProfileController {
  constructor() {
    this.router = express.Router()

      .use(Authorize.authenticated)
      .get('/find', this.findUserByQuery)
      .get('/:id', this.getById)
  }

  async getById(req, res, next) {
    try {
      let data = await _userService.findById(req.params.id)
      res.send(data)
    } catch (error) { next(error) }

  }


  async findUserByQuery(req, res, next) {
    try {
      let users = await _userService.find(req.query).select('name email work phoneNumber location image netWorth')
      res.send(users)
    } catch (error) { next(error) }
  }
}