import { FaSearch, FaTrash } from "react-icons/fa";
import AddStudent from "./AddStudent";
import { useState } from "react";
import debounce from "lodash/debounce";

const StudentList = ({ students }) => {
  const [isAddStudent, setIsAddStudent] = useState(false);

  const [searchInput, setSearchInput] = useState("");
  const [filteredStudents, setFilteredStudents] = useState(students);

  const debouncedSearch = debounce((searchTerm) => {
    const filtered = students.filter((student) => {
      const fullName =
        `${student.studentName} ${student.fatherName}`.toLowerCase();
      return fullName.includes(searchTerm);
    });
    setFilteredStudents(filtered);
  }, 300);

  const handleSearchInputChange = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchInput(searchTerm);
    debouncedSearch(searchTerm);
  };

  const addStudentHandler = () => {
    setIsAddStudent((prevData) => !prevData);
  };

  const deleteHandler = (id) => {
    const remStudents = filteredStudents.filter(
      (student) => student.studentId !== id
    );

    setFilteredStudents(remStudents);
  };

  const addNewStudentHandler = (data) => {
    setFilteredStudents((prevData) => {
      return [data, ...prevData];
    });
  };
  return (
    <>
      {isAddStudent === true && (
        <AddStudent
          onAddStudent={(data) => addNewStudentHandler(data)}
          onChangeState={addStudentHandler}
        />
      )}

      {isAddStudent == false && (
        <div className="h-[95vh] w-[95vw] bg-white rounded-md shadow-lg flex flex-col">
          {/* add student section */}
          <div className="h-[15%] w-[100%] border-b-[1px] border-gray-500 flex flex-row items-center justify-between px-8">
            <p className="text-lg font-bold">Student Directories</p>
            <p
              className="py-2 px-4 bg-green-500 text-white rounded-md cursor-pointer"
              onClick={addStudentHandler}
            >
              <span className="mr-2">+</span>Add student
            </p>
          </div>
          {/* add student section end */}

          {/* search student */}
          <div className="m-4 px-4 w-[40%] border-[1px] border-gray-400 rounded-md flex flex-row items-center space-x-2">
            <FaSearch />
            <input
              type="text"
              placeholder="Search student..."
              className="py-2 bg-transparent w-full border-none outline-none"
              value={searchInput}
              onChange={handleSearchInputChange}
            />
          </div>
          {/* search student end */}

          {/* show student list */}
          <div className="w-[90%] ml-[5%] overflow-y-auto">
            <table className="w-[100%]">
              <thead className="h-[3rem] bg-gray-200 text-gray-500">
                <tr>
                  <th className="w-[25%]">Student Name</th>
                  <th className="w-[12%]">DOB</th>
                  <th className="w-[12%]">Phone Number</th>
                  <th className="w-[15%]">Email Id</th>
                  <th className="w-[12%]">Father Name</th>
                  <th className="w-[12%]">Gender</th>
                  <th className="w-[12%]">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student) => (
                  <tr
                    key={student.studentId}
                    className="h-[4rem] border-b-[1px] border-gray-500 text-sm"
                  >
                    <td className="w-[25%]">
                      <div className="w-[100%] flex flex-row items-center justify-center space-x-4 relative">
                        {student.gender === "Male" && (
                          <img
                            src="https://cdn-icons-png.flaticon.com/128/4139/4139981.png"
                            alt="male_icon"
                            className="h-8 w-8 absolute left-[10%] top-[50%] translate-y-[-50%]"
                          />
                        )}

                        {student.gender === "Female" && (
                          <img
                            src="https://cdn-icons-png.flaticon.com/128/11498/11498793.png"
                            alt="female_icon"
                            className="h-8 w-8 absolute left-[10%] top-[50%] translate-y-[-50%]"
                          />
                        )}

                        <p className="font-semibold uppercase absolute left-[20%] top-[50%] translate-y-[-50%]">
                          {student.studentName}
                        </p>
                      </div>
                    </td>
                    <td className="w-[12%] text-center ">
                      {student.dateOfBirth}
                    </td>
                    <td className="w-[12%] text-center ">
                      {student.phoneNumber}
                    </td>
                    <td className="w-[15%] text-center ">{student.emailId}</td>
                    <td className="w-[12%] text-center ">
                      {student.fatherName}
                    </td>
                    <td className="w-[12%] text-center ">{student.gender}</td>
                    <td className="w-[12%]  relative">
                      <FaTrash
                        className="text-red-500 hover:text-red-700 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] cursor-pointer"
                        onClick={() => deleteHandler(student.studentId)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* show student list end */}
        </div>
      )}
    </>
  );
};

export default StudentList;
