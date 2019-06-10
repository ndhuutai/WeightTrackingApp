using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WeightTrackingApp.Models;
using WeightTrackingApp.Models.Repository;

namespace WeightTrackingApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WeightEntriesController : ControllerBase
    {
        private readonly IRepositoryWrapper _repositoryWrapper;

        public WeightEntriesController(IRepositoryWrapper repositoryWrapper)
        {
            _repositoryWrapper = repositoryWrapper;
        }
        
        [HttpGet] 
        public IEnumerable<WeightEntry> GetAll()
        {
            return _repositoryWrapper.WeightEntries.FindAll().ToList();
        }

        public IEnumerable<Models.Program> GetAllProgram()
        {
            return _repositoryWrapper.Program.FindAll().ToList();
        }

        [HttpGet("{program}")]
//        public IEnumerable<WeightEntry> GetByProgram(string program)
//        {
//            return _dataRepository.GetByProgram(program);
//        }

        [HttpPost]
        public IActionResult PostEntry(WeightEntry entry)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var savedEntry = _repositoryWrapper.WeightEntries.Add(entry);
            //if add op is not success
            if ( savedEntry == null)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Database Failure");
            }

            return Created("/", savedEntry);
        }

        [HttpPut]
        public IActionResult PutEntry(WeightEntry entry)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            _repositoryWrapper.WeightEntries.Update(entry);

            return Accepted();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteEntry(int id)
        {
            _repositoryWrapper.WeightEntries.Delete(id);

            return Ok();
        }
    }
}