interface GenericizeOptions {
  name?: string;
}
/**
 * Take a comment from ChatGPT and make it generic (substituting {{Name}} for their name, &c.)
 */
export const genericize = (
  comment: string,
  options: GenericizeOptions = {}
) => {
  let genericizedComment = comment;
  const replacements: Array<[RegExp, string]> = [
    [/\ss?he\s/g, ` {{he/she}} `],
    [/\sthey\s/g, " {{he/she}} "],
    [/\stheir\s/g, " {{his/her}} "],
    [/\sTheir\s/g, " {{His/her}} "],
    [/\s(his|her)\s/g, " {{his/her}} "],
    [/\s(His|Her)\s/g, " {{His/Her}} "],
    [/\s(He|She)\s/g, ` {{He/She}} `],
    [/\sThey\s/g, ` {{He/She}} `],
    [/\s+/g, " "],
  ];
  if (options.name) {
    const { name } = options;
    replacements.push([new RegExp(name, "g"), `{{Name}}`]);
    const parts = name.split(" ");
    let firstName = parts.length > 1 ? parts[0] : null;
    if (firstName) {
      replacements.push([new RegExp(firstName, "g"), `{{Name}}`]);
    }
  }
  replacements.forEach(([searchValue, replaceValue]) => {
    genericizedComment = genericizedComment.replaceAll(
      searchValue,
      replaceValue
    );
  });
  console.log("About to return", genericizedComment);
  return genericizedComment;
};
