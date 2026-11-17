
using Student_Management_System.Data;
using Student_Management_System.Models;
using Student_Management_System.Repositories.Interfaces;

namespace Student_Management_System.Repositories
{
    public class StudentRepository : IStudentRepository
    {
        private readonly ApplicationDbContext _context;

        public StudentRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public Student AddStudent(Student student)
        {
            _context.Students.Add(student);

            _context.SaveChanges();

            return student;
        }

        public List<Student> GetAllStudents()
        {
            return _context.Students.ToList();
        }

        public Student GetStudentById(int studentId) => _context.Students
                .FirstOrDefault(s => s.StudentId == studentId);

        // PUT: Update Student
        public Student UpdateStudent(Student student)
        {
            _context.Students.Update(student);

            _context.SaveChanges();

            return student;
        }


        // DELETE: Delete Student
        public bool DeleteStudent(int studentId)
        {
            var student = _context.Students
                .FirstOrDefault(s => s.StudentId == studentId);

            if (student == null)
            {
                return false;
            }

            _context.Students.Remove(student);

            _context.SaveChanges();

            return true;
        }

    }
}
