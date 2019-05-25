using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WeightTrackingApp.Models
{
    public class WeightEntry
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required]
        [Range(0,1000)]
        public double Weight { get; set; }
        public DateTime DateTime { get; set; }
        public Note Note { get; set; }

        public int ProgramId { get; set; }
        public Program Program { get; set; }
    }
}