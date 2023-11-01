import { Schema, model, Document } from 'mongoose';

interface IEvent extends Document {
  name: string;
  description: string;
  bannerImageUri: string;
  price: number;
  date: Date;
  time: string;
  deployerWalletAddress: string;
}

const eventSchema = new Schema<IEvent>({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  bannerImageUri: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  deployerWalletAddress: {
    type: String,
    required: true,
  },
});

const Event = model<IEvent>('Event', eventSchema);

export default Event;
// share capital account 25,000 the higher the more the dividends
// joint account 
// savings account  