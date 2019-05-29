using System;
using Microsoft.EntityFrameworkCore;

namespace WeightTrackingApp.Models
{
    public class WeightTrackingDbContext : DbContext
    {
        public WeightTrackingDbContext(DbContextOptions<WeightTrackingDbContext> options)
        :base(options)
        {
            
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Program>()
                .HasMany<WeightEntry>(p => p.WeightEntries)
                .WithOne(w => w.Program)
                .HasForeignKey(w => w.ProgramId);
                
            //specified foreign key due to 1 to 1 relationship
            modelBuilder.Entity<WeightEntry>()
                .HasOne(w => w.Note)
                .WithOne(n => n.WeightEntry)
                .HasForeignKey<Note>(n => n.WeightEntryId);

                
//            modelBuilder.Entity<Note>()
//                .HasOne(n => n.WeightEntry)
//                .WithOne(w => w.Note)
//                .HasForeignKey<WeightEntry>(n => n.);
            
                

            modelBuilder.Entity<Program>()
                .HasData(new
                {
                    Id = 1,
                    Name = "Program 1"
                });

            modelBuilder.Entity<Note>()
                .HasData(new
                {
                    Id = 1,
                    Text = "Note for entry 1",
                    WeightEntryId = 1
                });

            modelBuilder.Entity<WeightEntry>()
                .HasData(new
                {
                    Id = 1,
                    Weight = (double)140,
                    Date = new DateTime(2019,05,24),
                    NoteId = 1,
                    ProgramId = 1
                });
        }

        public DbSet<Program> Programs { get; set; }
        public DbSet<Note> Notes { get; set; }
        public DbSet<WeightEntry> WeightEntries { get; set; }
    }
}