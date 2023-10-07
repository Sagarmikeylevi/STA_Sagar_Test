import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { addStudent, addStudentState } from "../store/student-slice";

const AddStudent = ({ onAddStudent }) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    studentName: "",
    dateOfBirth: "",
    gender: "",
    fatherName: "",
    motherName: "",
    emailId: "",
    phoneNumber: "",
    address: "",
  });

  const [errors, setErrors] = useState({
    dateOfBirth: "",
  });

  const dateOfBirthRef = useRef();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    // Validation for Date of Birth
    const today = new Date();
    const dob = new Date(formData.dateOfBirth);
    const ageDiff = today.getFullYear() - dob.getFullYear();
    if (ageDiff < 3) {
      setErrors({
        ...errors,
        dateOfBirth: "Age must be greater than 3 years.",
      });
      dateOfBirthRef.current.focus();
      return;
    }

    setErrors({
      dateOfBirth: "",
    });

    const randomStudentId = Math.floor(Math.random() * 1000000); // Change the range as needed

    const formDataWithId = {
      ...formData,
      studentId: randomStudentId,
    };

    onAddStudent(formDataWithId);

    dispatch(addStudent(formDataWithId));
    dispatch(addStudentState());

    console.log(formDataWithId);
  };
  return (
    <div className="w-full max-w-lg mx-auto bg-white shadow-lg rounded-md p-8">
      <h2 className="text-2xl font-semibold mb-4">Student Details</h2>
      <form className="space-y-4" onSubmit={submitHandler}>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              className="block text-gray-600 text-sm font-semibold mb-1"
              htmlFor="studentName"
            >
              Student Name:
            </label>
            <input
              type="text"
              id="studentName"
              className="border rounded px-3 py-2 w-full focus:outline-none focus:ring focus:border-gray-500"
              name="studentName"
              value={formData.studentName}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label
              className="block text-gray-600 text-sm font-semibold mb-1"
              htmlFor="email"
            >
              Email:
            </label>
            <input
              type="email"
              id="emailId"
              className="border rounded px-3 py-2 w-full focus:outline-none focus:ring  focus:border-gray-500"
              name="emailId"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && (
              <p className="text-red-500 text-xs">{errors.email}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              className="block text-gray-600 text-sm font-semibold mb-1"
              htmlFor="dateOfBirth"
            >
              Date Of Birth:
            </label>
            <input
              type="date"
              id="dateOfBirth"
              className="border rounded px-3 py-2 w-full focus:outline-none focus:ring  focus:border-gray-500"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              required
            />
            {errors.dateOfBirth && (
              <p className="text-red-500 text-xs">{errors.dateOfBirth}</p>
            )}
          </div>
          <div>
            <label
              className="block text-gray-600 text-sm font-semibold mb-1"
              htmlFor="gender"
            >
              Gender:
            </label>
            <select
              id="gender"
              className="border rounded px-3 py-2 w-full focus:outline-none focus:ring  focus:border-gray-500"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              className="block text-gray-600 text-sm font-semibold mb-1"
              htmlFor="fatherName"
            >
              Father Name:
            </label>
            <input
              type="text"
              id="fatherName"
              className="border rounded px-3 py-2 w-full focus:outline-none focus:ring  focus:border-gray-500"
              name="fatherName"
              value={formData.fatherName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label
              className="block text-gray-600 text-sm font-semibold mb-1"
              htmlFor="motherName"
            >
              Mother Name:
            </label>
            <input
              type="text"
              id="motherName"
              className="border rounded px-3 py-2 w-full focus:outline-none focus:ring  focus:border-gray-500"
              name="motherName"
              value={formData.motherName}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              className="block text-gray-600 text-sm font-semibold mb-1"
              htmlFor="phoneNumber"
            >
              Phone Number:
            </label>
            <input
              type="tel"
              id="phoneNumber"
              className="border rounded px-3 py-2 w-full focus:outline-none focus:ring  focus:border-gray-500"
              name="phoneNumber"
              pattern="[0-9]{10}"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
            {errors.phoneNumber && (
              <p className="text-red-500 text-xs">{errors.phoneNumber}</p>
            )}
          </div>
          <div>
            <label
              className="block text-gray-600 text-sm font-semibold mb-1"
              htmlFor="address"
            >
              Address:
            </label>
            <textarea
              id="address"
              className="border rounded px-3 py-2 w-full focus:outline-none focus:ring  focus:border-gray-500"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            ></textarea>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="py-2 px-4 bg-green-500 text-white hover:bg-black transition-all duration-200 rounded-md"
          >
            Add Student
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddStudent;
