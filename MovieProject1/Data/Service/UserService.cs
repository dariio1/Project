using AutoMapper;
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
                throw new AppException("Username or password is incorrect");

            // authentication successful
            var response = _mapper.Map<LoginResponse>(user);
            response.Jwt_Token = _token.GenerateToken(user);
            return response;
        }

        public void AddUser(UserRegistration user)
        {
            if (_db.Users.Any(x => x.Username == user.Username))
                throw new ApplicationException("Korisničko ime" + user.Username + " je zauzeto");
            var _user = _mapper.Map<User>(user); 
            _user = new User()
            {
                Username = user.Username,
                Name = user.Name,
                Lastname = user.Lastname,
                Email = user.Email,
                Password = user.Password,
                DateOfReg = DateTime.Now

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

    }
}

