using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Q1BookApi.Model
{
    public class Book
    {
        [Key]
        public int bookId { get; set; }

        [StringLength(100)]
        public string Name { get; set; }

        [StringLength(512)]
        public string Description { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal Price { get; set; }

        [StringLength(128)]
        public string Note { get; set; }
    }
}
