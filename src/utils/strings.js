export function parseMultiLineInput(input) {
  // Remove whitespace and newlines
  input = input.replace(/\s/g, '');

  // Check if input starts with '{' or '['
  if (input.startsWith('{') || input.startsWith('[')) {
    // Replace single quotes with double quotes
    input = input.replace(/'/g, '"');
    // Return parsed JSON array or object
    return JSON.parse(input);
  }

  // Check if input is a single line JSON string
  if (input.includes(':')) {
    // Wrap in curly braces
    input = '{' + input + '}';
    // Replace single quotes with double quotes
    input = input.replace(/'/g, '"');
    // Return parsed JSON object
    return JSON.parse(input);
  }

  // Otherwise, input is not valid
  throw new Error('Input is not a valid JSON array or object.');
}
