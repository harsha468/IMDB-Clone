using IMDB.Model.Request;
using IMDB.Service;
using Microsoft.AspNetCore.Mvc;

namespace IMDB.Controllers
{
    [ApiController]
    [Route("movies/{movieId}/reviews")]
    public class ReviewController : ControllerBase
    {
        private  readonly IReviewService _reviewService;
        public ReviewController(IReviewService reviewService)
        {
            _reviewService = reviewService;
        }
        [HttpGet]
        public IActionResult GetAll(int movieId)
        {
            var reviews = _reviewService.GetAll( movieId );
            return reviews is null ? NotFound() : Ok( reviews );
        }
        [HttpGet("{reviewId}")]
        public IActionResult Get(int movieId, int reviewId)
        {
            var reviews = _reviewService.Get( movieId, reviewId );
            return reviews is null ? NotFound() : Ok( reviews );
        }
        [HttpPost]
        public IActionResult Post(int movieId, [FromBody]ReviewRequest review)    
        {
            _reviewService.Post( movieId, review );
            return Ok();
        }
        [HttpDelete("{reviewId}")]
        public IActionResult Delete(int movieId, int reviewId)
        {
            _reviewService.Delete(movieId, reviewId);
            return Ok();
        }
        [HttpPut("{reviewId}")]
        public IActionResult Put(int movieId, int reviewId, [FromBody] ReviewRequest review )
        {
            _reviewService.Put( movieId, reviewId, review );
            return Ok();
        }
    }
}