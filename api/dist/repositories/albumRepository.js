"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _typeorm = require("typeorm");
var _album = require("../entities/album.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var AlbumRepository = /*#__PURE__*/function () {
  function AlbumRepository(connection) {
    _classCallCheck(this, AlbumRepository);
    this.albumRepository = connection.getRepository(_album.AlbumSchema);
    var albumMetadata = connection.getMetadata(_album.Album);
    console.log(albumMetadata);
  }
  _createClass(AlbumRepository, [{
    key: "getAllAlbums",
    value: function getAllAlbums() {
      console.log("all");
      return this.albumRepository.find();
    }
  }, {
    key: "getAlbumById",
    value: function getAlbumById(id) {
      return this.albumRepository.findOne(id);
    }
  }, {
    key: "addAlbum",
    value: function addAlbum(albumData) {
      var album = this.albumRepository.create(albumData);
      return this.albumRepository.save(album);
    }
  }, {
    key: "updateAlbum",
    value: function updateAlbum(albumData) {
      return this.albumRepository.save(albumData);
    }
  }, {
    key: "deleteAlbum",
    value: function deleteAlbum(id) {
      var album = this.albumRepository.create({
        id: id
      });
      return this.albumRepository.remove(album);
    }
  }]);
  return AlbumRepository;
}();
var _default = AlbumRepository;
exports["default"] = _default;