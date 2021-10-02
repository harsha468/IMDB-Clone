using System;
using System.Collections.Generic;
using System.Linq;
using IMDB.Model.DB;
using IMDB.Model.Request;
using IMDB.Repository;
using Moq;

namespace IMDB.Test.MockResources
{
    public class MovieMock
    {
        public static Mock<IMovieRepository> MovieRepoMock = new Mock<IMovieRepository>();
        private static int _id = 2;

        private static List<Movie> ListOfMovies = new List<Movie>
        {
            new Movie
            {
                Id = 1,
                Name = "Mock Movie 1",
                YearOfRelease = 2010,
                CoverImage = "XYZ.jpg",
                Plot = "Mock Plot 1",
                ProducerId = 1
            }
        };
        public static Dictionary<int, List<int>> Movie_Actor = new Dictionary<int, List<int>>
        {
            { 1, new List<int> { 1, 2 } }
        };
        public static Dictionary<int, List<int>> Movie_Genre = new Dictionary<int, List<int>>
        {
            { 1, new List<int> { 1, 2 } }
        };
        public static void MockInitialize()
        {
            ActorMock.ActorRepoMock.Setup(A => A.GetByMovieId(It.IsAny<int>()))
                .Returns((int movieId) => ActorMock.ListOfActors
                .Where( A => Movie_Actor.SingleOrDefault(x => x.Key == movieId).Value.Contains(A.Id)));

            GenreMock.GenreRepoMock.Setup(A => A.GetByMovieId(It.IsAny<int>()))
                .Returns((int movieId) => GenreMock.ListOfGenres
                .Where( G => Movie_Genre.SingleOrDefault(x => x.Key == movieId).Value.Contains(G.Id)));

            ProducerMock.ProducerRepoMock.Setup(A => A.Get(It.IsAny<int>()))
                .Returns((int id) => ProducerMock.ListOfProducers
                .SingleOrDefault(P => id == P.Id));

            MovieRepoMock.Setup(M => M.GetAll()).Returns(ListOfMovies);
            MovieRepoMock.Setup(M => M.Get(It.IsAny<int>())).Returns((int id) => ListOfMovies.SingleOrDefault(M => M.Id == id));
            MovieRepoMock.Setup(M => M.Post(It.IsAny<Movie>(), It.IsAny<string>(), It.IsAny<string>()))
                .Callback((Movie movie, string actorsIds, string genresIds) =>
                {
                    movie.Id = _id++;
                    ListOfMovies.Add(movie);
                    Movie_Actor.Add(movie.Id, actorsIds.Split(",").Select(x => Convert.ToInt32(x)).ToList());
                    Movie_Genre.Add(movie.Id, genresIds.Split(",").Select(x => Convert.ToInt32(x)).ToList());
                });
            MovieRepoMock.Setup(M => M.Put(It.IsAny<int>(),  It.IsAny<Movie>(), It.IsAny<string>(), It.IsAny<string>()))
                .Callback((int id, Movie movieObject, string actorsIds, string genresIds) =>
                {
                    var Movie = ListOfMovies.SingleOrDefault(M => M.Id == id);
                    Movie.Name = movieObject.Name;
                    Movie.Plot = movieObject.Plot;
                    Movie.YearOfRelease = movieObject.YearOfRelease;
                    Movie.ProducerId = movieObject.ProducerId;
                    Movie.CoverImage = movieObject.CoverImage;
                    Movie_Actor[movieObject.Id] = actorsIds.Split(",").Select(x => Convert.ToInt32(x)).ToList();
                    Movie_Genre[movieObject.Id] = genresIds.Split(",").Select(x => Convert.ToInt32(x)).ToList();
                });
        }
    }
}