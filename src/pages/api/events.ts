// pages/api/events.js
import { v4 as uuidv4 } from 'uuid';
import cloudinary from 'cloudinary';
import multer from 'multer';
import initMiddleware from '../../lib/init-middleware';
import Event from '../../Database/Models/Events';
import ConnectDb from '../../Database/db';

// Cloudinary configuration
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer configuration for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

export default async function handler(req:any, res:any) {
  if (req.method === 'POST') {
    try {
      const { name, description, price, date, time, deployerWalletAddress } =
        req.body;
      const image = req.file;

      if (!image) {
        return res.status(400).json({ message: 'Image file is required' });
      }

      // Generate a unique filename
      const filename = `${uuidv4()}-${image.originalname}`;

      // Convert buffer to a string
      const imageString = image.buffer.toString('base64');

      // Upload image to Cloudinary
      const uploadedImage = await cloudinary.v2.uploader.upload(
        `data:image/jpeg;base64,${imageString}`,
        {
          public_id: filename,
          overwrite: true,
        }
      );

      const event = new Event({
        name,
        description,
        bannerImageUri: uploadedImage.secure_url,
        price,
        date,
        time,
        deployerWalletAddress,
      });

      await event.save();

      res.status(201).json({ message: 'Event created successfully', event });
    } catch (error) {
      console.error('Failed to create event:', error);
      res.status(500).json({ message: error });
    }
  } else if (req.method === 'GET') {
    try {
      const events = await Event.find();
      res.status(200).json({ events });
    } catch (error) {
      console.error('Failed to get events:', error);
      res.status(500).json({ message: 'Failed to get events' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}

// Initialize the database connection
ConnectDb();

// Exporting the configuration for handling file uploads
export const config = {
  api: {
    bodyParser: false, // Disabling the default body parsing
  },
};
