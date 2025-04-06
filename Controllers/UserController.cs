using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Mywebapi.Data;

namespace Mywebapi.Controllers
{
    [ApiController]
    [Route("api/user")]

    public class UsersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public UsersController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            return await _context.Users.ToListAsync();
        }
    }
}