using System.Collections.Generic;
using IMDB.Model.DB;

namespace IMDB.Model.Request
{
    public class MovieRequest
    {
        public string Name { get; set; }
        public int YearOfRelease { get; set; }
        public string Plot { get; set; }
        public string ActorsIds { get; set; }
        public string GenresIds { get; set; }
        public int ProducerId { get; set; }
        public string CoverImage { get; set; }
    }
}