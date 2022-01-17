using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using MovieProject1.Data.Model;
using MovieProject1.Data.Model.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MovieProject1.Data.Service
{
    public class UserService
    {
        private AppDbContext _db;
        private readonly IMapper _mapper;
        public JWT_Token _token;

        public UserService(AppDbContext context, IMapper mapper, JWT_Token token)
        {
            _db = context;
            _mapper = mapper;
            _token = token;
        }
        public LoginResponse Authenticate(UserLogin model)
        {
            var user = _db.Users.SingleOrDefault(x => x.Username == model.Username);

            // validate
            if (user == null || user.Password != model.Password)
                throw new ApplicationException("Username or password is incorrect");

            // authentication successful
            var response = _mapper.Map<LoginResponse>(user);
            response.Jwt_Token = _token.GenerateToken(user);
            return response;
        }

        public void AddUser(UserRegistration user)
        {
            if (_db.Users.Any(x => x.Username == user.Username))
                throw new ApplicationException("Korisničko ime '" + user.Username + "' je zauzeto");
            var _user = _mapper.Map<User>(user);
            _user = new User()
            {
                Username = user.Username,
                Name = user.Name,
                Lastname = user.Lastname,
                Email = user.Email,
                Password = user.Password,
                DateOfReg = DateTime.Now,
                Role = "Korisnik"

            };
            _db.Users.Add(_user);
            _db.SaveChanges();

        }

        public List<User> GetAllUsers() => _db.Users.ToList();
        public User GetById(int Id) => _db.Users.FirstOrDefault(n => n.Id == Id);
        public User UpdateById(int id, UserUpdate user)
        {
            var _user = _db.Users.FirstOrDefault(n => n.Id == id);
            if (_user != null)
            {
                _user.Username = user.Username;
                _user.Name = user.Name;
                _user.Lastname = user.Lname;
                _user.Email = user.Email;
                _user.Password = user.Password;
                _user.Role = user.Role;

                _mapper.Map(user, _user);
                _db.SaveChanges();
            }


            return _user;
        }

        public void Delete(int id)
        {
            var _user = _db.Users.FirstOrDefault(n => n.Id == id);
            if (_user != null)
            {
                _db.Users.Remove(_user);
                _db.SaveChanges();
            }

        }
        ///Favorite

        public User AddFavorites(int id, FavoriteV user)
        {
            var _user = _db.Users.FirstOrDefault(n => n.Id == id);
            foreach (var idd in user.MovieIDs)
            {
                var favorites = new Favorite()
                {
                    UserId = id,
                    MovieId = idd
                };
                if (_db.Favorites.Any(x => x.UserId == id && x.MovieId == idd))
                    throw new ApplicationException("Ima vec");
                _db.Favorites.Add(favorites);
                _db.SaveChanges();
            }
            return _user;

        }
        public void AddFavorite([FromRoute] int id, [FromBody] int id2)
        {
            var _user = _db.Users.FirstOrDefault(n => n.Id == id);
            var favorites = new Favorite()
            {
                UserId = id,
                MovieId = id2
            };
            if (_db.Favorites.Any(x => x.UserId == id && x.MovieId == id2))
                throw new ApplicationException("Ima vec");
            _db.Favorites.Add(favorites);
            _db.SaveChanges();

        }

        public FavoriteVM GetUserMovies(int Id)
        {

            var favorite = _db.Users.Where(n => n.Id == Id).Select(movies => new FavoriteVM()
            {
                Idd = movies.Favorites.Select(n => n.Id).ToList(),
                MovieIDs = movies.Favorites.Select(n => n.Class.Id).ToList(),
               MovieIMDB = movies.Favorites.Select(n => n.Class.ImdbId).ToList(),
               Title = movies.Favorites.Select(n => n.Class.Title).ToList(),
               Poster = movies.Favorites.Select(n => n.Class.Poster).ToList()

            }).FirstOrDefault();


            return favorite;
        }

        public void DeleteFav(int id)
        {
            var _favorite = _db.Favorites.FirstOrDefault(n => n.Id == id);
            if (_favorite != null)
            {
                _db.Favorites.Remove(_favorite);
                _db.SaveChanges();
            }
        }
        public Favorite GetId(int Id, int Idm)
        {
            var _favorite = _db.Favorites.FirstOrDefault(n => n.UserId == Id && n.MovieId == Idm);
            return _favorite;
        }


    }
}

