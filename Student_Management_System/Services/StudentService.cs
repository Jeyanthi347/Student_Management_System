
using Student_Management_System.DTOs.Student;
using Student_Management_System.Models;
using Student_Management_System.Repositories.Interfaces;
using Student_Management_System.Services.Interfaces;
using System.Linq;

namespace Student_Management_System.Services
{
    public class StudentService : IStudentService
    {
        private readonly IStudentRepository _studentRepository;

        public StudentService(IStudentRepository studentRepository)
        {
            _studentRepository = studentRepository;
        }

        public StudentResponseDto CreateStudent(StudentCreateDto student)
        {
            var studentModel = new Student
            {
                StudentName = student.StudentName,
                Gender = student.Gender,
                Email = student.Email,
                PhoneNumber = student.PhoneNumber,
                DepartmentId = student.DepartmentId
            };

            var savedStudent = _studentRepository.AddStudent(studentModel);

            var response = new StudentResponseDto
            {
                StudentId = savedStudent.StudentId,
                StudentName = savedStudent.StudentName,
                Gender = savedStudent.Gender,
                Email = savedStudent.Email,
                PhoneNumber = savedStudent.PhoneNumber,
                DepartmentId = savedStudent.DepartmentId
            };

            return response;
        }

        public List<StudentResponseDto> GetAllStudents()
        {
            var students = _studentRepository.GetAllStudents();

            var response = students.Select(student => new StudentResponseDto
            {
                StudentId = student.StudentId,
                StudentName = student.StudentName,
                Gender = student.Gender,
                Email = student.Email,
                PhoneNumber = student.PhoneNumber,
                DepartmentId = student.DepartmentId
            }).ToList();

            return response;
        }

        public StudentResponseDto GetStudentById(int studentId)
        {
            var student = _studentRepository.GetStudentById(studentId);

            if (student == null)
            {
                return null;
            }

            return new StudentResponseDto
            {
                StudentId = student.StudentId,
                StudentName = student.StudentName,
                Gender = student.Gender,
                Email = student.Email,
                PhoneNumber = student.PhoneNumber,
                DepartmentId = student.DepartmentId
            };
        }
    }
}
