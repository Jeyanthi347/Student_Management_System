
using Student_Management_System.Models;

namespace Student_Management_System.Repositories.Interfaces
{
    public interface IStudentRepository
    {
        Student AddStudent(Student student);

        List<Student> GetAllStudents();

        Student GetStudentById(int studentId);

        Student UpdateStudent(Student student);
    }
}
