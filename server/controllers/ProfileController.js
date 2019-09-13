import express from "express";
import UserService from "../services/UserService.js";
import { Authorize } from "../middleware/authorize.js";

let _userService = new UserService().repository

export default class ProfileController {
  constructor() {
    this.router = express.Router()

      .get('/:id', this.getById)
  }

  async getById(req, res, next) {
    try {
      let data = await _userService.findById(req.params.id)
      res.send(data)
    } catch (error) { next(error) }

  }
}