import { useSelector } from "react-redux";
import StudentList from "./components/StudentList";

function App() {
  const students = useSelector((state) => state.student.studentList);

  return (
    <>
      <StudentList students={students} />
    </>
  );
}

export default App;
