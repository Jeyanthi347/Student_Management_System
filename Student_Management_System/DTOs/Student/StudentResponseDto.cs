
namespace Student_Management_System.DTOs.Student
{
    public class StudentResponseDto
    {
        public int StudentId { get; set; }

        public string StudentName { get; set; } = string.Empty;

        public string Gender { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;

        public string PhoneNumber { get; set; } = string.Empty;

        public int DepartmentId { get; set; }
    }
}
