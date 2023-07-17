import express from 'express';
import AlbumRepository from '../repositories/albumRepository.js';
import { Album } from '../entities/album.js';
import multer from 'multer';


const router = express.Router();
const albumRepo = new AlbumRepository();

// Get all albums
router.get('/', async (req, res) => {
  try {
    const albums = await albumRepo.getAllAlbums();
    res.json(albums);
    console.log(albums);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve albums' });
  }
});

// Get an album by id
router.get('/:id(\\d+)', async (req, res) => {
  const albumId = req.params.id;

  try {
    const album = await albumRepo.getAlbumById(albumId);

    if (!album) {
      res.status(404).json({ error: 'Album not found' });
    } else {
      res.json(album);
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve album' });
  }
});

// Get an album by name
router.get('/:nom', async (req, res) => {
  const albumName = req.params.nom;

  try {
    const albums = await albumRepo.getAlbumsByName(albumName);

    if (!albums || albums.length === 0) {
        res.json({ message: 'No albums found' });
    } else {
        console.log(albums)
      res.json(albums);
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve album' });
  }
});

// Multer configuration for image upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'src/images');
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });
  const upload = multer({ storage: storage });
  
  // Add a new album
  router.post('/', upload.single('img'), async (req, res) => {
    try {
      const { nom, prix_unitaire, quantite } = req.body;
      let img = null;
  
      if (req.file) {
        img = req.file.filename;
      }
  
      const album = await Album.create({
        nom,
        prix_unitaire,
        quantite,
        img,
      });
  
      res.status(201).json(album);
    } catch (error) {
      res.status(500).json({ error: 'Failed to add album' });
    }
  });
  

// Update an album
router.put('/:id', upload.single('img'), async (req, res) => {
    const albumId = req.params.id;
    const { nom, prix_unitaire, quantite } = req.body;
    const updatedAlbumData = {};
    console.log(req.body);
  
    if (nom) updatedAlbumData.nom = nom;
    if (prix_unitaire) updatedAlbumData.prix_unitaire = prix_unitaire;
    if (quantite) updatedAlbumData.quantite = quantite;
    if (req.file) updatedAlbumData.img = req.file.filename; // Store the filename if a new image is uploaded
  
    try {
      if (!req.file) {
        // If no new image is uploaded, exclude the 'img' field from the update
        delete updatedAlbumData.img;
      }
      const album = await albumRepo.updateAlbum(albumId, updatedAlbumData);
      if (!album) {
        res.status(404).json({ error: 'Album not found' });
      } else {
        res.json(album);
      }
    } catch (err) {
      res.status(500).json({ error: 'Failed to update album' });
    }
  });
  

// Delete an album
router.delete('/:id', async (req, res) => {
  const albumId = req.params.id;
  try {
    const album = await albumRepo.deleteAlbum(albumId);
    if (!album) {
      res.status(404).json({ error: 'Album not found' });
    } else {
      res.json(album);
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete album' });
  }
});

export default router;
