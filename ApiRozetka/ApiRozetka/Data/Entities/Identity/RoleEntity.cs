using Microsoft.AspNetCore.Identity;

namespace ApiRozetka.Data.Entities.Identity
{
    public class RoleEntity : IdentityRole<int>
    {
        public ICollection<UserRoleEntity>? UserRoles { get; set; }
    }
}
