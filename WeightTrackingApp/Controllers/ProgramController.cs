using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using WeightTrackingApp.Models.Repository;

namespace WeightTrackingApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProgramController : ControllerBase
    {
        private readonly RepositoryWrapper _repositoryWrapper;

        public ProgramController(RepositoryWrapper repositoryWrapper)
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