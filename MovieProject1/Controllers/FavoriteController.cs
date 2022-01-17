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
    public class FavoriteController : ControllerBase
    {
        public UserService _userService;

        public FavoriteController(UserService userService)
        {
            _userService = userService;

        }


        [HttpPut("add_favorite/{id}")]
        public IActionResult AddFavorite([FromRoute] int id, [FromBody] int id2)
        {
            _userService.AddFavorite(id, id2);
            return Ok();

        }
        [HttpPut("add_favorites/{id}")]
        public IActionResult AddFavorites(int id, FavoriteV favorite)
        {
            var updated = _userService.AddFavorites(id, favorite);
            return Ok(updated);
        }

        [HttpGet("get_user_movies/{id}")]

        public IActionResult GetUserM( int id)
        {
            var one = _userService.GetUserMovies(id);
            return Ok(one);
        }

        [HttpDelete("remove/{id}")]
        [Authorize]
        public IActionResult DeleteFavorite(int id)
        {
            _userService.DeleteFav(id);
            return Ok();

        }

        [HttpGet("get_id/{id}")]

        public IActionResult GetId( int id,int Idm)
        {
            var one = _userService.GetId(id, Idm);
            return Ok(one);
        }
    }
}
