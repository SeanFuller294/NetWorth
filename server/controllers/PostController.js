import express from 'express';
import PostService from '../services/PostService.js';
import CommentService from '../services/CommentService.js';
import { Authorize } from "../middleware/authorize.js";
import { userInfo } from 'os';

let _postService = new PostService().repository
let _commentService = new CommentService().repository

export default class PostController {
  constructor() {
    this.router = express.Router()
      .get('', this.getAllById)
      .get('/:id', this.getById)
      .use(Authorize.authenticated)
      .post('', this.create)
      .delete('/:id', this.delete)
  }

  async getAllById(req, res, next) {
    try {
      let data = await _postService.find({})
      return res.send(data)
    } catch (error) { next(error) }
  }

  async getById(req, res, next) {
    try {
      let data = await _postService.findById(req.params.id)
      if (!data) {
        throw new Error("Invalid Id")
      }
      res.send(data)
    } catch (error) { next(error) }
  }

  async create(req, res, next) {
    try {
      req.body.author = req.session.uid
      let data = await _postService.create(req.body)
      res.send(data)
    } catch (err) {
      console.error(err)
      next(err)
    }
  }

  async delete(req, res, next) {
    let data = await _postService.findOneAndRemove({ _id: req.params.id, author: req.session.uid })
    if (!data) {
      throw new Error("Denied: invalid id")
    }
    res.send("deleted value")
  }
}