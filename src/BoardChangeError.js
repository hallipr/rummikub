'use strict';

class BoardChangeError extends Error {
  constructor(changeTestResults) {
    super("Invalid board change")
  }
}

module.exports = BoardChangeError;