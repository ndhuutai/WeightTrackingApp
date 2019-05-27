using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
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
            var results = _dbContext.WeightEntries
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

        public bool Add(WeightEntry entity)
        {
            // find existing program in db
            var program = _dbContext.Programs.FirstOrDefault(p => String.Equals(p.Name, entity.Program.Name));

            //if there's already a program with the same name then
            //update the input model's program with the existing program's info
            if (program != null)
            {
                entity.ProgramId = program.Id;
                entity.Program = program;
            }

            //get tracked entity
            var entry = _dbContext.WeightEntries.Add(entity);
            
            //save here to get generatedid for the entry
            if (_dbContext.SaveChanges() < 1)
            {
                return false;
            }
            
            //update note's info once entity's id has been populated.
            entry.Entity.Note.WeightEntryId = entity.Id;
            
            _dbContext.SaveChanges();
            return true;
        }

        public bool Update(WeightEntry entity)
        {
            //find existing program in db
            var program = _dbContext.Programs.FirstOrDefault(p => String.Equals(p.Name, entity.Program.Name));

            var dbEntity = _dbContext.WeightEntries
                .Include(w => w.Note)
                .Include(w => w.Program)
                .FirstOrDefault(w => w.Id == entity.Id);

            if (dbEntity == null) return false;

            dbEntity.Note.Text = entity.Note.Text;
            dbEntity.Weight = entity.Weight;

            if (program == null)
            {
                dbEntity.ProgramId = entity.ProgramId;
                dbEntity.Program = entity.Program;
            }
            //user shouldn't be able to change date

            _dbContext.SaveChanges();
            return true;
        }

        public bool Delete(WeightEntry entity)
        {
             var dbEntity = _dbContext.WeightEntries.FirstOrDefault(w => w.Id == entity.Id);

             if (dbEntity == null) return false;

             _dbContext.WeightEntries.Remove(dbEntity);

             _dbContext.SaveChanges();
             return true;
        }
    }
}