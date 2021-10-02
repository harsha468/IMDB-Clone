using System.Collections.Generic;
using IMDB.Model.Response;
using IMDB.Model.Request;

namespace IMDB.Service
{
    public interface IActorService
    {
        public IEnumerable<ActorResponse> GetAll();
        public ActorResponse Get(int id);
        public IEnumerable<ActorResponse> GetByMovieId(int id);
        public int Post(ActorRequest actor);
        public void Delete(int id);
        public void Put(int id, ActorRequest actor);
    }
}