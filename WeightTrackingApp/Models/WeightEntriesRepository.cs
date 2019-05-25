using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace WeightTrackingApp.Models
{
    class WeightEntriesRepository : IDataRepository<WeightEntry>
    {
        private readonly WeightTrackingDbContext _dbContext;

        public WeightEntriesRepository(WeightTrackingDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        
        //save all tracked changes and return the number of entities.
        public IEnumerable<WeightEntry> GetAll()
        {
            var results =_dbContext.WeightEntries
                .Include(w => w.Note)
                .Include(w => w.Program)
                .ToList();

            return results;
        }

        public IEnumerable<WeightEntry> GetByProgram(string program)
        {
            return _dbContext.WeightEntries
                .Where(w => w.Program.Name.ToLower().Contains(program.ToLower()))
                .Include(w => w.Program)
                .ToList();
        }

        public void Add(WeightEntry entity)
        {
            var entry = _dbContext.WeightEntries.Add(entity);
            _dbContext.SaveChanges();
            entry.Entity.Note.WeightEntryId = entry.Entity.Id;
        }

        public void Update(WeightEntry entity)
        {
            throw new NotImplementedException();
        }

        public void Delete(WeightEntry entity)
        {
            throw new NotImplementedException();
        }

        public int Commit()
        {
            return _dbContext.SaveChanges();
        }
    }
}