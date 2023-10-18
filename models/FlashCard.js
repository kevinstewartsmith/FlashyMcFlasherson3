import { Schema, model, models } from 'mongoose';

const flashCardSchema = Schema({
  
    front: {
      type: String,
      required: true
    },
    back: {
      type: String,
      required: true
    },
    collectionID: {
      type: Schema.Types.ObjectId,
      ref: 'FlashCardsCollection',
      required: true
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }

  
  })

const FlashCard = models.FlashCard || model('FlashCard', flashCardSchema)

export default FlashCard;