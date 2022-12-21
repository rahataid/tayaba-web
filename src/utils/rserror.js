module.exports = class RSError extends Error {
  constructor(message, name = 'unknown', type = 'general') {
    super();
    this.message = message;
    this.data = {
      type,
      message,
      name,
    };
    this.stack = new Error(message).stack;
  }
};
