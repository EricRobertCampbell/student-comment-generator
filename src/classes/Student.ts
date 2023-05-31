// @ts-expect-error
import { v4 } from "uuid";

export const studentQualities = [
  "Very Bad",
  "Bad",
  "Average",
  "Good",
  "Very Good",
] as const;
type Quality = typeof studentQualities[number];
interface StudentInput {
  name: string;
  quality?: Quality;
  strengths?: string;
  weaknesses?: string;
  roughComment?: string;
}
export class Student {
  id: string;
  name: string;
  quality: Quality;
  strengths: string;
  weaknesses: string;
  roughComment: string;
  comment?: string;

  constructor({
    name,
    quality,
    strengths,
    weaknesses,
    roughComment,
  }: StudentInput) {
    this.id = v4();
    this.name = name;
    this.quality = quality || "Average";
    this.strengths = strengths || "";
    this.weaknesses = weaknesses || "";
    this.roughComment = roughComment || "";
  }

  /**
   * Create an object for sending along with the request
   */
  asObject() {
    const { name, quality, strengths, weaknesses, roughComment, comment } =
      this;
    return { name, quality, strengths, weaknesses, roughComment, comment };
  }
}
