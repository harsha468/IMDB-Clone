using System.Collections.Generic;
using IMDB.Model.DB;

namespace IMDB.Repository
{
    public interface IActorRepository
    {
        public IEnumerable<Actor> GetAll();
        public Actor Get(int id);
        public IEnumerable<Actor> GetByMovieId(int movieId);
        public int Post(Actor actor);
        public void Delete(int id);
        public void Put(int id, Actor actor);
    }
}