
using Microsoft.AspNetCore.Mvc;
using Student_Management_System.DTOs.Student;
using Student_Management_System.Services.Interfaces;

namespace Student_Management_System.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StudentController : ControllerBase
    {
        private readonly IStudentService _studentService;

        public StudentController(IStudentService studentService)
        {
            _studentService = studentService;
        }

        [HttpPost]
        public IActionResult CreateStudent([FromBody] StudentCreateDto student)
        {
            var response = _studentService.CreateStudent(student);

            return Ok(response);
        }

        [HttpGet]
        public IActionResult GetAllStudents()
        {
            var response = _studentService.GetAllStudents();

            return Ok(response);
        }

    }
}
