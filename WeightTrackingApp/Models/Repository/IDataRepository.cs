using System;
using System.Linq;
using System.Linq.Expressions;

namespace WeightTrackingApp.Models.Repository
{
    public interface IDataRepository<TEntity>
    {
        //get all entities from db context
        IQueryable<TEntity> FindAll();
        //get an entity by ID (READ)
        IQueryable<TEntity> FindByCondition(Expression<Func<TEntity, bool>> expression);
        TEntity Add(TEntity entity);
        bool Update(TEntity entity);
        bool Delete(int id);
    }
}