namespace WeightTrackingApp.Models.Repository
{
    public class RepositoryWrapper : IRepositoryWrapper
    {
        private WeightTrackingDbContext _dbContext;
        private IWeightRepository _weight;
        private IProgramRepository _program;

        public IWeightRepository WeightEntries
        {
            get
            {
                if (_weight == null)
                {
                    _weight = new WeightRepository(_dbContext);
                }

                return _weight;
            }
        }

        public IProgramRepository Program
        {
            get
            {
                if (_program == null)
                {
                    _program = new ProgramRepository(_dbContext);
                }

                return _program;
            }
        }

        public RepositoryWrapper(WeightTrackingDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public void Save()
        {
            throw new System.NotImplementedException();
        }
    }
}