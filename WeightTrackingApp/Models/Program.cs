using System.Collections.Generic;

namespace WeightTrackingApp.Models
{
    public class Program
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public IEnumerable<WeightEntry> WeightEntries { get; set; }
    }
}