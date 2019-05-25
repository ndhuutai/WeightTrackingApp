using System.ComponentModel.DataAnnotations.Schema;

namespace WeightTrackingApp.Models
{
    public class Note
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Text { get; set; }
        public int WeightEntryId { get; set; }
        public WeightEntry WeightEntry { get; set; }
    }
}