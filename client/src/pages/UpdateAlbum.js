import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UpdateAlbum = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [albumData, setAlbumData] = useState({
    nom: '',
    prix_unitaire: '',
    quantite: '',
    img: null,
  });
  const [existingImageName, setExistingImageName] = useState('');

  useEffect(() => {
    const fetchAlbum = async () => {
      try {
        const response = await axios.get(`http://localhost:8800/albums/${id}`);
        setAlbumData(response.data);
        setExistingImageName(response.data.img);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAlbum();
  }, [id]);

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

      await axios.put(`http://localhost:8800/albums/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      navigate('/'); // Redirect to the albums page after successful update
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    navigate('/'); // Redirect to the albums page without updating
  };

  return (
    <div className="d-flex justify-content-center align-items-center h-100">
      <div className="card w-50">
        <div className="card-body">
          <h2 className="mb-4">Update Album</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="nom" className="form-label">Album Name:</label>
              <input
                type="text"
                className="form-control"
                id="nom"
                name="nom"
                value={albumData.nom}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="prix_unitaire" className="form-label">Price:</label>
              <input
                type="text"
                className="form-control"
                id="prix_unitaire"
                name="prix_unitaire"
                value={albumData.prix_unitaire}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="quantite" className="form-label">Quantity:</label>
              <input
                type="text"
                className="form-control"
                id="quantite"
                name="quantite"
                value={albumData.quantite}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="img" className="form-label">Image:</label>
              {existingImageName && (
                <p>Existing Image: {existingImageName}</p>
              )}
              <input
                type="file"
                className="form-control"
                id="img"
                name="img"
                accept="image/*"
                onChange={handleChange}
              />
              
            </div>
            <div className="d-flex justify-content-center">
              <button type="button" className="btn btn-secondary me-2" onClick={handleCancel}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateAlbum;
