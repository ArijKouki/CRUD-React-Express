import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Modal, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Albums = () => {
  const navigate = useNavigate();
  const [albums, setAlbums] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchAlbums();
  }, []);

  const fetchAlbums = async () => {
    try {
      const response = await axios.get('http://localhost:8800/albums');
      setAlbums(response.data);
    } catch (error) {
      console.error('Error fetching albums:', error);
    }
  };

  const openConfirmationModal = (album) => {
    setSelectedAlbum(album);
    setShowConfirmationModal(true);
  };

  const closeConfirmationModal = () => {
    setSelectedAlbum(null);
    setShowConfirmationModal(false);
  };

  const deleteAlbum = async (album) => {
    try {
      await axios.delete(`http://localhost:8800/albums/${album.id}`);
      fetchAlbums();
      closeConfirmationModal();
    } catch (error) {
      console.error('Error deleting album:', error);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:8800/albums/${searchTerm}`);
      setAlbums(response.data);
    } catch (error) {
      console.error('Error searching albums:', error);
    }
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="container">
  <h2 className="my-4"></h2>
  <div className="d-flex justify-content-center align-items-center my-4">
    <Form onSubmit={handleSearch} className="w-75">
      <Form.Group className="d-flex">
        <Form.Control
          type="text"
          value={searchTerm}
          onChange={handleChange}
          placeholder="Search by album name"
          className="mr-2 flex-grow-1"
        />
        <Button type="submit" variant="primary">Search</Button>
      </Form.Group>
    </Form>
  </div>



  <div className="row mb-4">
  {Array.isArray(albums) && albums.length > 0 ? (
    <>
      {albums.map((album) => (
        <div key={album.id} className="col-md-4 mb-4">
          <div className="card">
            {album.img && (
              <img src={`http://localhost:8800/images/${album.img}`} className="card-img-top" alt={album.nom} />
            )}
            <div className="card-body d-flex flex-column justify-content-center align-items-center">
              <h5 className="card-title">{album.nom}</h5>
              <p className="card-text">Prix: {album.prix_unitaire}</p>
              <p className="card-text">Quantite: {album.quantite}</p>
              <div className='d-flex'>
              <Link to={`/update/${album.id}`} className="btn btn-primary me-2">
                Update
               </Link>
               <button className="btn btn-danger" onClick={() => openConfirmationModal(album)}>
                Delete
               </button>
              </div>
            </div>
          </div>
        </div>
      ))}
     <div className="col-md-12 d-flex justify-content-center align-items-center flex-column">
  {searchTerm !== ''&& (
    <button className="btn btn-secondary mb-4" onClick={() => window.location.reload()}>
      Go Back
    </button>
  )}
</div>


    </>
  ) : (
    <div className="col-md-12 d-flex justify-content-center align-items-center flex-column">
      <h2>No albums found.</h2>
      <button className="btn btn-secondary mt-4" onClick={() => window.location.reload()}>
        Go Back
      </button>
    </div>
  )}
  
    <div className="fixed-bottom d-flex justify-content-end p-3">
      <button className="btn btn-success">
        <Link to="/add" style={{ color: 'inherit', textDecoration: 'none' }}>
          Add New Album
        </Link>
      </button>
    </div>
 
</div>






      

      <Modal show={showConfirmationModal} onHide={closeConfirmationModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete the album?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeConfirmationModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => deleteAlbum(selectedAlbum)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Albums;
