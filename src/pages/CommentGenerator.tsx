import { useState } from "react";
import { studentQualities, Student } from "../classes/Student";
import { LogoutButton } from "../components";
import { genericize } from "../utility/genericize";

const tableHeaders = [
  "Name",
  "Quality",
  "Strengths",
  "Weaknesses",
  "Rough Comment",
  "Comment",
];
interface ApiCallState {
  loading: boolean;
  error?: Error;
  complete: boolean;
}
const defaultApiCallState = {
  loading: false,
  complete: false,
};

export const CommentGenerator = () => {
  const [studentGroup, setStudentGroup] = useState<Array<Student>>([]);
  const [apiState, setApiState] = useState<Record<Student["id"], ApiCallState>>(
    {}
  );
  const [className, setClassName] = useState<string>("");
  const [wordLimit, setWordLimit] = useState<number>(300);
  const [lastComment, setLastComment] = useState<boolean>(false);
  return (
    <>
      <h2>Comment Generator</h2>
      <LogoutButton />

      {/* Configuration information */}
      <section key="configuration">
        <h2>Configuration Options</h2>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <label>
            Class Name&nbsp;
            <input
              name="Class Name"
              value={className}
              onChange={(e) => setClassName(e.target.value)}
            />
          </label>
          <label>
            Word Limit&nbsp;
            <input
              name="Word Limit"
              type="number"
              value={wordLimit}
              onChange={(e) => setWordLimit(e.target.valueAsNumber)}
            />
          </label>
          <label>
            <input
              name="Word Limit"
              type="checkbox"
              checked={lastComment}
              onChange={(e) => setLastComment(e.target.checked)}
            />
            Final Comments?&nbsp;
          </label>
        </div>
      </section>
      <section key="comments">
        <h2>Comments</h2>
        {/* Table of the students */}
        <table style={{ width: "100%", margin: "0 8px" }}>
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
                    disabled={apiState[student.id]?.loading}
                    onClick={async () => {
                      try {
                        setApiState((oldApiState) => {
                          return {
                            ...oldApiState,
                            [student.id]: {
                              loading: true,
                              complete: false,
                            },
                          };
                        });
                        const response = await fetch(
                          "/.netlify/functions/makeCommentGenerationCall",
                          {
                            method: "POST",
                            headers: {
                              "Content-Type": "application/json",
                            },
                            body: JSON.stringify(
                              {
                                student: student.asObject(),
                                options: {
                                  className,
                                  wordLimit,
                                  lastComment,
                                },
                              },
                              null,
                              4
                            ),
                          }
                        );
                        const json = await response.json();
                        const comment = genericize(json.completion, {
                          name: student.name,
                        });
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
                        setApiState((oldApiState) => {
                          return {
                            ...oldApiState,
                            [student.id]: {
                              loading: false,
                              complete: true,
                            },
                          };
                        });
                      } catch (e) {
                        setApiState((oldApiState) => {
                          return {
                            ...oldApiState,
                            [student.id]: {
                              loading: false,
                              error:
                                e instanceof Error
                                  ? e
                                  : new Error(JSON.stringify(e, null, 4)),
                              complete: false,
                            },
                          };
                        });
                      }
                    }}
                  >
                    {apiState[student.id]?.loading
                      ? "Loading..."
                      : apiState[student.id]?.error
                      ? "Error - Try Again in a Few Minutes"
                      : student.comment
                      ? "Regenerate Comment"
                      : "Generate Comment"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          onClick={() => {
            const newStudent = new Student({ name: "", quality: "Average" });
            setStudentGroup((oldStudentGroup) => [
              ...oldStudentGroup,
              newStudent,
            ]);
            setApiState((oldApiState) => ({
              ...oldApiState,
              [newStudent.id]: defaultApiCallState,
            }));
          }}
        >
          Add student
        </button>
      </section>
    </>
  );
};
