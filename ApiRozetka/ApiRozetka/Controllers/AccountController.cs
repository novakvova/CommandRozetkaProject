using ApiRozetka.Models;
using Microsoft.AspNetCore.Mvc;

namespace ApiRozetka.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private static List<Account> accounts = new List<Account>();

        [HttpPost("register")]
        public IActionResult Register([FromBody] Account account)
        {
            if(accounts != null)
                if (accounts.Any(x => x.Email == account.Email))
                    return BadRequest("Account with this email already existed");

            account.Id = accounts.Count + 1;

            accounts.Add(account);

            return Ok(new
            {
                message = "Account created",
                account = new
                {
                    account.Id,
                    account.Email
                }
            });
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] Account loginAccount)
        {
            var account = accounts.FirstOrDefault(x =>
            x.Email == loginAccount.Email &&
            x.Password == loginAccount.Password
            );

            if (account == null)
                return Unauthorized("Invalid Email or password");

            return Ok(new
            {
                message = "Login succesful",
                account = new
                {
                    account.Id,
                    account.Email
                }
            });
        }

    }
}
