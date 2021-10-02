using System;
using System.Collections.Generic;
using System.Linq;
using IMDB.Model.DB;
using IMDB.Repository;
using Moq;

namespace IMDB.Test.MockResources
{
    public class ActorMock
    {
        public static Mock<IActorRepository> ActorRepoMock = new Mock<IActorRepository>();
        public static int _id = 3;

        public static List<Actor> ListOfActors = new List<Actor>
        {
            new Actor
            {
                Id = 1,
                Name = "Mock Actor 1",
                Bio = "Bio1",
                DOB = Convert.ToDateTime("03/07/2000"),
                Gender = "male"
            },
            new Actor
            {
                Id = 2,
                Name = "Mock Actor 2",
                Bio = "Bio2",
                DOB = Convert.ToDateTime("03/07/2000"),
                Gender = "male"
            }
        };

        public static void MockInitialize()
        {
            ActorRepoMock.Setup(A => A.GetAll()).Returns(ListOfActors);

            ActorRepoMock.Setup(A => A.Get(It.IsAny<int>())).Returns((int id) => ListOfActors.SingleOrDefault(A => A.Id == id));

            ActorRepoMock.Setup(A => A.Post(It.IsAny<Actor>()))
                .Callback((Actor s) => ListOfActors.Add( 
                    new Actor { 
                        Id = _id++,
                        Name = s.Name,
                        DOB = s.DOB,
                        Gender = s.Gender,
                        Bio  = s.Bio
                }));

            ActorRepoMock.Setup(A => A.Put(It.IsAny<int>(), It.IsAny<Actor>()))
                .Callback((int id, Actor s) => {
                    var actor = ListOfActors.SingleOrDefault(A => A.Id == id);
                    actor.Name = s.Name;
                    actor.DOB = s.DOB;
                    actor.Bio = s.Bio;
                    actor.Gender = s.Gender;
                    }
                );

            ActorRepoMock.Setup(_ => _.Delete(It.IsAny<int>()))
                .Callback((int id) => {
                    ListOfActors.RemoveAll((x) => x.Id == id);
                });
        }
    }
}