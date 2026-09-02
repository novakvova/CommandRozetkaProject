using System.ComponentModel.DataAnnotations;

namespace ApiRozetka.Data.Entities
{
    public class CategoryEntity
    {
        public int Id { get; set; }
        [StringLength(100)]
        public string Name { get; set; } = null!;
        [StringLength(100)]
        public string? Image { get; set; } = string.Empty;
        [StringLength(250)]
        public string Slug { get; set; } = null!;
        public bool IsDeleted { get; set; }
        public DateTime DateCreated { get; set; } = DateTime.UtcNow;
        public ICollection<ProductEntity> Products { get; set; } = null!;
    }
}
