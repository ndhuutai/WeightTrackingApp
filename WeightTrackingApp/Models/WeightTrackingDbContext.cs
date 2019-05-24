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
            modelBuilder.Entity<WeightEntry>()
                .HasOne(s => s.Note)
                .WithOne(n => n.WeightEntry)
                .HasForeignKey<Note>(n => n.WeightEntryId);
        }
    }
}