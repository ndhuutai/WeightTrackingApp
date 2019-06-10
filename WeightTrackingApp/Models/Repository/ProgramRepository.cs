using System;

namespace WeightTrackingApp.Models.Repository
{
    public class ProgramRepository : DataRepository<Program>, IProgramRepository
    {
        private readonly WeightTrackingDbContext _dbContext;

        public ProgramRepository(WeightTrackingDbContext dbContext) : base(dbContext)
        {
            _dbContext = dbContext;
        }

        public override Program Add(Program entity)
        {
            throw new NotImplementedException();
        }

        public override bool Update(Program entity)
        {
            throw new NotImplementedException();
        }

        public override bool Delete(int id)
        {
            throw new NotImplementedException();
        }
    }
}