using System;
using System.Collections.Generic;
using System.Linq;
using IMDB.Model.DB;
using IMDB.Repository;
using Moq;

namespace IMDB.Test.MockResources
{
    public class ProducerMock
    {
        public static readonly Mock<IProducerRepository> ProducerRepoMock = new Mock<IProducerRepository>();
        public static int _id = 3;

        public static List<Producer> ListOfProducers = new List<Producer>
        {
            new Producer
            {
                Id = 1,
                Name = "Mock Producer 1",
                Bio = "Bio1",
                DOB = Convert.ToDateTime("03/07/2000"),
                Gender = "male"
            },
            new Producer
            {
                Id = 2,
                Name = "Mock Producer 2",
                Bio = "Bio2",
                DOB = Convert.ToDateTime("03/07/2000"),
                Gender = "male"
            }
        };

        public static void MockInitialize()
        {
            ProducerRepoMock.Setup(P => P.GetAll()).Returns(ListOfProducers);

            ProducerRepoMock.Setup(P => P.Get(It.IsAny<int>())).Returns((int id) => ListOfProducers.SingleOrDefault(P => P.Id == id));

            ProducerRepoMock.Setup(P => P.Post(It.IsAny<Producer>()))
                .Callback((Producer s) => ListOfProducers.Add(
                    new Producer
                    {
                        Id = _id++,
                        Name = s.Name,
                        DOB = s.DOB,
                        Gender = s.Gender,
                        Bio = s.Bio
                    }));

            ProducerRepoMock.Setup(P => P.Put(It.IsAny<int>(), It.IsAny<Producer>()))
                .Callback((int id, Producer s) => {
                    var producer = ListOfProducers.SingleOrDefault(P => P.Id == id);
                    producer.Name = s.Name;
                    producer.DOB = s.DOB;
                    producer.Bio = s.Bio;
                    producer.Gender = s.Gender;
                });

            ProducerRepoMock.Setup(_ => _.Delete(It.IsAny<int>()))
                .Callback((int id) => {
                    ListOfProducers.RemoveAll((x) => x.Id == id);
                });
        }
    }
}