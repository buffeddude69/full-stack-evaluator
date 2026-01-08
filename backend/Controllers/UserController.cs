using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

using TaskManager.Models;
using TaskManager.Data;

namespace task_manager_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public UserController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]

        public async Task<ActionResult<List<User>>> Get()
        {

            return Ok(await _context.Users.ToListAsync());

        }

        [HttpGet("{id}")]

        public async Task<ActionResult<User>> GetById(int id)
        {

            var user = await _context.Users.FindAsync(id);
            if (user is null)
                return NotFound();

            return Ok(user);

        }

        [HttpPost]

        public async Task<ActionResult<User>> Create(User user)
        {
            if (user is null)
                return BadRequest();

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(Get), new { id = user.Id }, user);
        }

        [HttpPut("{id}")]

        public async Task<IActionResult> Update(int id, [FromBody] User updated)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null) return NotFound();

            user.Email = updated.Email;
            user.PasswordHash = updated.PasswordHash;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]

        public async Task<IActionResult> Delete(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null) return NotFound();

            _context.Users.Remove(user);

            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
