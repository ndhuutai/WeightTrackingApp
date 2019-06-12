using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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
            return _repositoryWrapper.WeightEntries.FindAll()
                .Include(w => w.Note)
                .Include(w => w.Program)
                .ToList();
        }
        
        [HttpGet("program/{id:int}")]
        public IEnumerable<WeightEntry> GetByProgram(int id, DateTime startDate, DateTime endDate)
        {
            return _repositoryWrapper.WeightEntries.FindByCondition(w => w.Program.Id == id)
                .Where(w => w.Date >= startDate && w.Date <= endDate)
                .Include(w => w.Program)
                .Include(w => w.Note)
                .ToList();
        }

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