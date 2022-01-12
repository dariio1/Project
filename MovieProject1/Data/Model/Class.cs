using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MovieProject1.Data.Model
{
    public class Class
    {
        [Key]
        public int Id { get; set; }
        public string Title { get; set; }
        public string ImdbId { get; set; }
        public string Poster { get; set; }
        public List<Favorite> Favorites { get; set; }
    }
}
