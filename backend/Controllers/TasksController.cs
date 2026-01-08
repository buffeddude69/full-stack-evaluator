using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

using TaskManager.Models;
using TaskManager.Data;
namespace TaskManager.API
{
    [Route("tasks")]
    [ApiController]
    public class TasksController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public TasksController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<TaskItem>>> Get()
        {
            return Ok(await _context.Tasks.ToListAsync());
        }

        [HttpPost]
        public async Task<ActionResult<TaskItem>> Create(TaskItem Tasks)
        {
            if (Tasks is null)
                return BadRequest();

            _context.Tasks.Add(Tasks);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(Get), new { id = Tasks.Id }, Tasks);
        }

        [HttpGet("{id}")]

        public async Task<ActionResult<TaskItem>> GetById(int id)
        {
            var task = await _context.Tasks.FindAsync(id);
            if (task is null)
                return NotFound();

            return Ok(task);
        }

        [HttpPut("{id}")] 
        public async Task<IActionResult> Update(int id, [FromBody] TaskItem updated)
        {
            var task = await _context.Tasks.FindAsync(id);
            if (task == null) return NotFound();

            task.Title = updated.Title;
            task.IsDone = updated.IsDone;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var task = await _context.Tasks.FindAsync(id);
            if (task == null) return NotFound();

            _context.Tasks.Remove(task);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
