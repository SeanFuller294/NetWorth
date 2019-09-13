import express from 'express';
import PostService from '../services/PostService.js';
import CommentService from '../services/CommentService.js';
import { Authorize } from "../middleware/authorize.js";
import { userInfo } from 'os';

let _postService = new PostService().repository
let _commentService = new CommentService().repository

export default class CommentController {
  constructor() {
    this.router = express.Router()
      .get('/:id', this.getAllComments)
      .use(Authorize.authenticated)
      .post('', this.create)
      .delete('/:id', this.delete)
  }
  async getAllComments(req, res, next) {
    try {
      let data = await _commentService.find({})
      return res.send(data)
    } catch (error) { next(error) }
  }

  async create(req, res, next) {
    req.body.id = req.session.uid
    let data = await _commentService.create(req.body)
    res.send(data)
  }

  async delete(req, res, next) {
    let data = await _commentService.findOneAndRemove({ _id: req.params.id, author: req.session.uid })
    if (!data) {
      throw new Error("Denied: invalid id")
    }
    res.send("deleted value")
  }
}