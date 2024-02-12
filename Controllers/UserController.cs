using Ajax_Crud2.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Net.Http.Headers;

namespace Ajax_Crud2.Controllers
{
    public class UserController : Controller
    {
        private readonly MyDbContext _context;
        public UserController(MyDbContext context)
        {
            _context = context;
        }
        public IActionResult Index()
        {
            return View();
        }
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Json(await _context.Users.ToListAsync());
        }
        [HttpPost]
        public async Task<IActionResult> AddUser(User User)
        {
            await _context.Users.AddAsync(User);
            await _context.SaveChangesAsync();
            return Json("data was inserted");  
        }
        [HttpGet]
        public async Task<IActionResult> Delete(int id)
        {
            var data = await _context.Users.FirstOrDefaultAsync(x=>x.Id == id);
            _context.Users.Remove(data);
            await _context.SaveChangesAsync();
            return Json("data succesfuly deleted");
        }
        [HttpPost]
        public async Task<IActionResult> Edit(User user)
        {
            var data = await _context.Users.FirstOrDefaultAsync(x =>x.Id == user.Id);
            if(data != null)
            {
                data.UserName = user.UserName;
                data.Password = user.Password;
                data.Email = user.Email;

                _context.Entry(data).State = EntityState.Modified;
                await _context.SaveChangesAsync();

                return Json("Data has been updated successfully");
            }
            else
            {
                return Json("Student not found");
            }
        }
        [HttpGet]
        public async Task<IActionResult> EditOpenForm(int id)
        {
            var data = await _context.Users.FirstOrDefaultAsync(x => x.Id == id);
            return Json(data);
        }
    }
}
