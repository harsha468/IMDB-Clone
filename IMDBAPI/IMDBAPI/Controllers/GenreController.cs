using IMDB.Model.Request;
using IMDB.Service;
using Microsoft.AspNetCore.Mvc;
using System;

namespace IMDB.Controllers
{
    [ApiController]
    [Route("genres")]
    public class GenreController : ControllerBase
    {
        private  readonly IGenreService _genreService;
        public GenreController(IGenreService genreService)
        {
            _genreService = genreService;
            
        }
        [HttpGet]
        public IActionResult Get()
        {
            var genres = _genreService.GetAll();
            return Ok(genres); 
        }
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var genre = _genreService.Get(id);
            return genre is null ? NotFound(): Ok( genre );
        }
        [HttpPost]
        public IActionResult Post([FromBody]GenreRequest genre)    
        {
            try
            {
                return Ok(_genreService.Post(genre));
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex);
            }
        }
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _genreService.Delete( id );
            return Ok();
        }
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] GenreRequest genre)
        {
            try
            {
                _genreService.Put(id, genre);
                return Ok();
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex);
            }
        }
    }
}