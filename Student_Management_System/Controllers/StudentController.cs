
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

        [HttpGet("{studentId:int}")]
        public IActionResult GetStudentById(int studentId)
        {
            var response = _studentService.GetStudentById(studentId);

            if (response == null)
            {
                return NotFound("Student not found.");
            }

            return Ok(response);
        }

    }
}
