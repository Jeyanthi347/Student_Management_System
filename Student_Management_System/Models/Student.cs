namespace Student_Management_System.Models
{
    public class Student
    {
        public int StudentId { get; set; }

        public string StudentName { get; set; } = string.Empty;

        public string Gender { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;

        public string PhoneNumber { get; set; } = string.Empty;

        public int DepartmentId { get; set; }

        public Department? Department { get; set; }
    }
}