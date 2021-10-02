using System.Collections.Generic;
using IMDB.Model.DB;

namespace IMDB.Repository
{
    public interface IMovieRepository
    {
        public IEnumerable<Movie> GetAll();
        public Movie Get(int id);
        public void Post(Movie movie,string ActorsIds,string GenresIds);
        public void Delete(int id);
        public void Put(int id, Movie movie, string ActorsIds, string GenresIds);
    }
}