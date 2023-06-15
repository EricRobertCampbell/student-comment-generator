import { useState } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import DownloadIcon from "@mui/icons-material/Download";

import { Student } from "../classes";
import type { $TSFixMe } from "../types";

interface ClassUploadProps {
  setStudents: $TSFixMe;
}
export const ClassUpload = ({ setStudents }: ClassUploadProps) => {
  const [error, setError] = useState<Error>();
  return (
    <Stack direction="row" spacing={2} alignItems="flex-start">
      <input
        color="primary"
        accept="text/csv"
        type="file"
        onChange={(e) => {
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
        id="icon-button-file"
        style={{ display: "none" }}
      />
      <label htmlFor="icon-button-file">
        <Button variant="contained" component="span" color="primary">
          Upload Class File
        </Button>
      </label>
      <Button
        startIcon={<DownloadIcon />}
        variant="outlined"
        component="a"
        href="/template.csv"
        download={true}
      >
        Get Template File
      </Button>
      {error ? <p>Error when parsing file: {error?.message}</p> : null}
    </Stack>
  );
};
