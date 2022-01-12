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
    public class FavoriteController : ControllerBase
    {
        public UserService _userService;

        public FavoriteController(UserService userService)
        {
            _userService = userService;

        }


        [HttpPut("add_favorite/{id}")]
        public IActionResult AddFavorite(int id, int id2)
        {
            _userService.AddFavorite(id!, id2!);
            return Ok();

        }
        [HttpPut("add_favorites/{id}")]
        public IActionResult AddFavorites(int id, FavoriteV favorite)
        {
            var updated = _userService.AddFavorites(id, favorite);
            return Ok(updated);
        }

        [HttpGet("get_user_movies/{id}")]

        public IActionResult GetUserM(int id)
        {
            var one = _userService.GetUserMovies(id);
            return Ok(one);
        }

        [HttpDelete("delete/{id}")]
        public IActionResult DeleteFavorite(int id, int mId)
        {
            _userService.DeleteFav(id, mId);
            return Ok();

        }
    }
}
