import { TeamAttributes } from '@adapters/repositories/attributes'
import mongoose from 'mongoose'

export type TeamDocument = TeamAttributes & mongoose.Document

const TeamSchema = new mongoose.Schema({
  _id: {
    type: String,
    trim: true
  },
  name: {
    type: String,
    trim: true,
    required: true
  },
  fullName: {
    type: String,
    trim: true,
    required: true
  }
})

export const TeamModel = mongoose.model<TeamDocument>('Team', TeamSchema)
