
using System.ComponentModel.DataAnnotations;

namespace Student_Management_System.DTOs.Student
{
    public class StudentUpdateDto
    {
        [Required(ErrorMessage = "Student name is required")]
        [StringLength(100, ErrorMessage = "Student name cannot exceed 100 characters")]
        public string StudentName { get; set; } = string.Empty;

        [Required(ErrorMessage = "Gender is required")]
        [StringLength(20)]
        public string Gender { get; set; } = string.Empty;

        [Required(ErrorMessage = "Email is required")]
        [EmailAddress(ErrorMessage = "Enter a valid email address")]
        [StringLength(254)]
        public string Email { get; set; } = string.Empty;

        [Required(ErrorMessage = "Phone number is required")]
        [Phone(ErrorMessage = "Enter a valid phone number")]
        [StringLength(15)]
        public string PhoneNumber { get; set; } = string.Empty;

        [Range(1, int.MaxValue, ErrorMessage = "Select a valid department")]
        public int DepartmentId { get; set; }
    }
}
