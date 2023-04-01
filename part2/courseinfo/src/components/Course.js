import Header from "./Header";
import Content from "./Content";
import Total from "./Total";

const Course = ({ course }) => {
  const sum = course.parts.reduce((acc, part) => acc + part.exercises, 0);

  return (
    <>
      <Header courseName={course.name} />
      <Content parts={course.parts} />
      <Total sum={sum} />
    </>
  );
};

export default Course;
