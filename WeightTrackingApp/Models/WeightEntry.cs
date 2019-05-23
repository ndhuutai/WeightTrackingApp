using System;
using System.ComponentModel.DataAnnotations;

namespace WeightTrackingApp.Models
{
    public class WeightEntry
    {
        public int Id { get; set; }
        [Required]
        [Range(0,1000)]
        public double Weight { get; set; }
        public DateTime DateTime { get; set; }
    }
}