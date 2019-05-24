using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;

namespace WeightTrackingApp.Models
{
    class RepositoryContext<TEntity> : IRepositoryContext<TEntity> where TEntity : class
    {
        private readonly WeightTrackingDbContext _dbContext;

        public RepositoryContext(WeightTrackingDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        public IEnumerable<TEntity> GetAll()
        {
            return _dbContext.Set<TEntity>().ToList();
        }
        
        public IEnumerable<TEntity> Get(Expression<Func<TEntity, bool>> predicate)
        {
            return _dbContext.Set<TEntity>().Where(predicate);
        }

        public TEntity GetSingle(Expression<Func<TEntity, bool>> predicate)
        {
            return _dbContext.Set<TEntity>().FirstOrDefault(predicate);
        }

        public void Add(TEntity entity)
        {
            _dbContext.Set<TEntity>().Add(entity);
        }

        public void Update(TEntity entity)
        {
            var trackedEntity = _dbContext.Set<TEntity>().Attach(entity);
            trackedEntity.State = EntityState.Modified;
        }

        public void Delete(TEntity entity)
        {
            _dbContext.Set<TEntity>().Remove(entity);
        }
        
        //save all tracked changes and return the number of entities.
        public int Commit()
        {
            return _dbContext.SaveChanges();
        }
    }
}