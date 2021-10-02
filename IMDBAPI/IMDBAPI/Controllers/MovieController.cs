using IMDB.Model.Request;
using IMDB.Service;
using Microsoft.AspNetCore.Mvc;
using Firebase.Storage;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using System;

namespace IMDB.Controllers
{
    [ApiController]
    [Route("movies")]
    public class MovieController : ControllerBase
    {
        private  readonly IMovieService _movieService;
        public MovieController(IMovieService movieService)
        {
            _movieService = movieService;
        }
        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_movieService.GetAll());
        }
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var movie = _movieService.Get( id );
            return movie is null ? NotFound() : Ok( movie );
        } 
        [HttpPost]
        public IActionResult Post( [FromBody] MovieRequest movie)    
        {
            _movieService.Post( movie);
            return Ok();
        }
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            if (_movieService.Get(id) is null)
                return NotFound();
            _movieService.Delete(id);
            return Ok();
        }
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] MovieRequest movie)
        {
            _movieService.Put(id, movie);
            return Ok();
        }
        [HttpPost("upload")]
        public async Task<IActionResult> UploadFile(IFormFile file)
        {
            if (file == null || file.Length == 0)
                return Content("file not selected");
            var task = await new FirebaseStorage("imdbapi-5b509.appspot.com")
                    .Child("MovieImages")
                    .Child(Guid.NewGuid().ToString() + ".jpg" )
                    .PutAsync(file.OpenReadStream());
            return Ok(task);
        }
    }
}