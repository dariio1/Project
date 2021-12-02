using MovieProject1.Data.Model;
using MovieProject1.Data.Model.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MovieProject1.Data.Service
{
    public class MovieService
    {
        private AppDbContext _db;
        public MovieService(AppDbContext context)
        {
            _db = context;
        }

        public void AddMovie(MovieV movie) 
        {
            var _movie = new Movie()
            {
                Name = movie.Name,
                Director = movie.Director,
                Genre = movie.Genre,
                Rate = movie.Rate,
                IsWatched = movie.IsWatched

            };
            _db.Movies.Add(_movie);
            _db.SaveChanges();

        }

        public List<Movie> GetAllMovies() => _db.Movies.ToList();
        public Movie GetById(int Id) => _db.Movies.FirstOrDefault(n => n.Id == Id);
        public Movie UpdateById(int id, MovieV movie)
        {
            var _movie = _db.Movies.FirstOrDefault(n => n.Id == id);
            if(_movie != null)
            {
                _movie.Name = movie.Name;
                _movie.Director = movie.Director;
                _movie.Genre = movie.Genre;
                _movie.Rate = movie.Rate;
                _movie.IsWatched = movie.IsWatched;

                _db.SaveChanges();
            }
            return _movie;
        }
        public void Delete(int id)
        {
            var _movie = _db.Movies.FirstOrDefault(n => n.Id == id);
            if (_movie != null)
            {
                _db.Movies.Remove(_movie);
                _db.SaveChanges();
            }           
        }

    }
}
