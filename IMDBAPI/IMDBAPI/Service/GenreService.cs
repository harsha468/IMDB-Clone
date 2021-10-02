using System.Collections.Generic;
using IMDB.Model.Response;
using IMDB.Model.Request;
using IMDB.Repository;
using System.Linq;
using IMDB.Model.DB;
using System;

namespace IMDB.Service
{
    public class GenreService : IGenreService
    {
        private readonly IGenreRepository _genreRepository;
        public GenreService(IGenreRepository genreRepository)
        {
            _genreRepository = genreRepository;
        }
        public IEnumerable<GenreResponse> GetAll()
        {
            var genres = _genreRepository.GetAll();
            return genres.Select(g => new GenreResponse
            {
                Id = g.Id,
                Name = g.Name,
            });
        }
        public GenreResponse Get(int id)
        {
            var genre = _genreRepository.Get(id);
            return genre is null ? null : new GenreResponse
            {
                Id = genre.Id,
                Name = genre.Name
            };
        }
        public IEnumerable<GenreResponse> GetByMovieId(int id)
        {
            var genres =  _genreRepository.GetByMovieId(id);
            return genres.Select(g => new GenreResponse
            {
                Id = g.Id,
                Name = g.Name
            });
        }
        public int Post(GenreRequest genre)
        {
            if (string.IsNullOrEmpty(genre.Name) )
                throw new ArgumentException();
            var genreObject = new Genre
            {
                Name = genre.Name,
            };
            return _genreRepository.Post(genreObject);
        }
        public void Delete(int id)
        {
            _genreRepository.Delete(id);
        }
        public void Put(int id, GenreRequest genre)
        {
            if (string.IsNullOrEmpty(genre.Name))
                throw new ArgumentException();
            var genreObject = new Genre
            {
                Id = id,
                Name = genre.Name,
            };
            _genreRepository.Put(id, genreObject);
        }
    }
}