using ApiRozetka.Constants;
using ApiRozetka.Data.Entities.Identity;
using ApiRozetka.Models.Seeder;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Data;
using System.Text;
using System.Text.Json;

namespace ApiRozetka.Extensions
{
    public static class DbSeeder
    {
        public static async Task SeedData(this WebApplication webApplication)
        {
            using var scope = webApplication.Services.CreateScope();
            var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();
            var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<RoleEntity>>();
            var userManager = scope.ServiceProvider.GetRequiredService<UserManager<UserEntity>>();

            context.Database.Migrate();

            if (!context.Roles.Any())
            {
                foreach (var roleName in Roles.ListRoles())
                {
                    await roleManager.CreateAsync(new RoleEntity { Name = roleName });
                }
            }

            if (!context.Users.Any())
            {
                var curDir = Directory.GetCurrentDirectory();
                var jsonFile = Path.Combine(curDir, "Helpers", "JsonData", "Users.json");
                if (File.Exists(jsonFile))
                {
                    var jsonData = await File.ReadAllTextAsync(jsonFile, encoding: Encoding.UTF8);
                    try
                    {
                        var users = JsonSerializer.Deserialize<List<SeederUserModel>>(jsonData);
                        foreach (var user in users)
                        {
                            var entity = new UserEntity
                            {
                                FirstName = user.FirstName,
                                LastName = user.LastName,
                                Email = user.Email,
                                UserName = user.Email,
                                Image = user.Image,
                            };
                            var result = await userManager.CreateAsync(entity, user.Password);
                            if (result.Succeeded)
                            {
                                foreach (var role in user.Roles)
                                {
                                    await userManager.AddToRoleAsync(entity, role);
                                }

                            }
                        }
                    }
                    catch (Exception e)
                    {
                        Console.WriteLine("Викникла помилка при Seed Users ", e.Message);
                    }
                }
            }
        }
    }
}
