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
        private readonly IDataRepository<WeightEntry> _dataRepository;

        public WeightEntriesController(IDataRepository<WeightEntry> dataRepository)
        {
            _dataRepository = dataRepository;
        }
        
        [HttpGet]
        public IEnumerable<WeightEntry> GetAll()
        {
            return _dataRepository.GetAll();
        }

        public IEnumerable<Program> GetAllProgram()
        {
            return new List<Program>();
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

            var savedEntry = _dataRepository.Add(entry);
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

            _dataRepository.Update(entry);

            return Accepted();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteEntry(int id)
        {
            _dataRepository.Delete(id);

            return Ok();
        }
    }
}