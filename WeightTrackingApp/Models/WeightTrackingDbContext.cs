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
            //specified foreign key due to 1 to 1 relationship
            modelBuilder.Entity<WeightEntry>()
                .HasOne(w => w.Note)
                .WithOne(n => n.WeightEntry)
                .HasForeignKey<Note>(n => n.WeightEntryId);
            
            //foreign key is optional but doing it here anyways
            modelBuilder.Entity<WeightEntry>()
                .HasOne(w => w.Program)
                .WithMany(p => p.WeightEntries)
                .HasForeignKey(w => w.ProgramId);
        }

        public DbSet<Program> Programs { get; set; }
        public DbSet<Note> Notes { get; set; }
        public DbSet<WeightEntry> WeightEntries { get; set; }
    }
}