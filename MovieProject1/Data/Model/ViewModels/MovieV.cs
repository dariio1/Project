using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MovieProject1.Data.Model.ViewModels
{
    public class MovieV
    {
        public string Name { get; set; }
        public string Director { get; set; }
        public string Genre { get; set; }
        public float Rate { get; set; }
        public bool IsWatched { get; set; }
    }
}
