import { useState } from "react";
import { Student } from "../classes";
import type { $TSFixMe } from "../types";

interface ClassUploadProps {
  setStudents: $TSFixMe;
}
export const ClassUpload = ({ setStudents }: ClassUploadProps) => {
  const [error, setError] = useState<Error>();
  return (
    <>
      <a href="/template.csv" download>
        Get Template File
      </a>
      <br />
      <label>
        Upload Class File&nbsp;
        <input
          type="file"
          name="class-upload"
          onChange={(e) => {
            console.log(e.target.files);
            const files = e.target.files;
            let file;
            if (files?.length && files.length > 0) {
              file = files[0];
            }
            const reader = new FileReader();
            reader.onload = (e) => {
              try {
                const text = e.target?.result;
                if (!text) {
                  throw new Error(
                    "CSV file was not able to be parsed - aborting"
                  );
                }
                let students: Array<Student> = [];
                text
                  // @ts-expect-error
                  .split("\n")
                  .slice(1)
                  .forEach((row: $TSFixMe) => {
                    if (!row) {
                      return;
                    }
                    if (row.split(",").length !== 5) {
                      throw new Error(
                        `Unexpected error parsing row "${row}" - when splitting it apart, there were ${
                          row.split(",").length
                        } instead of 5 entries. Are you missing some entries, or are there commas as part of one of the fields?`
                      );
                    }
                    const [name, quality, strengths, weaknesses, roughComment] =
                      row.split(/,/);
                    if (!name) {
                      return;
                    }
                    const newStudent = new Student({
                      name,
                      quality: Student.sanitizeQuality(quality),
                      strengths,
                      weaknesses,
                      roughComment,
                    });
                    students.push(newStudent);
                  });
                console.log({ students });
                setStudents(students);
              } catch (e) {
                setError(
                  e instanceof Error ? e : new Error(JSON.stringify(e, null, 4))
                );
              }
            };
            if (file) {
              reader.readAsText(file);
            }
          }}
        />
      </label>
      {error ? <p>Error when parsing file: {error?.message}</p> : null}
    </>
  );
};
