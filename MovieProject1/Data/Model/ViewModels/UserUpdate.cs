using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MovieProject1.Data.Model.ViewModels
{
    public class UserUpdate
    {
        [Required]
        public string Username { get; set; }
        public string Name { get; set; }
        public string Lname { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        [Required]
        public string Role { get; set; }

    }

    public class FavoriteVM
    {
        public List<int> Idd { get; set; }
        public List<int> MovieIDs { get; set; }
        public List<string> MovieIMDB { get; set; }
        public List<string> Title { get; set; }
        public List<string> Poster { get; set; }
    }
    public class FavoriteV
    {
        public List<int> MovieIDs { get; set; }

    }

    public class FavoriteVMC
    {
        public int MovieIDs { get; set; }
        public string MovieIMDB { get; set; }
        public string Title { get; set; }
        public string Poster { get; set; }
    }

}
