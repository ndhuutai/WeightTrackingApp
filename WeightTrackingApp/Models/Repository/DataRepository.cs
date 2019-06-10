using System;
using System.Linq;
using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;

namespace WeightTrackingApp.Models.Repository
{
    public abstract class DataRepository <T> : IDataRepository<T> where T : class
    {
        private readonly WeightTrackingDbContext _dbContext;

        public DataRepository(WeightTrackingDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        
        public IQueryable<T> FindAll()
        {
            return _dbContext.Set<T>().AsNoTracking();
        }

        public IQueryable<T> FindByCondition(Expression<Func<T, bool>> expression)
        {
            return _dbContext.Set<T>().Where(expression).AsNoTracking();
        }

        public abstract T Add(T entity);

        public abstract bool Update(T entity);

        public abstract bool Delete(int id);
    }
}