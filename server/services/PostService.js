import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const _schema = new Schema({
  title: { type: String, required: true },
  author: { type: ObjectId, ref: 'user', required: true },
  body: { type: String, required: true },
  likes: { type: Number, required: true },
  dislikes: { type: Number, required: true },
  commentCounter: { type: Number, required: true },
  voters: [{ type: ObjectId, ref: 'user', unique: true }]
})

export default class PostService {
  get repository() {
    return mongoose.model('Post', _schema)
  }
}