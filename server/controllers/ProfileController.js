import express from "express";
import UserService from "../services/UserService.js";
import { Authorize } from "../middleware/authorize.js";
import PostService from "../services/PostService.js";

let _userService = new UserService().repository
let _postService = new PostService().repository

export default class ProfileController {
  constructor() {
    this.router = express.Router()

      .use(Authorize.authenticated)
      .get('/find', this.findUserByQuery)
      .get('/:id', this.getById)
      .get('/:id/posts', this.getPostsByUserId)
  }

  async getById(req, res, next) {
    try {
      let data = await _userService.findById(req.params.id)
      res.send(data)
    } catch (error) { next(error) }

  }


  async findUserByQuery(req, res, next) {
    try {
      let user = await _userService.findOne(req.query).select('name email work phoneNumber location image netWorth')
      if (!user) { throw new Error("No user found") }
      res.send(user)
    } catch (error) { next(error) }
  }

  async getPostsByUserId(req, res, next) {
    try {
      let posts = await _postService.find({ author: req.params.id })
      res.send(posts)
    } catch (error) { next(error) }
  }
}