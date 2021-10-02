using System.Collections.Generic;
using System.Linq;
using IMDB.Model.DB;
using IMDB.Model.Request;
using IMDB.Model.Response;
using IMDB.Repository;

namespace IMDB.Service
{
    public class MovieService : IMovieService
    {
        private readonly IMovieRepository _movieRepository;
        private readonly IActorService _actorService;
        private readonly IGenreService _genreService;
        private readonly IProducerService _producerSevice;
        public MovieService(IMovieRepository movieRepository, IActorService actorService, IGenreService genreService, IProducerService producerService)
        {
            _movieRepository = movieRepository;
            _actorService = actorService;
            _genreService = genreService;
            _producerSevice = producerService;
        }
        public IEnumerable<MovieResponse> GetAll()
        {
            var movies = _movieRepository.GetAll();
            return movies is null ? null : movies.Select(m => new MovieResponse
            {
                Id = m.Id,
                Name = m.Name,
                YearOfRelease = m.YearOfRelease,
                Plot = m.Plot,
                Actors = _actorService.GetByMovieId(m.Id),
                Genres = _genreService.GetByMovieId(m.Id),
                Producer = _producerSevice.Get(m.ProducerId),
                CoverImage = m.CoverImage
            });
        }
        public MovieResponse Get(int id)
        {
            var movie = _movieRepository.Get(id);
            return movie is null ? null : new MovieResponse
            {
                Id = movie.Id,
                Name = movie.Name,
                YearOfRelease = movie.YearOfRelease,
                Actors = _actorService.GetByMovieId(movie.Id),
                Genres = _genreService.GetByMovieId(movie.Id),
                Plot = movie.Plot,
                Producer = _producerSevice.Get(movie.ProducerId),
                CoverImage = movie.CoverImage
            };
        }
        public void Post(MovieRequest movie)
        {
            var movieObject = new Movie
                {
                    Name = movie.Name,
                    YearOfRelease = movie.YearOfRelease,
                    Plot = movie.Plot,
                    ProducerId = movie.ProducerId,
                    CoverImage = movie.CoverImage
                };
            _movieRepository.Post(movieObject, movie.ActorsIds, movie.GenresIds);
        }
        public void Delete(int id)
        {
            _movieRepository.Delete(id);
        }
        public void Put(int id, MovieRequest movie)
        {
            var movieObject = new Movie
                {
                    Id = id,
                    Name = movie.Name,
                    YearOfRelease = movie.YearOfRelease,
                    Plot = movie.Plot,
                    ProducerId = movie.ProducerId,
                    CoverImage = movie.CoverImage
                };
            _movieRepository.Put(id, movieObject, movie.ActorsIds, movie.GenresIds);
        }
    }
}