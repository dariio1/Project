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
    public class ClassController : ControllerBase
    {
        public ClassService _classService;
        public ClassController(ClassService classService)
        {
            _classService = classService;
        }


        [HttpPost("ad")]
        public IActionResult AddMovie([FromBody] ClassMap movie)
        {
            _classService.AddMovie(movie);
            return Ok();
        }


        [HttpDelete("delete/{id}")]
        [Authorize(Roles = "Administrator")]
        public IActionResult DeleteOne(int id)
        {
            _classService.Delete(id);
            return Ok();

        }

        [HttpGet("get_all")]
        public IActionResult GetAll()
        {
            var all = _classService.GetAllMovies();
            return Ok(all);
        }

        [HttpGet("get_by_imdb/{imdb}")]

        public IActionResult GetOneByImdb(string imdb)
        {
            var one  = _classService.GetByImdb(imdb);
            return Ok(one);
        }


        [HttpGet("get_by_id/{id}")]
        public IActionResult GetOneById(int id)
        {
            var one = _classService.GetById(id);
            return Ok(one);
        }

    }
}
