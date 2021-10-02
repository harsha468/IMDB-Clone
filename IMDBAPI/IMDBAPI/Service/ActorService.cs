using System;
using System.Collections.Generic;
using System.Linq;
using IMDB.Model.DB;
using IMDB.Model.Request;
using IMDB.Model.Response;
using IMDB.Repository;

namespace IMDB.Service
{
    public class ActorService : IActorService
    {
        private readonly IActorRepository _actorRepository;
        public ActorService(IActorRepository actorRepository)
        {
            _actorRepository = actorRepository;
        }
        public IEnumerable<ActorResponse> GetAll()
        {
            var actors = _actorRepository.GetAll();
            return actors.Select(a => new ActorResponse
            {
                Id = a.Id,
                Name = a.Name,
                DOB = a.DOB,
                Bio = a.Bio,
                Gender = a.Gender
            });
        }
        public ActorResponse Get(int id)
        {
            var actor = _actorRepository.Get(id);
            return actor is null ? null : new  ActorResponse
            {
                Id = actor.Id,
                Name = actor.Name,
                DOB = actor.DOB,
                Bio = actor.Bio,
                Gender = actor.Gender
            };
        }
        public IEnumerable<ActorResponse> GetByMovieId(int id)
        {
            var actors =  _actorRepository.GetByMovieId(id);
            return actors.Select(a => new ActorResponse
            {
                Id = a.Id,
                Name = a.Name,
                DOB = a.DOB,
                Bio = a.Bio,
                Gender = a.Gender
            });
        }
        public int Post(ActorRequest actor)
        {
            if(actor.DOB < Convert.ToDateTime("01/01/1920") || actor.DOB > DateTime.Now)
                throw new ArgumentException();
            if(string.IsNullOrEmpty(actor.Name) || string.IsNullOrEmpty(actor.Bio) || string.IsNullOrEmpty(actor.Gender))
                throw new ArgumentException();
            var actorObject = new Actor
            {
                Name = actor.Name,
                DOB = actor.DOB,
                Bio = actor.Bio,
                Gender = actor.Gender
            };
            return _actorRepository.Post(actorObject);
        }
        public void Delete(int id)
        {
            _actorRepository.Delete(id);
        }
        public void Put(int id, ActorRequest actor)
        {
            if (actor.DOB < Convert.ToDateTime("01/01/1920") || actor.DOB > DateTime.Now)
                throw new ArgumentException();
            if (string.IsNullOrEmpty(actor.Name) || string.IsNullOrEmpty(actor.Bio) || string.IsNullOrEmpty(actor.Gender))
                throw new ArgumentException();
            var actorObject = new Actor
            {
                Id = id,
                Name = actor.Name,
                DOB = actor.DOB,
                Bio = actor.Bio,
                Gender = actor.Gender
            };
            _actorRepository.Put(id, actorObject);
        }
    }
}