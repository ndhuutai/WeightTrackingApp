using System;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace WeightTrackingApp.Models
{
    public interface IDataRepository<TEntity>
    {
        //get all entities from db context
        IEnumerable<TEntity> GetAll();
        //get an entity by ID (READ)
        IEnumerable<TEntity> GetByProgram(string program);
        
        TEntity Add(TEntity entity);
        bool Update(TEntity entity);
        bool Delete(TEntity entity);
    }
}