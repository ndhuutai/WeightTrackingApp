using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using WeightTrackingApp.Models.Repository;

namespace WeightTrackingApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProgramsController : ControllerBase
    {
        private readonly IRepositoryWrapper _repositoryWrapper;

        public ProgramsController(IRepositoryWrapper repositoryWrapper)
        {
            _repositoryWrapper = repositoryWrapper;
        }

        [HttpGet]
        public IEnumerable<Models.Program> GetAll()
        {
            return _repositoryWrapper.Program.FindAll().ToList();
        }
    }
}