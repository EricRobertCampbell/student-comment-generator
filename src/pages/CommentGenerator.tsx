import { useState } from "react";
import { studentQualities, Student } from "../classes/Student";
import { LogoutButton } from "../components";

const tableHeaders = [
  "Name",
  "Quality",
  "Strengths",
  "Weaknesses",
  "Rough Comment",
  "Comment",
];

export const CommentGenerator = () => {
  const [studentGroup, setStudentGroup] = useState<Array<Student>>([]);
  return (
    <>
      <h2>Comment Generator</h2>
      <LogoutButton />

      {/* Table of the students */}
      <table>
        <thead>
          <tr>
            {tableHeaders.map((header) => (
              <th scope="col" key={header}>
                {header}
              </th>
            ))}
            <th></th>
          </tr>
        </thead>
        <tbody>
          {studentGroup.map((student) => (
            <tr key={student.id}>
              <td key="name">
                <input
                  name="name"
                  aria-label="name"
                  value={student.name}
                  onChange={(e) => {
                    const newName = e.target.value;
                    setStudentGroup((oldStudentGroup) => {
                      const newStudentGroup = [...oldStudentGroup];
                      for (let newStudent of newStudentGroup) {
                        if (student.id === newStudent.id) {
                          newStudent.name = newName;
                          break;
                        }
                      }
                      return newStudentGroup;
                    });
                  }}
                />
              </td>
              <td key="quality">
                <select
                  name="quality"
                  value={student.quality}
                  onChange={(e) => {
                    const selectedQuality = e.target.value;
                    setStudentGroup((oldStudentGroup) => {
                      const newStudentGroup = [...oldStudentGroup];
                      for (let newStudent of newStudentGroup) {
                        if (student.id === newStudent.id) {
                          // @ts-expect-error
                          newStudent.quality = selectedQuality;
                          break;
                        }
                      }
                      return newStudentGroup;
                    });
                  }}
                >
                  {studentQualities.map((quality) => {
                    return <option value={quality}>{quality}</option>;
                  })}
                </select>
              </td>
              <td key="strengths">
                <textarea
                  name="strengths"
                  value={student.strengths}
                  onChange={(e) => {
                    const strengths = e.target.value;
                    setStudentGroup((oldStudentGroup) => {
                      const newStudentGroup = [...oldStudentGroup];
                      for (let newStudent of newStudentGroup) {
                        if (student.id === newStudent.id) {
                          newStudent.strengths = strengths;
                          break;
                        }
                      }
                      return newStudentGroup;
                    });
                  }}
                ></textarea>
              </td>
              <td key="weaknesses">
                <textarea
                  name="weaknesses"
                  value={student.weaknesses}
                  onChange={(e) => {
                    const weaknesses = e.target.value;
                    setStudentGroup((oldStudentGroup) => {
                      const newStudentGroup = [...oldStudentGroup];
                      for (let newStudent of newStudentGroup) {
                        if (student.id === newStudent.id) {
                          newStudent.weaknesses = weaknesses;
                          break;
                        }
                      }
                      return newStudentGroup;
                    });
                  }}
                ></textarea>
              </td>
              <td key="roughComment">
                <textarea
                  name="roughComment"
                  value={student.roughComment}
                  onChange={(e) => {
                    const roughComment = e.target.value;
                    setStudentGroup((oldStudentGroup) => {
                      const newStudentGroup = [...oldStudentGroup];
                      for (let newStudent of newStudentGroup) {
                        if (student.id === newStudent.id) {
                          newStudent.roughComment = roughComment;
                          break;
                        }
                      }
                      return newStudentGroup;
                    });
                  }}
                ></textarea>
              </td>
              <td key="comment">
                <textarea
                  name="comment"
                  value={student.comment}
                  onChange={(e) => {
                    const comment = e.target.value;
                    setStudentGroup((oldStudentGroup) => {
                      const newStudentGroup = [...oldStudentGroup];
                      for (let newStudent of newStudentGroup) {
                        if (student.id === newStudent.id) {
                          newStudent.comment = comment;
                          break;
                        }
                      }
                      return newStudentGroup;
                    });
                  }}
                ></textarea>
              </td>
              <td key="actionButtons">
                <button
                  onClick={async () => {
                    const response = await fetch(
                      "/.netlify/functions/makeCommentGenerationCall",
                      {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify(student.asObject(), null, 4),
                      }
                    );
                    const json = await response.json();
                    const comment = json.completion;
                    setStudentGroup((oldStudentGroup) => {
                      const newStudentGroup = [...oldStudentGroup];
                      for (let newStudent of newStudentGroup) {
                        if (student.id === newStudent.id) {
                          newStudent.comment = comment;
                          break;
                        }
                      }
                      return newStudentGroup;
                    });
                  }}
                >
                  Call API
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={() => {
          setStudentGroup((oldStudentGroup) => [
            ...oldStudentGroup,
            new Student({ name: "", quality: "Average" }),
          ]);
        }}
      >
        Add student
      </button>
    </>
  );
};
