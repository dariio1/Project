using AutoMapper;
using MovieProject1.Data.Model;
using MovieProject1.Data.Model.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MovieProject1
{
    public class AutoMapper : Profile
    {
        public AutoMapper()
        {
            // User -> AuthenticateResponse
           CreateMap<User, LoginResponse>();

            // RegisterRequest -> User
            CreateMap<UserRegistration, User>();

            // UpdateRequest -> User
            CreateMap<UserUpdate, User>()
                .ForMember(dest =>
                dest.Lastname,
                opt => opt.MapFrom(src => src.Lname));

            // MovieInput -> MovieDb
            CreateMap<ClassMap, Class>();

        }
    }
}
