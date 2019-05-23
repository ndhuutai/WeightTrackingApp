using Microsoft.EntityFrameworkCore;

namespace WeightTrackingApp.Models
{
    public class WeightTrackingDbContext : DbContext
    {
        public WeightTrackingDbContext(DbContextOptions<WeightTrackingDbContext> options)
        :base(options)
        {
            
        }
    }
}