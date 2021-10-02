using System.Collections.Generic;
using System.Linq;
using IMDB.Model.DB;
using IMDB.Repository;
using Moq;

namespace IMDB.Test.MockResources
{
    public class GenreMock
    {
        public static Mock<IGenreRepository> GenreRepoMock = new Mock<IGenreRepository>();
        public static int _id = 3;

        public static List<Genre> ListOfGenres = new List<Genre>
        {
            new Genre
            {
                Id = 1,
                Name = "Mock Genre 1"
            },
            new Genre
            {
                Id = 2,
                Name = "Mock Genre 2"
            }
        };

        public static void MockInitialize()
        {
            GenreRepoMock.Setup(A => A.GetAll()).Returns(ListOfGenres);

            GenreRepoMock.Setup(A => A.Get(It.IsAny<int>())).Returns((int id) => ListOfGenres.SingleOrDefault(A => A.Id == id));

            GenreRepoMock.Setup(A => A.Post(It.IsAny<Genre>()))
                .Callback((Genre s) => ListOfGenres.Add(
                    new Genre
                    {
                        Id = _id++,
                        Name = s.Name
                    }));

            GenreRepoMock.Setup(A => A.Put(It.IsAny<int>(), It.IsAny<Genre>()))
                .Callback((int id, Genre s) => {
                    var genre = ListOfGenres.SingleOrDefault(A => A.Id == id);
                    genre.Name = s.Name;
                });

            GenreRepoMock.Setup(_ => _.Delete(It.IsAny<int>()))
                .Callback((int id) => {
                    ListOfGenres.RemoveAll((x) => x.Id == id);
                });
        }
    }
}