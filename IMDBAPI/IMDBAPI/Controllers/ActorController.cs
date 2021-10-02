using IMDB.Model.Request;
using IMDB.Service;
using Microsoft.AspNetCore.Mvc;
using System;

namespace IMDB.Controllers
{
    [ApiController]
    [Route("actors")]
    public class ActorController : ControllerBase
    {
        private  readonly IActorService _actorService;
        public ActorController(IActorService actorService)
        {
            _actorService = actorService;
        }
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_actorService.GetAll());
        }
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var actor = _actorService.Get( id );
            return actor is null ? NotFound(): Ok( actor );
        }
        [HttpPost]
        public IActionResult Post([FromBody] ActorRequest actor)
        {
            try
            {
                return Ok(_actorService.Post(actor));
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex);
            }
        }
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _actorService.Delete( id );
            return Ok();
        }
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] ActorRequest actor)
        {
            try
            {
                _actorService.Put(id, actor);
                return Ok();
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex);
            }
        }
    }
}