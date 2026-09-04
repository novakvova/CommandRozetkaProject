using ApiRozetka.Data.Entities.Identity;

namespace ApiRozetka.Interfaces
{
    public interface IJwtTokenService
    {
        Task<string> CreateTokenAsync(UserEntity user);
    }
}
