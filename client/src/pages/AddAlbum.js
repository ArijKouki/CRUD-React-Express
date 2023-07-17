import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Card, Form, Button } from 'react-bootstrap';

const AddAlbum = () => {
  const navigate = useNavigate();
  const [albumData, setAlbumData] = useState({
    nom: '',
    prix_unitaire: '',
    quantite: '',
    img: null,
  });

  const handleChange = (e) => {
    if (e.target.name === 'img') {
      setAlbumData({ ...albumData, img: e.target.files[0] });
    } else {
      setAlbumData({ ...albumData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('nom', albumData.nom);
      formData.append('prix_unitaire', albumData.prix_unitaire);
      formData.append('quantite', albumData.quantite);
      if (albumData.img) {
        formData.append('img', albumData.img);
      }

      await axios.post('http://localhost:8800/albums', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      navigate('/'); // Redirect to the albums page after successful addition
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    navigate('/'); // Redirect to the albums page without updating
  };


  return (
    <div className="d-flex justify-content-center align-items-center h-100">
      <Card className="w-50">
        <Card.Body>
          <h2 className="mb-4">Add Album</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="nom">
              <Form.Label>Album Name:</Form.Label>
              <Form.Control
                type="text"
                name="nom"
                value={albumData.nom}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="prix_unitaire">
              <Form.Label>Price:</Form.Label>
              <Form.Control
                type="text"
                name="prix_unitaire"
                value={albumData.prix_unitaire}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="quantite">
              <Form.Label>Quantity:</Form.Label>
              <Form.Control
                type="text"
                name="quantite"
                value={albumData.quantite}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="img">
              <Form.Label>Image:</Form.Label>
              <Form.Control
                type="file"
                name="img"
                accept="image/*"
                onChange={handleChange}
              />
            </Form.Group>
            <div className="d-flex justify-content-center">
              <button type="button" className="btn btn-secondary me-2" onClick={handleCancel}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Add
              </button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default AddAlbum;
