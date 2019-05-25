using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace WeightTrackingApp.Models
{
    public class Program
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Name { get; set; }
        public IEnumerable<WeightEntry> WeightEntries { get; set; }
    }
}