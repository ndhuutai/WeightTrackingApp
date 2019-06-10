using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace WeightTrackingApp.Models.Repository
{
    public class WeightRepository : DataRepository<WeightEntry>, IWeightRepository
    {
        private readonly WeightTrackingDbContext _dbContext;

        public WeightRepository(WeightTrackingDbContext dbContext) : base(dbContext)
        {
            _dbContext = dbContext;
        }

        public override WeightEntry Add(WeightEntry entity)
        {
            // find existing program in DB
            var program = _dbContext.Programs.FirstOrDefault(p => String.Equals(p.Name, entity.Program.Name));

            //if there's already a program with the same name then
            //update the input model's program with the existing program's info
            if (program != null)
            {
                entity.ProgramId = program.Id;
                entity.Program = program;
            }
            
            // get the tracked entity after adding (that has been updated thus far)
            var trackedEntity = _dbContext.WeightEntries.Add(entity);
            
            //save changes to get generatedId for the entry
            //if no changes/addtion are done then there's an issue
            if (_dbContext.SaveChanges() < 1)
            {
                return null;
            }
            
            //update note's info once entity's id has been generated
            trackedEntity.Entity.Note.WeightEntryId = entity.Id;
            
            _dbContext.SaveChanges();
            return trackedEntity.Entity;
        }

        public override bool Update(WeightEntry entity)
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

            //if program doesn't exist then add the new program info
            if (program == null)
            {
                var trackedEntity = _dbContext.Programs.Add(entity.Program);
                dbEntity.Program = trackedEntity.Entity;
                dbEntity.ProgramId = trackedEntity.Entity.Id;
            } // otherwise change to the program that also happens to exist in the db
            else
            {
                dbEntity.Program = program;
                dbEntity.ProgramId = program.Id;
            }

            _dbContext.SaveChanges();
            return true;
        }

        public override bool Delete(int id)
        {
            var dbEntity = _dbContext.WeightEntries.FirstOrDefault(w => w.Id == id);

            if (dbEntity == null) return false;

            _dbContext.WeightEntries.Remove(dbEntity);

            _dbContext.SaveChanges();
            return true;
        }
    }
}