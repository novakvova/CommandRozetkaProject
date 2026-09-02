using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ApiRozetka.Data.Entities
{
    public class ProductEntity
    {
        public int Id { get; set; }
        [StringLength(100)]
        public string Name { get; set; } = null!;
        [StringLength(5000)]
        public string? Description { get; set; } = string.Empty;
        public decimal Price { get; set; }
        [StringLength(250)]
        public string Slug { get; set; } = null!;
        [ForeignKey(nameof(Category))]
        public int CategoryId { get; set; }
        public CategoryEntity Category { get; set; } = null!;
        public bool IsDeleted { get; set; }
        public DateTime DateCreated { get; set; } = DateTime.UtcNow;
        public ICollection<ProductImageEntity> ProductImages { get; set; } = null!;
    }
}
