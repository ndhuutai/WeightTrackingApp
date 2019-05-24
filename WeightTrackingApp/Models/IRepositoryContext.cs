using System;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace WeightTrackingApp.Models
{
    public interface IRepositoryContext<TEntity>
    {
        //get all entities from db context
        IEnumerable<TEntity> GetAll();
        //get an entity by ID (READ)
        IEnumerable<TEntity> Get(Expression<Func<TEntity, bool>> predicate);
        TEntity GetSingle(Expression<Func<TEntity, bool>> predicate);
        void Add(TEntity entity);
        void Update(TEntity entity);
        void Delete(TEntity entity);

        int Commit();
    }
}