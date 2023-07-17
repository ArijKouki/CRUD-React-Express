import { Album } from "../entities/album.js";

export class AlbumRepository {
  constructor() {
    this.albumModel = Album;
  }
  getAllAlbums() {
    return this.albumModel.findAll();
  }

  getAlbumById(id) {
    return this.albumModel.findByPk(id);
  }

  getAlbumsByName(name) {
    const albums = this.albumModel.findAll({
      where: {
        nom: name,
      },
    });
    return albums;
  }

  addAlbum(albumData) {
    return this.albumModel.create(albumData);
  }

  updateAlbum(albumId, updatedAlbumData) {
    return this.albumModel.update(updatedAlbumData, { where: { id: albumId } });
  }
  

  deleteAlbum(id) {
    return this.albumModel.destroy({ where: { id } });
  }
}

export default AlbumRepository;
