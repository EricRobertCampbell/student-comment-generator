import { useEffect, useState } from "react";
import { Stack } from "@mui/system";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import IconButton from "@mui/material/IconButton";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import Tooltip from "@mui/material/Tooltip";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { studentQualities, Student } from "../classes/Student";
import { LogoutButton, ClassUpload } from "../components";
import { genericize } from "../utility/genericize";

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

  // change the API state whenever the student group changes
  useEffect(() => {
    setApiState((oldApiState) => {
      return studentGroup.reduce((acc: typeof apiState, student) => {
        if (!(student.id in apiState)) {
          acc[student.id] = defaultApiCallState;
        } else {
          acc[student.id] = oldApiState[student.id];
        }
        return acc;
      }, {});
    });
  }, [studentGroup]);

  return (
    <Stack direction="column" spacing={2}>
      <Stack direction="row" justifyContent="flex-end">
        <LogoutButton />
      </Stack>

      {/* Configuration information */}
      <section key="configuration">
        <Accordion>
          <AccordionSummary>
            <Typography>Class Customization Options</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
                alignItems: "center",
              }}
            >
              <TextField
                label="Class Name"
                name="Class Name"
                onChange={(e) => setClassName(e.target.value)}
              />
              <TextField
                label="Word Limit"
                name="Word Limit"
                type="number"
                value={wordLimit}
                onChange={(e) => setWordLimit(Number(e.target.value))}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={lastComment}
                    onChange={(e) => setLastComment(e.target.checked)}
                  />
                }
                label="Last Comments?"
              />
            </div>
          </AccordionDetails>
        </Accordion>
      </section>
      <section key="comments">
        <Accordion>
          <AccordionSummary>
            <Typography>Comments</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <ClassUpload key="class-upload" setStudents={setStudentGroup} />
            {/* Table of the students */}
            <Stack direction="column">
              {studentGroup.map((student) => (
                <Card id={student.id} sx={{ p: 3, mt: 3 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={3}>
                      <TextField
                        name="name"
                        label="Name"
                        aria-label="name"
                        fullWidth
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
                    </Grid>
                    <Grid item xs={3} key="quality">
                      <FormControl style={{ width: "100%" }}>
                        <InputLabel id={`quality_${student.id}`}>
                          Quality
                        </InputLabel>
                        <Select
                          labelId={`quality_${student.id}`}
                          label="Quality"
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
                            return (
                              <MenuItem key={quality} value={quality}>
                                {quality}
                              </MenuItem>
                            );
                          })}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        name="strengths"
                        label="Strengths"
                        multiline={true}
                        value={student.strengths}
                        fullWidth
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
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        name="weaknesses"
                        label="Weaknesses"
                        fullWidth
                        multiline
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
                      />
                    </Grid>
                    <Grid key="roughComment" item xs={6}>
                      <TextField
                        name="roughComment"
                        label="Rough Comment"
                        fullWidth
                        multiline
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
                      />
                    </Grid>
                    <Grid key="comment" item xs={12}>
                      <TextField
                        name="comment"
                        label="Comment"
                        value={student.comment}
                        fullWidth
                        multiline
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
                      />
                    </Grid>
                  </Grid>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                    padding={2}
                  >
                    <LoadingButton
                      variant="contained"
                      loading={apiState[student.id]?.loading}
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
                    </LoadingButton>
                  </Stack>
                </Card>
              ))}
            </Stack>
            <Stack alignItems="center" justifyContent="center">
              <Tooltip title="Add new student">
                <IconButton
                  key="add-student-button"
                  onClick={() => {
                    const newStudent = new Student({
                      name: "",
                      quality: "Average",
                    });
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
                  <GroupAddIcon />
                </IconButton>
              </Tooltip>
            </Stack>
          </AccordionDetails>
        </Accordion>
      </section>
    </Stack>
  );
};
