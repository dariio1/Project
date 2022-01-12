using AutoMapper;
using MovieProject1.Data.Model;
using MovieProject1.Data.Model.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MovieProject1.Data.Service
{
    public class ClassService
    {
        private AppDbContext _db;
        private readonly IMapper _mapper;
        public ClassService(AppDbContext context, IMapper mapper)
        {
            _db = context;
            _mapper = mapper;
        }

        public void AddMovie(ClassMap movie)
        {
            if (_db.Class.Any(x => x.Title == movie.Title))
                throw new ApplicationException("Ima vec");
            var _movie = _mapper.Map<Class>(movie);
           
            _movie = new Class()
            {
                Title = movie.Title,
                ImdbId = movie.ImdbId,
                Poster = movie.Poster


            };
            _db.Class.Add(_movie);
            _db.SaveChanges();

        }

        public void Delete(int id)
        {
            var _movie = _db.Class.FirstOrDefault(n => n.Id == id);
            if (_movie != null)
            {
                _db.Class.Remove(_movie);
                _db.SaveChanges();
            }
        }

        public List<Class> GetAllMovies() => _db.Class.ToList();

        public Class GetByImdb(string Imdb) => _db.Class.FirstOrDefault(n => n.ImdbId == Imdb);
        public Class GetById(int Id) => _db.Class.FirstOrDefault(n => n.Id == Id);
    }
}
