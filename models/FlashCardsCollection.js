import { Schema, model, models } from 'mongoose';
import FlashCard from './FlashCard';

const fcCollectionsSchema = Schema({
    creator: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: false
    },
    flashCards: {
      type: [FlashCard.schema],
      required: true
    }
  })

const FlashCardsCollection = models.FlashCardsCollection || model('FlashCardsCollection', fcCollectionsSchema)   

export default FlashCardsCollection;