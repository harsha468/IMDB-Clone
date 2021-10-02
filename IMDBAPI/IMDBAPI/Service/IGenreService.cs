using System.Collections.Generic;
using IMDB.Model.Response;
using IMDB.Model.Request;

namespace IMDB.Service
{
    public interface IGenreService
    {
        public IEnumerable<GenreResponse> GetAll();
        public GenreResponse Get(int id);
        public IEnumerable<GenreResponse> GetByMovieId(int id);
        public int Post(GenreRequest genre);
        public void Delete(int id);
        public void Put(int id, GenreRequest genre);
    }
}