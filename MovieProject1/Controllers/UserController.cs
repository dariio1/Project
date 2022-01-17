using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MovieProject1.Data.Model.ViewModels;
using MovieProject1.Data.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MovieProject1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        public UserService _userService;

        public UserController(UserService userService)
        {
            _userService = userService;

        }
        ///
        [HttpPost("authenticate")]
        public IActionResult Authenticate(UserLogin model)
        {
            var response = _userService.Authenticate(model);
            return Ok(response);
        }


        [HttpPost("add")]
        public IActionResult AddUser(UserRegistration user)
        {
            _userService.AddUser(user);
            return Ok();
        }

        [HttpGet("get_all")]
        [Authorize]
        public IActionResult GetAll()
        {
            var all = _userService.GetAllUsers();
            return Ok(all);
        }

        [HttpGet("get_one_by_Id/{id}")]

        public IActionResult GetOne(int id)
        {
            var one = _userService.GetById(id);
            return Ok(one);
        }

        [HttpPut("edit_user/{id}")]
        [Authorize(Roles = "Administrator")]
        public IActionResult UpdateById(int id, UserUpdate user)
        {
            var updated = _userService.UpdateById(id, user);
            return Ok(updated);
        }
      
        [HttpDelete("delete/{id}")]
        [Authorize(Roles = "Administrator")]
        public IActionResult DeleteOne(int id)
        {
            _userService.Delete(id);
            return Ok();

        }


    }

}
