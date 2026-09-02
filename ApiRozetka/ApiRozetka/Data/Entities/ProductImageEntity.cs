using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ApiRozetka.Data.Entities
{
    public class ProductImageEntity
    {
        public int Id { get; set; }
        [StringLength(100)]
        public string Name { get; set; } = null!;
        public short Order { get; set; }
        public DateTime DateCreated { get; set; } = DateTime.UtcNow;
        [ForeignKey(nameof(Product))]
        public int ProductId { get; set; }
        public ProductEntity Product { get; set; } = null!;
    }
}
