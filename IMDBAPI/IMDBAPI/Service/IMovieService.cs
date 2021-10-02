using System.Collections.Generic;
using IMDB.Model.Response;
using IMDB.Model.Request;

namespace IMDB.Service
{
    public interface IMovieService
    {
        public IEnumerable<MovieResponse> GetAll();
        public MovieResponse Get(int id);
        public void Post(MovieRequest movie);
        public void Delete(int id);
        public void Put(int id, MovieRequest movie);
    }
}