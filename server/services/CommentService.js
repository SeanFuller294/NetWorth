import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const _schema = new Schema({
  author: { type: String, required: true },
  body: { type: String, required: true },
  postId: { type: ObjectId, ref: 'posts', required: true }
})

export default class CommentService {
  get repository() {
    return mongoose.model('Comment', _schema)
  }
}