using ApiRozetka.Data.Entities.Identity;
using ApiRozetka.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace ApiRozetka.Services
{
    public class JwtTokenService(IConfiguration configuration,
    UserManager<UserEntity> userManager) : IJwtTokenService
    {
        public async Task<string> CreateTokenAsync(UserEntity user)
        {
            var key = configuration["Jwt:Key"];

            var claims = new List<Claim>
        {
            new Claim("email", user.Email)
        };
            foreach (var role in await userManager.GetRolesAsync(user))
            {
                claims.Add(new Claim("roles", role));
            }
            var keyBytes = Encoding.UTF8.GetBytes(key);
            var symmenticSecurityKey = new SymmetricSecurityKey(keyBytes);
            var signingCredentials = new SigningCredentials(symmenticSecurityKey, SecurityAlgorithms.HmacSha256);
            var jwtSecurityToken = new JwtSecurityToken(claims: claims, expires: DateTime.UtcNow.AddDays(7), signingCredentials: signingCredentials);
            string token = new JwtSecurityTokenHandler().WriteToken(jwtSecurityToken);
            return token;
        }
    }
}
