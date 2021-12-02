using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MovieProject1.Data.Model;
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
    public class MoviesController : ControllerBase
    {
        public MovieService _movieService;
        public MoviesController(MovieService movieService)
        {
            _movieService = movieService;
        }
        [HttpPost ("add")]
        public IActionResult AddMovie ([FromBody]MovieV movie)
        {
            _movieService.AddMovie(movie);
            return Ok();
        }
        [HttpGet ("get_all")]
        public IActionResult GetAll()
        {
            var all = _movieService.GetAllMovies();
            return Ok(all);
        }

        [HttpGet("get_one_by_Id/{id}")]
        public IActionResult GetOne(int id)
        {
            var one = _movieService.GetById(id);
            return Ok(one);
        }

        [HttpPut("update_movie/{id}")]
        public IActionResult UpdateById(int id, [FromBody]MovieV movie)
        {
            var updateM = _movieService.UpdateById(id, movie);
            return Ok(updateM);
        }

        [HttpDelete("delete/{id}")]
        public IActionResult DeleteOne(int id)
        {
            _movieService.Delete(id);
            return Ok();


        }

    }
}
