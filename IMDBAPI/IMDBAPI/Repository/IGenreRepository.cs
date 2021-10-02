using System.Collections.Generic;
using IMDB.Model.DB;

namespace IMDB.Repository
{
    public interface IGenreRepository
    {
        public IEnumerable<Genre> GetAll();
        public Genre Get(int id);
        public IEnumerable<Genre> GetByMovieId(int movieId);
        public int Post(Genre genre);
        public void Delete(int id);
        public void Put(int id, Genre genre);
    }
}