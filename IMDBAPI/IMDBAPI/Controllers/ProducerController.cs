using IMDB.Model.Request;
using IMDB.Service;
using Microsoft.AspNetCore.Mvc;
using System;

namespace IMDB.Controllers
{
    [ApiController]
    [Route("producers")]
    public class ProducerController : ControllerBase
    {
        private  readonly IProducerService _producerService;
        public ProducerController(IProducerService producerService)
        {
            _producerService = producerService;
        }
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_producerService.GetAll());
        }
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var producer = _producerService.Get( id );
            return producer is null ? NotFound() : Ok(producer);
        }
        [HttpPost]
        public IActionResult Post([FromBody]ProducerRequest producer)    
        {
            try
            {
                return Ok(_producerService.Post(producer));
            }
            catch (ArgumentException ex)
            {
                return BadRequest();
            }
        }
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _producerService.Delete(id);
            return Ok();
        }
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] ProducerRequest producer)
        {
            try
            {
                _producerService.Put(id, producer);
                return Ok();
            }
            catch (ArgumentException ex)
            {
                return BadRequest();
            }
        }
    }
}