using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WeightTrackingApp.Models;

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
        
        [HttpGet]
        public IEnumerable<WeightEntry> GetByProgram(string program)
        {
            return _dataRepository.GetByProgram(program);
        }

        [HttpPost]
        public IActionResult PostEntry(WeightEntry entry)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            //if add op is not success
            if (!_dataRepository.Add(entry))
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Database Failure");
            }

            return Created("/", entry);
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

        public IActionResult DeleteEntry(WeightEntry entry)
        {
            _dataRepository.Delete(entry);

            return Ok();
        }
    }
}