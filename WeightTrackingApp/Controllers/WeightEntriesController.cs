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
            
            _dataRepository.Add(entry);
            _dataRepository.Commit();

            return Created("/", entry);
        }
    }
}