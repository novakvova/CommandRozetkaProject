using Microsoft.EntityFrameworkCore;

namespace ApiRozetka
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions options) : base(options) { }
    }
}
