/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function commonjsRequire () {
	throw new Error('Dynamic requires are not currently supported by rollup-plugin-commonjs');
}

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var invariant_1 = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = invariant;
/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

function invariant(condition, message) {
  /* istanbul ignore else */
  if (!condition) {
    throw new Error(message);
  }
}
});

unwrapExports(invariant_1);

var source = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Source = undefined;



var _invariant2 = _interopRequireDefault(invariant_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /**
                                                                                                                                                           * Copyright (c) 2015-present, Facebook, Inc.
                                                                                                                                                           *
                                                                                                                                                           * This source code is licensed under the MIT license found in the
                                                                                                                                                           * LICENSE file in the root directory of this source tree.
                                                                                                                                                           *
                                                                                                                                                           * 
                                                                                                                                                           */

/**
 * A representation of source input to GraphQL.
 * `name` and `locationOffset` are optional. They are useful for clients who
 * store GraphQL documents in source files; for example, if the GraphQL input
 * starts at line 40 in a file named Foo.graphql, it might be useful for name to
 * be "Foo.graphql" and location to be `{ line: 40, column: 0 }`.
 * line and column in locationOffset are 1-indexed
 */
var Source = exports.Source = function Source(body, name, locationOffset) {
  _classCallCheck(this, Source);

  this.body = body;
  this.name = name || 'GraphQL request';
  this.locationOffset = locationOffset || { line: 1, column: 1 };
  !(this.locationOffset.line > 0) ? (0, _invariant2.default)(0, 'line in locationOffset is 1-indexed and must be positive') : void 0;
  !(this.locationOffset.column > 0) ? (0, _invariant2.default)(0, 'column in locationOffset is 1-indexed and must be positive') : void 0;
};
});

unwrapExports(source);
var source_1 = source.Source;

var location_1 = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLocation = getLocation;


/**
 * Takes a Source and a UTF-8 character offset, and returns the corresponding
 * line and column as a SourceLocation.
 */
/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

function getLocation(source, position) {
  var lineRegexp = /\r\n|[\n\r]/g;
  var line = 1;
  var column = position + 1;
  var match = void 0;
  while ((match = lineRegexp.exec(source.body)) && match.index < position) {
    line += 1;
    column = position + 1 - (match.index + match[0].length);
  }
  return { line: line, column: column };
}

/**
 * Represents a location in a Source.
 */
});

unwrapExports(location_1);
var location_2 = location_1.getLocation;

var printError_1 = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.printError = printError;



/**
 * Prints a GraphQLError to a string, representing useful location information
 * about the error's position in the source.
 */
function printError(error) {
  var printedLocations = [];
  if (error.nodes) {
    error.nodes.forEach(function (node) {
      if (node.loc) {
        printedLocations.push(highlightSourceAtLocation(node.loc.source, (0, location_1.getLocation)(node.loc.source, node.loc.start)));
      }
    });
  } else if (error.source && error.locations) {
    var source = error.source;
    error.locations.forEach(function (location) {
      printedLocations.push(highlightSourceAtLocation(source, location));
    });
  }
  return printedLocations.length === 0 ? error.message : [error.message].concat(printedLocations).join('\n\n') + '\n';
}

/**
 * Render a helpful description of the location of the error in the GraphQL
 * Source document.
 */
/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

function highlightSourceAtLocation(source, location) {
  var line = location.line;
  var lineOffset = source.locationOffset.line - 1;
  var columnOffset = getColumnOffset(source, location);
  var contextLine = line + lineOffset;
  var contextColumn = location.column + columnOffset;
  var prevLineNum = (contextLine - 1).toString();
  var lineNum = contextLine.toString();
  var nextLineNum = (contextLine + 1).toString();
  var padLen = nextLineNum.length;
  var lines = source.body.split(/\r\n|[\n\r]/g);
  lines[0] = whitespace(source.locationOffset.column - 1) + lines[0];
  var outputLines = [source.name + ' (' + contextLine + ':' + contextColumn + ')', line >= 2 && lpad(padLen, prevLineNum) + ': ' + lines[line - 2], lpad(padLen, lineNum) + ': ' + lines[line - 1], whitespace(2 + padLen + contextColumn - 1) + '^', line < lines.length && lpad(padLen, nextLineNum) + ': ' + lines[line]];
  return outputLines.filter(Boolean).join('\n');
}

function getColumnOffset(source, location) {
  return location.line === 1 ? source.locationOffset.column - 1 : 0;
}

function whitespace(len) {
  return Array(len + 1).join(' ');
}

function lpad(len, str) {
  return whitespace(len - str.length) + str;
}
});

unwrapExports(printError_1);
var printError_2 = printError_1.printError;

var GraphQLError_1 = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GraphQLError = GraphQLError;





/**
 * A GraphQLError describes an Error found during the parse, validate, or
 * execute phases of performing a GraphQL operation. In addition to a message
 * and stack trace, it also includes information about the locations in a
 * GraphQL document and/or execution result that correspond to the Error.
 */
/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

function GraphQLError( // eslint-disable-line no-redeclare
message, nodes, source, positions, path, originalError, extensions) {
  // Compute list of blame nodes.
  var _nodes = Array.isArray(nodes) ? nodes.length !== 0 ? nodes : undefined : nodes ? [nodes] : undefined;

  // Compute locations in the source for the given nodes/positions.
  var _source = source;
  if (!_source && _nodes) {
    var node = _nodes[0];
    _source = node && node.loc && node.loc.source;
  }

  var _positions = positions;
  if (!_positions && _nodes) {
    _positions = _nodes.reduce(function (list, node) {
      if (node.loc) {
        list.push(node.loc.start);
      }
      return list;
    }, []);
  }
  if (_positions && _positions.length === 0) {
    _positions = undefined;
  }

  var _locations = void 0;
  if (positions && source) {
    var providedSource = source;
    _locations = positions.map(function (pos) {
      return (0, location_1.getLocation)(providedSource, pos);
    });
  } else if (_nodes) {
    _locations = _nodes.reduce(function (list, node) {
      if (node.loc) {
        list.push((0, location_1.getLocation)(node.loc.source, node.loc.start));
      }
      return list;
    }, []);
  }

  Object.defineProperties(this, {
    message: {
      value: message,
      // By being enumerable, JSON.stringify will include `message` in the
      // resulting output. This ensures that the simplest possible GraphQL
      // service adheres to the spec.
      enumerable: true,
      writable: true
    },
    locations: {
      // Coercing falsey values to undefined ensures they will not be included
      // in JSON.stringify() when not provided.
      value: _locations || undefined,
      // By being enumerable, JSON.stringify will include `locations` in the
      // resulting output. This ensures that the simplest possible GraphQL
      // service adheres to the spec.
      enumerable: true
    },
    path: {
      // Coercing falsey values to undefined ensures they will not be included
      // in JSON.stringify() when not provided.
      value: path || undefined,
      // By being enumerable, JSON.stringify will include `path` in the
      // resulting output. This ensures that the simplest possible GraphQL
      // service adheres to the spec.
      enumerable: true
    },
    nodes: {
      value: _nodes || undefined
    },
    source: {
      value: _source || undefined
    },
    positions: {
      value: _positions || undefined
    },
    originalError: {
      value: originalError
    },
    extensions: {
      value: extensions || originalError && originalError.extensions
    }
  });

  // Include (non-enumerable) stack trace.
  if (originalError && originalError.stack) {
    Object.defineProperty(this, 'stack', {
      value: originalError.stack,
      writable: true,
      configurable: true
    });
  } else if (Error.captureStackTrace) {
    Error.captureStackTrace(this, GraphQLError);
  } else {
    Object.defineProperty(this, 'stack', {
      value: Error().stack,
      writable: true,
      configurable: true
    });
  }
}

GraphQLError.prototype = Object.create(Error.prototype, {
  constructor: { value: GraphQLError },
  name: { value: 'GraphQLError' },
  toString: {
    value: function toString() {
      return (0, printError_1.printError)(this);
    }
  }
});
});

unwrapExports(GraphQLError_1);
var GraphQLError_2 = GraphQLError_1.GraphQLError;

var syntaxError_1 = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.syntaxError = syntaxError;



/**
 * Produces a GraphQLError representing a syntax error, containing useful
 * descriptive information about the syntax error's position in the source.
 */
/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

function syntaxError(source, position, description) {
  return new GraphQLError_1.GraphQLError('Syntax Error: ' + description, undefined, source, [position]);
}
});

unwrapExports(syntaxError_1);
var syntaxError_2 = syntaxError_1.syntaxError;

var locatedError_1 = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.locatedError = locatedError;



/**
 * Given an arbitrary Error, presumably thrown while attempting to execute a
 * GraphQL operation, produce a new GraphQLError aware of the location in the
 * document responsible for the original Error.
 */
function locatedError(originalError, nodes, path) {
  // Note: this uses a brand-check to support GraphQL errors originating from
  // other contexts.
  if (originalError && Array.isArray(originalError.path)) {
    return originalError;
  }

  return new GraphQLError_1.GraphQLError(originalError && originalError.message, originalError && originalError.nodes || nodes, originalError && originalError.source, originalError && originalError.positions, path, originalError);
} /**
   * Copyright (c) 2015-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *
   * 
   */
});

unwrapExports(locatedError_1);
var locatedError_2 = locatedError_1.locatedError;

var formatError_1 = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /**
                                                                                                                                                                                                                                                                   * Copyright (c) 2015-present, Facebook, Inc.
                                                                                                                                                                                                                                                                   *
                                                                                                                                                                                                                                                                   * This source code is licensed under the MIT license found in the
                                                                                                                                                                                                                                                                   * LICENSE file in the root directory of this source tree.
                                                                                                                                                                                                                                                                   *
                                                                                                                                                                                                                                                                   * 
                                                                                                                                                                                                                                                                   */

exports.formatError = formatError;



var _invariant2 = _interopRequireDefault(invariant_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Given a GraphQLError, format it according to the rules described by the
 * Response Format, Errors section of the GraphQL Specification.
 */
function formatError(error) {
  !error ? (0, _invariant2.default)(0, 'Received null or undefined error.') : void 0;
  return _extends({}, error.extensions, {
    message: error.message || 'An unknown error occurred.',
    locations: error.locations,
    path: error.path
  });
}
});

unwrapExports(formatError_1);
var formatError_2 = formatError_1.formatError;

var error = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});



Object.defineProperty(exports, 'GraphQLError', {
  enumerable: true,
  get: function get() {
    return GraphQLError_1.GraphQLError;
  }
});



Object.defineProperty(exports, 'syntaxError', {
  enumerable: true,
  get: function get() {
    return syntaxError_1.syntaxError;
  }
});



Object.defineProperty(exports, 'locatedError', {
  enumerable: true,
  get: function get() {
    return locatedError_1.locatedError;
  }
});



Object.defineProperty(exports, 'printError', {
  enumerable: true,
  get: function get() {
    return printError_1.printError;
  }
});



Object.defineProperty(exports, 'formatError', {
  enumerable: true,
  get: function get() {
    return formatError_1.formatError;
  }
});
});

unwrapExports(error);

var blockStringValue_1 = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = blockStringValue;
/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

/**
 * Produces the value of a block string from its parsed raw value, similar to
 * Coffeescript's block string, Python's docstring trim or Ruby's strip_heredoc.
 *
 * This implements the GraphQL spec's BlockStringValue() static algorithm.
 */
function blockStringValue(rawString) {
  // Expand a block string's raw value into independent lines.
  var lines = rawString.split(/\r\n|[\n\r]/g);

  // Remove common indentation from all lines but first.
  var commonIndent = null;
  for (var i = 1; i < lines.length; i++) {
    var line = lines[i];
    var indent = leadingWhitespace(line);
    if (indent < line.length && (commonIndent === null || indent < commonIndent)) {
      commonIndent = indent;
      if (commonIndent === 0) {
        break;
      }
    }
  }

  if (commonIndent) {
    for (var _i = 1; _i < lines.length; _i++) {
      lines[_i] = lines[_i].slice(commonIndent);
    }
  }

  // Remove leading and trailing blank lines.
  while (lines.length > 0 && isBlank(lines[0])) {
    lines.shift();
  }
  while (lines.length > 0 && isBlank(lines[lines.length - 1])) {
    lines.pop();
  }

  // Return a string of the lines joined with U+000A.
  return lines.join('\n');
}

function leadingWhitespace(str) {
  var i = 0;
  while (i < str.length && (str[i] === ' ' || str[i] === '\t')) {
    i++;
  }
  return i;
}

function isBlank(str) {
  return leadingWhitespace(str) === str.length;
}
});

unwrapExports(blockStringValue_1);

var lexer = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TokenKind = undefined;
exports.createLexer = createLexer;
exports.getTokenDesc = getTokenDesc;





var _blockStringValue2 = _interopRequireDefault(blockStringValue_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Given a Source object, this returns a Lexer for that source.
 * A Lexer is a stateful stream generator in that every time
 * it is advanced, it returns the next token in the Source. Assuming the
 * source lexes, the final Token emitted by the lexer will be of kind
 * EOF, after which the lexer will repeatedly return the same EOF token
 * whenever called.
 */
/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

function createLexer(source, options) {
  var startOfFileToken = new Tok(SOF, 0, 0, 0, 0, null);
  var lexer = {
    source: source,
    options: options,
    lastToken: startOfFileToken,
    token: startOfFileToken,
    line: 1,
    lineStart: 0,
    advance: advanceLexer,
    lookahead: lookahead
  };
  return lexer;
}

function advanceLexer() {
  this.lastToken = this.token;
  var token = this.token = this.lookahead();
  return token;
}

function lookahead() {
  var token = this.token;
  if (token.kind !== EOF) {
    do {
      // Note: next is only mutable during parsing, so we cast to allow this.
      token = token.next || (token.next = readToken(this, token));
    } while (token.kind === COMMENT);
  }
  return token;
}

/**
 * The return type of createLexer.
 */


// Each kind of token.
var SOF = '<SOF>';
var EOF = '<EOF>';
var BANG = '!';
var DOLLAR = '$';
var PAREN_L = '(';
var PAREN_R = ')';
var SPREAD = '...';
var COLON = ':';
var EQUALS = '=';
var AT = '@';
var BRACKET_L = '[';
var BRACKET_R = ']';
var BRACE_L = '{';
var PIPE = '|';
var BRACE_R = '}';
var NAME = 'Name';
var INT = 'Int';
var FLOAT = 'Float';
var STRING = 'String';
var BLOCK_STRING = 'BlockString';
var COMMENT = 'Comment';

/**
 * An exported enum describing the different kinds of tokens that the
 * lexer emits.
 */
var TokenKind = exports.TokenKind = {
  SOF: SOF,
  EOF: EOF,
  BANG: BANG,
  DOLLAR: DOLLAR,
  PAREN_L: PAREN_L,
  PAREN_R: PAREN_R,
  SPREAD: SPREAD,
  COLON: COLON,
  EQUALS: EQUALS,
  AT: AT,
  BRACKET_L: BRACKET_L,
  BRACKET_R: BRACKET_R,
  BRACE_L: BRACE_L,
  PIPE: PIPE,
  BRACE_R: BRACE_R,
  NAME: NAME,
  INT: INT,
  FLOAT: FLOAT,
  STRING: STRING,
  BLOCK_STRING: BLOCK_STRING,
  COMMENT: COMMENT
};

/**
 * A helper function to describe a token as a string for debugging
 */
function getTokenDesc(token) {
  var value = token.value;
  return value ? token.kind + ' "' + value + '"' : token.kind;
}

var charCodeAt = String.prototype.charCodeAt;
var slice = String.prototype.slice;

/**
 * Helper function for constructing the Token object.
 */
function Tok(kind, start, end, line, column, prev, value) {
  this.kind = kind;
  this.start = start;
  this.end = end;
  this.line = line;
  this.column = column;
  this.value = value;
  this.prev = prev;
  this.next = null;
}

// Print a simplified form when appearing in JSON/util.inspect.
Tok.prototype.toJSON = Tok.prototype.inspect = function toJSON() {
  return {
    kind: this.kind,
    value: this.value,
    line: this.line,
    column: this.column
  };
};

function printCharCode(code) {
  return (
    // NaN/undefined represents access beyond the end of the file.
    isNaN(code) ? EOF : // Trust JSON for ASCII.
    code < 0x007f ? JSON.stringify(String.fromCharCode(code)) : // Otherwise print the escaped form.
    '"\\u' + ('00' + code.toString(16).toUpperCase()).slice(-4) + '"'
  );
}

/**
 * Gets the next token from the source starting at the given position.
 *
 * This skips over whitespace and comments until it finds the next lexable
 * token, then lexes punctuators immediately or calls the appropriate helper
 * function for more complicated tokens.
 */
function readToken(lexer, prev) {
  var source = lexer.source;
  var body = source.body;
  var bodyLength = body.length;

  var position = positionAfterWhitespace(body, prev.end, lexer);
  var line = lexer.line;
  var col = 1 + position - lexer.lineStart;

  if (position >= bodyLength) {
    return new Tok(EOF, bodyLength, bodyLength, line, col, prev);
  }

  var code = charCodeAt.call(body, position);

  // SourceCharacter
  if (code < 0x0020 && code !== 0x0009 && code !== 0x000a && code !== 0x000d) {
    throw (0, error.syntaxError)(source, position, 'Cannot contain the invalid character ' + printCharCode(code) + '.');
  }

  switch (code) {
    // !
    case 33:
      return new Tok(BANG, position, position + 1, line, col, prev);
    // #
    case 35:
      return readComment(source, position, line, col, prev);
    // $
    case 36:
      return new Tok(DOLLAR, position, position + 1, line, col, prev);
    // (
    case 40:
      return new Tok(PAREN_L, position, position + 1, line, col, prev);
    // )
    case 41:
      return new Tok(PAREN_R, position, position + 1, line, col, prev);
    // .
    case 46:
      if (charCodeAt.call(body, position + 1) === 46 && charCodeAt.call(body, position + 2) === 46) {
        return new Tok(SPREAD, position, position + 3, line, col, prev);
      }
      break;
    // :
    case 58:
      return new Tok(COLON, position, position + 1, line, col, prev);
    // =
    case 61:
      return new Tok(EQUALS, position, position + 1, line, col, prev);
    // @
    case 64:
      return new Tok(AT, position, position + 1, line, col, prev);
    // [
    case 91:
      return new Tok(BRACKET_L, position, position + 1, line, col, prev);
    // ]
    case 93:
      return new Tok(BRACKET_R, position, position + 1, line, col, prev);
    // {
    case 123:
      return new Tok(BRACE_L, position, position + 1, line, col, prev);
    // |
    case 124:
      return new Tok(PIPE, position, position + 1, line, col, prev);
    // }
    case 125:
      return new Tok(BRACE_R, position, position + 1, line, col, prev);
    // A-Z _ a-z
    case 65:
    case 66:
    case 67:
    case 68:
    case 69:
    case 70:
    case 71:
    case 72:
    case 73:
    case 74:
    case 75:
    case 76:
    case 77:
    case 78:
    case 79:
    case 80:
    case 81:
    case 82:
    case 83:
    case 84:
    case 85:
    case 86:
    case 87:
    case 88:
    case 89:
    case 90:
    case 95:
    case 97:
    case 98:
    case 99:
    case 100:
    case 101:
    case 102:
    case 103:
    case 104:
    case 105:
    case 106:
    case 107:
    case 108:
    case 109:
    case 110:
    case 111:
    case 112:
    case 113:
    case 114:
    case 115:
    case 116:
    case 117:
    case 118:
    case 119:
    case 120:
    case 121:
    case 122:
      return readName(source, position, line, col, prev);
    // - 0-9
    case 45:
    case 48:
    case 49:
    case 50:
    case 51:
    case 52:
    case 53:
    case 54:
    case 55:
    case 56:
    case 57:
      return readNumber(source, position, code, line, col, prev);
    // "
    case 34:
      if (charCodeAt.call(body, position + 1) === 34 && charCodeAt.call(body, position + 2) === 34) {
        return readBlockString(source, position, line, col, prev);
      }
      return readString(source, position, line, col, prev);
  }

  throw (0, error.syntaxError)(source, position, unexpectedCharacterMessage(code));
}

/**
 * Report a message that an unexpected character was encountered.
 */
function unexpectedCharacterMessage(code) {
  if (code === 39) {
    // '
    return "Unexpected single quote character ('), did you mean to use " + 'a double quote (")?';
  }

  return 'Cannot parse the unexpected character ' + printCharCode(code) + '.';
}

/**
 * Reads from body starting at startPosition until it finds a non-whitespace
 * or commented character, then returns the position of that character for
 * lexing.
 */
function positionAfterWhitespace(body, startPosition, lexer) {
  var bodyLength = body.length;
  var position = startPosition;
  while (position < bodyLength) {
    var code = charCodeAt.call(body, position);
    // tab | space | comma | BOM
    if (code === 9 || code === 32 || code === 44 || code === 0xfeff) {
      ++position;
    } else if (code === 10) {
      // new line
      ++position;
      ++lexer.line;
      lexer.lineStart = position;
    } else if (code === 13) {
      // carriage return
      if (charCodeAt.call(body, position + 1) === 10) {
        position += 2;
      } else {
        ++position;
      }
      ++lexer.line;
      lexer.lineStart = position;
    } else {
      break;
    }
  }
  return position;
}

/**
 * Reads a comment token from the source file.
 *
 * #[\u0009\u0020-\uFFFF]*
 */
function readComment(source, start, line, col, prev) {
  var body = source.body;
  var code = void 0;
  var position = start;

  do {
    code = charCodeAt.call(body, ++position);
  } while (code !== null && (
  // SourceCharacter but not LineTerminator
  code > 0x001f || code === 0x0009));

  return new Tok(COMMENT, start, position, line, col, prev, slice.call(body, start + 1, position));
}

/**
 * Reads a number token from the source file, either a float
 * or an int depending on whether a decimal point appears.
 *
 * Int:   -?(0|[1-9][0-9]*)
 * Float: -?(0|[1-9][0-9]*)(\.[0-9]+)?((E|e)(+|-)?[0-9]+)?
 */
function readNumber(source, start, firstCode, line, col, prev) {
  var body = source.body;
  var code = firstCode;
  var position = start;
  var isFloat = false;

  if (code === 45) {
    // -
    code = charCodeAt.call(body, ++position);
  }

  if (code === 48) {
    // 0
    code = charCodeAt.call(body, ++position);
    if (code >= 48 && code <= 57) {
      throw (0, error.syntaxError)(source, position, 'Invalid number, unexpected digit after 0: ' + printCharCode(code) + '.');
    }
  } else {
    position = readDigits(source, position, code);
    code = charCodeAt.call(body, position);
  }

  if (code === 46) {
    // .
    isFloat = true;

    code = charCodeAt.call(body, ++position);
    position = readDigits(source, position, code);
    code = charCodeAt.call(body, position);
  }

  if (code === 69 || code === 101) {
    // E e
    isFloat = true;

    code = charCodeAt.call(body, ++position);
    if (code === 43 || code === 45) {
      // + -
      code = charCodeAt.call(body, ++position);
    }
    position = readDigits(source, position, code);
  }

  return new Tok(isFloat ? FLOAT : INT, start, position, line, col, prev, slice.call(body, start, position));
}

/**
 * Returns the new position in the source after reading digits.
 */
function readDigits(source, start, firstCode) {
  var body = source.body;
  var position = start;
  var code = firstCode;
  if (code >= 48 && code <= 57) {
    // 0 - 9
    do {
      code = charCodeAt.call(body, ++position);
    } while (code >= 48 && code <= 57); // 0 - 9
    return position;
  }
  throw (0, error.syntaxError)(source, position, 'Invalid number, expected digit but got: ' + printCharCode(code) + '.');
}

/**
 * Reads a string token from the source file.
 *
 * "([^"\\\u000A\u000D]|(\\(u[0-9a-fA-F]{4}|["\\/bfnrt])))*"
 */
function readString(source, start, line, col, prev) {
  var body = source.body;
  var position = start + 1;
  var chunkStart = position;
  var code = 0;
  var value = '';

  while (position < body.length && (code = charCodeAt.call(body, position)) !== null &&
  // not LineTerminator
  code !== 0x000a && code !== 0x000d) {
    // Closing Quote (")
    if (code === 34) {
      value += slice.call(body, chunkStart, position);
      return new Tok(STRING, start, position + 1, line, col, prev, value);
    }

    // SourceCharacter
    if (code < 0x0020 && code !== 0x0009) {
      throw (0, error.syntaxError)(source, position, 'Invalid character within String: ' + printCharCode(code) + '.');
    }

    ++position;
    if (code === 92) {
      // \
      value += slice.call(body, chunkStart, position - 1);
      code = charCodeAt.call(body, position);
      switch (code) {
        case 34:
          value += '"';
          break;
        case 47:
          value += '/';
          break;
        case 92:
          value += '\\';
          break;
        case 98:
          value += '\b';
          break;
        case 102:
          value += '\f';
          break;
        case 110:
          value += '\n';
          break;
        case 114:
          value += '\r';
          break;
        case 116:
          value += '\t';
          break;
        case 117:
          // u
          var charCode = uniCharCode(charCodeAt.call(body, position + 1), charCodeAt.call(body, position + 2), charCodeAt.call(body, position + 3), charCodeAt.call(body, position + 4));
          if (charCode < 0) {
            throw (0, error.syntaxError)(source, position, 'Invalid character escape sequence: ' + ('\\u' + body.slice(position + 1, position + 5) + '.'));
          }
          value += String.fromCharCode(charCode);
          position += 4;
          break;
        default:
          throw (0, error.syntaxError)(source, position, 'Invalid character escape sequence: \\' + String.fromCharCode(code) + '.');
      }
      ++position;
      chunkStart = position;
    }
  }

  throw (0, error.syntaxError)(source, position, 'Unterminated string.');
}

/**
 * Reads a block string token from the source file.
 *
 * """("?"?(\\"""|\\(?!=""")|[^"\\]))*"""
 */
function readBlockString(source, start, line, col, prev) {
  var body = source.body;
  var position = start + 3;
  var chunkStart = position;
  var code = 0;
  var rawValue = '';

  while (position < body.length && (code = charCodeAt.call(body, position)) !== null) {
    // Closing Triple-Quote (""")
    if (code === 34 && charCodeAt.call(body, position + 1) === 34 && charCodeAt.call(body, position + 2) === 34) {
      rawValue += slice.call(body, chunkStart, position);
      return new Tok(BLOCK_STRING, start, position + 3, line, col, prev, (0, _blockStringValue2.default)(rawValue));
    }

    // SourceCharacter
    if (code < 0x0020 && code !== 0x0009 && code !== 0x000a && code !== 0x000d) {
      throw (0, error.syntaxError)(source, position, 'Invalid character within String: ' + printCharCode(code) + '.');
    }

    // Escape Triple-Quote (\""")
    if (code === 92 && charCodeAt.call(body, position + 1) === 34 && charCodeAt.call(body, position + 2) === 34 && charCodeAt.call(body, position + 3) === 34) {
      rawValue += slice.call(body, chunkStart, position) + '"""';
      position += 4;
      chunkStart = position;
    } else {
      ++position;
    }
  }

  throw (0, error.syntaxError)(source, position, 'Unterminated string.');
}

/**
 * Converts four hexidecimal chars to the integer that the
 * string represents. For example, uniCharCode('0','0','0','f')
 * will return 15, and uniCharCode('0','0','f','f') returns 255.
 *
 * Returns a negative number on error, if a char was invalid.
 *
 * This is implemented by noting that char2hex() returns -1 on error,
 * which means the result of ORing the char2hex() will also be negative.
 */
function uniCharCode(a, b, c, d) {
  return char2hex(a) << 12 | char2hex(b) << 8 | char2hex(c) << 4 | char2hex(d);
}

/**
 * Converts a hex character to its integer value.
 * '0' becomes 0, '9' becomes 9
 * 'A' becomes 10, 'F' becomes 15
 * 'a' becomes 10, 'f' becomes 15
 *
 * Returns -1 on error.
 */
function char2hex(a) {
  return a >= 48 && a <= 57 ? a - 48 // 0-9
  : a >= 65 && a <= 70 ? a - 55 // A-F
  : a >= 97 && a <= 102 ? a - 87 // a-f
  : -1;
}

/**
 * Reads an alphanumeric + underscore name from the source.
 *
 * [_A-Za-z][_0-9A-Za-z]*
 */
function readName(source, position, line, col, prev) {
  var body = source.body;
  var bodyLength = body.length;
  var end = position + 1;
  var code = 0;
  while (end !== bodyLength && (code = charCodeAt.call(body, end)) !== null && (code === 95 || // _
  code >= 48 && code <= 57 || // 0-9
  code >= 65 && code <= 90 || // A-Z
  code >= 97 && code <= 122) // a-z
  ) {
    ++end;
  }
  return new Tok(NAME, position, end, line, col, prev, slice.call(body, position, end));
}
});

unwrapExports(lexer);
var lexer_1 = lexer.TokenKind;
var lexer_2 = lexer.createLexer;
var lexer_3 = lexer.getTokenDesc;

var kinds = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

// Name

var NAME = exports.NAME = 'Name';

// Document

var DOCUMENT = exports.DOCUMENT = 'Document';
var OPERATION_DEFINITION = exports.OPERATION_DEFINITION = 'OperationDefinition';
var VARIABLE_DEFINITION = exports.VARIABLE_DEFINITION = 'VariableDefinition';
var VARIABLE = exports.VARIABLE = 'Variable';
var SELECTION_SET = exports.SELECTION_SET = 'SelectionSet';
var FIELD = exports.FIELD = 'Field';
var ARGUMENT = exports.ARGUMENT = 'Argument';

// Fragments

var FRAGMENT_SPREAD = exports.FRAGMENT_SPREAD = 'FragmentSpread';
var INLINE_FRAGMENT = exports.INLINE_FRAGMENT = 'InlineFragment';
var FRAGMENT_DEFINITION = exports.FRAGMENT_DEFINITION = 'FragmentDefinition';

// Values

var INT = exports.INT = 'IntValue';
var FLOAT = exports.FLOAT = 'FloatValue';
var STRING = exports.STRING = 'StringValue';
var BOOLEAN = exports.BOOLEAN = 'BooleanValue';
var NULL = exports.NULL = 'NullValue';
var ENUM = exports.ENUM = 'EnumValue';
var LIST = exports.LIST = 'ListValue';
var OBJECT = exports.OBJECT = 'ObjectValue';
var OBJECT_FIELD = exports.OBJECT_FIELD = 'ObjectField';

// Directives

var DIRECTIVE = exports.DIRECTIVE = 'Directive';

// Types

var NAMED_TYPE = exports.NAMED_TYPE = 'NamedType';
var LIST_TYPE = exports.LIST_TYPE = 'ListType';
var NON_NULL_TYPE = exports.NON_NULL_TYPE = 'NonNullType';

// Type System Definitions

var SCHEMA_DEFINITION = exports.SCHEMA_DEFINITION = 'SchemaDefinition';
var OPERATION_TYPE_DEFINITION = exports.OPERATION_TYPE_DEFINITION = 'OperationTypeDefinition';

// Type Definitions

var SCALAR_TYPE_DEFINITION = exports.SCALAR_TYPE_DEFINITION = 'ScalarTypeDefinition';
var OBJECT_TYPE_DEFINITION = exports.OBJECT_TYPE_DEFINITION = 'ObjectTypeDefinition';
var FIELD_DEFINITION = exports.FIELD_DEFINITION = 'FieldDefinition';
var INPUT_VALUE_DEFINITION = exports.INPUT_VALUE_DEFINITION = 'InputValueDefinition';
var INTERFACE_TYPE_DEFINITION = exports.INTERFACE_TYPE_DEFINITION = 'InterfaceTypeDefinition';
var UNION_TYPE_DEFINITION = exports.UNION_TYPE_DEFINITION = 'UnionTypeDefinition';
var ENUM_TYPE_DEFINITION = exports.ENUM_TYPE_DEFINITION = 'EnumTypeDefinition';
var ENUM_VALUE_DEFINITION = exports.ENUM_VALUE_DEFINITION = 'EnumValueDefinition';
var INPUT_OBJECT_TYPE_DEFINITION = exports.INPUT_OBJECT_TYPE_DEFINITION = 'InputObjectTypeDefinition';

// Type Extensions

var SCALAR_TYPE_EXTENSION = exports.SCALAR_TYPE_EXTENSION = 'ScalarTypeExtension';
var OBJECT_TYPE_EXTENSION = exports.OBJECT_TYPE_EXTENSION = 'ObjectTypeExtension';
var INTERFACE_TYPE_EXTENSION = exports.INTERFACE_TYPE_EXTENSION = 'InterfaceTypeExtension';
var UNION_TYPE_EXTENSION = exports.UNION_TYPE_EXTENSION = 'UnionTypeExtension';
var ENUM_TYPE_EXTENSION = exports.ENUM_TYPE_EXTENSION = 'EnumTypeExtension';
var INPUT_OBJECT_TYPE_EXTENSION = exports.INPUT_OBJECT_TYPE_EXTENSION = 'InputObjectTypeExtension';

// Directive Definitions

var DIRECTIVE_DEFINITION = exports.DIRECTIVE_DEFINITION = 'DirectiveDefinition';
});

unwrapExports(kinds);
var kinds_1 = kinds.NAME;
var kinds_2 = kinds.DOCUMENT;
var kinds_3 = kinds.OPERATION_DEFINITION;
var kinds_4 = kinds.VARIABLE_DEFINITION;
var kinds_5 = kinds.VARIABLE;
var kinds_6 = kinds.SELECTION_SET;
var kinds_7 = kinds.FIELD;
var kinds_8 = kinds.ARGUMENT;
var kinds_9 = kinds.FRAGMENT_SPREAD;
var kinds_10 = kinds.INLINE_FRAGMENT;
var kinds_11 = kinds.FRAGMENT_DEFINITION;
var kinds_12 = kinds.INT;
var kinds_13 = kinds.FLOAT;
var kinds_14 = kinds.STRING;
var kinds_15 = kinds.BOOLEAN;
var kinds_16 = kinds.NULL;
var kinds_17 = kinds.ENUM;
var kinds_18 = kinds.LIST;
var kinds_19 = kinds.OBJECT;
var kinds_20 = kinds.OBJECT_FIELD;
var kinds_21 = kinds.DIRECTIVE;
var kinds_22 = kinds.NAMED_TYPE;
var kinds_23 = kinds.LIST_TYPE;
var kinds_24 = kinds.NON_NULL_TYPE;
var kinds_25 = kinds.SCHEMA_DEFINITION;
var kinds_26 = kinds.OPERATION_TYPE_DEFINITION;
var kinds_27 = kinds.SCALAR_TYPE_DEFINITION;
var kinds_28 = kinds.OBJECT_TYPE_DEFINITION;
var kinds_29 = kinds.FIELD_DEFINITION;
var kinds_30 = kinds.INPUT_VALUE_DEFINITION;
var kinds_31 = kinds.INTERFACE_TYPE_DEFINITION;
var kinds_32 = kinds.UNION_TYPE_DEFINITION;
var kinds_33 = kinds.ENUM_TYPE_DEFINITION;
var kinds_34 = kinds.ENUM_VALUE_DEFINITION;
var kinds_35 = kinds.INPUT_OBJECT_TYPE_DEFINITION;
var kinds_36 = kinds.SCALAR_TYPE_EXTENSION;
var kinds_37 = kinds.OBJECT_TYPE_EXTENSION;
var kinds_38 = kinds.INTERFACE_TYPE_EXTENSION;
var kinds_39 = kinds.UNION_TYPE_EXTENSION;
var kinds_40 = kinds.ENUM_TYPE_EXTENSION;
var kinds_41 = kinds.INPUT_OBJECT_TYPE_EXTENSION;
var kinds_42 = kinds.DIRECTIVE_DEFINITION;

var directiveLocation = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

/**
 * The set of allowed directive location values.
 */
var DirectiveLocation = exports.DirectiveLocation = {
  // Request Definitions
  QUERY: 'QUERY',
  MUTATION: 'MUTATION',
  SUBSCRIPTION: 'SUBSCRIPTION',
  FIELD: 'FIELD',
  FRAGMENT_DEFINITION: 'FRAGMENT_DEFINITION',
  FRAGMENT_SPREAD: 'FRAGMENT_SPREAD',
  INLINE_FRAGMENT: 'INLINE_FRAGMENT',
  // Type System Definitions
  SCHEMA: 'SCHEMA',
  SCALAR: 'SCALAR',
  OBJECT: 'OBJECT',
  FIELD_DEFINITION: 'FIELD_DEFINITION',
  ARGUMENT_DEFINITION: 'ARGUMENT_DEFINITION',
  INTERFACE: 'INTERFACE',
  UNION: 'UNION',
  ENUM: 'ENUM',
  ENUM_VALUE: 'ENUM_VALUE',
  INPUT_OBJECT: 'INPUT_OBJECT',
  INPUT_FIELD_DEFINITION: 'INPUT_FIELD_DEFINITION'
};

/**
 * The enum type representing the directive location values.
 */
});

unwrapExports(directiveLocation);
var directiveLocation_1 = directiveLocation.DirectiveLocation;

var parser = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parse = parse;
exports.parseValue = parseValue;
exports.parseType = parseType;
exports.parseConstValue = parseConstValue;
exports.parseTypeReference = parseTypeReference;
exports.parseNamedType = parseNamedType;











/**
 * Given a GraphQL source, parses it into a Document.
 * Throws GraphQLError if a syntax error is encountered.
 */


/**
 * Configuration options to control parser behavior
 */
function parse(source$$1, options) {
  var sourceObj = typeof source$$1 === 'string' ? new source.Source(source$$1) : source$$1;
  if (!(sourceObj instanceof source.Source)) {
    throw new TypeError('Must provide Source. Received: ' + String(sourceObj));
  }
  var lexer$$1 = (0, lexer.createLexer)(sourceObj, options || {});
  return parseDocument(lexer$$1);
}

/**
 * Given a string containing a GraphQL value (ex. `[42]`), parse the AST for
 * that value.
 * Throws GraphQLError if a syntax error is encountered.
 *
 * This is useful within tools that operate upon GraphQL Values directly and
 * in isolation of complete GraphQL documents.
 *
 * Consider providing the results to the utility function: valueFromAST().
 */
/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

function parseValue(source$$1, options) {
  var sourceObj = typeof source$$1 === 'string' ? new source.Source(source$$1) : source$$1;
  var lexer$$1 = (0, lexer.createLexer)(sourceObj, options || {});
  expect(lexer$$1, lexer.TokenKind.SOF);
  var value = parseValueLiteral(lexer$$1, false);
  expect(lexer$$1, lexer.TokenKind.EOF);
  return value;
}

/**
 * Given a string containing a GraphQL Type (ex. `[Int!]`), parse the AST for
 * that type.
 * Throws GraphQLError if a syntax error is encountered.
 *
 * This is useful within tools that operate upon GraphQL Types directly and
 * in isolation of complete GraphQL documents.
 *
 * Consider providing the results to the utility function: typeFromAST().
 */
function parseType(source$$1, options) {
  var sourceObj = typeof source$$1 === 'string' ? new source.Source(source$$1) : source$$1;
  var lexer$$1 = (0, lexer.createLexer)(sourceObj, options || {});
  expect(lexer$$1, lexer.TokenKind.SOF);
  var type = parseTypeReference(lexer$$1);
  expect(lexer$$1, lexer.TokenKind.EOF);
  return type;
}

/**
 * Converts a name lex token into a name parse node.
 */
function parseName(lexer$$1) {
  var token = expect(lexer$$1, lexer.TokenKind.NAME);
  return {
    kind: kinds.NAME,
    value: token.value,
    loc: loc(lexer$$1, token)
  };
}

// Implements the parsing rules in the Document section.

/**
 * Document : Definition+
 */
function parseDocument(lexer$$1) {
  var start = lexer$$1.token;
  expect(lexer$$1, lexer.TokenKind.SOF);
  var definitions = [];
  do {
    definitions.push(parseDefinition(lexer$$1));
  } while (!skip(lexer$$1, lexer.TokenKind.EOF));

  return {
    kind: kinds.DOCUMENT,
    definitions: definitions,
    loc: loc(lexer$$1, start)
  };
}

/**
 * Definition :
 *   - ExecutableDefinition
 *   - TypeSystemDefinition
 */
function parseDefinition(lexer$$1) {
  if (peek(lexer$$1, lexer.TokenKind.NAME)) {
    switch (lexer$$1.token.value) {
      case 'query':
      case 'mutation':
      case 'subscription':
      case 'fragment':
        return parseExecutableDefinition(lexer$$1);
      case 'schema':
      case 'scalar':
      case 'type':
      case 'interface':
      case 'union':
      case 'enum':
      case 'input':
      case 'extend':
      case 'directive':
        // Note: The schema definition language is an experimental addition.
        return parseTypeSystemDefinition(lexer$$1);
    }
  } else if (peek(lexer$$1, lexer.TokenKind.BRACE_L)) {
    return parseExecutableDefinition(lexer$$1);
  } else if (peekDescription(lexer$$1)) {
    // Note: The schema definition language is an experimental addition.
    return parseTypeSystemDefinition(lexer$$1);
  }

  throw unexpected(lexer$$1);
}

/**
 * ExecutableDefinition :
 *   - OperationDefinition
 *   - FragmentDefinition
 */
function parseExecutableDefinition(lexer$$1) {
  if (peek(lexer$$1, lexer.TokenKind.NAME)) {
    switch (lexer$$1.token.value) {
      case 'query':
      case 'mutation':
      case 'subscription':
        return parseOperationDefinition(lexer$$1);

      case 'fragment':
        return parseFragmentDefinition(lexer$$1);
    }
  } else if (peek(lexer$$1, lexer.TokenKind.BRACE_L)) {
    return parseOperationDefinition(lexer$$1);
  }

  throw unexpected(lexer$$1);
}

// Implements the parsing rules in the Operations section.

/**
 * OperationDefinition :
 *  - SelectionSet
 *  - OperationType Name? VariableDefinitions? Directives? SelectionSet
 */
function parseOperationDefinition(lexer$$1) {
  var start = lexer$$1.token;
  if (peek(lexer$$1, lexer.TokenKind.BRACE_L)) {
    return {
      kind: kinds.OPERATION_DEFINITION,
      operation: 'query',
      name: undefined,
      variableDefinitions: [],
      directives: [],
      selectionSet: parseSelectionSet(lexer$$1),
      loc: loc(lexer$$1, start)
    };
  }
  var operation = parseOperationType(lexer$$1);
  var name = void 0;
  if (peek(lexer$$1, lexer.TokenKind.NAME)) {
    name = parseName(lexer$$1);
  }
  return {
    kind: kinds.OPERATION_DEFINITION,
    operation: operation,
    name: name,
    variableDefinitions: parseVariableDefinitions(lexer$$1),
    directives: parseDirectives(lexer$$1, false),
    selectionSet: parseSelectionSet(lexer$$1),
    loc: loc(lexer$$1, start)
  };
}

/**
 * OperationType : one of query mutation subscription
 */
function parseOperationType(lexer$$1) {
  var operationToken = expect(lexer$$1, lexer.TokenKind.NAME);
  switch (operationToken.value) {
    case 'query':
      return 'query';
    case 'mutation':
      return 'mutation';
    case 'subscription':
      return 'subscription';
  }

  throw unexpected(lexer$$1, operationToken);
}

/**
 * VariableDefinitions : ( VariableDefinition+ )
 */
function parseVariableDefinitions(lexer$$1) {
  return peek(lexer$$1, lexer.TokenKind.PAREN_L) ? many(lexer$$1, lexer.TokenKind.PAREN_L, parseVariableDefinition, lexer.TokenKind.PAREN_R) : [];
}

/**
 * VariableDefinition : Variable : Type DefaultValue?
 */
function parseVariableDefinition(lexer$$1) {
  var start = lexer$$1.token;
  return {
    kind: kinds.VARIABLE_DEFINITION,
    variable: parseVariable(lexer$$1),
    type: (expect(lexer$$1, lexer.TokenKind.COLON), parseTypeReference(lexer$$1)),
    defaultValue: skip(lexer$$1, lexer.TokenKind.EQUALS) ? parseValueLiteral(lexer$$1, true) : undefined,
    loc: loc(lexer$$1, start)
  };
}

/**
 * Variable : $ Name
 */
function parseVariable(lexer$$1) {
  var start = lexer$$1.token;
  expect(lexer$$1, lexer.TokenKind.DOLLAR);
  return {
    kind: kinds.VARIABLE,
    name: parseName(lexer$$1),
    loc: loc(lexer$$1, start)
  };
}

/**
 * SelectionSet : { Selection+ }
 */
function parseSelectionSet(lexer$$1) {
  var start = lexer$$1.token;
  return {
    kind: kinds.SELECTION_SET,
    selections: many(lexer$$1, lexer.TokenKind.BRACE_L, parseSelection, lexer.TokenKind.BRACE_R),
    loc: loc(lexer$$1, start)
  };
}

/**
 * Selection :
 *   - Field
 *   - FragmentSpread
 *   - InlineFragment
 */
function parseSelection(lexer$$1) {
  return peek(lexer$$1, lexer.TokenKind.SPREAD) ? parseFragment(lexer$$1) : parseField(lexer$$1);
}

/**
 * Field : Alias? Name Arguments? Directives? SelectionSet?
 *
 * Alias : Name :
 */
function parseField(lexer$$1) {
  var start = lexer$$1.token;

  var nameOrAlias = parseName(lexer$$1);
  var alias = void 0;
  var name = void 0;
  if (skip(lexer$$1, lexer.TokenKind.COLON)) {
    alias = nameOrAlias;
    name = parseName(lexer$$1);
  } else {
    name = nameOrAlias;
  }

  return {
    kind: kinds.FIELD,
    alias: alias,
    name: name,
    arguments: parseArguments(lexer$$1, false),
    directives: parseDirectives(lexer$$1, false),
    selectionSet: peek(lexer$$1, lexer.TokenKind.BRACE_L) ? parseSelectionSet(lexer$$1) : undefined,
    loc: loc(lexer$$1, start)
  };
}

/**
 * Arguments[Const] : ( Argument[?Const]+ )
 */
function parseArguments(lexer$$1, isConst) {
  var item = isConst ? parseConstArgument : parseArgument;
  return peek(lexer$$1, lexer.TokenKind.PAREN_L) ? many(lexer$$1, lexer.TokenKind.PAREN_L, item, lexer.TokenKind.PAREN_R) : [];
}

/**
 * Argument[Const] : Name : Value[?Const]
 */
function parseArgument(lexer$$1) {
  var start = lexer$$1.token;
  return {
    kind: kinds.ARGUMENT,
    name: parseName(lexer$$1),
    value: (expect(lexer$$1, lexer.TokenKind.COLON), parseValueLiteral(lexer$$1, false)),
    loc: loc(lexer$$1, start)
  };
}

function parseConstArgument(lexer$$1) {
  var start = lexer$$1.token;
  return {
    kind: kinds.ARGUMENT,
    name: parseName(lexer$$1),
    value: (expect(lexer$$1, lexer.TokenKind.COLON), parseConstValue(lexer$$1)),
    loc: loc(lexer$$1, start)
  };
}

// Implements the parsing rules in the Fragments section.

/**
 * Corresponds to both FragmentSpread and InlineFragment in the spec.
 *
 * FragmentSpread : ... FragmentName Directives?
 *
 * InlineFragment : ... TypeCondition? Directives? SelectionSet
 */
function parseFragment(lexer$$1) {
  var start = lexer$$1.token;
  expect(lexer$$1, lexer.TokenKind.SPREAD);
  if (peek(lexer$$1, lexer.TokenKind.NAME) && lexer$$1.token.value !== 'on') {
    return {
      kind: kinds.FRAGMENT_SPREAD,
      name: parseFragmentName(lexer$$1),
      directives: parseDirectives(lexer$$1, false),
      loc: loc(lexer$$1, start)
    };
  }
  var typeCondition = void 0;
  if (lexer$$1.token.value === 'on') {
    lexer$$1.advance();
    typeCondition = parseNamedType(lexer$$1);
  }
  return {
    kind: kinds.INLINE_FRAGMENT,
    typeCondition: typeCondition,
    directives: parseDirectives(lexer$$1, false),
    selectionSet: parseSelectionSet(lexer$$1),
    loc: loc(lexer$$1, start)
  };
}

/**
 * FragmentDefinition :
 *   - fragment FragmentName on TypeCondition Directives? SelectionSet
 *
 * TypeCondition : NamedType
 */
function parseFragmentDefinition(lexer$$1) {
  var start = lexer$$1.token;
  expectKeyword(lexer$$1, 'fragment');
  // Experimental support for defining variables within fragments changes
  // the grammar of FragmentDefinition:
  //   - fragment FragmentName VariableDefinitions? on TypeCondition Directives? SelectionSet
  if (lexer$$1.options.experimentalFragmentVariables) {
    return {
      kind: kinds.FRAGMENT_DEFINITION,
      name: parseFragmentName(lexer$$1),
      variableDefinitions: parseVariableDefinitions(lexer$$1),
      typeCondition: (expectKeyword(lexer$$1, 'on'), parseNamedType(lexer$$1)),
      directives: parseDirectives(lexer$$1, false),
      selectionSet: parseSelectionSet(lexer$$1),
      loc: loc(lexer$$1, start)
    };
  }
  return {
    kind: kinds.FRAGMENT_DEFINITION,
    name: parseFragmentName(lexer$$1),
    typeCondition: (expectKeyword(lexer$$1, 'on'), parseNamedType(lexer$$1)),
    directives: parseDirectives(lexer$$1, false),
    selectionSet: parseSelectionSet(lexer$$1),
    loc: loc(lexer$$1, start)
  };
}

/**
 * FragmentName : Name but not `on`
 */
function parseFragmentName(lexer$$1) {
  if (lexer$$1.token.value === 'on') {
    throw unexpected(lexer$$1);
  }
  return parseName(lexer$$1);
}

// Implements the parsing rules in the Values section.

/**
 * Value[Const] :
 *   - [~Const] Variable
 *   - IntValue
 *   - FloatValue
 *   - StringValue
 *   - BooleanValue
 *   - NullValue
 *   - EnumValue
 *   - ListValue[?Const]
 *   - ObjectValue[?Const]
 *
 * BooleanValue : one of `true` `false`
 *
 * NullValue : `null`
 *
 * EnumValue : Name but not `true`, `false` or `null`
 */
function parseValueLiteral(lexer$$1, isConst) {
  var token = lexer$$1.token;
  switch (token.kind) {
    case lexer.TokenKind.BRACKET_L:
      return parseList(lexer$$1, isConst);
    case lexer.TokenKind.BRACE_L:
      return parseObject(lexer$$1, isConst);
    case lexer.TokenKind.INT:
      lexer$$1.advance();
      return {
        kind: kinds.INT,
        value: token.value,
        loc: loc(lexer$$1, token)
      };
    case lexer.TokenKind.FLOAT:
      lexer$$1.advance();
      return {
        kind: kinds.FLOAT,
        value: token.value,
        loc: loc(lexer$$1, token)
      };
    case lexer.TokenKind.STRING:
    case lexer.TokenKind.BLOCK_STRING:
      return parseStringLiteral(lexer$$1);
    case lexer.TokenKind.NAME:
      if (token.value === 'true' || token.value === 'false') {
        lexer$$1.advance();
        return {
          kind: kinds.BOOLEAN,
          value: token.value === 'true',
          loc: loc(lexer$$1, token)
        };
      } else if (token.value === 'null') {
        lexer$$1.advance();
        return {
          kind: kinds.NULL,
          loc: loc(lexer$$1, token)
        };
      }
      lexer$$1.advance();
      return {
        kind: kinds.ENUM,
        value: token.value,
        loc: loc(lexer$$1, token)
      };
    case lexer.TokenKind.DOLLAR:
      if (!isConst) {
        return parseVariable(lexer$$1);
      }
      break;
  }
  throw unexpected(lexer$$1);
}

function parseStringLiteral(lexer$$1) {
  var token = lexer$$1.token;
  lexer$$1.advance();
  return {
    kind: kinds.STRING,
    value: token.value,
    block: token.kind === lexer.TokenKind.BLOCK_STRING,
    loc: loc(lexer$$1, token)
  };
}

function parseConstValue(lexer$$1) {
  return parseValueLiteral(lexer$$1, true);
}

function parseValueValue(lexer$$1) {
  return parseValueLiteral(lexer$$1, false);
}

/**
 * ListValue[Const] :
 *   - [ ]
 *   - [ Value[?Const]+ ]
 */
function parseList(lexer$$1, isConst) {
  var start = lexer$$1.token;
  var item = isConst ? parseConstValue : parseValueValue;
  return {
    kind: kinds.LIST,
    values: any(lexer$$1, lexer.TokenKind.BRACKET_L, item, lexer.TokenKind.BRACKET_R),
    loc: loc(lexer$$1, start)
  };
}

/**
 * ObjectValue[Const] :
 *   - { }
 *   - { ObjectField[?Const]+ }
 */
function parseObject(lexer$$1, isConst) {
  var start = lexer$$1.token;
  expect(lexer$$1, lexer.TokenKind.BRACE_L);
  var fields = [];
  while (!skip(lexer$$1, lexer.TokenKind.BRACE_R)) {
    fields.push(parseObjectField(lexer$$1, isConst));
  }
  return {
    kind: kinds.OBJECT,
    fields: fields,
    loc: loc(lexer$$1, start)
  };
}

/**
 * ObjectField[Const] : Name : Value[?Const]
 */
function parseObjectField(lexer$$1, isConst) {
  var start = lexer$$1.token;
  return {
    kind: kinds.OBJECT_FIELD,
    name: parseName(lexer$$1),
    value: (expect(lexer$$1, lexer.TokenKind.COLON), parseValueLiteral(lexer$$1, isConst)),
    loc: loc(lexer$$1, start)
  };
}

// Implements the parsing rules in the Directives section.

/**
 * Directives[Const] : Directive[?Const]+
 */
function parseDirectives(lexer$$1, isConst) {
  var directives = [];
  while (peek(lexer$$1, lexer.TokenKind.AT)) {
    directives.push(parseDirective(lexer$$1, isConst));
  }
  return directives;
}

/**
 * Directive[Const] : @ Name Arguments[?Const]?
 */
function parseDirective(lexer$$1, isConst) {
  var start = lexer$$1.token;
  expect(lexer$$1, lexer.TokenKind.AT);
  return {
    kind: kinds.DIRECTIVE,
    name: parseName(lexer$$1),
    arguments: parseArguments(lexer$$1, isConst),
    loc: loc(lexer$$1, start)
  };
}

// Implements the parsing rules in the Types section.

/**
 * Type :
 *   - NamedType
 *   - ListType
 *   - NonNullType
 */
function parseTypeReference(lexer$$1) {
  var start = lexer$$1.token;
  var type = void 0;
  if (skip(lexer$$1, lexer.TokenKind.BRACKET_L)) {
    type = parseTypeReference(lexer$$1);
    expect(lexer$$1, lexer.TokenKind.BRACKET_R);
    type = {
      kind: kinds.LIST_TYPE,
      type: type,
      loc: loc(lexer$$1, start)
    };
  } else {
    type = parseNamedType(lexer$$1);
  }
  if (skip(lexer$$1, lexer.TokenKind.BANG)) {
    return {
      kind: kinds.NON_NULL_TYPE,
      type: type,
      loc: loc(lexer$$1, start)
    };
  }
  return type;
}

/**
 * NamedType : Name
 */
function parseNamedType(lexer$$1) {
  var start = lexer$$1.token;
  return {
    kind: kinds.NAMED_TYPE,
    name: parseName(lexer$$1),
    loc: loc(lexer$$1, start)
  };
}

// Implements the parsing rules in the Type Definition section.

/**
 * TypeSystemDefinition :
 *   - SchemaDefinition
 *   - TypeDefinition
 *   - TypeExtension
 *   - DirectiveDefinition
 *
 * TypeDefinition :
 *   - ScalarTypeDefinition
 *   - ObjectTypeDefinition
 *   - InterfaceTypeDefinition
 *   - UnionTypeDefinition
 *   - EnumTypeDefinition
 *   - InputObjectTypeDefinition
 */
function parseTypeSystemDefinition(lexer$$1) {
  // Many definitions begin with a description and require a lookahead.
  var keywordToken = peekDescription(lexer$$1) ? lexer$$1.lookahead() : lexer$$1.token;

  if (keywordToken.kind === lexer.TokenKind.NAME) {
    switch (keywordToken.value) {
      case 'schema':
        return parseSchemaDefinition(lexer$$1);
      case 'scalar':
        return parseScalarTypeDefinition(lexer$$1);
      case 'type':
        return parseObjectTypeDefinition(lexer$$1);
      case 'interface':
        return parseInterfaceTypeDefinition(lexer$$1);
      case 'union':
        return parseUnionTypeDefinition(lexer$$1);
      case 'enum':
        return parseEnumTypeDefinition(lexer$$1);
      case 'input':
        return parseInputObjectTypeDefinition(lexer$$1);
      case 'extend':
        return parseTypeExtension(lexer$$1);
      case 'directive':
        return parseDirectiveDefinition(lexer$$1);
    }
  }

  throw unexpected(lexer$$1, keywordToken);
}

function peekDescription(lexer$$1) {
  return peek(lexer$$1, lexer.TokenKind.STRING) || peek(lexer$$1, lexer.TokenKind.BLOCK_STRING);
}

/**
 * Description : StringValue
 */
function parseDescription(lexer$$1) {
  if (peekDescription(lexer$$1)) {
    return parseStringLiteral(lexer$$1);
  }
}

/**
 * SchemaDefinition : schema Directives[Const]? { OperationTypeDefinition+ }
 */
function parseSchemaDefinition(lexer$$1) {
  var start = lexer$$1.token;
  expectKeyword(lexer$$1, 'schema');
  var directives = parseDirectives(lexer$$1, true);
  var operationTypes = many(lexer$$1, lexer.TokenKind.BRACE_L, parseOperationTypeDefinition, lexer.TokenKind.BRACE_R);
  return {
    kind: kinds.SCHEMA_DEFINITION,
    directives: directives,
    operationTypes: operationTypes,
    loc: loc(lexer$$1, start)
  };
}

/**
 * OperationTypeDefinition : OperationType : NamedType
 */
function parseOperationTypeDefinition(lexer$$1) {
  var start = lexer$$1.token;
  var operation = parseOperationType(lexer$$1);
  expect(lexer$$1, lexer.TokenKind.COLON);
  var type = parseNamedType(lexer$$1);
  return {
    kind: kinds.OPERATION_TYPE_DEFINITION,
    operation: operation,
    type: type,
    loc: loc(lexer$$1, start)
  };
}

/**
 * ScalarTypeDefinition : Description? scalar Name Directives[Const]?
 */
function parseScalarTypeDefinition(lexer$$1) {
  var start = lexer$$1.token;
  var description = parseDescription(lexer$$1);
  expectKeyword(lexer$$1, 'scalar');
  var name = parseName(lexer$$1);
  var directives = parseDirectives(lexer$$1, true);
  return {
    kind: kinds.SCALAR_TYPE_DEFINITION,
    description: description,
    name: name,
    directives: directives,
    loc: loc(lexer$$1, start)
  };
}

/**
 * ObjectTypeDefinition :
 *   Description?
 *   type Name ImplementsInterfaces? Directives[Const]? FieldsDefinition?
 */
function parseObjectTypeDefinition(lexer$$1) {
  var start = lexer$$1.token;
  var description = parseDescription(lexer$$1);
  expectKeyword(lexer$$1, 'type');
  var name = parseName(lexer$$1);
  var interfaces = parseImplementsInterfaces(lexer$$1);
  var directives = parseDirectives(lexer$$1, true);
  var fields = parseFieldsDefinition(lexer$$1);
  return {
    kind: kinds.OBJECT_TYPE_DEFINITION,
    description: description,
    name: name,
    interfaces: interfaces,
    directives: directives,
    fields: fields,
    loc: loc(lexer$$1, start)
  };
}

/**
 * ImplementsInterfaces : implements NamedType+
 */
function parseImplementsInterfaces(lexer$$1) {
  var types = [];
  if (lexer$$1.token.value === 'implements') {
    lexer$$1.advance();
    do {
      types.push(parseNamedType(lexer$$1));
    } while (peek(lexer$$1, lexer.TokenKind.NAME));
  }
  return types;
}

/**
 * FieldsDefinition : { FieldDefinition+ }
 */
function parseFieldsDefinition(lexer$$1) {
  return peek(lexer$$1, lexer.TokenKind.BRACE_L) ? many(lexer$$1, lexer.TokenKind.BRACE_L, parseFieldDefinition, lexer.TokenKind.BRACE_R) : [];
}

/**
 * FieldDefinition :
 *   - Description? Name ArgumentsDefinition? : Type Directives[Const]?
 */
function parseFieldDefinition(lexer$$1) {
  var start = lexer$$1.token;
  var description = parseDescription(lexer$$1);
  var name = parseName(lexer$$1);
  var args = parseArgumentDefs(lexer$$1);
  expect(lexer$$1, lexer.TokenKind.COLON);
  var type = parseTypeReference(lexer$$1);
  var directives = parseDirectives(lexer$$1, true);
  return {
    kind: kinds.FIELD_DEFINITION,
    description: description,
    name: name,
    arguments: args,
    type: type,
    directives: directives,
    loc: loc(lexer$$1, start)
  };
}

/**
 * ArgumentsDefinition : ( InputValueDefinition+ )
 */
function parseArgumentDefs(lexer$$1) {
  if (!peek(lexer$$1, lexer.TokenKind.PAREN_L)) {
    return [];
  }
  return many(lexer$$1, lexer.TokenKind.PAREN_L, parseInputValueDef, lexer.TokenKind.PAREN_R);
}

/**
 * InputValueDefinition :
 *   - Description? Name : Type DefaultValue? Directives[Const]?
 */
function parseInputValueDef(lexer$$1) {
  var start = lexer$$1.token;
  var description = parseDescription(lexer$$1);
  var name = parseName(lexer$$1);
  expect(lexer$$1, lexer.TokenKind.COLON);
  var type = parseTypeReference(lexer$$1);
  var defaultValue = void 0;
  if (skip(lexer$$1, lexer.TokenKind.EQUALS)) {
    defaultValue = parseConstValue(lexer$$1);
  }
  var directives = parseDirectives(lexer$$1, true);
  return {
    kind: kinds.INPUT_VALUE_DEFINITION,
    description: description,
    name: name,
    type: type,
    defaultValue: defaultValue,
    directives: directives,
    loc: loc(lexer$$1, start)
  };
}

/**
 * InterfaceTypeDefinition :
 *   - Description? interface Name Directives[Const]? FieldsDefinition?
 */
function parseInterfaceTypeDefinition(lexer$$1) {
  var start = lexer$$1.token;
  var description = parseDescription(lexer$$1);
  expectKeyword(lexer$$1, 'interface');
  var name = parseName(lexer$$1);
  var directives = parseDirectives(lexer$$1, true);
  var fields = parseFieldsDefinition(lexer$$1);
  return {
    kind: kinds.INTERFACE_TYPE_DEFINITION,
    description: description,
    name: name,
    directives: directives,
    fields: fields,
    loc: loc(lexer$$1, start)
  };
}

/**
 * UnionTypeDefinition :
 *   - Description? union Name Directives[Const]? MemberTypesDefinition?
 */
function parseUnionTypeDefinition(lexer$$1) {
  var start = lexer$$1.token;
  var description = parseDescription(lexer$$1);
  expectKeyword(lexer$$1, 'union');
  var name = parseName(lexer$$1);
  var directives = parseDirectives(lexer$$1, true);
  var types = parseMemberTypesDefinition(lexer$$1);
  return {
    kind: kinds.UNION_TYPE_DEFINITION,
    description: description,
    name: name,
    directives: directives,
    types: types,
    loc: loc(lexer$$1, start)
  };
}

/**
 * MemberTypesDefinition : = MemberTypes
 *
 * MemberTypes :
 *   - `|`? NamedType
 *   - MemberTypes | NamedType
 */
function parseMemberTypesDefinition(lexer$$1) {
  var types = [];
  if (skip(lexer$$1, lexer.TokenKind.EQUALS)) {
    // Optional leading pipe
    skip(lexer$$1, lexer.TokenKind.PIPE);
    do {
      types.push(parseNamedType(lexer$$1));
    } while (skip(lexer$$1, lexer.TokenKind.PIPE));
  }
  return types;
}

/**
 * EnumTypeDefinition :
 *   - Description? enum Name Directives[Const]? EnumValuesDefinition?
 */
function parseEnumTypeDefinition(lexer$$1) {
  var start = lexer$$1.token;
  var description = parseDescription(lexer$$1);
  expectKeyword(lexer$$1, 'enum');
  var name = parseName(lexer$$1);
  var directives = parseDirectives(lexer$$1, true);
  var values = parseEnumValuesDefinition(lexer$$1);
  return {
    kind: kinds.ENUM_TYPE_DEFINITION,
    description: description,
    name: name,
    directives: directives,
    values: values,
    loc: loc(lexer$$1, start)
  };
}

/**
 * EnumValuesDefinition : { EnumValueDefinition+ }
 */
function parseEnumValuesDefinition(lexer$$1) {
  return peek(lexer$$1, lexer.TokenKind.BRACE_L) ? many(lexer$$1, lexer.TokenKind.BRACE_L, parseEnumValueDefinition, lexer.TokenKind.BRACE_R) : [];
}

/**
 * EnumValueDefinition : Description? EnumValue Directives[Const]?
 *
 * EnumValue : Name
 */
function parseEnumValueDefinition(lexer$$1) {
  var start = lexer$$1.token;
  var description = parseDescription(lexer$$1);
  var name = parseName(lexer$$1);
  var directives = parseDirectives(lexer$$1, true);
  return {
    kind: kinds.ENUM_VALUE_DEFINITION,
    description: description,
    name: name,
    directives: directives,
    loc: loc(lexer$$1, start)
  };
}

/**
 * InputObjectTypeDefinition :
 *   - Description? input Name Directives[Const]? InputFieldsDefinition?
 */
function parseInputObjectTypeDefinition(lexer$$1) {
  var start = lexer$$1.token;
  var description = parseDescription(lexer$$1);
  expectKeyword(lexer$$1, 'input');
  var name = parseName(lexer$$1);
  var directives = parseDirectives(lexer$$1, true);
  var fields = parseInputFieldsDefinition(lexer$$1);
  return {
    kind: kinds.INPUT_OBJECT_TYPE_DEFINITION,
    description: description,
    name: name,
    directives: directives,
    fields: fields,
    loc: loc(lexer$$1, start)
  };
}

/**
 * InputFieldsDefinition : { InputValueDefinition+ }
 */
function parseInputFieldsDefinition(lexer$$1) {
  return peek(lexer$$1, lexer.TokenKind.BRACE_L) ? many(lexer$$1, lexer.TokenKind.BRACE_L, parseInputValueDef, lexer.TokenKind.BRACE_R) : [];
}

/**
 * TypeExtension :
 *   - ScalarTypeExtension
 *   - ObjectTypeExtension
 *   - InterfaceTypeExtension
 *   - UnionTypeExtension
 *   - EnumTypeExtension
 *   - InputObjectTypeDefinition
 */
function parseTypeExtension(lexer$$1) {
  var keywordToken = lexer$$1.lookahead();

  if (keywordToken.kind === lexer.TokenKind.NAME) {
    switch (keywordToken.value) {
      case 'scalar':
        return parseScalarTypeExtension(lexer$$1);
      case 'type':
        return parseObjectTypeExtension(lexer$$1);
      case 'interface':
        return parseInterfaceTypeExtension(lexer$$1);
      case 'union':
        return parseUnionTypeExtension(lexer$$1);
      case 'enum':
        return parseEnumTypeExtension(lexer$$1);
      case 'input':
        return parseInputObjectTypeExtension(lexer$$1);
    }
  }

  throw unexpected(lexer$$1, keywordToken);
}

/**
 * ScalarTypeExtension :
 *   - extend scalar Name Directives[Const]
 */
function parseScalarTypeExtension(lexer$$1) {
  var start = lexer$$1.token;
  expectKeyword(lexer$$1, 'extend');
  expectKeyword(lexer$$1, 'scalar');
  var name = parseName(lexer$$1);
  var directives = parseDirectives(lexer$$1, true);
  if (directives.length === 0) {
    throw unexpected(lexer$$1);
  }
  return {
    kind: kinds.SCALAR_TYPE_EXTENSION,
    name: name,
    directives: directives,
    loc: loc(lexer$$1, start)
  };
}

/**
 * ObjectTypeExtension :
 *  - extend type Name ImplementsInterfaces? Directives[Const]? FieldsDefinition
 *  - extend type Name ImplementsInterfaces? Directives[Const]
 *  - extend type Name ImplementsInterfaces
 */
function parseObjectTypeExtension(lexer$$1) {
  var start = lexer$$1.token;
  expectKeyword(lexer$$1, 'extend');
  expectKeyword(lexer$$1, 'type');
  var name = parseName(lexer$$1);
  var interfaces = parseImplementsInterfaces(lexer$$1);
  var directives = parseDirectives(lexer$$1, true);
  var fields = parseFieldsDefinition(lexer$$1);
  if (interfaces.length === 0 && directives.length === 0 && fields.length === 0) {
    throw unexpected(lexer$$1);
  }
  return {
    kind: kinds.OBJECT_TYPE_EXTENSION,
    name: name,
    interfaces: interfaces,
    directives: directives,
    fields: fields,
    loc: loc(lexer$$1, start)
  };
}

/**
 * InterfaceTypeExtension :
 *   - extend interface Name Directives[Const]? FieldsDefinition
 *   - extend interface Name Directives[Const]
 */
function parseInterfaceTypeExtension(lexer$$1) {
  var start = lexer$$1.token;
  expectKeyword(lexer$$1, 'extend');
  expectKeyword(lexer$$1, 'interface');
  var name = parseName(lexer$$1);
  var directives = parseDirectives(lexer$$1, true);
  var fields = parseFieldsDefinition(lexer$$1);
  if (directives.length === 0 && fields.length === 0) {
    throw unexpected(lexer$$1);
  }
  return {
    kind: kinds.INTERFACE_TYPE_EXTENSION,
    name: name,
    directives: directives,
    fields: fields,
    loc: loc(lexer$$1, start)
  };
}

/**
 * UnionTypeExtension :
 *   - extend union Name Directives[Const]? MemberTypesDefinition
 *   - extend union Name Directives[Const]
 */
function parseUnionTypeExtension(lexer$$1) {
  var start = lexer$$1.token;
  expectKeyword(lexer$$1, 'extend');
  expectKeyword(lexer$$1, 'union');
  var name = parseName(lexer$$1);
  var directives = parseDirectives(lexer$$1, true);
  var types = parseMemberTypesDefinition(lexer$$1);
  if (directives.length === 0 && types.length === 0) {
    throw unexpected(lexer$$1);
  }
  return {
    kind: kinds.UNION_TYPE_EXTENSION,
    name: name,
    directives: directives,
    types: types,
    loc: loc(lexer$$1, start)
  };
}

/**
 * EnumTypeExtension :
 *   - extend enum Name Directives[Const]? EnumValuesDefinition
 *   - extend enum Name Directives[Const]
 */
function parseEnumTypeExtension(lexer$$1) {
  var start = lexer$$1.token;
  expectKeyword(lexer$$1, 'extend');
  expectKeyword(lexer$$1, 'enum');
  var name = parseName(lexer$$1);
  var directives = parseDirectives(lexer$$1, true);
  var values = parseEnumValuesDefinition(lexer$$1);
  if (directives.length === 0 && values.length === 0) {
    throw unexpected(lexer$$1);
  }
  return {
    kind: kinds.ENUM_TYPE_EXTENSION,
    name: name,
    directives: directives,
    values: values,
    loc: loc(lexer$$1, start)
  };
}

/**
 * InputObjectTypeExtension :
 *   - extend input Name Directives[Const]? InputFieldsDefinition
 *   - extend input Name Directives[Const]
 */
function parseInputObjectTypeExtension(lexer$$1) {
  var start = lexer$$1.token;
  expectKeyword(lexer$$1, 'extend');
  expectKeyword(lexer$$1, 'input');
  var name = parseName(lexer$$1);
  var directives = parseDirectives(lexer$$1, true);
  var fields = parseInputFieldsDefinition(lexer$$1);
  if (directives.length === 0 && fields.length === 0) {
    throw unexpected(lexer$$1);
  }
  return {
    kind: kinds.INPUT_OBJECT_TYPE_EXTENSION,
    name: name,
    directives: directives,
    fields: fields,
    loc: loc(lexer$$1, start)
  };
}

/**
 * DirectiveDefinition :
 *   - Description? directive @ Name ArgumentsDefinition? on DirectiveLocations
 */
function parseDirectiveDefinition(lexer$$1) {
  var start = lexer$$1.token;
  var description = parseDescription(lexer$$1);
  expectKeyword(lexer$$1, 'directive');
  expect(lexer$$1, lexer.TokenKind.AT);
  var name = parseName(lexer$$1);
  var args = parseArgumentDefs(lexer$$1);
  expectKeyword(lexer$$1, 'on');
  var locations = parseDirectiveLocations(lexer$$1);
  return {
    kind: kinds.DIRECTIVE_DEFINITION,
    description: description,
    name: name,
    arguments: args,
    locations: locations,
    loc: loc(lexer$$1, start)
  };
}

/**
 * DirectiveLocations :
 *   - `|`? DirectiveLocation
 *   - DirectiveLocations | DirectiveLocation
 */
function parseDirectiveLocations(lexer$$1) {
  // Optional leading pipe
  skip(lexer$$1, lexer.TokenKind.PIPE);
  var locations = [];
  do {
    locations.push(parseDirectiveLocation(lexer$$1));
  } while (skip(lexer$$1, lexer.TokenKind.PIPE));
  return locations;
}

/*
 * DirectiveLocation :
 *   - ExecutableDirectiveLocation
 *   - TypeSystemDirectiveLocation
 *
 * ExecutableDirectiveLocation : one of
 *   `QUERY`
 *   `MUTATION`
 *   `SUBSCRIPTION`
 *   `FIELD`
 *   `FRAGMENT_DEFINITION`
 *   `FRAGMENT_SPREAD`
 *   `INLINE_FRAGMENT`
 *
 * TypeSystemDirectiveLocation : one of
 *   `SCHEMA`
 *   `SCALAR`
 *   `OBJECT`
 *   `FIELD_DEFINITION`
 *   `ARGUMENT_DEFINITION`
 *   `INTERFACE`
 *   `UNION`
 *   `ENUM`
 *   `ENUM_VALUE`
 *   `INPUT_OBJECT`
 *   `INPUT_FIELD_DEFINITION`
 */
function parseDirectiveLocation(lexer$$1) {
  var start = lexer$$1.token;
  var name = parseName(lexer$$1);
  if (directiveLocation.DirectiveLocation.hasOwnProperty(name.value)) {
    return name;
  }
  throw unexpected(lexer$$1, start);
}

// Core parsing utility functions

/**
 * Returns a location object, used to identify the place in
 * the source that created a given parsed object.
 */
function loc(lexer$$1, startToken) {
  if (!lexer$$1.options.noLocation) {
    return new Loc(startToken, lexer$$1.lastToken, lexer$$1.source);
  }
}

function Loc(startToken, endToken, source$$1) {
  this.start = startToken.start;
  this.end = endToken.end;
  this.startToken = startToken;
  this.endToken = endToken;
  this.source = source$$1;
}

// Print a simplified form when appearing in JSON/util.inspect.
Loc.prototype.toJSON = Loc.prototype.inspect = function toJSON() {
  return { start: this.start, end: this.end };
};

/**
 * Determines if the next token is of a given kind
 */
function peek(lexer$$1, kind) {
  return lexer$$1.token.kind === kind;
}

/**
 * If the next token is of the given kind, return true after advancing
 * the lexer. Otherwise, do not change the parser state and return false.
 */
function skip(lexer$$1, kind) {
  var match = lexer$$1.token.kind === kind;
  if (match) {
    lexer$$1.advance();
  }
  return match;
}

/**
 * If the next token is of the given kind, return that token after advancing
 * the lexer. Otherwise, do not change the parser state and throw an error.
 */
function expect(lexer$$1, kind) {
  var token = lexer$$1.token;
  if (token.kind === kind) {
    lexer$$1.advance();
    return token;
  }
  throw (0, error.syntaxError)(lexer$$1.source, token.start, 'Expected ' + kind + ', found ' + (0, lexer.getTokenDesc)(token));
}

/**
 * If the next token is a keyword with the given value, return that token after
 * advancing the lexer. Otherwise, do not change the parser state and return
 * false.
 */
function expectKeyword(lexer$$1, value) {
  var token = lexer$$1.token;
  if (token.kind === lexer.TokenKind.NAME && token.value === value) {
    lexer$$1.advance();
    return token;
  }
  throw (0, error.syntaxError)(lexer$$1.source, token.start, 'Expected "' + value + '", found ' + (0, lexer.getTokenDesc)(token));
}

/**
 * Helper function for creating an error when an unexpected lexed token
 * is encountered.
 */
function unexpected(lexer$$1, atToken) {
  var token = atToken || lexer$$1.token;
  return (0, error.syntaxError)(lexer$$1.source, token.start, 'Unexpected ' + (0, lexer.getTokenDesc)(token));
}

/**
 * Returns a possibly empty list of parse nodes, determined by
 * the parseFn. This list begins with a lex token of openKind
 * and ends with a lex token of closeKind. Advances the parser
 * to the next lex token after the closing token.
 */
function any(lexer$$1, openKind, parseFn, closeKind) {
  expect(lexer$$1, openKind);
  var nodes = [];
  while (!skip(lexer$$1, closeKind)) {
    nodes.push(parseFn(lexer$$1));
  }
  return nodes;
}

/**
 * Returns a non-empty list of parse nodes, determined by
 * the parseFn. This list begins with a lex token of openKind
 * and ends with a lex token of closeKind. Advances the parser
 * to the next lex token after the closing token.
 */
function many(lexer$$1, openKind, parseFn, closeKind) {
  expect(lexer$$1, openKind);
  var nodes = [parseFn(lexer$$1)];
  while (!skip(lexer$$1, closeKind)) {
    nodes.push(parseFn(lexer$$1));
  }
  return nodes;
}
});

unwrapExports(parser);
var parser_1 = parser.parse;
var parser_2 = parser.parseValue;
var parser_3 = parser.parseType;
var parser_4 = parser.parseConstValue;
var parser_5 = parser.parseTypeReference;
var parser_6 = parser.parseNamedType;

var visitor = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.visit = visit;
exports.visitInParallel = visitInParallel;
exports.visitWithTypeInfo = visitWithTypeInfo;
exports.getVisitFn = getVisitFn;


/**
 * A visitor is comprised of visit functions, which are called on each node
 * during the visitor's traversal.
 */


/**
 * A visitor is provided to visit, it contains the collection of
 * relevant functions to be called during the visitor's traversal.
 */
/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

var QueryDocumentKeys = exports.QueryDocumentKeys = {
  Name: [],

  Document: ['definitions'],
  OperationDefinition: ['name', 'variableDefinitions', 'directives', 'selectionSet'],
  VariableDefinition: ['variable', 'type', 'defaultValue'],
  Variable: ['name'],
  SelectionSet: ['selections'],
  Field: ['alias', 'name', 'arguments', 'directives', 'selectionSet'],
  Argument: ['name', 'value'],

  FragmentSpread: ['name', 'directives'],
  InlineFragment: ['typeCondition', 'directives', 'selectionSet'],
  FragmentDefinition: ['name',
  // Note: fragment variable definitions are experimental and may be changed
  // or removed in the future.
  'variableDefinitions', 'typeCondition', 'directives', 'selectionSet'],

  IntValue: [],
  FloatValue: [],
  StringValue: [],
  BooleanValue: [],
  NullValue: [],
  EnumValue: [],
  ListValue: ['values'],
  ObjectValue: ['fields'],
  ObjectField: ['name', 'value'],

  Directive: ['name', 'arguments'],

  NamedType: ['name'],
  ListType: ['type'],
  NonNullType: ['type'],

  SchemaDefinition: ['directives', 'operationTypes'],
  OperationTypeDefinition: ['type'],

  ScalarTypeDefinition: ['description', 'name', 'directives'],
  ObjectTypeDefinition: ['description', 'name', 'interfaces', 'directives', 'fields'],
  FieldDefinition: ['description', 'name', 'arguments', 'type', 'directives'],
  InputValueDefinition: ['description', 'name', 'type', 'defaultValue', 'directives'],
  InterfaceTypeDefinition: ['description', 'name', 'directives', 'fields'],
  UnionTypeDefinition: ['description', 'name', 'directives', 'types'],
  EnumTypeDefinition: ['description', 'name', 'directives', 'values'],
  EnumValueDefinition: ['description', 'name', 'directives'],
  InputObjectTypeDefinition: ['description', 'name', 'directives', 'fields'],

  ScalarTypeExtension: ['name', 'directives'],
  ObjectTypeExtension: ['name', 'interfaces', 'directives', 'fields'],
  InterfaceTypeExtension: ['name', 'directives', 'fields'],
  UnionTypeExtension: ['name', 'directives', 'types'],
  EnumTypeExtension: ['name', 'directives', 'values'],
  InputObjectTypeExtension: ['name', 'directives', 'fields'],

  DirectiveDefinition: ['description', 'name', 'arguments', 'locations']
};

/**
 * A KeyMap describes each the traversable properties of each kind of node.
 */
var BREAK = exports.BREAK = {};

/**
 * visit() will walk through an AST using a depth first traversal, calling
 * the visitor's enter function at each node in the traversal, and calling the
 * leave function after visiting that node and all of its child nodes.
 *
 * By returning different values from the enter and leave functions, the
 * behavior of the visitor can be altered, including skipping over a sub-tree of
 * the AST (by returning false), editing the AST by returning a value or null
 * to remove the value, or to stop the whole traversal by returning BREAK.
 *
 * When using visit() to edit an AST, the original AST will not be modified, and
 * a new version of the AST with the changes applied will be returned from the
 * visit function.
 *
 *     const editedAST = visit(ast, {
 *       enter(node, key, parent, path, ancestors) {
 *         // @return
 *         //   undefined: no action
 *         //   false: skip visiting this node
 *         //   visitor.BREAK: stop visiting altogether
 *         //   null: delete this node
 *         //   any value: replace this node with the returned value
 *       },
 *       leave(node, key, parent, path, ancestors) {
 *         // @return
 *         //   undefined: no action
 *         //   false: no action
 *         //   visitor.BREAK: stop visiting altogether
 *         //   null: delete this node
 *         //   any value: replace this node with the returned value
 *       }
 *     });
 *
 * Alternatively to providing enter() and leave() functions, a visitor can
 * instead provide functions named the same as the kinds of AST nodes, or
 * enter/leave visitors at a named key, leading to four permutations of
 * visitor API:
 *
 * 1) Named visitors triggered when entering a node a specific kind.
 *
 *     visit(ast, {
 *       Kind(node) {
 *         // enter the "Kind" node
 *       }
 *     })
 *
 * 2) Named visitors that trigger upon entering and leaving a node of
 *    a specific kind.
 *
 *     visit(ast, {
 *       Kind: {
 *         enter(node) {
 *           // enter the "Kind" node
 *         }
 *         leave(node) {
 *           // leave the "Kind" node
 *         }
 *       }
 *     })
 *
 * 3) Generic visitors that trigger upon entering and leaving any node.
 *
 *     visit(ast, {
 *       enter(node) {
 *         // enter any node
 *       },
 *       leave(node) {
 *         // leave any node
 *       }
 *     })
 *
 * 4) Parallel visitors for entering and leaving nodes of a specific kind.
 *
 *     visit(ast, {
 *       enter: {
 *         Kind(node) {
 *           // enter the "Kind" node
 *         }
 *       },
 *       leave: {
 *         Kind(node) {
 *           // leave the "Kind" node
 *         }
 *       }
 *     })
 */
function visit(root, visitor) {
  var visitorKeys = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : QueryDocumentKeys;

  /* eslint-disable no-undef-init */
  var stack = undefined;
  var inArray = Array.isArray(root);
  var keys = [root];
  var index = -1;
  var edits = [];
  var node = undefined;
  var key = undefined;
  var parent = undefined;
  var path = [];
  var ancestors = [];
  var newRoot = root;
  /* eslint-enable no-undef-init */

  do {
    index++;
    var isLeaving = index === keys.length;
    var isEdited = isLeaving && edits.length !== 0;
    if (isLeaving) {
      key = ancestors.length === 0 ? undefined : path[path.length - 1];
      node = parent;
      parent = ancestors.pop();
      if (isEdited) {
        if (inArray) {
          node = node.slice();
        } else {
          var clone = {};
          for (var k in node) {
            if (node.hasOwnProperty(k)) {
              clone[k] = node[k];
            }
          }
          node = clone;
        }
        var editOffset = 0;
        for (var ii = 0; ii < edits.length; ii++) {
          var editKey = edits[ii][0];
          var editValue = edits[ii][1];
          if (inArray) {
            editKey -= editOffset;
          }
          if (inArray && editValue === null) {
            node.splice(editKey, 1);
            editOffset++;
          } else {
            node[editKey] = editValue;
          }
        }
      }
      index = stack.index;
      keys = stack.keys;
      edits = stack.edits;
      inArray = stack.inArray;
      stack = stack.prev;
    } else {
      key = parent ? inArray ? index : keys[index] : undefined;
      node = parent ? parent[key] : newRoot;
      if (node === null || node === undefined) {
        continue;
      }
      if (parent) {
        path.push(key);
      }
    }

    var result = void 0;
    if (!Array.isArray(node)) {
      if (!isNode(node)) {
        throw new Error('Invalid AST Node: ' + JSON.stringify(node));
      }
      var visitFn = getVisitFn(visitor, node.kind, isLeaving);
      if (visitFn) {
        result = visitFn.call(visitor, node, key, parent, path, ancestors);

        if (result === BREAK) {
          break;
        }

        if (result === false) {
          if (!isLeaving) {
            path.pop();
            continue;
          }
        } else if (result !== undefined) {
          edits.push([key, result]);
          if (!isLeaving) {
            if (isNode(result)) {
              node = result;
            } else {
              path.pop();
              continue;
            }
          }
        }
      }
    }

    if (result === undefined && isEdited) {
      edits.push([key, node]);
    }

    if (isLeaving) {
      path.pop();
    } else {
      stack = { inArray: inArray, index: index, keys: keys, edits: edits, prev: stack };
      inArray = Array.isArray(node);
      keys = inArray ? node : visitorKeys[node.kind] || [];
      index = -1;
      edits = [];
      if (parent) {
        ancestors.push(parent);
      }
      parent = node;
    }
  } while (stack !== undefined);

  if (edits.length !== 0) {
    newRoot = edits[edits.length - 1][1];
  }

  return newRoot;
}

function isNode(maybeNode) {
  return Boolean(maybeNode && typeof maybeNode.kind === 'string');
}

/**
 * Creates a new visitor instance which delegates to many visitors to run in
 * parallel. Each visitor will be visited for each node before moving on.
 *
 * If a prior visitor edits a node, no following visitors will see that node.
 */
function visitInParallel(visitors) {
  var skipping = new Array(visitors.length);

  return {
    enter: function enter(node) {
      for (var i = 0; i < visitors.length; i++) {
        if (!skipping[i]) {
          var fn = getVisitFn(visitors[i], node.kind, /* isLeaving */false);
          if (fn) {
            var result = fn.apply(visitors[i], arguments);
            if (result === false) {
              skipping[i] = node;
            } else if (result === BREAK) {
              skipping[i] = BREAK;
            } else if (result !== undefined) {
              return result;
            }
          }
        }
      }
    },
    leave: function leave(node) {
      for (var i = 0; i < visitors.length; i++) {
        if (!skipping[i]) {
          var fn = getVisitFn(visitors[i], node.kind, /* isLeaving */true);
          if (fn) {
            var result = fn.apply(visitors[i], arguments);
            if (result === BREAK) {
              skipping[i] = BREAK;
            } else if (result !== undefined && result !== false) {
              return result;
            }
          }
        } else if (skipping[i] === node) {
          skipping[i] = null;
        }
      }
    }
  };
}

/**
 * Creates a new visitor instance which maintains a provided TypeInfo instance
 * along with visiting visitor.
 */
function visitWithTypeInfo(typeInfo, visitor) {
  return {
    enter: function enter(node) {
      typeInfo.enter(node);
      var fn = getVisitFn(visitor, node.kind, /* isLeaving */false);
      if (fn) {
        var result = fn.apply(visitor, arguments);
        if (result !== undefined) {
          typeInfo.leave(node);
          if (isNode(result)) {
            typeInfo.enter(result);
          }
        }
        return result;
      }
    },
    leave: function leave(node) {
      var fn = getVisitFn(visitor, node.kind, /* isLeaving */true);
      var result = void 0;
      if (fn) {
        result = fn.apply(visitor, arguments);
      }
      typeInfo.leave(node);
      return result;
    }
  };
}

/**
 * Given a visitor instance, if it is leaving or not, and a node kind, return
 * the function the visitor runtime should call.
 */
function getVisitFn(visitor, kind, isLeaving) {
  var kindVisitor = visitor[kind];
  if (kindVisitor) {
    if (!isLeaving && typeof kindVisitor === 'function') {
      // { Kind() {} }
      return kindVisitor;
    }
    var kindSpecificVisitor = isLeaving ? kindVisitor.leave : kindVisitor.enter;
    if (typeof kindSpecificVisitor === 'function') {
      // { Kind: { enter() {}, leave() {} } }
      return kindSpecificVisitor;
    }
  } else {
    var specificVisitor = isLeaving ? visitor.leave : visitor.enter;
    if (specificVisitor) {
      if (typeof specificVisitor === 'function') {
        // { enter() {}, leave() {} }
        return specificVisitor;
      }
      var specificKindVisitor = specificVisitor[kind];
      if (typeof specificKindVisitor === 'function') {
        // { enter: { Kind() {} }, leave: { Kind() {} } }
        return specificKindVisitor;
      }
    }
  }
}
});

unwrapExports(visitor);
var visitor_1 = visitor.visit;
var visitor_2 = visitor.visitInParallel;
var visitor_3 = visitor.visitWithTypeInfo;
var visitor_4 = visitor.getVisitFn;
var visitor_5 = visitor.QueryDocumentKeys;
var visitor_6 = visitor.BREAK;

var printer = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.print = print;



/**
 * Converts an AST into a string, using one set of reasonable
 * formatting rules.
 */
function print(ast) {
  return (0, visitor.visit)(ast, { leave: printDocASTReducer });
} /**
   * Copyright (c) 2015-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

var printDocASTReducer = {
  Name: function Name(node) {
    return node.value;
  },
  Variable: function Variable(node) {
    return '$' + node.name;
  },

  // Document

  Document: function Document(node) {
    return join(node.definitions, '\n\n') + '\n';
  },

  OperationDefinition: function OperationDefinition(node) {
    var op = node.operation;
    var name = node.name;
    var varDefs = wrap('(', join(node.variableDefinitions, ', '), ')');
    var directives = join(node.directives, ' ');
    var selectionSet = node.selectionSet;
    // Anonymous queries with no directives or variable definitions can use
    // the query short form.
    return !name && !directives && !varDefs && op === 'query' ? selectionSet : join([op, join([name, varDefs]), directives, selectionSet], ' ');
  },


  VariableDefinition: function VariableDefinition(_ref) {
    var variable = _ref.variable,
        type = _ref.type,
        defaultValue = _ref.defaultValue;
    return variable + ': ' + type + wrap(' = ', defaultValue);
  },

  SelectionSet: function SelectionSet(_ref2) {
    var selections = _ref2.selections;
    return block(selections);
  },

  Field: function Field(_ref3) {
    var alias = _ref3.alias,
        name = _ref3.name,
        args = _ref3.arguments,
        directives = _ref3.directives,
        selectionSet = _ref3.selectionSet;
    return join([wrap('', alias, ': ') + name + wrap('(', join(args, ', '), ')'), join(directives, ' '), selectionSet], ' ');
  },

  Argument: function Argument(_ref4) {
    var name = _ref4.name,
        value = _ref4.value;
    return name + ': ' + value;
  },

  // Fragments

  FragmentSpread: function FragmentSpread(_ref5) {
    var name = _ref5.name,
        directives = _ref5.directives;
    return '...' + name + wrap(' ', join(directives, ' '));
  },

  InlineFragment: function InlineFragment(_ref6) {
    var typeCondition = _ref6.typeCondition,
        directives = _ref6.directives,
        selectionSet = _ref6.selectionSet;
    return join(['...', wrap('on ', typeCondition), join(directives, ' '), selectionSet], ' ');
  },

  FragmentDefinition: function FragmentDefinition(_ref7) {
    var name = _ref7.name,
        typeCondition = _ref7.typeCondition,
        variableDefinitions = _ref7.variableDefinitions,
        directives = _ref7.directives,
        selectionSet = _ref7.selectionSet;
    return (
      // Note: fragment variable definitions are experimental and may be changed
      // or removed in the future.
      'fragment ' + name + wrap('(', join(variableDefinitions, ', '), ')') + ' ' + ('on ' + typeCondition + ' ' + wrap('', join(directives, ' '), ' ')) + selectionSet
    );
  },

  // Value

  IntValue: function IntValue(_ref8) {
    var value = _ref8.value;
    return value;
  },
  FloatValue: function FloatValue(_ref9) {
    var value = _ref9.value;
    return value;
  },
  StringValue: function StringValue(_ref10, key) {
    var value = _ref10.value,
        isBlockString = _ref10.block;
    return isBlockString ? printBlockString(value, key === 'description') : JSON.stringify(value);
  },
  BooleanValue: function BooleanValue(_ref11) {
    var value = _ref11.value;
    return JSON.stringify(value);
  },
  NullValue: function NullValue() {
    return 'null';
  },
  EnumValue: function EnumValue(_ref12) {
    var value = _ref12.value;
    return value;
  },
  ListValue: function ListValue(_ref13) {
    var values = _ref13.values;
    return '[' + join(values, ', ') + ']';
  },
  ObjectValue: function ObjectValue(_ref14) {
    var fields = _ref14.fields;
    return '{' + join(fields, ', ') + '}';
  },
  ObjectField: function ObjectField(_ref15) {
    var name = _ref15.name,
        value = _ref15.value;
    return name + ': ' + value;
  },

  // Directive

  Directive: function Directive(_ref16) {
    var name = _ref16.name,
        args = _ref16.arguments;
    return '@' + name + wrap('(', join(args, ', '), ')');
  },

  // Type

  NamedType: function NamedType(_ref17) {
    var name = _ref17.name;
    return name;
  },
  ListType: function ListType(_ref18) {
    var type = _ref18.type;
    return '[' + type + ']';
  },
  NonNullType: function NonNullType(_ref19) {
    var type = _ref19.type;
    return type + '!';
  },

  // Type System Definitions

  SchemaDefinition: function SchemaDefinition(_ref20) {
    var directives = _ref20.directives,
        operationTypes = _ref20.operationTypes;
    return join(['schema', join(directives, ' '), block(operationTypes)], ' ');
  },

  OperationTypeDefinition: function OperationTypeDefinition(_ref21) {
    var operation = _ref21.operation,
        type = _ref21.type;
    return operation + ': ' + type;
  },

  ScalarTypeDefinition: function ScalarTypeDefinition(_ref22) {
    var description = _ref22.description,
        name = _ref22.name,
        directives = _ref22.directives;
    return join([description, join(['scalar', name, join(directives, ' ')], ' ')], '\n');
  },

  ObjectTypeDefinition: function ObjectTypeDefinition(_ref23) {
    var description = _ref23.description,
        name = _ref23.name,
        interfaces = _ref23.interfaces,
        directives = _ref23.directives,
        fields = _ref23.fields;
    return join([description, join(['type', name, wrap('implements ', join(interfaces, ', ')), join(directives, ' '), block(fields)], ' ')], '\n');
  },

  FieldDefinition: function FieldDefinition(_ref24) {
    var description = _ref24.description,
        name = _ref24.name,
        args = _ref24.arguments,
        type = _ref24.type,
        directives = _ref24.directives;
    return join([description, name + wrap('(', join(args, ', '), ')') + ': ' + type + wrap(' ', join(directives, ' '))], '\n');
  },

  InputValueDefinition: function InputValueDefinition(_ref25) {
    var description = _ref25.description,
        name = _ref25.name,
        type = _ref25.type,
        defaultValue = _ref25.defaultValue,
        directives = _ref25.directives;
    return join([description, join([name + ': ' + type, wrap('= ', defaultValue), join(directives, ' ')], ' ')], '\n');
  },

  InterfaceTypeDefinition: function InterfaceTypeDefinition(_ref26) {
    var description = _ref26.description,
        name = _ref26.name,
        directives = _ref26.directives,
        fields = _ref26.fields;
    return join([description, join(['interface', name, join(directives, ' '), block(fields)], ' ')], '\n');
  },

  UnionTypeDefinition: function UnionTypeDefinition(_ref27) {
    var description = _ref27.description,
        name = _ref27.name,
        directives = _ref27.directives,
        types = _ref27.types;
    return join([description, join(['union', name, join(directives, ' '), types && types.length !== 0 ? '= ' + join(types, ' | ') : ''], ' ')], '\n');
  },

  EnumTypeDefinition: function EnumTypeDefinition(_ref28) {
    var description = _ref28.description,
        name = _ref28.name,
        directives = _ref28.directives,
        values = _ref28.values;
    return join([description, join(['enum', name, join(directives, ' '), block(values)], ' ')], '\n');
  },

  EnumValueDefinition: function EnumValueDefinition(_ref29) {
    var description = _ref29.description,
        name = _ref29.name,
        directives = _ref29.directives;
    return join([description, join([name, join(directives, ' ')], ' ')], '\n');
  },

  InputObjectTypeDefinition: function InputObjectTypeDefinition(_ref30) {
    var description = _ref30.description,
        name = _ref30.name,
        directives = _ref30.directives,
        fields = _ref30.fields;
    return join([description, join(['input', name, join(directives, ' '), block(fields)], ' ')], '\n');
  },

  ScalarTypeExtension: function ScalarTypeExtension(_ref31) {
    var name = _ref31.name,
        directives = _ref31.directives;
    return join(['extend scalar', name, join(directives, ' ')], ' ');
  },

  ObjectTypeExtension: function ObjectTypeExtension(_ref32) {
    var name = _ref32.name,
        interfaces = _ref32.interfaces,
        directives = _ref32.directives,
        fields = _ref32.fields;
    return join(['extend type', name, wrap('implements ', join(interfaces, ', ')), join(directives, ' '), block(fields)], ' ');
  },

  InterfaceTypeExtension: function InterfaceTypeExtension(_ref33) {
    var name = _ref33.name,
        directives = _ref33.directives,
        fields = _ref33.fields;
    return join(['extend interface', name, join(directives, ' '), block(fields)], ' ');
  },

  UnionTypeExtension: function UnionTypeExtension(_ref34) {
    var name = _ref34.name,
        directives = _ref34.directives,
        types = _ref34.types;
    return join(['extend union', name, join(directives, ' '), types && types.length !== 0 ? '= ' + join(types, ' | ') : ''], ' ');
  },

  EnumTypeExtension: function EnumTypeExtension(_ref35) {
    var name = _ref35.name,
        directives = _ref35.directives,
        values = _ref35.values;
    return join(['extend enum', name, join(directives, ' '), block(values)], ' ');
  },

  InputObjectTypeExtension: function InputObjectTypeExtension(_ref36) {
    var name = _ref36.name,
        directives = _ref36.directives,
        fields = _ref36.fields;
    return join(['extend input', name, join(directives, ' '), block(fields)], ' ');
  },

  DirectiveDefinition: function DirectiveDefinition(_ref37) {
    var description = _ref37.description,
        name = _ref37.name,
        args = _ref37.arguments,
        locations = _ref37.locations;
    return join([description, 'directive @' + name + wrap('(', join(args, ', '), ')') + ' on ' + join(locations, ' | ')], '\n');
  }
};

/**
 * Given maybeArray, print an empty string if it is null or empty, otherwise
 * print all items together separated by separator if provided
 */
function join(maybeArray, separator) {
  return maybeArray ? maybeArray.filter(function (x) {
    return x;
  }).join(separator || '') : '';
}

/**
 * Given array, print each item on its own line, wrapped in an
 * indented "{ }" block.
 */
function block(array) {
  return array && array.length !== 0 ? indent('{\n' + join(array, '\n')) + '\n}' : '';
}

/**
 * If maybeString is not null or empty, then wrap with start and end, otherwise
 * print an empty string.
 */
function wrap(start, maybeString, end) {
  return maybeString ? start + maybeString + (end || '') : '';
}

function indent(maybeString) {
  return maybeString && maybeString.replace(/\n/g, '\n  ');
}

/**
 * Print a block string in the indented block form by adding a leading and
 * trailing blank line. However, if a block string starts with whitespace and is
 * a single-line, adding a leading blank line would strip that whitespace.
 */
function printBlockString(value, isDescription) {
  return (value[0] === ' ' || value[0] === '\t') && value.indexOf('\n') === -1 ? '"""' + value.replace(/"""/g, '\\"""') + '"""' : isDescription ? '"""\n' + value.replace(/"""/g, '\\"""') + '\n"""' : indent('"""\n' + value.replace(/"""/g, '\\"""')) + '\n"""';
}
});

unwrapExports(printer);
var printer_1 = printer.print;

var lodash_isequal = createCommonjsModule(function (module, exports) {
/**
 * Lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright JS Foundation and other contributors <https://js.foundation/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    asyncTag = '[object AsyncFunction]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    nullTag = '[object Null]',
    objectTag = '[object Object]',
    promiseTag = '[object Promise]',
    proxyTag = '[object Proxy]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]',
    undefinedTag = '[object Undefined]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
typedArrayTags[errorTag] = typedArrayTags[funcTag] =
typedArrayTags[mapTag] = typedArrayTags[numberTag] =
typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
typedArrayTags[setTag] = typedArrayTags[stringTag] =
typedArrayTags[weakMapTag] = false;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Detect free variable `exports`. */
var freeExports = exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Detect free variable `process` from Node.js. */
var freeProcess = moduleExports && freeGlobal.process;

/** Used to access faster Node.js helpers. */
var nodeUtil = (function() {
  try {
    return freeProcess && freeProcess.binding && freeProcess.binding('util');
  } catch (e) {}
}());

/* Node.js helper references. */
var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

/**
 * A specialized version of `_.filter` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 */
function arrayFilter(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length,
      resIndex = 0,
      result = [];

  while (++index < length) {
    var value = array[index];
    if (predicate(value, index, array)) {
      result[resIndex++] = value;
    }
  }
  return result;
}

/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */
function arrayPush(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}

/**
 * A specialized version of `_.some` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if any element passes the predicate check,
 *  else `false`.
 */
function arraySome(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (predicate(array[index], index, array)) {
      return true;
    }
  }
  return false;
}

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}

/**
 * Checks if a `cache` value for `key` exists.
 *
 * @private
 * @param {Object} cache The cache to query.
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function cacheHas(cache, key) {
  return cache.has(key);
}

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

/**
 * Converts `map` to its key-value pairs.
 *
 * @private
 * @param {Object} map The map to convert.
 * @returns {Array} Returns the key-value pairs.
 */
function mapToArray(map) {
  var index = -1,
      result = Array(map.size);

  map.forEach(function(value, key) {
    result[++index] = [key, value];
  });
  return result;
}

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

/**
 * Converts `set` to an array of its values.
 *
 * @private
 * @param {Object} set The set to convert.
 * @returns {Array} Returns the values.
 */
function setToArray(set) {
  var index = -1,
      result = Array(set.size);

  set.forEach(function(value) {
    result[++index] = value;
  });
  return result;
}

/** Used for built-in method references. */
var arrayProto = Array.prototype,
    funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/** Built-in value references. */
var Buffer = moduleExports ? root.Buffer : undefined,
    Symbol = root.Symbol,
    Uint8Array = root.Uint8Array,
    propertyIsEnumerable = objectProto.propertyIsEnumerable,
    splice = arrayProto.splice,
    symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetSymbols = Object.getOwnPropertySymbols,
    nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined,
    nativeKeys = overArg(Object.keys, Object);

/* Built-in method references that are verified to be native. */
var DataView = getNative(root, 'DataView'),
    Map = getNative(root, 'Map'),
    Promise = getNative(root, 'Promise'),
    Set = getNative(root, 'Set'),
    WeakMap = getNative(root, 'WeakMap'),
    nativeCreate = getNative(Object, 'create');

/** Used to detect maps, sets, and weakmaps. */
var dataViewCtorString = toSource(DataView),
    mapCtorString = toSource(Map),
    promiseCtorString = toSource(Promise),
    setCtorString = toSource(Set),
    weakMapCtorString = toSource(WeakMap);

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
  this.size = 0;
}

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? (data[key] !== undefined) : hasOwnProperty.call(data, key);
}

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
  return this;
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map || ListCache),
    'string': new Hash
  };
}

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  var result = getMapData(this, key)['delete'](key);
  this.size -= result ? 1 : 0;
  return result;
}

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  var data = getMapData(this, key),
      size = data.size;

  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

/**
 *
 * Creates an array cache object to store unique values.
 *
 * @private
 * @constructor
 * @param {Array} [values] The values to cache.
 */
function SetCache(values) {
  var index = -1,
      length = values == null ? 0 : values.length;

  this.__data__ = new MapCache;
  while (++index < length) {
    this.add(values[index]);
  }
}

/**
 * Adds `value` to the array cache.
 *
 * @private
 * @name add
 * @memberOf SetCache
 * @alias push
 * @param {*} value The value to cache.
 * @returns {Object} Returns the cache instance.
 */
function setCacheAdd(value) {
  this.__data__.set(value, HASH_UNDEFINED);
  return this;
}

/**
 * Checks if `value` is in the array cache.
 *
 * @private
 * @name has
 * @memberOf SetCache
 * @param {*} value The value to search for.
 * @returns {number} Returns `true` if `value` is found, else `false`.
 */
function setCacheHas(value) {
  return this.__data__.has(value);
}

// Add methods to `SetCache`.
SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
SetCache.prototype.has = setCacheHas;

/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Stack(entries) {
  var data = this.__data__ = new ListCache(entries);
  this.size = data.size;
}

/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */
function stackClear() {
  this.__data__ = new ListCache;
  this.size = 0;
}

/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function stackDelete(key) {
  var data = this.__data__,
      result = data['delete'](key);

  this.size = data.size;
  return result;
}

/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function stackGet(key) {
  return this.__data__.get(key);
}

/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function stackHas(key) {
  return this.__data__.has(key);
}

/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */
function stackSet(key, value) {
  var data = this.__data__;
  if (data instanceof ListCache) {
    var pairs = data.__data__;
    if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    data = this.__data__ = new MapCache(pairs);
  }
  data.set(key, value);
  this.size = data.size;
  return this;
}

// Add methods to `Stack`.
Stack.prototype.clear = stackClear;
Stack.prototype['delete'] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  var isArr = isArray(value),
      isArg = !isArr && isArguments(value),
      isBuff = !isArr && !isArg && isBuffer(value),
      isType = !isArr && !isArg && !isBuff && isTypedArray(value),
      skipIndexes = isArr || isArg || isBuff || isType,
      result = skipIndexes ? baseTimes(value.length, String) : [],
      length = result.length;

  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) &&
        !(skipIndexes && (
           // Safari 9 has enumerable `arguments.length` in strict mode.
           key == 'length' ||
           // Node.js 0.10 has enumerable non-index properties on buffers.
           (isBuff && (key == 'offset' || key == 'parent')) ||
           // PhantomJS 2 has enumerable non-index properties on typed arrays.
           (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
           // Skip index properties.
           isIndex(key, length)
        ))) {
      result.push(key);
    }
  }
  return result;
}

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

/**
 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @param {Function} symbolsFunc The function to get the symbols of `object`.
 * @returns {Array} Returns the array of property names and symbols.
 */
function baseGetAllKeys(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
}

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */
function baseIsArguments(value) {
  return isObjectLike(value) && baseGetTag(value) == argsTag;
}

/**
 * The base implementation of `_.isEqual` which supports partial comparisons
 * and tracks traversed objects.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @param {boolean} bitmask The bitmask flags.
 *  1 - Unordered comparison
 *  2 - Partial comparison
 * @param {Function} [customizer] The function to customize comparisons.
 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 */
function baseIsEqual(value, other, bitmask, customizer, stack) {
  if (value === other) {
    return true;
  }
  if (value == null || other == null || (!isObjectLike(value) && !isObjectLike(other))) {
    return value !== value && other !== other;
  }
  return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
}

/**
 * A specialized version of `baseIsEqual` for arrays and objects which performs
 * deep comparisons and tracks traversed objects enabling objects with circular
 * references to be compared.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
  var objIsArr = isArray(object),
      othIsArr = isArray(other),
      objTag = objIsArr ? arrayTag : getTag(object),
      othTag = othIsArr ? arrayTag : getTag(other);

  objTag = objTag == argsTag ? objectTag : objTag;
  othTag = othTag == argsTag ? objectTag : othTag;

  var objIsObj = objTag == objectTag,
      othIsObj = othTag == objectTag,
      isSameTag = objTag == othTag;

  if (isSameTag && isBuffer(object)) {
    if (!isBuffer(other)) {
      return false;
    }
    objIsArr = true;
    objIsObj = false;
  }
  if (isSameTag && !objIsObj) {
    stack || (stack = new Stack);
    return (objIsArr || isTypedArray(object))
      ? equalArrays(object, other, bitmask, customizer, equalFunc, stack)
      : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
  }
  if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

    if (objIsWrapped || othIsWrapped) {
      var objUnwrapped = objIsWrapped ? object.value() : object,
          othUnwrapped = othIsWrapped ? other.value() : other;

      stack || (stack = new Stack);
      return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
    }
  }
  if (!isSameTag) {
    return false;
  }
  stack || (stack = new Stack);
  return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
}

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */
function baseIsTypedArray(value) {
  return isObjectLike(value) &&
    isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
}

/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}

/**
 * A specialized version of `baseIsEqualDeep` for arrays with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Array} array The array to compare.
 * @param {Array} other The other array to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `array` and `other` objects.
 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
 */
function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
      arrLength = array.length,
      othLength = other.length;

  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
    return false;
  }
  // Assume cyclic values are equal.
  var stacked = stack.get(array);
  if (stacked && stack.get(other)) {
    return stacked == other;
  }
  var index = -1,
      result = true,
      seen = (bitmask & COMPARE_UNORDERED_FLAG) ? new SetCache : undefined;

  stack.set(array, other);
  stack.set(other, array);

  // Ignore non-index properties.
  while (++index < arrLength) {
    var arrValue = array[index],
        othValue = other[index];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, arrValue, index, other, array, stack)
        : customizer(arrValue, othValue, index, array, other, stack);
    }
    if (compared !== undefined) {
      if (compared) {
        continue;
      }
      result = false;
      break;
    }
    // Recursively compare arrays (susceptible to call stack limits).
    if (seen) {
      if (!arraySome(other, function(othValue, othIndex) {
            if (!cacheHas(seen, othIndex) &&
                (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
              return seen.push(othIndex);
            }
          })) {
        result = false;
        break;
      }
    } else if (!(
          arrValue === othValue ||
            equalFunc(arrValue, othValue, bitmask, customizer, stack)
        )) {
      result = false;
      break;
    }
  }
  stack['delete'](array);
  stack['delete'](other);
  return result;
}

/**
 * A specialized version of `baseIsEqualDeep` for comparing objects of
 * the same `toStringTag`.
 *
 * **Note:** This function only supports comparing values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {string} tag The `toStringTag` of the objects to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
  switch (tag) {
    case dataViewTag:
      if ((object.byteLength != other.byteLength) ||
          (object.byteOffset != other.byteOffset)) {
        return false;
      }
      object = object.buffer;
      other = other.buffer;

    case arrayBufferTag:
      if ((object.byteLength != other.byteLength) ||
          !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
        return false;
      }
      return true;

    case boolTag:
    case dateTag:
    case numberTag:
      // Coerce booleans to `1` or `0` and dates to milliseconds.
      // Invalid dates are coerced to `NaN`.
      return eq(+object, +other);

    case errorTag:
      return object.name == other.name && object.message == other.message;

    case regexpTag:
    case stringTag:
      // Coerce regexes to strings and treat strings, primitives and objects,
      // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
      // for more details.
      return object == (other + '');

    case mapTag:
      var convert = mapToArray;

    case setTag:
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
      convert || (convert = setToArray);

      if (object.size != other.size && !isPartial) {
        return false;
      }
      // Assume cyclic values are equal.
      var stacked = stack.get(object);
      if (stacked) {
        return stacked == other;
      }
      bitmask |= COMPARE_UNORDERED_FLAG;

      // Recursively compare objects (susceptible to call stack limits).
      stack.set(object, other);
      var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
      stack['delete'](object);
      return result;

    case symbolTag:
      if (symbolValueOf) {
        return symbolValueOf.call(object) == symbolValueOf.call(other);
      }
  }
  return false;
}

/**
 * A specialized version of `baseIsEqualDeep` for objects with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
      objProps = getAllKeys(object),
      objLength = objProps.length,
      othProps = getAllKeys(other),
      othLength = othProps.length;

  if (objLength != othLength && !isPartial) {
    return false;
  }
  var index = objLength;
  while (index--) {
    var key = objProps[index];
    if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
      return false;
    }
  }
  // Assume cyclic values are equal.
  var stacked = stack.get(object);
  if (stacked && stack.get(other)) {
    return stacked == other;
  }
  var result = true;
  stack.set(object, other);
  stack.set(other, object);

  var skipCtor = isPartial;
  while (++index < objLength) {
    key = objProps[index];
    var objValue = object[key],
        othValue = other[key];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, objValue, key, other, object, stack)
        : customizer(objValue, othValue, key, object, other, stack);
    }
    // Recursively compare objects (susceptible to call stack limits).
    if (!(compared === undefined
          ? (objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack))
          : compared
        )) {
      result = false;
      break;
    }
    skipCtor || (skipCtor = key == 'constructor');
  }
  if (result && !skipCtor) {
    var objCtor = object.constructor,
        othCtor = other.constructor;

    // Non `Object` object instances with different constructors are not equal.
    if (objCtor != othCtor &&
        ('constructor' in object && 'constructor' in other) &&
        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
          typeof othCtor == 'function' && othCtor instanceof othCtor)) {
      result = false;
    }
  }
  stack['delete'](object);
  stack['delete'](other);
  return result;
}

/**
 * Creates an array of own enumerable property names and symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeys(object) {
  return baseGetAllKeys(object, keys, getSymbols);
}

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

/**
 * Creates an array of the own enumerable symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
  if (object == null) {
    return [];
  }
  object = Object(object);
  return arrayFilter(nativeGetSymbols(object), function(symbol) {
    return propertyIsEnumerable.call(object, symbol);
  });
};

/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
var getTag = baseGetTag;

// Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
    (Map && getTag(new Map) != mapTag) ||
    (Promise && getTag(Promise.resolve()) != promiseTag) ||
    (Set && getTag(new Set) != setTag) ||
    (WeakMap && getTag(new WeakMap) != weakMapTag)) {
  getTag = function(value) {
    var result = baseGetTag(value),
        Ctor = result == objectTag ? value.constructor : undefined,
        ctorString = Ctor ? toSource(Ctor) : '';

    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString: return dataViewTag;
        case mapCtorString: return mapTag;
        case promiseCtorString: return promiseTag;
        case setCtorString: return setTag;
        case weakMapCtorString: return weakMapTag;
      }
    }
    return result;
  };
}

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length &&
    (typeof value == 'number' || reIsUint.test(value)) &&
    (value > -1 && value % 1 == 0 && value < length);
}

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

  return value === proto;
}

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
  return isObjectLike(value) && hasOwnProperty.call(value, 'callee') &&
    !propertyIsEnumerable.call(value, 'callee');
};

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

/**
 * Checks if `value` is a buffer.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * _.isBuffer(new Buffer(2));
 * // => true
 *
 * _.isBuffer(new Uint8Array(2));
 * // => false
 */
var isBuffer = nativeIsBuffer || stubFalse;

/**
 * Performs a deep comparison between two values to determine if they are
 * equivalent.
 *
 * **Note:** This method supports comparing arrays, array buffers, booleans,
 * date objects, error objects, maps, numbers, `Object` objects, regexes,
 * sets, strings, symbols, and typed arrays. `Object` objects are compared
 * by their own, not inherited, enumerable properties. Functions and DOM
 * nodes are compared by strict equality, i.e. `===`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.isEqual(object, other);
 * // => true
 *
 * object === other;
 * // => false
 */
function isEqual(value, other) {
  return baseIsEqual(value, other);
}

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  if (!isObject(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  var tag = baseGetTag(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}

/**
 * This method returns a new empty array.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {Array} Returns the new empty array.
 * @example
 *
 * var arrays = _.times(2, _.stubArray);
 *
 * console.log(arrays);
 * // => [[], []]
 *
 * console.log(arrays[0] === arrays[1]);
 * // => false
 */
function stubArray() {
  return [];
}

/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */
function stubFalse() {
  return false;
}

module.exports = isEqual;
});

var lodash_clone = createCommonjsModule(function (module, exports) {
/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    promiseTag = '[object Promise]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to match `RegExp` flags from their coerced string values. */
var reFlags = /\w*$/;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/** Used to identify `toStringTag` values supported by `_.clone`. */
var cloneableTags = {};
cloneableTags[argsTag] = cloneableTags[arrayTag] =
cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] =
cloneableTags[boolTag] = cloneableTags[dateTag] =
cloneableTags[float32Tag] = cloneableTags[float64Tag] =
cloneableTags[int8Tag] = cloneableTags[int16Tag] =
cloneableTags[int32Tag] = cloneableTags[mapTag] =
cloneableTags[numberTag] = cloneableTags[objectTag] =
cloneableTags[regexpTag] = cloneableTags[setTag] =
cloneableTags[stringTag] = cloneableTags[symbolTag] =
cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] =
cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
cloneableTags[errorTag] = cloneableTags[funcTag] =
cloneableTags[weakMapTag] = false;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Detect free variable `exports`. */
var freeExports = exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/**
 * Adds the key-value `pair` to `map`.
 *
 * @private
 * @param {Object} map The map to modify.
 * @param {Array} pair The key-value pair to add.
 * @returns {Object} Returns `map`.
 */
function addMapEntry(map, pair) {
  // Don't return `map.set` because it's not chainable in IE 11.
  map.set(pair[0], pair[1]);
  return map;
}

/**
 * Adds `value` to `set`.
 *
 * @private
 * @param {Object} set The set to modify.
 * @param {*} value The value to add.
 * @returns {Object} Returns `set`.
 */
function addSetEntry(set, value) {
  // Don't return `set.add` because it's not chainable in IE 11.
  set.add(value);
  return set;
}

/**
 * A specialized version of `_.forEach` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns `array`.
 */
function arrayEach(array, iteratee) {
  var index = -1,
      length = array ? array.length : 0;

  while (++index < length) {
    if (iteratee(array[index], index, array) === false) {
      break;
    }
  }
  return array;
}

/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */
function arrayPush(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}

/**
 * A specialized version of `_.reduce` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {*} [accumulator] The initial value.
 * @param {boolean} [initAccum] Specify using the first element of `array` as
 *  the initial value.
 * @returns {*} Returns the accumulated value.
 */
function arrayReduce(array, iteratee, accumulator, initAccum) {
  var index = -1,
      length = array ? array.length : 0;

  if (initAccum && length) {
    accumulator = array[++index];
  }
  while (++index < length) {
    accumulator = iteratee(accumulator, array[index], index, array);
  }
  return accumulator;
}

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

/**
 * Checks if `value` is a host object in IE < 9.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
 */
function isHostObject(value) {
  // Many host objects are `Object` objects that can coerce to strings
  // despite having improperly defined `toString` methods.
  var result = false;
  if (value != null && typeof value.toString != 'function') {
    try {
      result = !!(value + '');
    } catch (e) {}
  }
  return result;
}

/**
 * Converts `map` to its key-value pairs.
 *
 * @private
 * @param {Object} map The map to convert.
 * @returns {Array} Returns the key-value pairs.
 */
function mapToArray(map) {
  var index = -1,
      result = Array(map.size);

  map.forEach(function(value, key) {
    result[++index] = [key, value];
  });
  return result;
}

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

/**
 * Converts `set` to an array of its values.
 *
 * @private
 * @param {Object} set The set to convert.
 * @returns {Array} Returns the values.
 */
function setToArray(set) {
  var index = -1,
      result = Array(set.size);

  set.forEach(function(value) {
    result[++index] = value;
  });
  return result;
}

/** Used for built-in method references. */
var arrayProto = Array.prototype,
    funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/** Built-in value references. */
var Buffer = moduleExports ? root.Buffer : undefined,
    Symbol = root.Symbol,
    Uint8Array = root.Uint8Array,
    getPrototype = overArg(Object.getPrototypeOf, Object),
    objectCreate = Object.create,
    propertyIsEnumerable = objectProto.propertyIsEnumerable,
    splice = arrayProto.splice;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetSymbols = Object.getOwnPropertySymbols,
    nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined,
    nativeKeys = overArg(Object.keys, Object);

/* Built-in method references that are verified to be native. */
var DataView = getNative(root, 'DataView'),
    Map = getNative(root, 'Map'),
    Promise = getNative(root, 'Promise'),
    Set = getNative(root, 'Set'),
    WeakMap = getNative(root, 'WeakMap'),
    nativeCreate = getNative(Object, 'create');

/** Used to detect maps, sets, and weakmaps. */
var dataViewCtorString = toSource(DataView),
    mapCtorString = toSource(Map),
    promiseCtorString = toSource(Promise),
    setCtorString = toSource(Set),
    weakMapCtorString = toSource(WeakMap);

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
}

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  return this.has(key) && delete this.__data__[key];
}

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);
}

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
  return this;
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
}

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  return true;
}

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map || ListCache),
    'string': new Hash
  };
}

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  return getMapData(this, key)['delete'](key);
}

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  getMapData(this, key).set(key, value);
  return this;
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Stack(entries) {
  this.__data__ = new ListCache(entries);
}

/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */
function stackClear() {
  this.__data__ = new ListCache;
}

/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function stackDelete(key) {
  return this.__data__['delete'](key);
}

/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function stackGet(key) {
  return this.__data__.get(key);
}

/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function stackHas(key) {
  return this.__data__.has(key);
}

/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */
function stackSet(key, value) {
  var cache = this.__data__;
  if (cache instanceof ListCache) {
    var pairs = cache.__data__;
    if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
      pairs.push([key, value]);
      return this;
    }
    cache = this.__data__ = new MapCache(pairs);
  }
  cache.set(key, value);
  return this;
}

// Add methods to `Stack`.
Stack.prototype.clear = stackClear;
Stack.prototype['delete'] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  // Safari 9 makes `arguments.length` enumerable in strict mode.
  var result = (isArray(value) || isArguments(value))
    ? baseTimes(value.length, String)
    : [];

  var length = result.length,
      skipIndexes = !!length;

  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) &&
        !(skipIndexes && (key == 'length' || isIndex(key, length)))) {
      result.push(key);
    }
  }
  return result;
}

/**
 * Assigns `value` to `key` of `object` if the existing value is not equivalent
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignValue(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
      (value === undefined && !(key in object))) {
    object[key] = value;
  }
}

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

/**
 * The base implementation of `_.assign` without support for multiple sources
 * or `customizer` functions.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @returns {Object} Returns `object`.
 */
function baseAssign(object, source) {
  return object && copyObject(source, keys(source), object);
}

/**
 * The base implementation of `_.clone` and `_.cloneDeep` which tracks
 * traversed objects.
 *
 * @private
 * @param {*} value The value to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @param {boolean} [isFull] Specify a clone including symbols.
 * @param {Function} [customizer] The function to customize cloning.
 * @param {string} [key] The key of `value`.
 * @param {Object} [object] The parent object of `value`.
 * @param {Object} [stack] Tracks traversed objects and their clone counterparts.
 * @returns {*} Returns the cloned value.
 */
function baseClone(value, isDeep, isFull, customizer, key, object, stack) {
  var result;
  if (customizer) {
    result = object ? customizer(value, key, object, stack) : customizer(value);
  }
  if (result !== undefined) {
    return result;
  }
  if (!isObject(value)) {
    return value;
  }
  var isArr = isArray(value);
  if (isArr) {
    result = initCloneArray(value);
    if (!isDeep) {
      return copyArray(value, result);
    }
  } else {
    var tag = getTag(value),
        isFunc = tag == funcTag || tag == genTag;

    if (isBuffer(value)) {
      return cloneBuffer(value, isDeep);
    }
    if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
      if (isHostObject(value)) {
        return object ? value : {};
      }
      result = initCloneObject(isFunc ? {} : value);
      if (!isDeep) {
        return copySymbols(value, baseAssign(result, value));
      }
    } else {
      if (!cloneableTags[tag]) {
        return object ? value : {};
      }
      result = initCloneByTag(value, tag, baseClone, isDeep);
    }
  }
  // Check for circular references and return its corresponding clone.
  stack || (stack = new Stack);
  var stacked = stack.get(value);
  if (stacked) {
    return stacked;
  }
  stack.set(value, result);

  if (!isArr) {
    var props = isFull ? getAllKeys(value) : keys(value);
  }
  arrayEach(props || value, function(subValue, key) {
    if (props) {
      key = subValue;
      subValue = value[key];
    }
    // Recursively populate clone (susceptible to call stack limits).
    assignValue(result, key, baseClone(subValue, isDeep, isFull, customizer, key, value, stack));
  });
  return result;
}

/**
 * The base implementation of `_.create` without support for assigning
 * properties to the created object.
 *
 * @private
 * @param {Object} prototype The object to inherit from.
 * @returns {Object} Returns the new object.
 */
function baseCreate(proto) {
  return isObject(proto) ? objectCreate(proto) : {};
}

/**
 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @param {Function} symbolsFunc The function to get the symbols of `object`.
 * @returns {Array} Returns the array of property names and symbols.
 */
function baseGetAllKeys(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
}

/**
 * The base implementation of `getTag`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  return objectToString.call(value);
}

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = (isFunction(value) || isHostObject(value)) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}

/**
 * Creates a clone of  `buffer`.
 *
 * @private
 * @param {Buffer} buffer The buffer to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Buffer} Returns the cloned buffer.
 */
function cloneBuffer(buffer, isDeep) {
  if (isDeep) {
    return buffer.slice();
  }
  var result = new buffer.constructor(buffer.length);
  buffer.copy(result);
  return result;
}

/**
 * Creates a clone of `arrayBuffer`.
 *
 * @private
 * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
 * @returns {ArrayBuffer} Returns the cloned array buffer.
 */
function cloneArrayBuffer(arrayBuffer) {
  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
  new Uint8Array(result).set(new Uint8Array(arrayBuffer));
  return result;
}

/**
 * Creates a clone of `dataView`.
 *
 * @private
 * @param {Object} dataView The data view to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned data view.
 */
function cloneDataView(dataView, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
  return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
}

/**
 * Creates a clone of `map`.
 *
 * @private
 * @param {Object} map The map to clone.
 * @param {Function} cloneFunc The function to clone values.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned map.
 */
function cloneMap(map, isDeep, cloneFunc) {
  var array = isDeep ? cloneFunc(mapToArray(map), true) : mapToArray(map);
  return arrayReduce(array, addMapEntry, new map.constructor);
}

/**
 * Creates a clone of `regexp`.
 *
 * @private
 * @param {Object} regexp The regexp to clone.
 * @returns {Object} Returns the cloned regexp.
 */
function cloneRegExp(regexp) {
  var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
  result.lastIndex = regexp.lastIndex;
  return result;
}

/**
 * Creates a clone of `set`.
 *
 * @private
 * @param {Object} set The set to clone.
 * @param {Function} cloneFunc The function to clone values.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned set.
 */
function cloneSet(set, isDeep, cloneFunc) {
  var array = isDeep ? cloneFunc(setToArray(set), true) : setToArray(set);
  return arrayReduce(array, addSetEntry, new set.constructor);
}

/**
 * Creates a clone of the `symbol` object.
 *
 * @private
 * @param {Object} symbol The symbol object to clone.
 * @returns {Object} Returns the cloned symbol object.
 */
function cloneSymbol(symbol) {
  return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
}

/**
 * Creates a clone of `typedArray`.
 *
 * @private
 * @param {Object} typedArray The typed array to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned typed array.
 */
function cloneTypedArray(typedArray, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
}

/**
 * Copies the values of `source` to `array`.
 *
 * @private
 * @param {Array} source The array to copy values from.
 * @param {Array} [array=[]] The array to copy values to.
 * @returns {Array} Returns `array`.
 */
function copyArray(source, array) {
  var index = -1,
      length = source.length;

  array || (array = Array(length));
  while (++index < length) {
    array[index] = source[index];
  }
  return array;
}

/**
 * Copies properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy properties from.
 * @param {Array} props The property identifiers to copy.
 * @param {Object} [object={}] The object to copy properties to.
 * @param {Function} [customizer] The function to customize copied values.
 * @returns {Object} Returns `object`.
 */
function copyObject(source, props, object, customizer) {
  object || (object = {});

  var index = -1,
      length = props.length;

  while (++index < length) {
    var key = props[index];

    var newValue = customizer
      ? customizer(object[key], source[key], key, object, source)
      : undefined;

    assignValue(object, key, newValue === undefined ? source[key] : newValue);
  }
  return object;
}

/**
 * Copies own symbol properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy symbols from.
 * @param {Object} [object={}] The object to copy symbols to.
 * @returns {Object} Returns `object`.
 */
function copySymbols(source, object) {
  return copyObject(source, getSymbols(source), object);
}

/**
 * Creates an array of own enumerable property names and symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeys(object) {
  return baseGetAllKeys(object, keys, getSymbols);
}

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

/**
 * Creates an array of the own enumerable symbol properties of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbols = nativeGetSymbols ? overArg(nativeGetSymbols, Object) : stubArray;

/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
var getTag = baseGetTag;

// Fallback for data views, maps, sets, and weak maps in IE 11,
// for data views in Edge < 14, and promises in Node.js.
if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
    (Map && getTag(new Map) != mapTag) ||
    (Promise && getTag(Promise.resolve()) != promiseTag) ||
    (Set && getTag(new Set) != setTag) ||
    (WeakMap && getTag(new WeakMap) != weakMapTag)) {
  getTag = function(value) {
    var result = objectToString.call(value),
        Ctor = result == objectTag ? value.constructor : undefined,
        ctorString = Ctor ? toSource(Ctor) : undefined;

    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString: return dataViewTag;
        case mapCtorString: return mapTag;
        case promiseCtorString: return promiseTag;
        case setCtorString: return setTag;
        case weakMapCtorString: return weakMapTag;
      }
    }
    return result;
  };
}

/**
 * Initializes an array clone.
 *
 * @private
 * @param {Array} array The array to clone.
 * @returns {Array} Returns the initialized clone.
 */
function initCloneArray(array) {
  var length = array.length,
      result = array.constructor(length);

  // Add properties assigned by `RegExp#exec`.
  if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
    result.index = array.index;
    result.input = array.input;
  }
  return result;
}

/**
 * Initializes an object clone.
 *
 * @private
 * @param {Object} object The object to clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneObject(object) {
  return (typeof object.constructor == 'function' && !isPrototype(object))
    ? baseCreate(getPrototype(object))
    : {};
}

/**
 * Initializes an object clone based on its `toStringTag`.
 *
 * **Note:** This function only supports cloning values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} object The object to clone.
 * @param {string} tag The `toStringTag` of the object to clone.
 * @param {Function} cloneFunc The function to clone values.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneByTag(object, tag, cloneFunc, isDeep) {
  var Ctor = object.constructor;
  switch (tag) {
    case arrayBufferTag:
      return cloneArrayBuffer(object);

    case boolTag:
    case dateTag:
      return new Ctor(+object);

    case dataViewTag:
      return cloneDataView(object, isDeep);

    case float32Tag: case float64Tag:
    case int8Tag: case int16Tag: case int32Tag:
    case uint8Tag: case uint8ClampedTag: case uint16Tag: case uint32Tag:
      return cloneTypedArray(object, isDeep);

    case mapTag:
      return cloneMap(object, isDeep, cloneFunc);

    case numberTag:
    case stringTag:
      return new Ctor(object);

    case regexpTag:
      return cloneRegExp(object);

    case setTag:
      return cloneSet(object, isDeep, cloneFunc);

    case symbolTag:
      return cloneSymbol(object);
  }
}

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length &&
    (typeof value == 'number' || reIsUint.test(value)) &&
    (value > -1 && value % 1 == 0 && value < length);
}

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

  return value === proto;
}

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to process.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

/**
 * Creates a shallow clone of `value`.
 *
 * **Note:** This method is loosely based on the
 * [structured clone algorithm](https://mdn.io/Structured_clone_algorithm)
 * and supports cloning arrays, array buffers, booleans, date objects, maps,
 * numbers, `Object` objects, regexes, sets, strings, symbols, and typed
 * arrays. The own enumerable properties of `arguments` objects are cloned
 * as plain objects. An empty object is returned for uncloneable values such
 * as error objects, functions, DOM nodes, and WeakMaps.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to clone.
 * @returns {*} Returns the cloned value.
 * @see _.cloneDeep
 * @example
 *
 * var objects = [{ 'a': 1 }, { 'b': 2 }];
 *
 * var shallow = _.clone(objects);
 * console.log(shallow[0] === objects[0]);
 * // => true
 */
function clone(value) {
  return baseClone(value, false, true);
}

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
function isArguments(value) {
  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
    (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
}

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */
function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}

/**
 * Checks if `value` is a buffer.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * _.isBuffer(new Buffer(2));
 * // => true
 *
 * _.isBuffer(new Uint8Array(2));
 * // => false
 */
var isBuffer = nativeIsBuffer || stubFalse;

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 8-9 which returns 'object' for typed array and other constructors.
  var tag = isObject(value) ? objectToString.call(value) : '';
  return tag == funcTag || tag == genTag;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}

/**
 * This method returns a new empty array.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {Array} Returns the new empty array.
 * @example
 *
 * var arrays = _.times(2, _.stubArray);
 *
 * console.log(arrays);
 * // => [[], []]
 *
 * console.log(arrays[0] === arrays[1]);
 * // => false
 */
function stubArray() {
  return [];
}

/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */
function stubFalse() {
  return false;
}

module.exports = clone;
});

var pluralize = createCommonjsModule(function (module, exports) {
/* global define */

(function (root, pluralize) {
  /* istanbul ignore else */
  if (typeof commonjsRequire === 'function' && 'object' === 'object' && 'object' === 'object') {
    // Node.
    module.exports = pluralize();
  } else {
    // Browser global.
    root.pluralize = pluralize();
  }
})(commonjsGlobal, function () {
  // Rule storage - pluralize and singularize need to be run sequentially,
  // while other rules can be optimized using an object for instant lookups.
  var pluralRules = [];
  var singularRules = [];
  var uncountables = {};
  var irregularPlurals = {};
  var irregularSingles = {};

  /**
   * Sanitize a pluralization rule to a usable regular expression.
   *
   * @param  {(RegExp|string)} rule
   * @return {RegExp}
   */
  function sanitizeRule (rule) {
    if (typeof rule === 'string') {
      return new RegExp('^' + rule + '$', 'i');
    }

    return rule;
  }

  /**
   * Pass in a word token to produce a function that can replicate the case on
   * another word.
   *
   * @param  {string}   word
   * @param  {string}   token
   * @return {Function}
   */
  function restoreCase (word, token) {
    // Tokens are an exact match.
    if (word === token) return token;

    // Upper cased words. E.g. "HELLO".
    if (word === word.toUpperCase()) return token.toUpperCase();

    // Title cased words. E.g. "Title".
    if (word[0] === word[0].toUpperCase()) {
      return token.charAt(0).toUpperCase() + token.substr(1).toLowerCase();
    }

    // Lower cased words. E.g. "test".
    return token.toLowerCase();
  }

  /**
   * Interpolate a regexp string.
   *
   * @param  {string} str
   * @param  {Array}  args
   * @return {string}
   */
  function interpolate (str, args) {
    return str.replace(/\$(\d{1,2})/g, function (match, index) {
      return args[index] || '';
    });
  }

  /**
   * Replace a word using a rule.
   *
   * @param  {string} word
   * @param  {Array}  rule
   * @return {string}
   */
  function replace (word, rule) {
    return word.replace(rule[0], function (match, index) {
      var result = interpolate(rule[1], arguments);

      if (match === '') {
        return restoreCase(word[index - 1], result);
      }

      return restoreCase(match, result);
    });
  }

  /**
   * Sanitize a word by passing in the word and sanitization rules.
   *
   * @param  {string}   token
   * @param  {string}   word
   * @param  {Array}    rules
   * @return {string}
   */
  function sanitizeWord (token, word, rules) {
    // Empty string or doesn't need fixing.
    if (!token.length || uncountables.hasOwnProperty(token)) {
      return word;
    }

    var len = rules.length;

    // Iterate over the sanitization rules and use the first one to match.
    while (len--) {
      var rule = rules[len];

      if (rule[0].test(word)) return replace(word, rule);
    }

    return word;
  }

  /**
   * Replace a word with the updated word.
   *
   * @param  {Object}   replaceMap
   * @param  {Object}   keepMap
   * @param  {Array}    rules
   * @return {Function}
   */
  function replaceWord (replaceMap, keepMap, rules) {
    return function (word) {
      // Get the correct token and case restoration functions.
      var token = word.toLowerCase();

      // Check against the keep object map.
      if (keepMap.hasOwnProperty(token)) {
        return restoreCase(word, token);
      }

      // Check against the replacement map for a direct word replacement.
      if (replaceMap.hasOwnProperty(token)) {
        return restoreCase(word, replaceMap[token]);
      }

      // Run all the rules against the word.
      return sanitizeWord(token, word, rules);
    };
  }

  /**
   * Check if a word is part of the map.
   */
  function checkWord (replaceMap, keepMap, rules, bool) {
    return function (word) {
      var token = word.toLowerCase();

      if (keepMap.hasOwnProperty(token)) return true;
      if (replaceMap.hasOwnProperty(token)) return false;

      return sanitizeWord(token, token, rules) === token;
    };
  }

  /**
   * Pluralize or singularize a word based on the passed in count.
   *
   * @param  {string}  word
   * @param  {number}  count
   * @param  {boolean} inclusive
   * @return {string}
   */
  function pluralize (word, count, inclusive) {
    var pluralized = count === 1
      ? pluralize.singular(word) : pluralize.plural(word);

    return (inclusive ? count + ' ' : '') + pluralized;
  }

  /**
   * Pluralize a word.
   *
   * @type {Function}
   */
  pluralize.plural = replaceWord(
    irregularSingles, irregularPlurals, pluralRules
  );

  /**
   * Check if a word is plural.
   *
   * @type {Function}
   */
  pluralize.isPlural = checkWord(
    irregularSingles, irregularPlurals, pluralRules
  );

  /**
   * Singularize a word.
   *
   * @type {Function}
   */
  pluralize.singular = replaceWord(
    irregularPlurals, irregularSingles, singularRules
  );

  /**
   * Check if a word is singular.
   *
   * @type {Function}
   */
  pluralize.isSingular = checkWord(
    irregularPlurals, irregularSingles, singularRules
  );

  /**
   * Add a pluralization rule to the collection.
   *
   * @param {(string|RegExp)} rule
   * @param {string}          replacement
   */
  pluralize.addPluralRule = function (rule, replacement) {
    pluralRules.push([sanitizeRule(rule), replacement]);
  };

  /**
   * Add a singularization rule to the collection.
   *
   * @param {(string|RegExp)} rule
   * @param {string}          replacement
   */
  pluralize.addSingularRule = function (rule, replacement) {
    singularRules.push([sanitizeRule(rule), replacement]);
  };

  /**
   * Add an uncountable word rule.
   *
   * @param {(string|RegExp)} word
   */
  pluralize.addUncountableRule = function (word) {
    if (typeof word === 'string') {
      uncountables[word.toLowerCase()] = true;
      return;
    }

    // Set singular and plural references for the word.
    pluralize.addPluralRule(word, '$0');
    pluralize.addSingularRule(word, '$0');
  };

  /**
   * Add an irregular word definition.
   *
   * @param {string} single
   * @param {string} plural
   */
  pluralize.addIrregularRule = function (single, plural) {
    plural = plural.toLowerCase();
    single = single.toLowerCase();

    irregularSingles[single] = plural;
    irregularPlurals[plural] = single;
  };

  /**
   * Irregular rules.
   */
  [
    // Pronouns.
    ['I', 'we'],
    ['me', 'us'],
    ['he', 'they'],
    ['she', 'they'],
    ['them', 'them'],
    ['myself', 'ourselves'],
    ['yourself', 'yourselves'],
    ['itself', 'themselves'],
    ['herself', 'themselves'],
    ['himself', 'themselves'],
    ['themself', 'themselves'],
    ['is', 'are'],
    ['was', 'were'],
    ['has', 'have'],
    ['this', 'these'],
    ['that', 'those'],
    // Words ending in with a consonant and `o`.
    ['echo', 'echoes'],
    ['dingo', 'dingoes'],
    ['volcano', 'volcanoes'],
    ['tornado', 'tornadoes'],
    ['torpedo', 'torpedoes'],
    // Ends with `us`.
    ['genus', 'genera'],
    ['viscus', 'viscera'],
    // Ends with `ma`.
    ['stigma', 'stigmata'],
    ['stoma', 'stomata'],
    ['dogma', 'dogmata'],
    ['lemma', 'lemmata'],
    ['schema', 'schemata'],
    ['anathema', 'anathemata'],
    // Other irregular rules.
    ['ox', 'oxen'],
    ['axe', 'axes'],
    ['die', 'dice'],
    ['yes', 'yeses'],
    ['foot', 'feet'],
    ['eave', 'eaves'],
    ['goose', 'geese'],
    ['tooth', 'teeth'],
    ['quiz', 'quizzes'],
    ['human', 'humans'],
    ['proof', 'proofs'],
    ['carve', 'carves'],
    ['valve', 'valves'],
    ['looey', 'looies'],
    ['thief', 'thieves'],
    ['groove', 'grooves'],
    ['pickaxe', 'pickaxes'],
    ['whiskey', 'whiskies']
  ].forEach(function (rule) {
    return pluralize.addIrregularRule(rule[0], rule[1]);
  });

  /**
   * Pluralization rules.
   */
  [
    [/s?$/i, 's'],
    [/[^\u0000-\u007F]$/i, '$0'],
    [/([^aeiou]ese)$/i, '$1'],
    [/(ax|test)is$/i, '$1es'],
    [/(alias|[^aou]us|tlas|gas|ris)$/i, '$1es'],
    [/(e[mn]u)s?$/i, '$1s'],
    [/([^l]ias|[aeiou]las|[emjzr]as|[iu]am)$/i, '$1'],
    [/(alumn|syllab|octop|vir|radi|nucle|fung|cact|stimul|termin|bacill|foc|uter|loc|strat)(?:us|i)$/i, '$1i'],
    [/(alumn|alg|vertebr)(?:a|ae)$/i, '$1ae'],
    [/(seraph|cherub)(?:im)?$/i, '$1im'],
    [/(her|at|gr)o$/i, '$1oes'],
    [/(agend|addend|millenni|dat|extrem|bacteri|desiderat|strat|candelabr|errat|ov|symposi|curricul|automat|quor)(?:a|um)$/i, '$1a'],
    [/(apheli|hyperbat|periheli|asyndet|noumen|phenomen|criteri|organ|prolegomen|hedr|automat)(?:a|on)$/i, '$1a'],
    [/sis$/i, 'ses'],
    [/(?:(kni|wi|li)fe|(ar|l|ea|eo|oa|hoo)f)$/i, '$1$2ves'],
    [/([^aeiouy]|qu)y$/i, '$1ies'],
    [/([^ch][ieo][ln])ey$/i, '$1ies'],
    [/(x|ch|ss|sh|zz)$/i, '$1es'],
    [/(matr|cod|mur|sil|vert|ind|append)(?:ix|ex)$/i, '$1ices'],
    [/(m|l)(?:ice|ouse)$/i, '$1ice'],
    [/(pe)(?:rson|ople)$/i, '$1ople'],
    [/(child)(?:ren)?$/i, '$1ren'],
    [/eaux$/i, '$0'],
    [/m[ae]n$/i, 'men'],
    ['thou', 'you']
  ].forEach(function (rule) {
    return pluralize.addPluralRule(rule[0], rule[1]);
  });

  /**
   * Singularization rules.
   */
  [
    [/s$/i, ''],
    [/(ss)$/i, '$1'],
    [/(wi|kni|(?:after|half|high|low|mid|non|night|[^\w]|^)li)ves$/i, '$1fe'],
    [/(ar|(?:wo|[ae])l|[eo][ao])ves$/i, '$1f'],
    [/ies$/i, 'y'],
    [/\b([pl]|zomb|(?:neck|cross)?t|coll|faer|food|gen|goon|group|lass|talk|goal|cut)ies$/i, '$1ie'],
    [/\b(mon|smil)ies$/i, '$1ey'],
    [/(m|l)ice$/i, '$1ouse'],
    [/(seraph|cherub)im$/i, '$1'],
    [/(x|ch|ss|sh|zz|tto|go|cho|alias|[^aou]us|tlas|gas|(?:her|at|gr)o|ris)(?:es)?$/i, '$1'],
    [/(analy|ba|diagno|parenthe|progno|synop|the|empha|cri)(?:sis|ses)$/i, '$1sis'],
    [/(movie|twelve|abuse|e[mn]u)s$/i, '$1'],
    [/(test)(?:is|es)$/i, '$1is'],
    [/(alumn|syllab|octop|vir|radi|nucle|fung|cact|stimul|termin|bacill|foc|uter|loc|strat)(?:us|i)$/i, '$1us'],
    [/(agend|addend|millenni|dat|extrem|bacteri|desiderat|strat|candelabr|errat|ov|symposi|curricul|quor)a$/i, '$1um'],
    [/(apheli|hyperbat|periheli|asyndet|noumen|phenomen|criteri|organ|prolegomen|hedr|automat)a$/i, '$1on'],
    [/(alumn|alg|vertebr)ae$/i, '$1a'],
    [/(cod|mur|sil|vert|ind)ices$/i, '$1ex'],
    [/(matr|append)ices$/i, '$1ix'],
    [/(pe)(rson|ople)$/i, '$1rson'],
    [/(child)ren$/i, '$1'],
    [/(eau)x?$/i, '$1'],
    [/men$/i, 'man']
  ].forEach(function (rule) {
    return pluralize.addSingularRule(rule[0], rule[1]);
  });

  /**
   * Uncountable rules.
   */
  [
    // Singular words with no plurals.
    'adulthood',
    'advice',
    'agenda',
    'aid',
    'alcohol',
    'ammo',
    'anime',
    'athletics',
    'audio',
    'bison',
    'blood',
    'bream',
    'buffalo',
    'butter',
    'carp',
    'cash',
    'chassis',
    'chess',
    'clothing',
    'cod',
    'commerce',
    'cooperation',
    'corps',
    'debris',
    'diabetes',
    'digestion',
    'elk',
    'energy',
    'equipment',
    'excretion',
    'expertise',
    'flounder',
    'fun',
    'gallows',
    'garbage',
    'graffiti',
    'headquarters',
    'health',
    'herpes',
    'highjinks',
    'homework',
    'housework',
    'information',
    'jeans',
    'justice',
    'kudos',
    'labour',
    'literature',
    'machinery',
    'mackerel',
    'mail',
    'media',
    'mews',
    'moose',
    'music',
    'manga',
    'news',
    'pike',
    'plankton',
    'pliers',
    'pollution',
    'premises',
    'rain',
    'research',
    'rice',
    'salmon',
    'scissors',
    'series',
    'sewage',
    'shambles',
    'shrimp',
    'species',
    'staff',
    'swine',
    'tennis',
    'traffic',
    'transporation',
    'trout',
    'tuna',
    'wealth',
    'welfare',
    'whiting',
    'wildebeest',
    'wildlife',
    'you',
    // Regexes.
    /[^aeiou]ese$/i, // "chinese", "japanese"
    /deer$/i, // "deer", "reindeer"
    /fish$/i, // "fish", "blowfish", "angelfish"
    /measles$/i,
    /o[iu]s$/i, // "carnivorous"
    /pox$/i, // "chickpox", "smallpox"
    /sheep$/i
  ].forEach(pluralize.addUncountableRule);

  return pluralize;
});
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

var pluralize$1 = pluralize.plural;
var singularize = pluralize.singular;
/**
 * Capitalizes the first letter of the given string.
 *
 * @param {string} input
 * @returns {string}
 */
function upcaseFirstLetter(input) {
    return input.charAt(0).toUpperCase() + input.slice(1);
}
/**
 * Down cases the first letter of the given string.
 *
 * @param {string} input
 * @returns {string}
 */
function downcaseFirstLetter(input) {
    return input.charAt(0).toLowerCase() + input.slice(1);
}
/**
 * Takes a string with a graphql query and formats it. Useful for debug output and the tests.
 * @param {string} query
 * @returns {string}
 */
function prettify(query) {
    return printer_1(parseQuery(query));
}
/**
 * Returns a parsed query as GraphQL AST DocumentNode.
 *
 * @param {string | DocumentNode} query - Query as string or GraphQL AST DocumentNode.
 *
 * @returns {DocumentNode} Query as GraphQL AST DocumentNode.
 */
function parseQuery(query) {
    return typeof query === "string" ? parser_1(query) : query;
}
/**
 * @param {DocumentNode} query - The GraphQL AST DocumentNode.
 *
 * @returns {string} the GraphQL query within a DocumentNode as a plain string.
 */
function graphQlDocumentToString(query) {
    return query.loc.source.body;
}
/**
 * Tells if a object is just a simple object.
 *
 * @param {any} obj - Value to check.
 */
function isPlainObject(obj) {
    // Basic check for Type object that's not null
    return obj !== null && !(obj instanceof Array) && (typeof obj === "undefined" ? "undefined" : _typeof(obj)) === "object";
}
/**
 * Creates an object composed of the picked `object` properties.
 * @param {object} object - Object.
 * @param {array} props - Properties to pick.
 */
function pick(object, props) {
    if (!object) {
        return {};
    }
    var index = -1;
    var length = props.length;
    var result = {};
    while (++index < length) {
        var prop = props[index];
        result[prop] = object[prop];
    }
    return result;
}
function isEqual(a, b) {
    // Couldn' find a simpler working implementation yet.
    return lodash_isequal(a, b);
}
function clone(input) {
    // Couldn' find a simpler working implementation yet.
    return lodash_clone(input);
}
function takeWhile(array, predicate) {
    var index = -1;
    while (++index < array.length && predicate(array[index], index, array)) {
        // just increase index
    }
    return array.slice(0, index);
}
function removeSymbols(input) {
    return JSON.parse(JSON.stringify(input));
}

/**
 * Vuex-ORM-Apollo Debug Logger.
 * Wraps console and only logs if enabled.
 *
 * Also contains some methods to format graphql queries for the output
 */
var Logger = /** @class */function () {
    /**
     * @constructor
     * @param {boolean} enabled Tells if any logging should happen
     */
    function Logger(enabled) {
        /**
         * Fancy Vuex-ORM-Apollo prefix for all log messages.
         * @type {string[]}
         */
        this.PREFIX = ["%c Vuex-ORM: GraphQL Plugin %c", "background: #35495e; padding: 1px 0; border-radius: 3px; color: #eee;", "background: transparent;"];
        this.enabled = enabled;
        this.log("Logging is enabled.");
    }
    /**
     * Wraps console.group. In TEST env console.log is used instead because console.group doesn't work on CLI.
     * If available console.groupCollapsed will be used instead.
     * @param {Array<any>} messages
     */
    Logger.prototype.group = function () {
        var messages = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            messages[_i] = arguments[_i];
        }
        if (this.enabled) {
            if (console.groupCollapsed) {
                console.groupCollapsed.apply(console, this.PREFIX.concat(messages));
            } else {
                console.log.apply(console, this.PREFIX.concat(messages));
            }
        }
    };
    /**
     * Wrapper for console.groupEnd. In TEST env nothing happens because console.groupEnd doesn't work on CLI.
     */
    Logger.prototype.groupEnd = function () {
        if (this.enabled && console.groupEnd) console.groupEnd();
    };
    /**
     * Wrapper for console.log.
     * @param {Array<any>} messages
     */
    Logger.prototype.log = function () {
        var messages = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            messages[_i] = arguments[_i];
        }
        if (this.enabled) {
            console.log.apply(console, this.PREFIX.concat(messages));
        }
    };
    /**
     * Wrapper for console.warn.
     * @param {Array<any>} messages
     */
    Logger.prototype.warn = function () {
        var messages = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            messages[_i] = arguments[_i];
        }
        if (this.enabled) {
            console.warn.apply(console, this.PREFIX.concat(messages));
        }
    };
    /**
     * Logs a graphql query in a readable format and with all information like fetch policy and variables.
     * @param {string | DocumentNode} query
     * @param {Arguments} variables
     * @param {FetchPolicy} fetchPolicy
     */
    Logger.prototype.logQuery = function (query, variables, fetchPolicy) {
        if (this.enabled) {
            try {
                var prettified = "";
                if (isPlainObject(query) && query.loc) {
                    prettified = prettify(query.loc.source.body);
                } else {
                    prettified = prettify(query);
                }
                this.group("Sending query:", prettified.split("\n")[1].replace("{", "").trim());
                console.log(prettified);
                if (variables) console.log("VARIABLES:", variables);
                if (fetchPolicy) console.log("FETCH POLICY:", fetchPolicy);
                this.groupEnd();
            } catch (e) {
                console.error("[Vuex-ORM-Apollo] There is a syntax error in the query!", e, query);
            }
        }
    };
    return Logger;
}();
//# sourceMappingURL=logger.js.map

/**
 * Wrapper around a Vuex-ORM model with some useful methods.
 *
 * Also provides a mock system, to define mocking responses for actions.
 */
var Model = /** @class */function () {
    /**
     * @constructor
     * @param {Model} baseModel The original Vuex-ORM model
     */
    function Model(baseModel) {
        var _this = this;
        /**
         * The fields of the model
         * @type {Map<string, Field>}
         */
        this.fields = new Map();
        /**
         * Container for the mocks.
         * @type {Object}
         */
        this.mocks = {};
        this.baseModel = baseModel;
        // Generate name variants
        this.singularName = singularize(this.baseModel.entity);
        this.pluralName = pluralize$1(this.baseModel.entity);
        // Cache the fields of the model in this.fields
        var fields = this.baseModel.fields();
        Object.keys(fields).forEach(function (name) {
            _this.fields.set(name, fields[name]);
        });
    }
    /**
     * Tells if a field is a numeric field.
     *
     * @param {Field | undefined} field
     * @returns {boolean}
     */
    Model.isFieldNumber = function (field) {
        if (!field) return false;
        var context = Context.getInstance();
        return field instanceof context.components.Number || field instanceof context.components.Increment;
    };
    /**
     * Tells if a field is a attribute (and thus not a relation)
     * @param {Field} field
     * @returns {boolean}
     */
    Model.isFieldAttribute = function (field) {
        var context = Context.getInstance();
        return field instanceof context.components.Increment || field instanceof context.components.Attr || field instanceof context.components.String || field instanceof context.components.Number || field instanceof context.components.Boolean;
    };
    /**
     * Tells if a field which represents a relation is a connection (multiple).
     * @param {Field} field
     * @returns {boolean}
     */
    Model.isConnection = function (field) {
        var context = Context.getInstance();
        return !(field instanceof context.components.BelongsTo || field instanceof context.components.HasOne || field instanceof context.components.MorphTo || field instanceof context.components.MorphOne);
    };
    /**
     * Adds $isPersisted and other meta fields to the model by overwriting the fields() method.
     * @todo is this a good way to add fields?
     * @param {Model} model
     */
    Model.augment = function (model) {
        var originalFieldGenerator = model.baseModel.fields.bind(model.baseModel);
        model.baseModel.fields = function () {
            var originalFields = originalFieldGenerator();
            originalFields["$isPersisted"] = model.baseModel.boolean(false);
            return originalFields;
        };
    };
    /**
     * Returns the related model for a relation.
     * @param {Field|undefined} relation Relation field.
     * @returns {Model|null}
     */
    Model.getRelatedModel = function (relation) {
        if (relation === undefined) return null;
        var context = Context.getInstance();
        if (relation instanceof context.components.BelongsToMany || relation instanceof context.components.HasMany || relation instanceof context.components.HasManyThrough || relation instanceof context.components.MorphedByMany || relation instanceof context.components.MorphMany || relation instanceof context.components.MorphOne || relation instanceof context.components.MorphToMany || relation instanceof context.components.HasOne) {
            return context.getModel(relation.related.entity, true);
        } else if (relation instanceof context.components.BelongsTo || relation instanceof context.components.HasManyBy) {
            return context.getModel(relation.parent.entity, true);
        } else if (relation instanceof context.components.MorphTo) {
            return context.getModel(relation.type, true);
        } else {
            console.warn("Failed relation", typeof relation === "undefined" ? "undefined" : _typeof(relation), relation);
            throw new Error("Can't find related model for relation of type " + (typeof relation === "undefined" ? "undefined" : _typeof(relation)) + "!");
        }
    };
    /**
     * Returns all fields which should be included in a graphql query: All attributes which are not included in the
     * skipFields array or start with $.
     * @returns {Array<string>} field names which should be queried
     */
    Model.prototype.getQueryFields = function () {
        var _this = this;
        var fields = [];
        this.fields.forEach(function (field, name) {
            if (Model.isFieldAttribute(field) && !_this.skipField(name)) {
                fields.push(name);
            }
        });
        return fields;
    };
    /**
     * Tells if a field should be ignored. This is true for fields that start with a `$` or is it is within the skipField
     * property or is the foreignKey of a belongsTo/hasOne relation.
     *
     * @param {string} field
     * @returns {boolean}
     */
    Model.prototype.skipField = function (field) {
        if (field.startsWith("$")) return true;
        if (this.baseModel.skipFields && this.baseModel.skipFields.indexOf(field) >= 0) return true;
        var context = Context.getInstance();
        var shouldSkipField = false;
        this.getRelations().forEach(function (relation) {
            if ((relation instanceof context.components.BelongsTo || relation instanceof context.components.HasOne) && relation.foreignKey === field) {
                shouldSkipField = true;
                return false;
            }
            return true;
        });
        return shouldSkipField;
    };
    /**
     * @returns {Map<string, Relation>} all relations of the model.
     */
    Model.prototype.getRelations = function () {
        var relations = new Map();
        this.fields.forEach(function (field, name) {
            if (!Model.isFieldAttribute(field)) {
                relations.set(name, field);
            }
        });
        return relations;
    };
    /**
     * This accepts a field like `subjectType` and checks if this is just randomly named `...Type` or it is part
     * of a polymorphic relation.
     * @param {string} name
     * @returns {boolean}
     */
    Model.prototype.isTypeFieldOfPolymorphicRelation = function (name) {
        var _this = this;
        var context = Context.getInstance();
        var found = false;
        context.models.forEach(function (model) {
            if (found) return false;
            model.getRelations().forEach(function (relation) {
                if (relation instanceof context.components.MorphMany || relation instanceof context.components.MorphedByMany || relation instanceof context.components.MorphOne || relation instanceof context.components.MorphTo || relation instanceof context.components.MorphToMany) {
                    var related = relation.related;
                    if (relation.type === name && related && related.entity === _this.baseModel.entity) {
                        found = true;
                        return false; // break
                    }
                }
                return true;
            });
            return true;
        });
        return found;
    };
    /**
     * Returns a record of this model with the given ID.
     * @param {number} id
     * @returns {any}
     */
    Model.prototype.getRecordWithId = function (id) {
        return this.baseModel.query().withAllRecursive().where("id", id).first();
    };
    /**
     * Determines if we should eager load (means: add as a field in the graphql query) a related entity. belongsTo,
     * hasOne and morphOne related entities are always eager loaded. Others can be added to the `eagerLoad` array
     * or `eagerSync` of the model.
     *
     * @param {string} fieldName Name of the field
     * @param {Relation} relation Relation field
     * @param {Model} relatedModel Related model
     * @returns {boolean}
     */
    Model.prototype.shouldEagerLoadRelation = function (fieldName, relation, relatedModel) {
        var context = Context.getInstance();
        // HasOne, BelongsTo and MorphOne are always eager loaded
        if (relation instanceof context.components.HasOne || relation instanceof context.components.BelongsTo || relation instanceof context.components.MorphOne) {
            return true;
        }
        // Create a list of all relations that have to be eager loaded
        var eagerLoadList = this.baseModel.eagerLoad || [];
        Array.prototype.push.apply(eagerLoadList, this.baseModel.eagerSync || []);
        // Check if the name of the related model or the fieldName is included in the eagerLoadList.
        return eagerLoadList.find(function (n) {
            return n === relatedModel.singularName || n === relatedModel.pluralName || n === fieldName;
        }) !== undefined;
    };
    /**
     * Determines if we should eager save (means: add as a field in the graphql mutation) a related entity. belongsTo
     * related entities are always eager saved. Others can be added to the `eagerSave` or `eagerSync` array of the model.
     *
     * @param {string} fieldName Name of the field
     * @param {Relation} relation Relation field
     * @param {Model} relatedModel Related model
     * @returns {boolean}
     */
    Model.prototype.shouldEagerSaveRelation = function (fieldName, relation, relatedModel) {
        var context = Context.getInstance();
        // BelongsTo is always eager saved
        if (relation instanceof context.components.BelongsTo) {
            return true;
        }
        // Create a list of all relations that have to be eager saved
        var eagerSaveList = this.baseModel.eagerSave || [];
        Array.prototype.push.apply(eagerSaveList, this.baseModel.eagerSync || []);
        // Check if the name of the related model or the fieldName is included in the eagerSaveList.
        return eagerSaveList.find(function (n) {
            return n === relatedModel.singularName || n === relatedModel.pluralName || n === fieldName;
        }) !== undefined;
    };
    /**
     * Adds a mock.
     *
     * @param {Mock} mock - Mock config.
     * @returns {boolean}
     */
    Model.prototype.$addMock = function (mock) {
        if (this.$findMock(mock.action, mock.options)) return false;
        if (!this.mocks[mock.action]) this.mocks[mock.action] = [];
        this.mocks[mock.action].push(mock);
        return true;
    };
    /**
     * Finds a mock for the given action and options.
     *
     * @param {string} action - Name of the action like 'fetch'.
     * @param {MockOptions} options - MockOptions like { variables: { id: 42 } }.
     * @returns {Mock | null} null when no mock was found.
     */
    Model.prototype.$findMock = function (action, options) {
        if (this.mocks[action]) {
            return this.mocks[action].find(function (m) {
                if (!m.options || !options) return true;
                var relevantOptions = pick(options, Object.keys(m.options));
                return isEqual(relevantOptions, m.options || {});
            }) || null;
        }
        return null;
    };
    /**
     * Hook to be called by all actions in order to get the mock returnValue.
     *
     * @param {string} action - Name of the action like 'fetch'.
     * @param {MockOptions} options - MockOptions.
     * @returns {any} null when no mock was found.
     */
    Model.prototype.$mockHook = function (action, options) {
        var _a;
        var returnValue = null;
        var mock = this.$findMock(action, options);
        if (mock) {
            if (mock.returnValue instanceof Function) {
                returnValue = mock.returnValue();
            } else {
                returnValue = mock.returnValue || null;
            }
        }
        if (returnValue) {
            if (returnValue instanceof Array) {
                returnValue.forEach(function (r) {
                    return r.$isPersisted = true;
                });
            } else {
                returnValue.$isPersisted = true;
            }
            return _a = {}, _a[this.pluralName] = returnValue, _a;
        }
        return null;
    };
    return Model;
}();

var fastJsonStableStringify = function (data, opts) {
    if (!opts) opts = {};
    if (typeof opts === 'function') opts = { cmp: opts };
    var cycles = (typeof opts.cycles === 'boolean') ? opts.cycles : false;

    var cmp = opts.cmp && (function (f) {
        return function (node) {
            return function (a, b) {
                var aobj = { key: a, value: node[a] };
                var bobj = { key: b, value: node[b] };
                return f(aobj, bobj);
            };
        };
    })(opts.cmp);

    var seen = [];
    return (function stringify (node) {
        if (node && node.toJSON && typeof node.toJSON === 'function') {
            node = node.toJSON();
        }

        if (node === undefined) return;
        if (typeof node == 'number') return isFinite(node) ? '' + node : 'null';
        if (typeof node !== 'object') return JSON.stringify(node);

        var i, out;
        if (Array.isArray(node)) {
            out = '[';
            for (i = 0; i < node.length; i++) {
                if (i) out += ',';
                out += stringify(node[i]) || 'null';
            }
            return out + ']';
        }

        if (node === null) return 'null';

        if (seen.indexOf(node) !== -1) {
            if (cycles) return JSON.stringify('__cycle__');
            throw new TypeError('Converting circular structure to JSON');
        }

        var seenIndex = seen.push(node) - 1;
        var keys = Object.keys(node).sort(cmp && cmp(node));
        out = '';
        for (i = 0; i < keys.length; i++) {
            var key = keys[i];
            var value = stringify(node[key]);

            if (!value) continue;
            if (out) out += ',';
            out += JSON.stringify(key) + ':' + value;
        }
        seen.splice(seenIndex, 1);
        return '{' + out + '}';
    })(data);
};

var __assign$1 = (undefined && undefined.__assign) || function () {
    __assign$1 = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign$1.apply(this, arguments);
};
function isStringValue(value) {
    return value.kind === 'StringValue';
}
function isBooleanValue(value) {
    return value.kind === 'BooleanValue';
}
function isIntValue(value) {
    return value.kind === 'IntValue';
}
function isFloatValue(value) {
    return value.kind === 'FloatValue';
}
function isVariable(value) {
    return value.kind === 'Variable';
}
function isObjectValue(value) {
    return value.kind === 'ObjectValue';
}
function isListValue(value) {
    return value.kind === 'ListValue';
}
function isEnumValue(value) {
    return value.kind === 'EnumValue';
}
function isNullValue(value) {
    return value.kind === 'NullValue';
}
function valueToObjectRepresentation(argObj, name, value, variables) {
    if (isIntValue(value) || isFloatValue(value)) {
        argObj[name.value] = Number(value.value);
    }
    else if (isBooleanValue(value) || isStringValue(value)) {
        argObj[name.value] = value.value;
    }
    else if (isObjectValue(value)) {
        var nestedArgObj_1 = {};
        value.fields.map(function (obj) {
            return valueToObjectRepresentation(nestedArgObj_1, obj.name, obj.value, variables);
        });
        argObj[name.value] = nestedArgObj_1;
    }
    else if (isVariable(value)) {
        var variableValue = (variables || {})[value.name.value];
        argObj[name.value] = variableValue;
    }
    else if (isListValue(value)) {
        argObj[name.value] = value.values.map(function (listValue) {
            var nestedArgArrayObj = {};
            valueToObjectRepresentation(nestedArgArrayObj, name, listValue, variables);
            return nestedArgArrayObj[name.value];
        });
    }
    else if (isEnumValue(value)) {
        argObj[name.value] = value.value;
    }
    else if (isNullValue(value)) {
        argObj[name.value] = null;
    }
    else {
        throw new Error("The inline argument \"" + name.value + "\" of kind \"" + value.kind + "\"" +
            'is not supported. Use variables instead of inline arguments to ' +
            'overcome this limitation.');
    }
}
//# sourceMappingURL=storeUtils.js.map

function flattenSelections(selection) {
    if (!selection.selectionSet ||
        !(selection.selectionSet.selections.length > 0))
        return [selection];
    return [selection].concat(selection.selectionSet.selections
        .map(function (selectionNode) {
        return [selectionNode].concat(flattenSelections(selectionNode));
    })
        .reduce(function (selections, selected) { return selections.concat(selected); }, []));
}
function getDirectiveNames(doc) {
    var directiveNames = doc.definitions
        .filter(function (definition) {
        return definition.selectionSet && definition.selectionSet.selections;
    })
        .map(function (x) { return flattenSelections(x); })
        .reduce(function (selections, selected) { return selections.concat(selected); }, [])
        .filter(function (selection) {
        return selection.directives && selection.directives.length > 0;
    })
        .map(function (selection) { return selection.directives; })
        .reduce(function (directives, directive) { return directives.concat(directive); }, [])
        .map(function (directive) { return directive.name.value; });
    return directiveNames;
}
function hasDirectives(names, doc) {
    return getDirectiveNames(doc).some(function (name) { return names.indexOf(name) > -1; });
}
//# sourceMappingURL=directives.js.map

var __assign$2 = (undefined && undefined.__assign) || function () {
    __assign$2 = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign$2.apply(this, arguments);
};
//# sourceMappingURL=fragments.js.map

function assign(target) {
    var sources = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        sources[_i - 1] = arguments[_i];
    }
    sources.forEach(function (source) {
        if (typeof source === 'undefined' || source === null) {
            return;
        }
        Object.keys(source).forEach(function (key) {
            target[key] = source[key];
        });
    });
    return target;
}
//# sourceMappingURL=assign.js.map

function getMutationDefinition(doc) {
    checkDocument(doc);
    var mutationDef = doc.definitions.filter(function (definition) {
        return definition.kind === 'OperationDefinition' &&
            definition.operation === 'mutation';
    })[0];
    if (!mutationDef) {
        throw new Error('Must contain a mutation definition.');
    }
    return mutationDef;
}
function checkDocument(doc) {
    if (doc.kind !== 'Document') {
        throw new Error("Expecting a parsed GraphQL document. Perhaps you need to wrap the query string in a \"gql\" tag? http://docs.apollostack.com/apollo-client/core.html#gql");
    }
    var operations = doc.definitions
        .filter(function (d) { return d.kind !== 'FragmentDefinition'; })
        .map(function (definition) {
        if (definition.kind !== 'OperationDefinition') {
            throw new Error("Schema type definitions not allowed in queries. Found: \"" + definition.kind + "\"");
        }
        return definition;
    });
    if (operations.length > 1) {
        throw new Error("Ambiguous GraphQL document: contains " + operations.length + " operations");
    }
}
function getOperationDefinition(doc) {
    checkDocument(doc);
    return doc.definitions.filter(function (definition) { return definition.kind === 'OperationDefinition'; })[0];
}
function getOperationDefinitionOrDie(document) {
    var def = getOperationDefinition(document);
    if (!def) {
        throw new Error("GraphQL document is missing an operation");
    }
    return def;
}
function getOperationName(doc) {
    return (doc.definitions
        .filter(function (definition) {
        return definition.kind === 'OperationDefinition' && definition.name;
    })
        .map(function (x) { return x.name.value; })[0] || null);
}
function getFragmentDefinitions(doc) {
    return doc.definitions.filter(function (definition) { return definition.kind === 'FragmentDefinition'; });
}
function getQueryDefinition(doc) {
    var queryDef = getOperationDefinition(doc);
    if (!queryDef || queryDef.operation !== 'query') {
        throw new Error('Must contain a query definition.');
    }
    return queryDef;
}
function createFragmentMap(fragments) {
    if (fragments === void 0) { fragments = []; }
    var symTable = {};
    fragments.forEach(function (fragment) {
        symTable[fragment.name.value] = fragment;
    });
    return symTable;
}
function getDefaultValues(definition) {
    if (definition &&
        definition.variableDefinitions &&
        definition.variableDefinitions.length) {
        var defaultValues = definition.variableDefinitions
            .filter(function (_a) {
            var defaultValue = _a.defaultValue;
            return defaultValue;
        })
            .map(function (_a) {
            var variable = _a.variable, defaultValue = _a.defaultValue;
            var defaultValueObj = {};
            valueToObjectRepresentation(defaultValueObj, variable.name, defaultValue);
            return defaultValueObj;
        });
        return assign.apply(void 0, [{}].concat(defaultValues));
    }
    return {};
}
//# sourceMappingURL=getFromAST.js.map

var toString = Object.prototype.toString;
function cloneDeep(value) {
    return cloneDeepHelper(value, new Map());
}
function cloneDeepHelper(val, seen) {
    switch (toString.call(val)) {
        case "[object Array]": {
            if (seen.has(val))
                return seen.get(val);
            var copy_1 = val.slice(0);
            seen.set(val, copy_1);
            copy_1.forEach(function (child, i) {
                copy_1[i] = cloneDeepHelper(child, seen);
            });
            return copy_1;
        }
        case "[object Object]": {
            if (seen.has(val))
                return seen.get(val);
            var copy_2 = Object.create(Object.getPrototypeOf(val));
            seen.set(val, copy_2);
            Object.keys(val).forEach(function (key) {
                copy_2[key] = cloneDeepHelper(val[key], seen);
            });
            return copy_2;
        }
        default:
            return val;
    }
}
//# sourceMappingURL=cloneDeep.js.map

function isNotEmpty(op, fragments) {
    return (op.selectionSet.selections.filter(function (selectionSet) {
        return !(selectionSet &&
            selectionSet.kind === 'FragmentSpread' &&
            !isNotEmpty(fragments[selectionSet.name.value], fragments));
    }).length > 0);
}
function getDirectiveMatcher(directives) {
    return function directiveMatcher(directive) {
        return directives.some(function (dir) {
            if (dir.name && dir.name === directive.name.value)
                return true;
            if (dir.test && dir.test(directive))
                return true;
            return false;
        });
    };
}
function removeDirectivesFromSelectionSet(directives, selectionSet) {
    if (!selectionSet.selections)
        return selectionSet;
    var agressiveRemove = directives.some(function (dir) { return dir.remove; });
    selectionSet.selections = selectionSet.selections
        .map(function (selection) {
        if (selection.kind !== 'Field' ||
            !selection ||
            !selection.directives)
            return selection;
        var directiveMatcher = getDirectiveMatcher(directives);
        var remove;
        selection.directives = selection.directives.filter(function (directive) {
            var shouldKeep = !directiveMatcher(directive);
            if (!remove && !shouldKeep && agressiveRemove)
                remove = true;
            return shouldKeep;
        });
        return remove ? null : selection;
    })
        .filter(function (x) { return !!x; });
    selectionSet.selections.forEach(function (selection) {
        if ((selection.kind === 'Field' || selection.kind === 'InlineFragment') &&
            selection.selectionSet) {
            removeDirectivesFromSelectionSet(directives, selection.selectionSet);
        }
    });
    return selectionSet;
}
function removeDirectivesFromDocument(directives, doc) {
    var docClone = cloneDeep(doc);
    docClone.definitions.forEach(function (definition) {
        removeDirectivesFromSelectionSet(directives, definition.selectionSet);
    });
    var operation = getOperationDefinitionOrDie(docClone);
    var fragments = createFragmentMap(getFragmentDefinitions(docClone));
    return isNotEmpty(operation, fragments) ? docClone : null;
}
var connectionRemoveConfig = {
    test: function (directive) {
        var willRemove = directive.name.value === 'connection';
        if (willRemove) {
            if (!directive.arguments ||
                !directive.arguments.some(function (arg) { return arg.name.value === 'key'; })) {
                console.warn('Removing an @connection directive even though it does not have a key. ' +
                    'You may want to use the key parameter to specify a store key.');
            }
        }
        return willRemove;
    },
};
function removeConnectionDirectiveFromDocument(doc) {
    checkDocument(doc);
    return removeDirectivesFromDocument([connectionRemoveConfig], doc);
}
//# sourceMappingURL=transform.js.map

function getEnv() {
    if (typeof process !== 'undefined' && process.env.NODE_ENV) {
        return process.env.NODE_ENV;
    }
    return 'development';
}
function isEnv(env) {
    return getEnv() === env;
}
function isProduction() {
    return isEnv('production') === true;
}
//# sourceMappingURL=environment.js.map

function tryFunctionOrLogError(f) {
    try {
        return f();
    }
    catch (e) {
        if (console.error) {
            console.error(e);
        }
    }
}
function graphQLResultHasError(result) {
    return result.errors && result.errors.length;
}
//# sourceMappingURL=errorHandling.js.map

function isEqual$1(a, b) {
    if (a === b) {
        return true;
    }
    if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime();
    }
    if (a != null &&
        typeof a === 'object' &&
        b != null &&
        typeof b === 'object') {
        for (var key in a) {
            if (Object.prototype.hasOwnProperty.call(a, key)) {
                if (!Object.prototype.hasOwnProperty.call(b, key)) {
                    return false;
                }
                if (!isEqual$1(a[key], b[key])) {
                    return false;
                }
            }
        }
        for (var key in b) {
            if (Object.prototype.hasOwnProperty.call(b, key) &&
                !Object.prototype.hasOwnProperty.call(a, key)) {
                return false;
            }
        }
        return true;
    }
    return false;
}
//# sourceMappingURL=isEqual.js.map

//# sourceMappingURL=maybeDeepFreeze.js.map

//# sourceMappingURL=warnOnce.js.map

//# sourceMappingURL=stripSymbols.js.map

//# sourceMappingURL=index.js.map

var NetworkStatus;
(function (NetworkStatus) {
    NetworkStatus[NetworkStatus["loading"] = 1] = "loading";
    NetworkStatus[NetworkStatus["setVariables"] = 2] = "setVariables";
    NetworkStatus[NetworkStatus["fetchMore"] = 3] = "fetchMore";
    NetworkStatus[NetworkStatus["refetch"] = 4] = "refetch";
    NetworkStatus[NetworkStatus["poll"] = 6] = "poll";
    NetworkStatus[NetworkStatus["ready"] = 7] = "ready";
    NetworkStatus[NetworkStatus["error"] = 8] = "error";
})(NetworkStatus || (NetworkStatus = {}));
function isNetworkRequestInFlight(networkStatus) {
    return networkStatus < 7;
}
//# sourceMappingURL=networkStatus.js.map

var Observable_1 = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// === Symbol Support ===

var hasSymbols = function () {
  return typeof Symbol === 'function';
};
var hasSymbol = function (name) {
  return hasSymbols() && Boolean(Symbol[name]);
};
var getSymbol = function (name) {
  return hasSymbol(name) ? Symbol[name] : '@@' + name;
};

if (hasSymbols() && !hasSymbol('observable')) {
  Symbol.observable = Symbol('observable');
}

var SymbolIterator = getSymbol('iterator');
var SymbolObservable = getSymbol('observable');
var SymbolSpecies = getSymbol('species');

// === Abstract Operations ===

function getMethod(obj, key) {
  var value = obj[key];

  if (value == null) return undefined;

  if (typeof value !== 'function') throw new TypeError(value + ' is not a function');

  return value;
}

function getSpecies(obj) {
  var ctor = obj.constructor;
  if (ctor !== undefined) {
    ctor = ctor[SymbolSpecies];
    if (ctor === null) {
      ctor = undefined;
    }
  }
  return ctor !== undefined ? ctor : Observable;
}

function isObservable(x) {
  return x instanceof Observable; // SPEC: Brand check
}

function hostReportError(e) {
  if (hostReportError.log) {
    hostReportError.log(e);
  } else {
    setTimeout(function () {
      throw e;
    });
  }
}

function enqueue(fn) {
  Promise.resolve().then(function () {
    try {
      fn();
    } catch (e) {
      hostReportError(e);
    }
  });
}

function cleanupSubscription(subscription) {
  var cleanup = subscription._cleanup;
  if (cleanup === undefined) return;

  subscription._cleanup = undefined;

  if (!cleanup) {
    return;
  }

  try {
    if (typeof cleanup === 'function') {
      cleanup();
    } else {
      var unsubscribe = getMethod(cleanup, 'unsubscribe');
      if (unsubscribe) {
        unsubscribe.call(cleanup);
      }
    }
  } catch (e) {
    hostReportError(e);
  }
}

function closeSubscription(subscription) {
  subscription._observer = undefined;
  subscription._queue = undefined;
  subscription._state = 'closed';
}

function flushSubscription(subscription) {
  var queue = subscription._queue;
  if (!queue) {
    return;
  }
  subscription._queue = undefined;
  subscription._state = 'ready';
  for (var i = 0; i < queue.length; ++i) {
    notifySubscription(subscription, queue[i].type, queue[i].value);
    if (subscription._state === 'closed') break;
  }
}

function notifySubscription(subscription, type, value) {
  subscription._state = 'running';

  var observer = subscription._observer;

  try {
    var m = getMethod(observer, type);
    switch (type) {
      case 'next':
        if (m) m.call(observer, value);
        break;
      case 'error':
        closeSubscription(subscription);
        if (m) m.call(observer, value);else throw value;
        break;
      case 'complete':
        closeSubscription(subscription);
        if (m) m.call(observer);
        break;
    }
  } catch (e) {
    hostReportError(e);
  }

  if (subscription._state === 'closed') cleanupSubscription(subscription);else if (subscription._state === 'running') subscription._state = 'ready';
}

function onNotify(subscription, type, value) {
  if (subscription._state === 'closed') return;

  if (subscription._state === 'buffering') {
    subscription._queue.push({ type: type, value: value });
    return;
  }

  if (subscription._state !== 'ready') {
    subscription._state = 'buffering';
    subscription._queue = [{ type: type, value: value }];
    enqueue(function () {
      return flushSubscription(subscription);
    });
    return;
  }

  notifySubscription(subscription, type, value);
}

var Subscription = function () {
  function Subscription(observer, subscriber) {
    _classCallCheck(this, Subscription);

    // ASSERT: observer is an object
    // ASSERT: subscriber is callable

    this._cleanup = undefined;
    this._observer = observer;
    this._queue = undefined;
    this._state = 'initializing';

    var subscriptionObserver = new SubscriptionObserver(this);

    try {
      this._cleanup = subscriber.call(undefined, subscriptionObserver);
    } catch (e) {
      subscriptionObserver.error(e);
    }

    if (this._state === 'initializing') this._state = 'ready';
  }

  _createClass(Subscription, [{
    key: 'unsubscribe',
    value: function unsubscribe() {
      if (this._state !== 'closed') {
        closeSubscription(this);
        cleanupSubscription(this);
      }
    }
  }, {
    key: 'closed',
    get: function () {
      return this._state === 'closed';
    }
  }]);

  return Subscription;
}();

var SubscriptionObserver = function () {
  function SubscriptionObserver(subscription) {
    _classCallCheck(this, SubscriptionObserver);

    this._subscription = subscription;
  }

  _createClass(SubscriptionObserver, [{
    key: 'next',
    value: function next(value) {
      onNotify(this._subscription, 'next', value);
    }
  }, {
    key: 'error',
    value: function error(value) {
      onNotify(this._subscription, 'error', value);
    }
  }, {
    key: 'complete',
    value: function complete() {
      onNotify(this._subscription, 'complete');
    }
  }, {
    key: 'closed',
    get: function () {
      return this._subscription._state === 'closed';
    }
  }]);

  return SubscriptionObserver;
}();

var Observable = exports.Observable = function () {
  function Observable(subscriber) {
    _classCallCheck(this, Observable);

    if (!(this instanceof Observable)) throw new TypeError('Observable cannot be called as a function');

    if (typeof subscriber !== 'function') throw new TypeError('Observable initializer must be a function');

    this._subscriber = subscriber;
  }

  _createClass(Observable, [{
    key: 'subscribe',
    value: function subscribe(observer) {
      if (typeof observer !== 'object' || observer === null) {
        observer = {
          next: observer,
          error: arguments[1],
          complete: arguments[2]
        };
      }
      return new Subscription(observer, this._subscriber);
    }
  }, {
    key: 'forEach',
    value: function forEach(fn) {
      var _this = this;

      return new Promise(function (resolve, reject) {
        if (typeof fn !== 'function') {
          reject(new TypeError(fn + ' is not a function'));
          return;
        }

        function done() {
          subscription.unsubscribe();
          resolve();
        }

        var subscription = _this.subscribe({
          next: function (value) {
            try {
              fn(value, done);
            } catch (e) {
              reject(e);
              subscription.unsubscribe();
            }
          },

          error: reject,
          complete: resolve
        });
      });
    }
  }, {
    key: 'map',
    value: function map(fn) {
      var _this2 = this;

      if (typeof fn !== 'function') throw new TypeError(fn + ' is not a function');

      var C = getSpecies(this);

      return new C(function (observer) {
        return _this2.subscribe({
          next: function (value) {
            try {
              value = fn(value);
            } catch (e) {
              return observer.error(e);
            }
            observer.next(value);
          },
          error: function (e) {
            observer.error(e);
          },
          complete: function () {
            observer.complete();
          }
        });
      });
    }
  }, {
    key: 'filter',
    value: function filter(fn) {
      var _this3 = this;

      if (typeof fn !== 'function') throw new TypeError(fn + ' is not a function');

      var C = getSpecies(this);

      return new C(function (observer) {
        return _this3.subscribe({
          next: function (value) {
            try {
              if (!fn(value)) return;
            } catch (e) {
              return observer.error(e);
            }
            observer.next(value);
          },
          error: function (e) {
            observer.error(e);
          },
          complete: function () {
            observer.complete();
          }
        });
      });
    }
  }, {
    key: 'reduce',
    value: function reduce(fn) {
      var _this4 = this;

      if (typeof fn !== 'function') throw new TypeError(fn + ' is not a function');

      var C = getSpecies(this);
      var hasSeed = arguments.length > 1;
      var hasValue = false;
      var seed = arguments[1];
      var acc = seed;

      return new C(function (observer) {
        return _this4.subscribe({
          next: function (value) {
            var first = !hasValue;
            hasValue = true;

            if (!first || hasSeed) {
              try {
                acc = fn(acc, value);
              } catch (e) {
                return observer.error(e);
              }
            } else {
              acc = value;
            }
          },
          error: function (e) {
            observer.error(e);
          },
          complete: function () {
            if (!hasValue && !hasSeed) return observer.error(new TypeError('Cannot reduce an empty sequence'));

            observer.next(acc);
            observer.complete();
          }
        });
      });
    }
  }, {
    key: 'concat',
    value: function concat() {
      var _this5 = this;

      for (var _len = arguments.length, sources = Array(_len), _key = 0; _key < _len; _key++) {
        sources[_key] = arguments[_key];
      }

      var C = getSpecies(this);

      return new C(function (observer) {
        var subscription = void 0;
        var index = 0;

        function startNext(next) {
          subscription = next.subscribe({
            next: function (v) {
              observer.next(v);
            },
            error: function (e) {
              observer.error(e);
            },
            complete: function () {
              if (index === sources.length) {
                subscription = undefined;
                observer.complete();
              } else {
                startNext(C.from(sources[index++]));
              }
            }
          });
        }

        startNext(_this5);

        return function () {
          if (subscription) {
            subscription.unsubscribe();
            subscription = undefined;
          }
        };
      });
    }
  }, {
    key: 'flatMap',
    value: function flatMap(fn) {
      var _this6 = this;

      if (typeof fn !== 'function') throw new TypeError(fn + ' is not a function');

      var C = getSpecies(this);

      return new C(function (observer) {
        var subscriptions = [];

        var outer = _this6.subscribe({
          next: function (value) {
            if (fn) {
              try {
                value = fn(value);
              } catch (e) {
                return observer.error(e);
              }
            }

            var inner = C.from(value).subscribe({
              next: function (value) {
                observer.next(value);
              },
              error: function (e) {
                observer.error(e);
              },
              complete: function () {
                var i = subscriptions.indexOf(inner);
                if (i >= 0) subscriptions.splice(i, 1);
                completeIfDone();
              }
            });

            subscriptions.push(inner);
          },
          error: function (e) {
            observer.error(e);
          },
          complete: function () {
            completeIfDone();
          }
        });

        function completeIfDone() {
          if (outer.closed && subscriptions.length === 0) observer.complete();
        }

        return function () {
          subscriptions.forEach(function (s) {
            return s.unsubscribe();
          });
          outer.unsubscribe();
        };
      });
    }
  }, {
    key: SymbolObservable,
    value: function () {
      return this;
    }
  }], [{
    key: 'from',
    value: function from(x) {
      var C = typeof this === 'function' ? this : Observable;

      if (x == null) throw new TypeError(x + ' is not an object');

      var method = getMethod(x, SymbolObservable);
      if (method) {
        var observable = method.call(x);

        if (Object(observable) !== observable) throw new TypeError(observable + ' is not an object');

        if (isObservable(observable) && observable.constructor === C) return observable;

        return new C(function (observer) {
          return observable.subscribe(observer);
        });
      }

      if (hasSymbol('iterator')) {
        method = getMethod(x, SymbolIterator);
        if (method) {
          return new C(function (observer) {
            enqueue(function () {
              if (observer.closed) return;
              var _iteratorNormalCompletion = true;
              var _didIteratorError = false;
              var _iteratorError = undefined;

              try {
                for (var _iterator = method.call(x)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                  var item = _step.value;

                  observer.next(item);
                  if (observer.closed) return;
                }
              } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
              } finally {
                try {
                  if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                  }
                } finally {
                  if (_didIteratorError) {
                    throw _iteratorError;
                  }
                }
              }

              observer.complete();
            });
          });
        }
      }

      if (Array.isArray(x)) {
        return new C(function (observer) {
          enqueue(function () {
            if (observer.closed) return;
            for (var i = 0; i < x.length; ++i) {
              observer.next(x[i]);
              if (observer.closed) return;
            }
            observer.complete();
          });
        });
      }

      throw new TypeError(x + ' is not observable');
    }
  }, {
    key: 'of',
    value: function of() {
      for (var _len2 = arguments.length, items = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        items[_key2] = arguments[_key2];
      }

      var C = typeof this === 'function' ? this : Observable;

      return new C(function (observer) {
        enqueue(function () {
          if (observer.closed) return;
          for (var i = 0; i < items.length; ++i) {
            observer.next(items[i]);
            if (observer.closed) return;
          }
          observer.complete();
        });
      });
    }
  }, {
    key: SymbolSpecies,
    get: function () {
      return this;
    }
  }]);

  return Observable;
}();

if (hasSymbols()) {
  Object.defineProperty(Observable, Symbol('extensions'), {
    value: {
      symbol: SymbolObservable,
      hostReportError: hostReportError
    },
    configurable: true
  });
}
});

unwrapExports(Observable_1);
var Observable_2 = Observable_1.Observable;

var zenObservable = Observable_1.Observable;

/* tslint:disable */
var Observable$1 = zenObservable;
//# sourceMappingURL=zenObservable.js.map

//# sourceMappingURL=index.js.map

var __assign$3 = (undefined && undefined.__assign) || function () {
    __assign$3 = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign$3.apply(this, arguments);
};
//# sourceMappingURL=storeUtils.js.map

//# sourceMappingURL=directives.js.map

var __assign$4 = (undefined && undefined.__assign) || function () {
    __assign$4 = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign$4.apply(this, arguments);
};
//# sourceMappingURL=fragments.js.map

//# sourceMappingURL=assign.js.map

function getOperationName$1(doc) {
    return (doc.definitions
        .filter(function (definition) {
        return definition.kind === 'OperationDefinition' && definition.name;
    })
        .map(function (x) { return x.name.value; })[0] || null);
}
//# sourceMappingURL=getFromAST.js.map

//# sourceMappingURL=cloneDeep.js.map

//# sourceMappingURL=transform.js.map

//# sourceMappingURL=environment.js.map

//# sourceMappingURL=errorHandling.js.map

//# sourceMappingURL=isEqual.js.map

//# sourceMappingURL=maybeDeepFreeze.js.map

//# sourceMappingURL=warnOnce.js.map

//# sourceMappingURL=stripSymbols.js.map

//# sourceMappingURL=index.js.map

var __extends$1 = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign$5 = (undefined && undefined.__assign) || function () {
    __assign$5 = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign$5.apply(this, arguments);
};
function validateOperation(operation) {
    var OPERATION_FIELDS = [
        'query',
        'operationName',
        'variables',
        'extensions',
        'context',
    ];
    for (var _i = 0, _a = Object.keys(operation); _i < _a.length; _i++) {
        var key = _a[_i];
        if (OPERATION_FIELDS.indexOf(key) < 0) {
            throw new Error("illegal argument: " + key);
        }
    }
    return operation;
}
var LinkError = /** @class */ (function (_super) {
    __extends$1(LinkError, _super);
    function LinkError(message, link) {
        var _this = _super.call(this, message) || this;
        _this.link = link;
        return _this;
    }
    return LinkError;
}(Error));
function isTerminating(link) {
    return link.request.length <= 1;
}
function fromError(errorValue) {
    return new Observable$1(function (observer) {
        observer.error(errorValue);
    });
}
function transformOperation(operation) {
    var transformedOperation = {
        variables: operation.variables || {},
        extensions: operation.extensions || {},
        operationName: operation.operationName,
        query: operation.query,
    };
    // best guess at an operation name
    if (!transformedOperation.operationName) {
        transformedOperation.operationName =
            typeof transformedOperation.query !== 'string'
                ? getOperationName$1(transformedOperation.query)
                : '';
    }
    return transformedOperation;
}
function createOperation(starting, operation) {
    var context = __assign$5({}, starting);
    var setContext = function (next) {
        if (typeof next === 'function') {
            context = __assign$5({}, context, next(context));
        }
        else {
            context = __assign$5({}, context, next);
        }
    };
    var getContext = function () { return (__assign$5({}, context)); };
    Object.defineProperty(operation, 'setContext', {
        enumerable: false,
        value: setContext,
    });
    Object.defineProperty(operation, 'getContext', {
        enumerable: false,
        value: getContext,
    });
    Object.defineProperty(operation, 'toKey', {
        enumerable: false,
        value: function () { return getKey(operation); },
    });
    return operation;
}
function getKey(operation) {
    // XXX we're assuming here that variables will be serialized in the same order.
    // that might not always be true
    return printer_1(operation.query) + "|" + JSON.stringify(operation.variables) + "|" + operation.operationName;
}
//# sourceMappingURL=linkUtils.js.map

var passthrough = function (op, forward) { return (forward ? forward(op) : Observable$1.of()); };
var toLink = function (handler) {
    return typeof handler === 'function' ? new ApolloLink(handler) : handler;
};
var empty = function () {
    return new ApolloLink(function (op, forward) { return Observable$1.of(); });
};
var from = function (links) {
    if (links.length === 0)
        return empty();
    return links.map(toLink).reduce(function (x, y) { return x.concat(y); });
};
var split = function (test, left, right) {
    if (right === void 0) { right = new ApolloLink(passthrough); }
    var leftLink = toLink(left);
    var rightLink = toLink(right);
    if (isTerminating(leftLink) && isTerminating(rightLink)) {
        return new ApolloLink(function (operation) {
            return test(operation)
                ? leftLink.request(operation) || Observable$1.of()
                : rightLink.request(operation) || Observable$1.of();
        });
    }
    else {
        return new ApolloLink(function (operation, forward) {
            return test(operation)
                ? leftLink.request(operation, forward) || Observable$1.of()
                : rightLink.request(operation, forward) || Observable$1.of();
        });
    }
};
// join two Links together
var concat = function (first, second) {
    var firstLink = toLink(first);
    if (isTerminating(firstLink)) {
        console.warn(new LinkError("You are calling concat on a terminating link, which will have no effect", firstLink));
        return firstLink;
    }
    var nextLink = toLink(second);
    if (isTerminating(nextLink)) {
        return new ApolloLink(function (operation) {
            return firstLink.request(operation, function (op) { return nextLink.request(op) || Observable$1.of(); }) || Observable$1.of();
        });
    }
    else {
        return new ApolloLink(function (operation, forward) {
            return (firstLink.request(operation, function (op) {
                return nextLink.request(op, forward) || Observable$1.of();
            }) || Observable$1.of());
        });
    }
};
var ApolloLink = /** @class */ (function () {
    function ApolloLink(request) {
        if (request)
            this.request = request;
    }
    ApolloLink.prototype.split = function (test, left, right) {
        if (right === void 0) { right = new ApolloLink(passthrough); }
        return this.concat(split(test, left, right));
    };
    ApolloLink.prototype.concat = function (next) {
        return concat(this, next);
    };
    ApolloLink.prototype.request = function (operation, forward) {
        throw new Error('request is not implemented');
    };
    ApolloLink.empty = empty;
    ApolloLink.from = from;
    ApolloLink.split = split;
    ApolloLink.execute = execute;
    return ApolloLink;
}());
function execute(link, operation) {
    return (link.request(createOperation(operation.context, transformOperation(validateOperation(operation)))) || Observable$1.of());
}
//# sourceMappingURL=link.js.map

//# sourceMappingURL=index.js.map

function symbolObservablePonyfill(root) {
	var result;
	var Symbol = root.Symbol;

	if (typeof Symbol === 'function') {
		if (Symbol.observable) {
			result = Symbol.observable;
		} else {
			result = Symbol('observable');
			Symbol.observable = result;
		}
	} else {
		result = '@@observable';
	}

	return result;
}

/* global window */

var root;

if (typeof self !== 'undefined') {
  root = self;
} else if (typeof window !== 'undefined') {
  root = window;
} else if (typeof global !== 'undefined') {
  root = global;
} else if (typeof module !== 'undefined') {
  root = module;
} else {
  root = Function('return this')();
}

var result = symbolObservablePonyfill(root);

var __extends$2 = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Observable$2 = (function (_super) {
    __extends$2(Observable$$1, _super);
    function Observable$$1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Observable$$1.prototype[result] = function () {
        return this;
    };
    Observable$$1.prototype['@@observable'] = function () {
        return this;
    };
    return Observable$$1;
}(Observable$1));
//# sourceMappingURL=Observable.js.map

var __extends$3 = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
function isApolloError(err) {
    return err.hasOwnProperty('graphQLErrors');
}
var generateErrorMessage = function (err) {
    var message = '';
    if (Array.isArray(err.graphQLErrors) && err.graphQLErrors.length !== 0) {
        err.graphQLErrors.forEach(function (graphQLError) {
            var errorMessage = graphQLError
                ? graphQLError.message
                : 'Error message not found.';
            message += "GraphQL error: " + errorMessage + "\n";
        });
    }
    if (err.networkError) {
        message += 'Network error: ' + err.networkError.message + '\n';
    }
    message = message.replace(/\n$/, '');
    return message;
};
var ApolloError = (function (_super) {
    __extends$3(ApolloError, _super);
    function ApolloError(_a) {
        var graphQLErrors = _a.graphQLErrors, networkError = _a.networkError, errorMessage = _a.errorMessage, extraInfo = _a.extraInfo;
        var _this = _super.call(this, errorMessage) || this;
        _this.graphQLErrors = graphQLErrors || [];
        _this.networkError = networkError || null;
        if (!errorMessage) {
            _this.message = generateErrorMessage(_this);
        }
        else {
            _this.message = errorMessage;
        }
        _this.extraInfo = extraInfo;
        _this.__proto__ = ApolloError.prototype;
        return _this;
    }
    return ApolloError;
}(Error));
//# sourceMappingURL=ApolloError.js.map

var FetchType;
(function (FetchType) {
    FetchType[FetchType["normal"] = 1] = "normal";
    FetchType[FetchType["refetch"] = 2] = "refetch";
    FetchType[FetchType["poll"] = 3] = "poll";
})(FetchType || (FetchType = {}));
//# sourceMappingURL=types.js.map

var __extends$4 = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign$6 = (undefined && undefined.__assign) || function () {
    __assign$6 = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign$6.apply(this, arguments);
};
var hasError = function (storeValue, policy) {
    if (policy === void 0) { policy = 'none'; }
    return storeValue &&
        ((storeValue.graphQLErrors &&
            storeValue.graphQLErrors.length > 0 &&
            policy === 'none') ||
            storeValue.networkError);
};
var ObservableQuery = (function (_super) {
    __extends$4(ObservableQuery, _super);
    function ObservableQuery(_a) {
        var scheduler = _a.scheduler, options = _a.options, _b = _a.shouldSubscribe, shouldSubscribe = _b === void 0 ? true : _b;
        var _this = _super.call(this, function (observer) {
            return _this.onSubscribe(observer);
        }) || this;
        _this.isCurrentlyPolling = false;
        _this.isTornDown = false;
        _this.options = options;
        _this.variables = options.variables || {};
        _this.queryId = scheduler.queryManager.generateQueryId();
        _this.shouldSubscribe = shouldSubscribe;
        _this.scheduler = scheduler;
        _this.queryManager = scheduler.queryManager;
        _this.observers = [];
        _this.subscriptionHandles = [];
        return _this;
    }
    ObservableQuery.prototype.result = function () {
        var that = this;
        return new Promise(function (resolve, reject) {
            var subscription;
            var observer = {
                next: function (result) {
                    resolve(result);
                    if (!that.observers.some(function (obs) { return obs !== observer; })) {
                        that.queryManager.removeQuery(that.queryId);
                    }
                    setTimeout(function () {
                        subscription.unsubscribe();
                    }, 0);
                },
                error: function (error) {
                    reject(error);
                },
            };
            subscription = that.subscribe(observer);
        });
    };
    ObservableQuery.prototype.currentResult = function () {
        if (this.isTornDown) {
            return {
                data: this.lastError ? {} : this.lastResult ? this.lastResult.data : {},
                error: this.lastError,
                loading: false,
                networkStatus: NetworkStatus.error,
            };
        }
        var queryStoreValue = this.queryManager.queryStore.get(this.queryId);
        if (hasError(queryStoreValue, this.options.errorPolicy)) {
            return {
                data: {},
                loading: false,
                networkStatus: queryStoreValue.networkStatus,
                error: new ApolloError({
                    graphQLErrors: queryStoreValue.graphQLErrors,
                    networkError: queryStoreValue.networkError,
                }),
            };
        }
        var _a = this.queryManager.getCurrentQueryResult(this), data = _a.data, partial = _a.partial;
        var queryLoading = !queryStoreValue ||
            queryStoreValue.networkStatus === NetworkStatus.loading;
        var loading = (this.options.fetchPolicy === 'network-only' && queryLoading) ||
            (partial && this.options.fetchPolicy !== 'cache-only');
        var networkStatus;
        if (queryStoreValue) {
            networkStatus = queryStoreValue.networkStatus;
        }
        else {
            networkStatus = loading ? NetworkStatus.loading : NetworkStatus.ready;
        }
        var result = {
            data: data,
            loading: isNetworkRequestInFlight(networkStatus),
            networkStatus: networkStatus,
        };
        if (queryStoreValue &&
            queryStoreValue.graphQLErrors &&
            this.options.errorPolicy === 'all') {
            result.errors = queryStoreValue.graphQLErrors;
        }
        if (!partial) {
            this.lastResult = __assign$6({}, result, { stale: false });
            this.lastResultSnapshot = cloneDeep(this.lastResult);
        }
        return __assign$6({}, result, { partial: partial });
    };
    ObservableQuery.prototype.isDifferentFromLastResult = function (newResult) {
        var snapshot = this.lastResultSnapshot;
        return !(snapshot && newResult &&
            snapshot.networkStatus === newResult.networkStatus &&
            snapshot.stale === newResult.stale &&
            isEqual$1(snapshot.data, newResult.data));
    };
    ObservableQuery.prototype.getLastResult = function () {
        return this.lastResult;
    };
    ObservableQuery.prototype.getLastError = function () {
        return this.lastError;
    };
    ObservableQuery.prototype.resetLastResults = function () {
        delete this.lastResult;
        delete this.lastResultSnapshot;
        delete this.lastError;
        this.isTornDown = false;
    };
    ObservableQuery.prototype.refetch = function (variables) {
        var fetchPolicy = this.options.fetchPolicy;
        if (fetchPolicy === 'cache-only') {
            return Promise.reject(new Error('cache-only fetchPolicy option should not be used together with query refetch.'));
        }
        if (!isEqual$1(this.variables, variables)) {
            this.variables = Object.assign({}, this.variables, variables);
        }
        if (!isEqual$1(this.options.variables, this.variables)) {
            this.options.variables = Object.assign({}, this.options.variables, this.variables);
        }
        var isNetworkFetchPolicy = fetchPolicy === 'network-only' || fetchPolicy === 'no-cache';
        var combinedOptions = __assign$6({}, this.options, { fetchPolicy: isNetworkFetchPolicy ? fetchPolicy : 'network-only' });
        return this.queryManager
            .fetchQuery(this.queryId, combinedOptions, FetchType.refetch)
            .then(function (result) { return result; });
    };
    ObservableQuery.prototype.fetchMore = function (fetchMoreOptions) {
        var _this = this;
        if (!fetchMoreOptions.updateQuery) {
            throw new Error('updateQuery option is required. This function defines how to update the query data with the new results.');
        }
        var combinedOptions;
        return Promise.resolve()
            .then(function () {
            var qid = _this.queryManager.generateQueryId();
            if (fetchMoreOptions.query) {
                combinedOptions = fetchMoreOptions;
            }
            else {
                combinedOptions = __assign$6({}, _this.options, fetchMoreOptions, { variables: Object.assign({}, _this.variables, fetchMoreOptions.variables) });
            }
            combinedOptions.fetchPolicy = 'network-only';
            return _this.queryManager.fetchQuery(qid, combinedOptions, FetchType.normal, _this.queryId);
        })
            .then(function (fetchMoreResult) {
            _this.updateQuery(function (previousResult) {
                return fetchMoreOptions.updateQuery(previousResult, {
                    fetchMoreResult: fetchMoreResult.data,
                    variables: combinedOptions.variables,
                });
            });
            return fetchMoreResult;
        });
    };
    ObservableQuery.prototype.subscribeToMore = function (options) {
        var _this = this;
        var subscription = this.queryManager
            .startGraphQLSubscription({
            query: options.document,
            variables: options.variables,
        })
            .subscribe({
            next: function (subscriptionData) {
                if (options.updateQuery) {
                    _this.updateQuery(function (previous, _a) {
                        var variables = _a.variables;
                        return options.updateQuery(previous, {
                            subscriptionData: subscriptionData,
                            variables: variables,
                        });
                    });
                }
            },
            error: function (err) {
                if (options.onError) {
                    options.onError(err);
                    return;
                }
                console.error('Unhandled GraphQL subscription error', err);
            },
        });
        this.subscriptionHandles.push(subscription);
        return function () {
            var i = _this.subscriptionHandles.indexOf(subscription);
            if (i >= 0) {
                _this.subscriptionHandles.splice(i, 1);
                subscription.unsubscribe();
            }
        };
    };
    ObservableQuery.prototype.setOptions = function (opts) {
        var oldOptions = this.options;
        this.options = Object.assign({}, this.options, opts);
        if (opts.pollInterval) {
            this.startPolling(opts.pollInterval);
        }
        else if (opts.pollInterval === 0) {
            this.stopPolling();
        }
        var tryFetch = (oldOptions.fetchPolicy !== 'network-only' &&
            opts.fetchPolicy === 'network-only') ||
            (oldOptions.fetchPolicy === 'cache-only' &&
                opts.fetchPolicy !== 'cache-only') ||
            (oldOptions.fetchPolicy === 'standby' &&
                opts.fetchPolicy !== 'standby') ||
            false;
        return this.setVariables(this.options.variables, tryFetch, opts.fetchResults);
    };
    ObservableQuery.prototype.setVariables = function (variables, tryFetch, fetchResults) {
        if (tryFetch === void 0) { tryFetch = false; }
        if (fetchResults === void 0) { fetchResults = true; }
        this.isTornDown = false;
        var newVariables = variables ? variables : this.variables;
        if (isEqual$1(newVariables, this.variables) && !tryFetch) {
            if (this.observers.length === 0 || !fetchResults) {
                return new Promise(function (resolve) { return resolve(); });
            }
            return this.result();
        }
        else {
            this.variables = newVariables;
            this.options.variables = newVariables;
            if (this.observers.length === 0) {
                return new Promise(function (resolve) { return resolve(); });
            }
            return this.queryManager
                .fetchQuery(this.queryId, __assign$6({}, this.options, { variables: this.variables }))
                .then(function (result) { return result; });
        }
    };
    ObservableQuery.prototype.updateQuery = function (mapFn) {
        var _a = this.queryManager.getQueryWithPreviousResult(this.queryId), previousResult = _a.previousResult, variables = _a.variables, document = _a.document;
        var newResult = tryFunctionOrLogError(function () {
            return mapFn(previousResult, { variables: variables });
        });
        if (newResult) {
            this.queryManager.dataStore.markUpdateQueryResult(document, variables, newResult);
            this.queryManager.broadcastQueries();
        }
    };
    ObservableQuery.prototype.stopPolling = function () {
        if (this.isCurrentlyPolling) {
            this.scheduler.stopPollingQuery(this.queryId);
            this.options.pollInterval = undefined;
            this.isCurrentlyPolling = false;
        }
    };
    ObservableQuery.prototype.startPolling = function (pollInterval) {
        if (this.options.fetchPolicy === 'cache-first' ||
            this.options.fetchPolicy === 'cache-only') {
            throw new Error('Queries that specify the cache-first and cache-only fetchPolicies cannot also be polling queries.');
        }
        if (this.isCurrentlyPolling) {
            this.scheduler.stopPollingQuery(this.queryId);
            this.isCurrentlyPolling = false;
        }
        this.options.pollInterval = pollInterval;
        this.isCurrentlyPolling = true;
        this.scheduler.startPollingQuery(this.options, this.queryId);
    };
    ObservableQuery.prototype.onSubscribe = function (observer) {
        var _this = this;
        if (observer._subscription &&
            observer._subscription._observer &&
            !observer._subscription._observer.error) {
            observer._subscription._observer.error = function (error) {
                console.error('Unhandled error', error.message, error.stack);
            };
        }
        this.observers.push(observer);
        if (observer.next && this.lastResult)
            observer.next(this.lastResult);
        if (observer.error && this.lastError)
            observer.error(this.lastError);
        if (this.observers.length === 1)
            this.setUpQuery();
        return function () {
            _this.observers = _this.observers.filter(function (obs) { return obs !== observer; });
            if (_this.observers.length === 0) {
                _this.tearDownQuery();
            }
        };
    };
    ObservableQuery.prototype.setUpQuery = function () {
        var _this = this;
        if (this.shouldSubscribe) {
            this.queryManager.addObservableQuery(this.queryId, this);
        }
        if (!!this.options.pollInterval) {
            if (this.options.fetchPolicy === 'cache-first' ||
                this.options.fetchPolicy === 'cache-only') {
                throw new Error('Queries that specify the cache-first and cache-only fetchPolicies cannot also be polling queries.');
            }
            this.isCurrentlyPolling = true;
            this.scheduler.startPollingQuery(this.options, this.queryId);
        }
        var observer = {
            next: function (result) {
                _this.lastResult = result;
                _this.lastResultSnapshot = cloneDeep(result);
                _this.observers.forEach(function (obs) { return obs.next && obs.next(result); });
            },
            error: function (error) {
                _this.lastError = error;
                _this.observers.forEach(function (obs) { return obs.error && obs.error(error); });
            },
        };
        this.queryManager.startQuery(this.queryId, this.options, this.queryManager.queryListenerForObserver(this.queryId, this.options, observer));
    };
    ObservableQuery.prototype.tearDownQuery = function () {
        this.isTornDown = true;
        if (this.isCurrentlyPolling) {
            this.scheduler.stopPollingQuery(this.queryId);
            this.isCurrentlyPolling = false;
        }
        this.subscriptionHandles.forEach(function (sub) { return sub.unsubscribe(); });
        this.subscriptionHandles = [];
        this.queryManager.removeObservableQuery(this.queryId);
        this.queryManager.stopQuery(this.queryId);
        this.observers = [];
    };
    return ObservableQuery;
}(Observable$2));
//# sourceMappingURL=ObservableQuery.js.map

var __extends$5 = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/*
 * Expects context to contain the forceFetch field if no dedup
 */
var DedupLink = /** @class */ (function (_super) {
    __extends$5(DedupLink, _super);
    function DedupLink() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.inFlightRequestObservables = new Map();
        _this.subscribers = new Map();
        return _this;
    }
    DedupLink.prototype.request = function (operation, forward) {
        var _this = this;
        // sometimes we might not want to deduplicate a request, for example when we want to force fetch it.
        if (operation.getContext().forceFetch) {
            return forward(operation);
        }
        var key = operation.toKey();
        var cleanup = function (operationKey) {
            _this.inFlightRequestObservables.delete(operationKey);
            var prev = _this.subscribers.get(operationKey);
            return prev;
        };
        if (!this.inFlightRequestObservables.get(key)) {
            // this is a new request, i.e. we haven't deduplicated it yet
            // call the next link
            var singleObserver_1 = forward(operation);
            var subscription_1;
            var sharedObserver = new Observable$1(function (observer) {
                // this will still be called by each subscriber regardless of
                // deduplication status
                var prev = _this.subscribers.get(key);
                if (!prev)
                    prev = { next: [], error: [], complete: [] };
                _this.subscribers.set(key, {
                    next: prev.next.concat([observer.next.bind(observer)]),
                    error: prev.error.concat([observer.error.bind(observer)]),
                    complete: prev.complete.concat([observer.complete.bind(observer)]),
                });
                if (!subscription_1) {
                    subscription_1 = singleObserver_1.subscribe({
                        next: function (result) {
                            var previous = cleanup(key);
                            _this.subscribers.delete(key);
                            if (previous) {
                                previous.next.forEach(function (next) { return next(result); });
                                previous.complete.forEach(function (complete) { return complete(); });
                            }
                        },
                        error: function (error) {
                            var previous = cleanup(key);
                            _this.subscribers.delete(key);
                            if (previous)
                                previous.error.forEach(function (err) { return err(error); });
                        },
                    });
                }
                return function () {
                    if (subscription_1)
                        subscription_1.unsubscribe();
                    _this.inFlightRequestObservables.delete(key);
                };
            });
            this.inFlightRequestObservables.set(key, sharedObserver);
        }
        // return shared Observable
        return this.inFlightRequestObservables.get(key);
    };
    return DedupLink;
}(ApolloLink));
//# sourceMappingURL=dedupLink.js.map

//# sourceMappingURL=index.js.map

var __assign$7 = (undefined && undefined.__assign) || function () {
    __assign$7 = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign$7.apply(this, arguments);
};
var QueryScheduler = (function () {
    function QueryScheduler(_a) {
        var queryManager = _a.queryManager, ssrMode = _a.ssrMode;
        this.inFlightQueries = {};
        this.registeredQueries = {};
        this.intervalQueries = {};
        this.pollingTimers = {};
        this.ssrMode = false;
        this.queryManager = queryManager;
        this.ssrMode = ssrMode || false;
    }
    QueryScheduler.prototype.checkInFlight = function (queryId) {
        var query = this.queryManager.queryStore.get(queryId);
        return (query &&
            query.networkStatus !== NetworkStatus.ready &&
            query.networkStatus !== NetworkStatus.error);
    };
    QueryScheduler.prototype.fetchQuery = function (queryId, options, fetchType) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.queryManager
                .fetchQuery(queryId, options, fetchType)
                .then(function (result) {
                resolve(result);
            })
                .catch(function (error) {
                reject(error);
            });
        });
    };
    QueryScheduler.prototype.startPollingQuery = function (options, queryId, listener) {
        if (!options.pollInterval) {
            throw new Error('Attempted to start a polling query without a polling interval.');
        }
        if (this.ssrMode)
            return queryId;
        this.registeredQueries[queryId] = options;
        if (listener) {
            this.queryManager.addQueryListener(queryId, listener);
        }
        this.addQueryOnInterval(queryId, options);
        return queryId;
    };
    QueryScheduler.prototype.stopPollingQuery = function (queryId) {
        delete this.registeredQueries[queryId];
    };
    QueryScheduler.prototype.fetchQueriesOnInterval = function (interval) {
        var _this = this;
        this.intervalQueries[interval] = this.intervalQueries[interval].filter(function (queryId) {
            if (!(_this.registeredQueries.hasOwnProperty(queryId) &&
                _this.registeredQueries[queryId].pollInterval === interval)) {
                return false;
            }
            if (_this.checkInFlight(queryId)) {
                return true;
            }
            var queryOptions = _this.registeredQueries[queryId];
            var pollingOptions = __assign$7({}, queryOptions);
            pollingOptions.fetchPolicy = 'network-only';
            _this.fetchQuery(queryId, pollingOptions, FetchType.poll).catch(function () { });
            return true;
        });
        if (this.intervalQueries[interval].length === 0) {
            clearInterval(this.pollingTimers[interval]);
            delete this.intervalQueries[interval];
        }
    };
    QueryScheduler.prototype.addQueryOnInterval = function (queryId, queryOptions) {
        var _this = this;
        var interval = queryOptions.pollInterval;
        if (!interval) {
            throw new Error("A poll interval is required to start polling query with id '" + queryId + "'.");
        }
        if (this.intervalQueries.hasOwnProperty(interval.toString()) &&
            this.intervalQueries[interval].length > 0) {
            this.intervalQueries[interval].push(queryId);
        }
        else {
            this.intervalQueries[interval] = [queryId];
            this.pollingTimers[interval] = setInterval(function () {
                _this.fetchQueriesOnInterval(interval);
            }, interval);
        }
    };
    QueryScheduler.prototype.registerPollingQuery = function (queryOptions) {
        if (!queryOptions.pollInterval) {
            throw new Error('Attempted to register a non-polling query with the scheduler.');
        }
        return new ObservableQuery({
            scheduler: this,
            options: queryOptions,
        });
    };
    return QueryScheduler;
}());
//# sourceMappingURL=scheduler.js.map

var MutationStore = (function () {
    function MutationStore() {
        this.store = {};
    }
    MutationStore.prototype.getStore = function () {
        return this.store;
    };
    MutationStore.prototype.get = function (mutationId) {
        return this.store[mutationId];
    };
    MutationStore.prototype.initMutation = function (mutationId, mutationString, variables) {
        this.store[mutationId] = {
            mutationString: mutationString,
            variables: variables || {},
            loading: true,
            error: null,
        };
    };
    MutationStore.prototype.markMutationError = function (mutationId, error) {
        var mutation = this.store[mutationId];
        if (!mutation) {
            return;
        }
        mutation.loading = false;
        mutation.error = error;
    };
    MutationStore.prototype.markMutationResult = function (mutationId) {
        var mutation = this.store[mutationId];
        if (!mutation) {
            return;
        }
        mutation.loading = false;
        mutation.error = null;
    };
    MutationStore.prototype.reset = function () {
        this.store = {};
    };
    return MutationStore;
}());
//# sourceMappingURL=mutations.js.map

var __assign$8 = (undefined && undefined.__assign) || function () {
    __assign$8 = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign$8.apply(this, arguments);
};
var QueryStore = (function () {
    function QueryStore() {
        this.store = {};
    }
    QueryStore.prototype.getStore = function () {
        return this.store;
    };
    QueryStore.prototype.get = function (queryId) {
        return this.store[queryId];
    };
    QueryStore.prototype.initQuery = function (query) {
        var previousQuery = this.store[query.queryId];
        if (previousQuery &&
            previousQuery.document !== query.document &&
            printer_1(previousQuery.document) !== printer_1(query.document)) {
            throw new Error('Internal Error: may not update existing query string in store');
        }
        var isSetVariables = false;
        var previousVariables = null;
        if (query.storePreviousVariables &&
            previousQuery &&
            previousQuery.networkStatus !== NetworkStatus.loading) {
            if (!isEqual$1(previousQuery.variables, query.variables)) {
                isSetVariables = true;
                previousVariables = previousQuery.variables;
            }
        }
        var networkStatus;
        if (isSetVariables) {
            networkStatus = NetworkStatus.setVariables;
        }
        else if (query.isPoll) {
            networkStatus = NetworkStatus.poll;
        }
        else if (query.isRefetch) {
            networkStatus = NetworkStatus.refetch;
        }
        else {
            networkStatus = NetworkStatus.loading;
        }
        var graphQLErrors = [];
        if (previousQuery && previousQuery.graphQLErrors) {
            graphQLErrors = previousQuery.graphQLErrors;
        }
        this.store[query.queryId] = {
            document: query.document,
            variables: query.variables,
            previousVariables: previousVariables,
            networkError: null,
            graphQLErrors: graphQLErrors,
            networkStatus: networkStatus,
            metadata: query.metadata,
        };
        if (typeof query.fetchMoreForQueryId === 'string' &&
            this.store[query.fetchMoreForQueryId]) {
            this.store[query.fetchMoreForQueryId].networkStatus =
                NetworkStatus.fetchMore;
        }
    };
    QueryStore.prototype.markQueryResult = function (queryId, result, fetchMoreForQueryId) {
        if (!this.store || !this.store[queryId])
            return;
        this.store[queryId].networkError = null;
        this.store[queryId].graphQLErrors =
            result.errors && result.errors.length ? result.errors : [];
        this.store[queryId].previousVariables = null;
        this.store[queryId].networkStatus = NetworkStatus.ready;
        if (typeof fetchMoreForQueryId === 'string' &&
            this.store[fetchMoreForQueryId]) {
            this.store[fetchMoreForQueryId].networkStatus = NetworkStatus.ready;
        }
    };
    QueryStore.prototype.markQueryError = function (queryId, error, fetchMoreForQueryId) {
        if (!this.store || !this.store[queryId])
            return;
        this.store[queryId].networkError = error;
        this.store[queryId].networkStatus = NetworkStatus.error;
        if (typeof fetchMoreForQueryId === 'string') {
            this.markQueryResultClient(fetchMoreForQueryId, true);
        }
    };
    QueryStore.prototype.markQueryResultClient = function (queryId, complete) {
        if (!this.store || !this.store[queryId])
            return;
        this.store[queryId].networkError = null;
        this.store[queryId].previousVariables = null;
        this.store[queryId].networkStatus = complete
            ? NetworkStatus.ready
            : NetworkStatus.loading;
    };
    QueryStore.prototype.stopQuery = function (queryId) {
        delete this.store[queryId];
    };
    QueryStore.prototype.reset = function (observableQueryIds) {
        var _this = this;
        this.store = Object.keys(this.store)
            .filter(function (queryId) {
            return observableQueryIds.indexOf(queryId) > -1;
        })
            .reduce(function (res, key) {
            res[key] = __assign$8({}, _this.store[key], { networkStatus: NetworkStatus.loading });
            return res;
        }, {});
    };
    return QueryStore;
}());
//# sourceMappingURL=queries.js.map

var __assign$9 = (undefined && undefined.__assign) || function () {
    __assign$9 = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign$9.apply(this, arguments);
};
var __awaiter$1 = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator$1 = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var QueryManager = (function () {
    function QueryManager(_a) {
        var link = _a.link, _b = _a.queryDeduplication, queryDeduplication = _b === void 0 ? false : _b, store = _a.store, _c = _a.onBroadcast, onBroadcast = _c === void 0 ? function () { return undefined; } : _c, _d = _a.ssrMode, ssrMode = _d === void 0 ? false : _d;
        this.mutationStore = new MutationStore();
        this.queryStore = new QueryStore();
        this.idCounter = 1;
        this.queries = new Map();
        this.fetchQueryPromises = new Map();
        this.queryIdsByName = {};
        this.link = link;
        this.deduplicator = ApolloLink.from([new DedupLink(), link]);
        this.queryDeduplication = queryDeduplication;
        this.dataStore = store;
        this.onBroadcast = onBroadcast;
        this.scheduler = new QueryScheduler({ queryManager: this, ssrMode: ssrMode });
    }
    QueryManager.prototype.mutate = function (_a) {
        var _this = this;
        var mutation = _a.mutation, variables = _a.variables, optimisticResponse = _a.optimisticResponse, updateQueriesByName = _a.updateQueries, _b = _a.refetchQueries, refetchQueries = _b === void 0 ? [] : _b, _c = _a.awaitRefetchQueries, awaitRefetchQueries = _c === void 0 ? false : _c, updateWithProxyFn = _a.update, _d = _a.errorPolicy, errorPolicy = _d === void 0 ? 'none' : _d, fetchPolicy = _a.fetchPolicy, _e = _a.context, context = _e === void 0 ? {} : _e;
        if (!mutation) {
            throw new Error('mutation option is required. You must specify your GraphQL document in the mutation option.');
        }
        if (fetchPolicy && fetchPolicy !== 'no-cache') {
            throw new Error("fetchPolicy for mutations currently only supports the 'no-cache' policy");
        }
        var mutationId = this.generateQueryId();
        var cache = this.dataStore.getCache();
        (mutation = cache.transformDocument(mutation)),
            (variables = assign({}, getDefaultValues(getMutationDefinition(mutation)), variables));
        var mutationString = printer_1(mutation);
        this.setQuery(mutationId, function () { return ({ document: mutation }); });
        var generateUpdateQueriesInfo = function () {
            var ret = {};
            if (updateQueriesByName) {
                Object.keys(updateQueriesByName).forEach(function (queryName) {
                    return (_this.queryIdsByName[queryName] || []).forEach(function (queryId) {
                        ret[queryId] = {
                            updater: updateQueriesByName[queryName],
                            query: _this.queryStore.get(queryId),
                        };
                    });
                });
            }
            return ret;
        };
        this.mutationStore.initMutation(mutationId, mutationString, variables);
        this.dataStore.markMutationInit({
            mutationId: mutationId,
            document: mutation,
            variables: variables || {},
            updateQueries: generateUpdateQueriesInfo(),
            update: updateWithProxyFn,
            optimisticResponse: optimisticResponse,
        });
        this.broadcastQueries();
        return new Promise(function (resolve, reject) {
            var storeResult;
            var error;
            var operation = _this.buildOperationForLink(mutation, variables, __assign$9({}, context, { optimisticResponse: optimisticResponse }));
            var completeMutation = function () { return __awaiter$1(_this, void 0, void 0, function () {
                var refetchQueryPromises, _i, refetchQueries_1, refetchQuery, promise, queryOptions;
                return __generator$1(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (error) {
                                this.mutationStore.markMutationError(mutationId, error);
                            }
                            this.dataStore.markMutationComplete({
                                mutationId: mutationId,
                                optimisticResponse: optimisticResponse,
                            });
                            this.broadcastQueries();
                            if (error) {
                                throw error;
                            }
                            if (typeof refetchQueries === 'function') {
                                refetchQueries = refetchQueries(storeResult);
                            }
                            refetchQueryPromises = [];
                            for (_i = 0, refetchQueries_1 = refetchQueries; _i < refetchQueries_1.length; _i++) {
                                refetchQuery = refetchQueries_1[_i];
                                if (typeof refetchQuery === 'string') {
                                    promise = this.refetchQueryByName(refetchQuery);
                                    if (promise) {
                                        refetchQueryPromises.push(promise);
                                    }
                                    continue;
                                }
                                queryOptions = {
                                    query: refetchQuery.query,
                                    variables: refetchQuery.variables,
                                    fetchPolicy: 'network-only',
                                };
                                if (refetchQuery.context) {
                                    queryOptions.context = refetchQuery.context;
                                }
                                refetchQueryPromises.push(this.query(queryOptions));
                            }
                            if (!awaitRefetchQueries) return [3, 2];
                            return [4, Promise.all(refetchQueryPromises)];
                        case 1:
                            _a.sent();
                            _a.label = 2;
                        case 2:
                            this.setQuery(mutationId, function () { return ({ document: undefined }); });
                            if (errorPolicy === 'ignore' &&
                                storeResult &&
                                graphQLResultHasError(storeResult)) {
                                delete storeResult.errors;
                            }
                            return [2, storeResult];
                    }
                });
            }); };
            execute(_this.link, operation).subscribe({
                next: function (result) {
                    if (graphQLResultHasError(result) && errorPolicy === 'none') {
                        error = new ApolloError({
                            graphQLErrors: result.errors,
                        });
                        return;
                    }
                    _this.mutationStore.markMutationResult(mutationId);
                    if (fetchPolicy !== 'no-cache') {
                        _this.dataStore.markMutationResult({
                            mutationId: mutationId,
                            result: result,
                            document: mutation,
                            variables: variables || {},
                            updateQueries: generateUpdateQueriesInfo(),
                            update: updateWithProxyFn,
                        });
                    }
                    storeResult = result;
                },
                error: function (err) {
                    _this.mutationStore.markMutationError(mutationId, err);
                    _this.dataStore.markMutationComplete({
                        mutationId: mutationId,
                        optimisticResponse: optimisticResponse,
                    });
                    _this.broadcastQueries();
                    _this.setQuery(mutationId, function () { return ({ document: undefined }); });
                    reject(new ApolloError({
                        networkError: err,
                    }));
                },
                complete: function () { return completeMutation().then(resolve, reject); },
            });
        });
    };
    QueryManager.prototype.fetchQuery = function (queryId, options, fetchType, fetchMoreForQueryId) {
        var _this = this;
        var _a = options.variables, variables = _a === void 0 ? {} : _a, _b = options.metadata, metadata = _b === void 0 ? null : _b, _c = options.fetchPolicy, fetchPolicy = _c === void 0 ? 'cache-first' : _c;
        var cache = this.dataStore.getCache();
        var query = cache.transformDocument(options.query);
        var storeResult;
        var needToFetch = fetchPolicy === 'network-only' || fetchPolicy === 'no-cache';
        if (fetchType !== FetchType.refetch &&
            fetchPolicy !== 'network-only' &&
            fetchPolicy !== 'no-cache') {
            var _d = this.dataStore.getCache().diff({
                query: query,
                variables: variables,
                returnPartialData: true,
                optimistic: false,
            }), complete = _d.complete, result = _d.result;
            needToFetch = !complete || fetchPolicy === 'cache-and-network';
            storeResult = result;
        }
        var shouldFetch = needToFetch && fetchPolicy !== 'cache-only' && fetchPolicy !== 'standby';
        if (hasDirectives(['live'], query))
            shouldFetch = true;
        var requestId = this.generateRequestId();
        var cancel = this.updateQueryWatch(queryId, query, options);
        this.setQuery(queryId, function () { return ({
            document: query,
            lastRequestId: requestId,
            invalidated: true,
            cancel: cancel,
        }); });
        this.invalidate(true, fetchMoreForQueryId);
        this.queryStore.initQuery({
            queryId: queryId,
            document: query,
            storePreviousVariables: shouldFetch,
            variables: variables,
            isPoll: fetchType === FetchType.poll,
            isRefetch: fetchType === FetchType.refetch,
            metadata: metadata,
            fetchMoreForQueryId: fetchMoreForQueryId,
        });
        this.broadcastQueries();
        var shouldDispatchClientResult = !shouldFetch || fetchPolicy === 'cache-and-network';
        if (shouldDispatchClientResult) {
            this.queryStore.markQueryResultClient(queryId, !shouldFetch);
            this.invalidate(true, queryId, fetchMoreForQueryId);
            this.broadcastQueries();
        }
        if (shouldFetch) {
            var networkResult = this.fetchRequest({
                requestId: requestId,
                queryId: queryId,
                document: query,
                options: options,
                fetchMoreForQueryId: fetchMoreForQueryId,
            }).catch(function (error) {
                if (isApolloError(error)) {
                    throw error;
                }
                else {
                    var lastRequestId = _this.getQuery(queryId).lastRequestId;
                    if (requestId >= (lastRequestId || 1)) {
                        _this.queryStore.markQueryError(queryId, error, fetchMoreForQueryId);
                        _this.invalidate(true, queryId, fetchMoreForQueryId);
                        _this.broadcastQueries();
                    }
                    _this.removeFetchQueryPromise(requestId);
                    throw new ApolloError({ networkError: error });
                }
            });
            if (fetchPolicy !== 'cache-and-network') {
                return networkResult;
            }
            else {
                networkResult.catch(function () { });
            }
        }
        return Promise.resolve({ data: storeResult });
    };
    QueryManager.prototype.queryListenerForObserver = function (queryId, options, observer) {
        var _this = this;
        var previouslyHadError = false;
        return function (queryStoreValue, newData) {
            _this.invalidate(false, queryId);
            if (!queryStoreValue)
                return;
            var observableQuery = _this.getQuery(queryId).observableQuery;
            var fetchPolicy = observableQuery
                ? observableQuery.options.fetchPolicy
                : options.fetchPolicy;
            if (fetchPolicy === 'standby')
                return;
            var errorPolicy = observableQuery
                ? observableQuery.options.errorPolicy
                : options.errorPolicy;
            var lastResult = observableQuery
                ? observableQuery.getLastResult()
                : null;
            var lastError = observableQuery ? observableQuery.getLastError() : null;
            var shouldNotifyIfLoading = (!newData && queryStoreValue.previousVariables != null) ||
                fetchPolicy === 'cache-only' ||
                fetchPolicy === 'cache-and-network';
            var networkStatusChanged = Boolean(lastResult &&
                queryStoreValue.networkStatus !== lastResult.networkStatus);
            var errorStatusChanged = errorPolicy &&
                (lastError && lastError.graphQLErrors) !==
                    queryStoreValue.graphQLErrors &&
                errorPolicy !== 'none';
            if (!isNetworkRequestInFlight(queryStoreValue.networkStatus) ||
                (networkStatusChanged && options.notifyOnNetworkStatusChange) ||
                shouldNotifyIfLoading) {
                if (((!errorPolicy || errorPolicy === 'none') &&
                    queryStoreValue.graphQLErrors &&
                    queryStoreValue.graphQLErrors.length > 0) ||
                    queryStoreValue.networkError) {
                    var apolloError_1 = new ApolloError({
                        graphQLErrors: queryStoreValue.graphQLErrors,
                        networkError: queryStoreValue.networkError,
                    });
                    previouslyHadError = true;
                    if (observer.error) {
                        try {
                            observer.error(apolloError_1);
                        }
                        catch (e) {
                            setTimeout(function () {
                                throw e;
                            }, 0);
                        }
                    }
                    else {
                        setTimeout(function () {
                            throw apolloError_1;
                        }, 0);
                        if (!isProduction()) {
                            console.info('An unhandled error was thrown because no error handler is registered ' +
                                'for the query ' +
                                printer_1(queryStoreValue.document));
                        }
                    }
                    return;
                }
                try {
                    var data = void 0;
                    var isMissing = void 0;
                    if (newData) {
                        if (fetchPolicy !== 'no-cache') {
                            _this.setQuery(queryId, function () { return ({ newData: null }); });
                        }
                        data = newData.result;
                        isMissing = !newData.complete || false;
                    }
                    else {
                        if (lastResult && lastResult.data && !errorStatusChanged) {
                            data = lastResult.data;
                            isMissing = false;
                        }
                        else {
                            var document_1 = _this.getQuery(queryId).document;
                            var readResult = _this.dataStore.getCache().diff({
                                query: document_1,
                                variables: queryStoreValue.previousVariables ||
                                    queryStoreValue.variables,
                                optimistic: true,
                            });
                            data = readResult.result;
                            isMissing = !readResult.complete;
                        }
                    }
                    var resultFromStore = void 0;
                    if (isMissing && fetchPolicy !== 'cache-only') {
                        resultFromStore = {
                            data: lastResult && lastResult.data,
                            loading: isNetworkRequestInFlight(queryStoreValue.networkStatus),
                            networkStatus: queryStoreValue.networkStatus,
                            stale: true,
                        };
                    }
                    else {
                        resultFromStore = {
                            data: data,
                            loading: isNetworkRequestInFlight(queryStoreValue.networkStatus),
                            networkStatus: queryStoreValue.networkStatus,
                            stale: false,
                        };
                    }
                    if (errorPolicy === 'all' &&
                        queryStoreValue.graphQLErrors &&
                        queryStoreValue.graphQLErrors.length > 0) {
                        resultFromStore.errors = queryStoreValue.graphQLErrors;
                    }
                    if (observer.next) {
                        if (previouslyHadError ||
                            !observableQuery ||
                            observableQuery.isDifferentFromLastResult(resultFromStore)) {
                            try {
                                observer.next(resultFromStore);
                            }
                            catch (e) {
                                setTimeout(function () {
                                    throw e;
                                }, 0);
                            }
                        }
                    }
                    previouslyHadError = false;
                }
                catch (error) {
                    previouslyHadError = true;
                    if (observer.error)
                        observer.error(new ApolloError({ networkError: error }));
                    return;
                }
            }
        };
    };
    QueryManager.prototype.watchQuery = function (options, shouldSubscribe) {
        if (shouldSubscribe === void 0) { shouldSubscribe = true; }
        if (options.fetchPolicy === 'standby') {
            throw new Error('client.watchQuery cannot be called with fetchPolicy set to "standby"');
        }
        var queryDefinition = getQueryDefinition(options.query);
        if (queryDefinition.variableDefinitions &&
            queryDefinition.variableDefinitions.length) {
            var defaultValues = getDefaultValues(queryDefinition);
            options.variables = assign({}, defaultValues, options.variables);
        }
        if (typeof options.notifyOnNetworkStatusChange === 'undefined') {
            options.notifyOnNetworkStatusChange = false;
        }
        var transformedOptions = __assign$9({}, options);
        return new ObservableQuery({
            scheduler: this.scheduler,
            options: transformedOptions,
            shouldSubscribe: shouldSubscribe,
        });
    };
    QueryManager.prototype.query = function (options) {
        var _this = this;
        if (!options.query) {
            throw new Error('query option is required. You must specify your GraphQL document ' +
                'in the query option.');
        }
        if (options.query.kind !== 'Document') {
            throw new Error('You must wrap the query string in a "gql" tag.');
        }
        if (options.returnPartialData) {
            throw new Error('returnPartialData option only supported on watchQuery.');
        }
        if (options.pollInterval) {
            throw new Error('pollInterval option only supported on watchQuery.');
        }
        var requestId = this.idCounter;
        return new Promise(function (resolve, reject) {
            _this.addFetchQueryPromise(requestId, resolve, reject);
            return _this.watchQuery(options, false)
                .result()
                .then(function (result) {
                _this.removeFetchQueryPromise(requestId);
                resolve(result);
            })
                .catch(function (error) {
                _this.removeFetchQueryPromise(requestId);
                reject(error);
            });
        });
    };
    QueryManager.prototype.generateQueryId = function () {
        var queryId = this.idCounter.toString();
        this.idCounter++;
        return queryId;
    };
    QueryManager.prototype.stopQueryInStore = function (queryId) {
        this.queryStore.stopQuery(queryId);
        this.invalidate(true, queryId);
        this.broadcastQueries();
    };
    QueryManager.prototype.addQueryListener = function (queryId, listener) {
        this.setQuery(queryId, function (_a) {
            var _b = _a.listeners, listeners = _b === void 0 ? [] : _b;
            return ({
                listeners: listeners.concat([listener]),
                invalidate: false,
            });
        });
    };
    QueryManager.prototype.updateQueryWatch = function (queryId, document, options) {
        var _this = this;
        var cancel = this.getQuery(queryId).cancel;
        if (cancel)
            cancel();
        var previousResult = function () {
            var previousResult = null;
            var observableQuery = _this.getQuery(queryId).observableQuery;
            if (observableQuery) {
                var lastResult = observableQuery.getLastResult();
                if (lastResult) {
                    previousResult = lastResult.data;
                }
            }
            return previousResult;
        };
        return this.dataStore.getCache().watch({
            query: document,
            variables: options.variables,
            optimistic: true,
            previousResult: previousResult,
            callback: function (newData) {
                _this.setQuery(queryId, function () { return ({ invalidated: true, newData: newData }); });
            },
        });
    };
    QueryManager.prototype.addFetchQueryPromise = function (requestId, resolve, reject) {
        this.fetchQueryPromises.set(requestId.toString(), {
            resolve: resolve,
            reject: reject,
        });
    };
    QueryManager.prototype.removeFetchQueryPromise = function (requestId) {
        this.fetchQueryPromises.delete(requestId.toString());
    };
    QueryManager.prototype.addObservableQuery = function (queryId, observableQuery) {
        this.setQuery(queryId, function () { return ({ observableQuery: observableQuery }); });
        var queryDef = getQueryDefinition(observableQuery.options.query);
        if (queryDef.name && queryDef.name.value) {
            var queryName = queryDef.name.value;
            this.queryIdsByName[queryName] = this.queryIdsByName[queryName] || [];
            this.queryIdsByName[queryName].push(observableQuery.queryId);
        }
    };
    QueryManager.prototype.removeObservableQuery = function (queryId) {
        var _a = this.getQuery(queryId), observableQuery = _a.observableQuery, cancel = _a.cancel;
        if (cancel)
            cancel();
        if (!observableQuery)
            return;
        var definition = getQueryDefinition(observableQuery.options.query);
        var queryName = definition.name ? definition.name.value : null;
        this.setQuery(queryId, function () { return ({ observableQuery: null }); });
        if (queryName) {
            this.queryIdsByName[queryName] = this.queryIdsByName[queryName].filter(function (val) {
                return !(observableQuery.queryId === val);
            });
        }
    };
    QueryManager.prototype.clearStore = function () {
        this.fetchQueryPromises.forEach(function (_a) {
            var reject = _a.reject;
            reject(new Error('Store reset while query was in flight(not completed in link chain)'));
        });
        var resetIds = [];
        this.queries.forEach(function (_a, queryId) {
            var observableQuery = _a.observableQuery;
            if (observableQuery)
                resetIds.push(queryId);
        });
        this.queryStore.reset(resetIds);
        this.mutationStore.reset();
        var reset = this.dataStore.reset();
        return reset;
    };
    QueryManager.prototype.resetStore = function () {
        var _this = this;
        return this.clearStore().then(function () {
            return _this.reFetchObservableQueries();
        });
    };
    QueryManager.prototype.reFetchObservableQueries = function (includeStandby) {
        var observableQueryPromises = this.getObservableQueryPromises(includeStandby);
        this.broadcastQueries();
        return Promise.all(observableQueryPromises);
    };
    QueryManager.prototype.startQuery = function (queryId, options, listener) {
        this.addQueryListener(queryId, listener);
        this.fetchQuery(queryId, options)
            .catch(function () { return undefined; });
        return queryId;
    };
    QueryManager.prototype.startGraphQLSubscription = function (options) {
        var _this = this;
        var query = options.query;
        var isCacheEnabled = !(options.fetchPolicy && options.fetchPolicy === 'no-cache');
        var cache = this.dataStore.getCache();
        var transformedDoc = cache.transformDocument(query);
        var variables = assign({}, getDefaultValues(getOperationDefinition(query)), options.variables);
        var sub;
        var observers = [];
        return new Observable$2(function (observer) {
            observers.push(observer);
            if (observers.length === 1) {
                var handler = {
                    next: function (result) {
                        if (isCacheEnabled) {
                            _this.dataStore.markSubscriptionResult(result, transformedDoc, variables);
                            _this.broadcastQueries();
                        }
                        observers.forEach(function (obs) {
                            if (graphQLResultHasError(result) && obs.error) {
                                obs.error(new ApolloError({
                                    graphQLErrors: result.errors,
                                }));
                            }
                            else if (obs.next) {
                                obs.next(result);
                            }
                        });
                    },
                    error: function (error) {
                        observers.forEach(function (obs) {
                            if (obs.error) {
                                obs.error(error);
                            }
                        });
                    },
                };
                var operation = _this.buildOperationForLink(transformedDoc, variables);
                sub = execute(_this.link, operation).subscribe(handler);
            }
            return function () {
                observers = observers.filter(function (obs) { return obs !== observer; });
                if (observers.length === 0 && sub) {
                    sub.unsubscribe();
                }
            };
        });
    };
    QueryManager.prototype.stopQuery = function (queryId) {
        this.stopQueryInStore(queryId);
        this.removeQuery(queryId);
    };
    QueryManager.prototype.removeQuery = function (queryId) {
        var subscriptions = this.getQuery(queryId).subscriptions;
        subscriptions.forEach(function (x) { return x.unsubscribe(); });
        this.queries.delete(queryId);
    };
    QueryManager.prototype.getCurrentQueryResult = function (observableQuery, optimistic) {
        if (optimistic === void 0) { optimistic = true; }
        var _a = observableQuery.options, variables = _a.variables, query = _a.query;
        var lastResult = observableQuery.getLastResult();
        var newData = this.getQuery(observableQuery.queryId).newData;
        if (newData && newData.complete) {
            return { data: newData.result, partial: false };
        }
        else {
            try {
                var data = this.dataStore.getCache().read({
                    query: query,
                    variables: variables,
                    previousResult: lastResult ? lastResult.data : undefined,
                    optimistic: optimistic,
                });
                return { data: data, partial: false };
            }
            catch (e) {
                return { data: {}, partial: true };
            }
        }
    };
    QueryManager.prototype.getQueryWithPreviousResult = function (queryIdOrObservable) {
        var observableQuery;
        if (typeof queryIdOrObservable === 'string') {
            var foundObserveableQuery = this.getQuery(queryIdOrObservable).observableQuery;
            if (!foundObserveableQuery) {
                throw new Error("ObservableQuery with this id doesn't exist: " + queryIdOrObservable);
            }
            observableQuery = foundObserveableQuery;
        }
        else {
            observableQuery = queryIdOrObservable;
        }
        var _a = observableQuery.options, variables = _a.variables, query = _a.query;
        var data = this.getCurrentQueryResult(observableQuery, false).data;
        return {
            previousResult: data,
            variables: variables,
            document: query,
        };
    };
    QueryManager.prototype.broadcastQueries = function () {
        var _this = this;
        this.onBroadcast();
        this.queries.forEach(function (info, id) {
            if (!info.invalidated || !info.listeners)
                return;
            info.listeners
                .filter(function (x) { return !!x; })
                .forEach(function (listener) {
                listener(_this.queryStore.get(id), info.newData);
            });
        });
    };
    QueryManager.prototype.getObservableQueryPromises = function (includeStandby) {
        var _this = this;
        var observableQueryPromises = [];
        this.queries.forEach(function (_a, queryId) {
            var observableQuery = _a.observableQuery;
            if (!observableQuery)
                return;
            var fetchPolicy = observableQuery.options.fetchPolicy;
            observableQuery.resetLastResults();
            if (fetchPolicy !== 'cache-only' &&
                (includeStandby || fetchPolicy !== 'standby')) {
                observableQueryPromises.push(observableQuery.refetch());
            }
            _this.setQuery(queryId, function () { return ({ newData: null }); });
            _this.invalidate(true, queryId);
        });
        return observableQueryPromises;
    };
    QueryManager.prototype.fetchRequest = function (_a) {
        var _this = this;
        var requestId = _a.requestId, queryId = _a.queryId, document = _a.document, options = _a.options, fetchMoreForQueryId = _a.fetchMoreForQueryId;
        var variables = options.variables, context = options.context, _b = options.errorPolicy, errorPolicy = _b === void 0 ? 'none' : _b, fetchPolicy = options.fetchPolicy;
        var operation = this.buildOperationForLink(document, variables, __assign$9({}, context, { forceFetch: !this.queryDeduplication }));
        var resultFromStore;
        var errorsFromStore;
        return new Promise(function (resolve, reject) {
            _this.addFetchQueryPromise(requestId, resolve, reject);
            var subscription = execute(_this.deduplicator, operation).subscribe({
                next: function (result) {
                    var lastRequestId = _this.getQuery(queryId).lastRequestId;
                    if (requestId >= (lastRequestId || 1)) {
                        if (fetchPolicy !== 'no-cache') {
                            try {
                                _this.dataStore.markQueryResult(result, document, variables, fetchMoreForQueryId, errorPolicy === 'ignore' || errorPolicy === 'all');
                            }
                            catch (e) {
                                reject(e);
                                return;
                            }
                        }
                        else {
                            _this.setQuery(queryId, function () { return ({
                                newData: { result: result.data, complete: true },
                            }); });
                        }
                        _this.queryStore.markQueryResult(queryId, result, fetchMoreForQueryId);
                        _this.invalidate(true, queryId, fetchMoreForQueryId);
                        _this.broadcastQueries();
                    }
                    if (result.errors && errorPolicy === 'none') {
                        reject(new ApolloError({
                            graphQLErrors: result.errors,
                        }));
                        return;
                    }
                    else if (errorPolicy === 'all') {
                        errorsFromStore = result.errors;
                    }
                    if (fetchMoreForQueryId || fetchPolicy === 'no-cache') {
                        resultFromStore = result.data;
                    }
                    else {
                        try {
                            resultFromStore = _this.dataStore.getCache().read({
                                variables: variables,
                                query: document,
                                optimistic: false,
                            });
                        }
                        catch (e) { }
                    }
                },
                error: function (error) {
                    _this.removeFetchQueryPromise(requestId);
                    _this.setQuery(queryId, function (_a) {
                        var subscriptions = _a.subscriptions;
                        return ({
                            subscriptions: subscriptions.filter(function (x) { return x !== subscription; }),
                        });
                    });
                    reject(error);
                },
                complete: function () {
                    _this.removeFetchQueryPromise(requestId);
                    _this.setQuery(queryId, function (_a) {
                        var subscriptions = _a.subscriptions;
                        return ({
                            subscriptions: subscriptions.filter(function (x) { return x !== subscription; }),
                        });
                    });
                    resolve({
                        data: resultFromStore,
                        errors: errorsFromStore,
                        loading: false,
                        networkStatus: NetworkStatus.ready,
                        stale: false,
                    });
                },
            });
            _this.setQuery(queryId, function (_a) {
                var subscriptions = _a.subscriptions;
                return ({
                    subscriptions: subscriptions.concat([subscription]),
                });
            });
        });
    };
    QueryManager.prototype.refetchQueryByName = function (queryName) {
        var _this = this;
        var refetchedQueries = this.queryIdsByName[queryName];
        if (refetchedQueries === undefined)
            return;
        return Promise.all(refetchedQueries
            .map(function (id) { return _this.getQuery(id).observableQuery; })
            .filter(function (x) { return !!x; })
            .map(function (x) { return x.refetch(); }));
    };
    QueryManager.prototype.generateRequestId = function () {
        var requestId = this.idCounter;
        this.idCounter++;
        return requestId;
    };
    QueryManager.prototype.getQuery = function (queryId) {
        return this.queries.get(queryId) || {
            listeners: [],
            invalidated: false,
            document: null,
            newData: null,
            lastRequestId: null,
            observableQuery: null,
            subscriptions: [],
        };
    };
    QueryManager.prototype.setQuery = function (queryId, updater) {
        var prev = this.getQuery(queryId);
        var newInfo = __assign$9({}, prev, updater(prev));
        this.queries.set(queryId, newInfo);
    };
    QueryManager.prototype.invalidate = function (invalidated, queryId, fetchMoreForQueryId) {
        if (queryId)
            this.setQuery(queryId, function () { return ({ invalidated: invalidated }); });
        if (fetchMoreForQueryId) {
            this.setQuery(fetchMoreForQueryId, function () { return ({ invalidated: invalidated }); });
        }
    };
    QueryManager.prototype.buildOperationForLink = function (document, variables, extraContext) {
        var cache = this.dataStore.getCache();
        return {
            query: cache.transformForLink
                ? cache.transformForLink(document)
                : document,
            variables: variables,
            operationName: getOperationName(document) || undefined,
            context: __assign$9({}, extraContext, { cache: cache, getCacheKey: function (obj) {
                    if (cache.config) {
                        return cache.config.dataIdFromObject(obj);
                    }
                    else {
                        throw new Error('To use context.getCacheKey, you need to use a cache that has a configurable dataIdFromObject, like apollo-cache-inmemory.');
                    }
                } }),
        };
    };
    return QueryManager;
}());
//# sourceMappingURL=QueryManager.js.map

var DataStore = (function () {
    function DataStore(initialCache) {
        this.cache = initialCache;
    }
    DataStore.prototype.getCache = function () {
        return this.cache;
    };
    DataStore.prototype.markQueryResult = function (result, document, variables, fetchMoreForQueryId, ignoreErrors) {
        if (ignoreErrors === void 0) { ignoreErrors = false; }
        var writeWithErrors = !graphQLResultHasError(result);
        if (ignoreErrors && graphQLResultHasError(result) && result.data) {
            writeWithErrors = true;
        }
        if (!fetchMoreForQueryId && writeWithErrors) {
            this.cache.write({
                result: result.data,
                dataId: 'ROOT_QUERY',
                query: document,
                variables: variables,
            });
        }
    };
    DataStore.prototype.markSubscriptionResult = function (result, document, variables) {
        if (!graphQLResultHasError(result)) {
            this.cache.write({
                result: result.data,
                dataId: 'ROOT_SUBSCRIPTION',
                query: document,
                variables: variables,
            });
        }
    };
    DataStore.prototype.markMutationInit = function (mutation) {
        var _this = this;
        if (mutation.optimisticResponse) {
            var optimistic_1;
            if (typeof mutation.optimisticResponse === 'function') {
                optimistic_1 = mutation.optimisticResponse(mutation.variables);
            }
            else {
                optimistic_1 = mutation.optimisticResponse;
            }
            var changeFn_1 = function () {
                _this.markMutationResult({
                    mutationId: mutation.mutationId,
                    result: { data: optimistic_1 },
                    document: mutation.document,
                    variables: mutation.variables,
                    updateQueries: mutation.updateQueries,
                    update: mutation.update,
                });
            };
            this.cache.recordOptimisticTransaction(function (c) {
                var orig = _this.cache;
                _this.cache = c;
                try {
                    changeFn_1();
                }
                finally {
                    _this.cache = orig;
                }
            }, mutation.mutationId);
        }
    };
    DataStore.prototype.markMutationResult = function (mutation) {
        var _this = this;
        if (!graphQLResultHasError(mutation.result)) {
            var cacheWrites_1 = [];
            cacheWrites_1.push({
                result: mutation.result.data,
                dataId: 'ROOT_MUTATION',
                query: mutation.document,
                variables: mutation.variables,
            });
            if (mutation.updateQueries) {
                Object.keys(mutation.updateQueries)
                    .filter(function (id) { return mutation.updateQueries[id]; })
                    .forEach(function (queryId) {
                    var _a = mutation.updateQueries[queryId], query = _a.query, updater = _a.updater;
                    var _b = _this.cache.diff({
                        query: query.document,
                        variables: query.variables,
                        returnPartialData: true,
                        optimistic: false,
                    }), currentQueryResult = _b.result, complete = _b.complete;
                    if (!complete) {
                        return;
                    }
                    var nextQueryResult = tryFunctionOrLogError(function () {
                        return updater(currentQueryResult, {
                            mutationResult: mutation.result,
                            queryName: getOperationName(query.document) || undefined,
                            queryVariables: query.variables,
                        });
                    });
                    if (nextQueryResult) {
                        cacheWrites_1.push({
                            result: nextQueryResult,
                            dataId: 'ROOT_QUERY',
                            query: query.document,
                            variables: query.variables,
                        });
                    }
                });
            }
            this.cache.performTransaction(function (c) {
                cacheWrites_1.forEach(function (write) { return c.write(write); });
            });
            var update_1 = mutation.update;
            if (update_1) {
                this.cache.performTransaction(function (c) {
                    tryFunctionOrLogError(function () { return update_1(c, mutation.result); });
                });
            }
        }
    };
    DataStore.prototype.markMutationComplete = function (_a) {
        var mutationId = _a.mutationId, optimisticResponse = _a.optimisticResponse;
        if (!optimisticResponse)
            return;
        this.cache.removeOptimistic(mutationId);
    };
    DataStore.prototype.markUpdateQueryResult = function (document, variables, newResult) {
        this.cache.write({
            result: newResult,
            dataId: 'ROOT_QUERY',
            variables: variables,
            query: document,
        });
    };
    DataStore.prototype.reset = function () {
        return this.cache.reset();
    };
    return DataStore;
}());
//# sourceMappingURL=store.js.map

var version_1 = "2.4.6";

var __assign$a = (undefined && undefined.__assign) || function () {
    __assign$a = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign$a.apply(this, arguments);
};
var hasSuggestedDevtools = false;
var ApolloClient = (function () {
    function ApolloClient(options) {
        var _this = this;
        this.defaultOptions = {};
        this.resetStoreCallbacks = [];
        var link = options.link, cache = options.cache, _a = options.ssrMode, ssrMode = _a === void 0 ? false : _a, _b = options.ssrForceFetchDelay, ssrForceFetchDelay = _b === void 0 ? 0 : _b, connectToDevTools = options.connectToDevTools, _c = options.queryDeduplication, queryDeduplication = _c === void 0 ? true : _c, defaultOptions = options.defaultOptions;
        if (!link || !cache) {
            throw new Error("\n        In order to initialize Apollo Client, you must specify link & cache properties on the config object.\n        This is part of the required upgrade when migrating from Apollo Client 1.0 to Apollo Client 2.0.\n        For more information, please visit:\n          https://www.apollographql.com/docs/react/basics/setup.html\n        to help you get started.\n      ");
        }
        var supportedCache = new Map();
        var supportedDirectives = new ApolloLink(function (operation, forward) {
            var result = supportedCache.get(operation.query);
            if (!result) {
                result = removeConnectionDirectiveFromDocument(operation.query);
                supportedCache.set(operation.query, result);
                supportedCache.set(result, result);
            }
            operation.query = result;
            return forward(operation);
        });
        this.link = supportedDirectives.concat(link);
        this.cache = cache;
        this.store = new DataStore(cache);
        this.disableNetworkFetches = ssrMode || ssrForceFetchDelay > 0;
        this.queryDeduplication = queryDeduplication;
        this.ssrMode = ssrMode;
        this.defaultOptions = defaultOptions || {};
        if (ssrForceFetchDelay) {
            setTimeout(function () { return (_this.disableNetworkFetches = false); }, ssrForceFetchDelay);
        }
        this.watchQuery = this.watchQuery.bind(this);
        this.query = this.query.bind(this);
        this.mutate = this.mutate.bind(this);
        this.resetStore = this.resetStore.bind(this);
        this.reFetchObservableQueries = this.reFetchObservableQueries.bind(this);
        var defaultConnectToDevTools = !isProduction() &&
            typeof window !== 'undefined' &&
            !window.__APOLLO_CLIENT__;
        if (typeof connectToDevTools === 'undefined'
            ? defaultConnectToDevTools
            : connectToDevTools && typeof window !== 'undefined') {
            window.__APOLLO_CLIENT__ = this;
        }
        if (!hasSuggestedDevtools && !isProduction()) {
            hasSuggestedDevtools = true;
            if (typeof window !== 'undefined' &&
                window.document &&
                window.top === window.self) {
                if (typeof window.__APOLLO_DEVTOOLS_GLOBAL_HOOK__ === 'undefined') {
                    if (window.navigator &&
                        window.navigator.userAgent &&
                        window.navigator.userAgent.indexOf('Chrome') > -1) {
                        console.debug('Download the Apollo DevTools ' +
                            'for a better development experience: ' +
                            'https://chrome.google.com/webstore/detail/apollo-client-developer-t/jdkknkkbebbapilgoeccciglkfbmbnfm');
                    }
                }
            }
        }
        this.version = version_1;
    }
    ApolloClient.prototype.watchQuery = function (options) {
        if (this.defaultOptions.watchQuery) {
            options = __assign$a({}, this.defaultOptions.watchQuery, options);
        }
        if (this.disableNetworkFetches &&
            (options.fetchPolicy === 'network-only' ||
                options.fetchPolicy === 'cache-and-network')) {
            options = __assign$a({}, options, { fetchPolicy: 'cache-first' });
        }
        return this.initQueryManager().watchQuery(options);
    };
    ApolloClient.prototype.query = function (options) {
        if (this.defaultOptions.query) {
            options = __assign$a({}, this.defaultOptions.query, options);
        }
        if (options.fetchPolicy === 'cache-and-network') {
            throw new Error('cache-and-network fetchPolicy can only be used with watchQuery');
        }
        if (this.disableNetworkFetches && options.fetchPolicy === 'network-only') {
            options = __assign$a({}, options, { fetchPolicy: 'cache-first' });
        }
        return this.initQueryManager().query(options);
    };
    ApolloClient.prototype.mutate = function (options) {
        if (this.defaultOptions.mutate) {
            options = __assign$a({}, this.defaultOptions.mutate, options);
        }
        return this.initQueryManager().mutate(options);
    };
    ApolloClient.prototype.subscribe = function (options) {
        return this.initQueryManager().startGraphQLSubscription(options);
    };
    ApolloClient.prototype.readQuery = function (options, optimistic) {
        if (optimistic === void 0) { optimistic = false; }
        return this.initProxy().readQuery(options, optimistic);
    };
    ApolloClient.prototype.readFragment = function (options, optimistic) {
        if (optimistic === void 0) { optimistic = false; }
        return this.initProxy().readFragment(options, optimistic);
    };
    ApolloClient.prototype.writeQuery = function (options) {
        var result = this.initProxy().writeQuery(options);
        this.initQueryManager().broadcastQueries();
        return result;
    };
    ApolloClient.prototype.writeFragment = function (options) {
        var result = this.initProxy().writeFragment(options);
        this.initQueryManager().broadcastQueries();
        return result;
    };
    ApolloClient.prototype.writeData = function (options) {
        var result = this.initProxy().writeData(options);
        this.initQueryManager().broadcastQueries();
        return result;
    };
    ApolloClient.prototype.__actionHookForDevTools = function (cb) {
        this.devToolsHookCb = cb;
    };
    ApolloClient.prototype.__requestRaw = function (payload) {
        return execute(this.link, payload);
    };
    ApolloClient.prototype.initQueryManager = function () {
        var _this = this;
        if (!this.queryManager) {
            this.queryManager = new QueryManager({
                link: this.link,
                store: this.store,
                queryDeduplication: this.queryDeduplication,
                ssrMode: this.ssrMode,
                onBroadcast: function () {
                    if (_this.devToolsHookCb) {
                        _this.devToolsHookCb({
                            action: {},
                            state: {
                                queries: _this.queryManager
                                    ? _this.queryManager.queryStore.getStore()
                                    : {},
                                mutations: _this.queryManager
                                    ? _this.queryManager.mutationStore.getStore()
                                    : {},
                            },
                            dataWithOptimisticResults: _this.cache.extract(true),
                        });
                    }
                },
            });
        }
        return this.queryManager;
    };
    ApolloClient.prototype.resetStore = function () {
        var _this = this;
        return Promise.resolve()
            .then(function () {
            return _this.queryManager
                ? _this.queryManager.clearStore()
                : Promise.resolve(null);
        })
            .then(function () { return Promise.all(_this.resetStoreCallbacks.map(function (fn) { return fn(); })); })
            .then(function () {
            return _this.queryManager && _this.queryManager.reFetchObservableQueries
                ? _this.queryManager.reFetchObservableQueries()
                : Promise.resolve(null);
        });
    };
    ApolloClient.prototype.clearStore = function () {
        var queryManager = this.queryManager;
        return Promise.resolve().then(function () { return (queryManager ? queryManager.clearStore() : Promise.resolve(null)); });
    };
    ApolloClient.prototype.onResetStore = function (cb) {
        var _this = this;
        this.resetStoreCallbacks.push(cb);
        return function () {
            _this.resetStoreCallbacks = _this.resetStoreCallbacks.filter(function (c) { return c !== cb; });
        };
    };
    ApolloClient.prototype.reFetchObservableQueries = function (includeStandby) {
        return this.queryManager
            ? this.queryManager.reFetchObservableQueries(includeStandby)
            : Promise.resolve(null);
    };
    ApolloClient.prototype.extract = function (optimistic) {
        return this.initProxy().extract(optimistic);
    };
    ApolloClient.prototype.restore = function (serializedState) {
        return this.initProxy().restore(serializedState);
    };
    ApolloClient.prototype.initProxy = function () {
        if (!this.proxy) {
            this.initQueryManager();
            this.proxy = this.cache;
        }
        return this.proxy;
    };
    return ApolloClient;
}());
//# sourceMappingURL=ApolloClient.js.map

//# sourceMappingURL=index.js.map

var genericMessage = "Invariant Violation";
var _a = Object.setPrototypeOf, setPrototypeOf = _a === void 0 ? function (obj, proto) {
    obj.__proto__ = proto;
    return obj;
} : _a;
var InvariantError = /** @class */ (function (_super) {
    __extends(InvariantError, _super);
    function InvariantError(message) {
        if (message === void 0) { message = genericMessage; }
        var _this = _super.call(this, message) || this;
        _this.framesToPop = 1;
        _this.name = genericMessage;
        setPrototypeOf(_this, InvariantError.prototype);
        return _this;
    }
    return InvariantError;
}(Error));
function invariant$1(condition, message) {
    if (!condition) {
        throw new InvariantError(message);
    }
}
(function (invariant) {
    function warn() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return console.warn.apply(console, args);
    }
    invariant.warn = warn;
    function error() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return console.error.apply(console, args);
    }
    invariant.error = error;
})(invariant$1 || (invariant$1 = {}));

function isStringValue$2(value) {
    return value.kind === 'StringValue';
}
function isBooleanValue$2(value) {
    return value.kind === 'BooleanValue';
}
function isIntValue$2(value) {
    return value.kind === 'IntValue';
}
function isFloatValue$2(value) {
    return value.kind === 'FloatValue';
}
function isVariable$2(value) {
    return value.kind === 'Variable';
}
function isObjectValue$2(value) {
    return value.kind === 'ObjectValue';
}
function isListValue$2(value) {
    return value.kind === 'ListValue';
}
function isEnumValue$2(value) {
    return value.kind === 'EnumValue';
}
function isNullValue$2(value) {
    return value.kind === 'NullValue';
}
function valueToObjectRepresentation$2(argObj, name, value, variables) {
    if (isIntValue$2(value) || isFloatValue$2(value)) {
        argObj[name.value] = Number(value.value);
    }
    else if (isBooleanValue$2(value) || isStringValue$2(value)) {
        argObj[name.value] = value.value;
    }
    else if (isObjectValue$2(value)) {
        var nestedArgObj_1 = {};
        value.fields.map(function (obj) {
            return valueToObjectRepresentation$2(nestedArgObj_1, obj.name, obj.value, variables);
        });
        argObj[name.value] = nestedArgObj_1;
    }
    else if (isVariable$2(value)) {
        var variableValue = (variables || {})[value.name.value];
        argObj[name.value] = variableValue;
    }
    else if (isListValue$2(value)) {
        argObj[name.value] = value.values.map(function (listValue) {
            var nestedArgArrayObj = {};
            valueToObjectRepresentation$2(nestedArgArrayObj, name, listValue, variables);
            return nestedArgArrayObj[name.value];
        });
    }
    else if (isEnumValue$2(value)) {
        argObj[name.value] = value.value;
    }
    else if (isNullValue$2(value)) {
        argObj[name.value] = null;
    }
    else {
        throw process.env.NODE_ENV === "production" ? new InvariantError() : new InvariantError("The inline argument \"" + name.value + "\" of kind \"" + value.kind + "\"" +
            'is not supported. Use variables instead of inline arguments to ' +
            'overcome this limitation.');
    }
}
function storeKeyNameFromField$2(field, variables) {
    var directivesObj = null;
    if (field.directives) {
        directivesObj = {};
        field.directives.forEach(function (directive) {
            directivesObj[directive.name.value] = {};
            if (directive.arguments) {
                directive.arguments.forEach(function (_a) {
                    var name = _a.name, value = _a.value;
                    return valueToObjectRepresentation$2(directivesObj[directive.name.value], name, value, variables);
                });
            }
        });
    }
    var argObj = null;
    if (field.arguments && field.arguments.length) {
        argObj = {};
        field.arguments.forEach(function (_a) {
            var name = _a.name, value = _a.value;
            return valueToObjectRepresentation$2(argObj, name, value, variables);
        });
    }
    return getStoreKeyName$2(field.name.value, argObj, directivesObj);
}
var KNOWN_DIRECTIVES$2 = [
    'connection',
    'include',
    'skip',
    'client',
    'rest',
    'export',
];
function getStoreKeyName$2(fieldName, args, directives) {
    if (directives &&
        directives['connection'] &&
        directives['connection']['key']) {
        if (directives['connection']['filter'] &&
            directives['connection']['filter'].length > 0) {
            var filterKeys = directives['connection']['filter']
                ? directives['connection']['filter']
                : [];
            filterKeys.sort();
            var queryArgs_1 = args;
            var filteredArgs_1 = {};
            filterKeys.forEach(function (key) {
                filteredArgs_1[key] = queryArgs_1[key];
            });
            return directives['connection']['key'] + "(" + JSON.stringify(filteredArgs_1) + ")";
        }
        else {
            return directives['connection']['key'];
        }
    }
    var completeFieldName = fieldName;
    if (args) {
        var stringifiedArgs = fastJsonStableStringify(args);
        completeFieldName += "(" + stringifiedArgs + ")";
    }
    if (directives) {
        Object.keys(directives).forEach(function (key) {
            if (KNOWN_DIRECTIVES$2.indexOf(key) !== -1)
                return;
            if (directives[key] && Object.keys(directives[key]).length) {
                completeFieldName += "@" + key + "(" + JSON.stringify(directives[key]) + ")";
            }
            else {
                completeFieldName += "@" + key;
            }
        });
    }
    return completeFieldName;
}
function argumentsObjectFromField$2(field, variables) {
    if (field.arguments && field.arguments.length) {
        var argObj_1 = {};
        field.arguments.forEach(function (_a) {
            var name = _a.name, value = _a.value;
            return valueToObjectRepresentation$2(argObj_1, name, value, variables);
        });
        return argObj_1;
    }
    return null;
}
function resultKeyNameFromField$2(field) {
    return field.alias ? field.alias.value : field.name.value;
}
function isField$2(selection) {
    return selection.kind === 'Field';
}
function isInlineFragment$2(selection) {
    return selection.kind === 'InlineFragment';
}
function isIdValue$2(idObject) {
    return idObject &&
        idObject.type === 'id' &&
        typeof idObject.generated === 'boolean';
}
function toIdValue$2(idConfig, generated) {
    if (generated === void 0) { generated = false; }
    return __assign({ type: 'id', generated: generated }, (typeof idConfig === 'string'
        ? { id: idConfig, typename: undefined }
        : idConfig));
}
function isJsonValue$2(jsonObject) {
    return (jsonObject != null &&
        typeof jsonObject === 'object' &&
        jsonObject.type === 'json');
}

function getDirectiveInfoFromField$2(field, variables) {
    if (field.directives && field.directives.length) {
        var directiveObj_1 = {};
        field.directives.forEach(function (directive) {
            directiveObj_1[directive.name.value] = argumentsObjectFromField$2(directive, variables);
        });
        return directiveObj_1;
    }
    return null;
}
function shouldInclude$2(selection, variables) {
    if (variables === void 0) { variables = {}; }
    if (!selection.directives) {
        return true;
    }
    var res = true;
    selection.directives.forEach(function (directive) {
        if (directive.name.value !== 'skip' && directive.name.value !== 'include') {
            return;
        }
        var directiveArguments = directive.arguments || [];
        var directiveName = directive.name.value;
        process.env.NODE_ENV === "production" ? invariant$1(directiveArguments.length === 1) : invariant$1(directiveArguments.length === 1, "Incorrect number of arguments for the @" + directiveName + " directive.");
        var ifArgument = directiveArguments[0];
        process.env.NODE_ENV === "production" ? invariant$1(ifArgument.name && ifArgument.name.value === 'if') : invariant$1(ifArgument.name && ifArgument.name.value === 'if', "Invalid argument for the @" + directiveName + " directive.");
        var ifValue = directiveArguments[0].value;
        var evaledValue = false;
        if (!ifValue || ifValue.kind !== 'BooleanValue') {
            process.env.NODE_ENV === "production" ? invariant$1(ifValue.kind === 'Variable') : invariant$1(ifValue.kind === 'Variable', "Argument for the @" + directiveName + " directive must be a variable or a boolean value.");
            evaledValue = variables[ifValue.name.value];
            process.env.NODE_ENV === "production" ? invariant$1(evaledValue !== void 0) : invariant$1(evaledValue !== void 0, "Invalid variable referenced in @" + directiveName + " directive.");
        }
        else {
            evaledValue = ifValue.value;
        }
        if (directiveName === 'skip') {
            evaledValue = !evaledValue;
        }
        if (!evaledValue) {
            res = false;
        }
    });
    return res;
}

function getFragmentQueryDocument$2(document, fragmentName) {
    var actualFragmentName = fragmentName;
    var fragments = [];
    document.definitions.forEach(function (definition) {
        if (definition.kind === 'OperationDefinition') {
            throw process.env.NODE_ENV === "production" ? new InvariantError() : new InvariantError("Found a " + definition.operation + " operation" + (definition.name ? " named '" + definition.name.value + "'" : '') + ". " +
                'No operations are allowed when using a fragment as a query. Only fragments are allowed.');
        }
        if (definition.kind === 'FragmentDefinition') {
            fragments.push(definition);
        }
    });
    if (typeof actualFragmentName === 'undefined') {
        process.env.NODE_ENV === "production" ? invariant$1(fragments.length === 1) : invariant$1(fragments.length === 1, "Found " + fragments.length + " fragments. `fragmentName` must be provided when there is not exactly 1 fragment.");
        actualFragmentName = fragments[0].name.value;
    }
    var query = __assign({}, document, { definitions: [
            {
                kind: 'OperationDefinition',
                operation: 'query',
                selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                        {
                            kind: 'FragmentSpread',
                            name: {
                                kind: 'Name',
                                value: actualFragmentName,
                            },
                        },
                    ],
                },
            }
        ].concat(document.definitions) });
    return query;
}

function assign$2(target) {
    var sources = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        sources[_i - 1] = arguments[_i];
    }
    sources.forEach(function (source) {
        if (typeof source === 'undefined' || source === null) {
            return;
        }
        Object.keys(source).forEach(function (key) {
            target[key] = source[key];
        });
    });
    return target;
}
function checkDocument$2(doc) {
    process.env.NODE_ENV === "production" ? invariant$1(doc && doc.kind === 'Document') : invariant$1(doc && doc.kind === 'Document', "Expecting a parsed GraphQL document. Perhaps you need to wrap the query string in a \"gql\" tag? http://docs.apollostack.com/apollo-client/core.html#gql");
    var operations = doc.definitions
        .filter(function (d) { return d.kind !== 'FragmentDefinition'; })
        .map(function (definition) {
        if (definition.kind !== 'OperationDefinition') {
            throw process.env.NODE_ENV === "production" ? new InvariantError() : new InvariantError("Schema type definitions not allowed in queries. Found: \"" + definition.kind + "\"");
        }
        return definition;
    });
    process.env.NODE_ENV === "production" ? invariant$1(operations.length <= 1) : invariant$1(operations.length <= 1, "Ambiguous GraphQL document: contains " + operations.length + " operations");
    return doc;
}
function getOperationDefinition$2(doc) {
    checkDocument$2(doc);
    return doc.definitions.filter(function (definition) { return definition.kind === 'OperationDefinition'; })[0];
}
function getFragmentDefinitions$2(doc) {
    return doc.definitions.filter(function (definition) { return definition.kind === 'FragmentDefinition'; });
}
function getQueryDefinition$2(doc) {
    var queryDef = getOperationDefinition$2(doc);
    process.env.NODE_ENV === "production" ? invariant$1(queryDef && queryDef.operation === 'query') : invariant$1(queryDef && queryDef.operation === 'query', 'Must contain a query definition.');
    return queryDef;
}
function getMainDefinition$2(queryDoc) {
    checkDocument$2(queryDoc);
    var fragmentDefinition;
    for (var _i = 0, _a = queryDoc.definitions; _i < _a.length; _i++) {
        var definition = _a[_i];
        if (definition.kind === 'OperationDefinition') {
            var operation = definition.operation;
            if (operation === 'query' ||
                operation === 'mutation' ||
                operation === 'subscription') {
                return definition;
            }
        }
        if (definition.kind === 'FragmentDefinition' && !fragmentDefinition) {
            fragmentDefinition = definition;
        }
    }
    if (fragmentDefinition) {
        return fragmentDefinition;
    }
    throw process.env.NODE_ENV === "production" ? new InvariantError() : new InvariantError('Expected a parsed GraphQL query with a query, mutation, subscription, or a fragment.');
}
function createFragmentMap$2(fragments) {
    if (fragments === void 0) { fragments = []; }
    var symTable = {};
    fragments.forEach(function (fragment) {
        symTable[fragment.name.value] = fragment;
    });
    return symTable;
}
function getDefaultValues$2(definition) {
    if (definition &&
        definition.variableDefinitions &&
        definition.variableDefinitions.length) {
        var defaultValues = definition.variableDefinitions
            .filter(function (_a) {
            var defaultValue = _a.defaultValue;
            return defaultValue;
        })
            .map(function (_a) {
            var variable = _a.variable, defaultValue = _a.defaultValue;
            var defaultValueObj = {};
            valueToObjectRepresentation$2(defaultValueObj, variable.name, defaultValue);
            return defaultValueObj;
        });
        return assign$2.apply(void 0, [{}].concat(defaultValues));
    }
    return {};
}

var TYPENAME_FIELD$2 = {
    kind: 'Field',
    name: {
        kind: 'Name',
        value: '__typename',
    },
};
function addTypenameToDocument$2(doc) {
    return visitor_1(checkDocument$2(doc), {
        SelectionSet: {
            enter: function (node, _key, parent) {
                if (parent &&
                    parent.kind === 'OperationDefinition') {
                    return;
                }
                var selections = node.selections;
                if (!selections) {
                    return;
                }
                var skip = selections.some(function (selection) {
                    return (selection.kind === 'Field' &&
                        (selection.name.value === '__typename' ||
                            selection.name.value.lastIndexOf('__', 0) === 0));
                });
                if (skip) {
                    return;
                }
                return __assign({}, node, { selections: selections.concat([TYPENAME_FIELD$2]) });
            },
        },
    });
}

function getEnv$2() {
    if (typeof process !== 'undefined' && process.env.NODE_ENV) {
        return process.env.NODE_ENV;
    }
    return 'development';
}
function isEnv$2(env) {
    return getEnv$2() === env;
}
function isProduction$2() {
    return isEnv$2('production') === true;
}
function isTest$2() {
    return isEnv$2('test') === true;
}

function isEqual$3(a, b) {
    if (a === b) {
        return true;
    }
    if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime();
    }
    if (a != null &&
        typeof a === 'object' &&
        b != null &&
        typeof b === 'object') {
        for (var key in a) {
            if (Object.prototype.hasOwnProperty.call(a, key)) {
                if (!Object.prototype.hasOwnProperty.call(b, key)) {
                    return false;
                }
                if (!isEqual$3(a[key], b[key])) {
                    return false;
                }
            }
        }
        for (var key in b) {
            if (Object.prototype.hasOwnProperty.call(b, key) &&
                !Object.prototype.hasOwnProperty.call(a, key)) {
                return false;
            }
        }
        return true;
    }
    return false;
}

var hasOwnProperty = Object.prototype.hasOwnProperty;
function mergeDeepArray(sources) {
    var target = sources[0] || {};
    var count = sources.length;
    if (count > 1) {
        var pastCopies = [];
        target = shallowCopyForMerge(target, pastCopies);
        for (var i = 1; i < count; ++i) {
            target = mergeHelper(target, sources[i], pastCopies);
        }
    }
    return target;
}
function isObject(obj) {
    return obj !== null && typeof obj === 'object';
}
function mergeHelper(target, source, pastCopies) {
    if (isObject(source) && isObject(target)) {
        if (Object.isExtensible && !Object.isExtensible(target)) {
            target = shallowCopyForMerge(target, pastCopies);
        }
        Object.keys(source).forEach(function (sourceKey) {
            var sourceValue = source[sourceKey];
            if (hasOwnProperty.call(target, sourceKey)) {
                var targetValue = target[sourceKey];
                if (sourceValue !== targetValue) {
                    target[sourceKey] = mergeHelper(shallowCopyForMerge(targetValue, pastCopies), sourceValue, pastCopies);
                }
            }
            else {
                target[sourceKey] = sourceValue;
            }
        });
        return target;
    }
    return source;
}
function shallowCopyForMerge(value, pastCopies) {
    if (value !== null &&
        typeof value === 'object' &&
        pastCopies.indexOf(value) < 0) {
        if (Array.isArray(value)) {
            value = value.slice(0);
        }
        else {
            value = __assign({ __proto__: Object.getPrototypeOf(value) }, value);
        }
        pastCopies.push(value);
    }
    return value;
}
//# sourceMappingURL=bundle.esm.js.map

function queryFromPojo(obj) {
    var op = {
        kind: 'OperationDefinition',
        operation: 'query',
        name: {
            kind: 'Name',
            value: 'GeneratedClientQuery',
        },
        selectionSet: selectionSetFromObj(obj),
    };
    var out = {
        kind: 'Document',
        definitions: [op],
    };
    return out;
}
function fragmentFromPojo(obj, typename) {
    var frag = {
        kind: 'FragmentDefinition',
        typeCondition: {
            kind: 'NamedType',
            name: {
                kind: 'Name',
                value: typename || '__FakeType',
            },
        },
        name: {
            kind: 'Name',
            value: 'GeneratedClientQuery',
        },
        selectionSet: selectionSetFromObj(obj),
    };
    var out = {
        kind: 'Document',
        definitions: [frag],
    };
    return out;
}
function selectionSetFromObj(obj) {
    if (typeof obj === 'number' ||
        typeof obj === 'boolean' ||
        typeof obj === 'string' ||
        typeof obj === 'undefined' ||
        obj === null) {
        return null;
    }
    if (Array.isArray(obj)) {
        return selectionSetFromObj(obj[0]);
    }
    var selections = [];
    Object.keys(obj).forEach(function (key) {
        var nestedSelSet = selectionSetFromObj(obj[key]);
        var field = {
            kind: 'Field',
            name: {
                kind: 'Name',
                value: key,
            },
            selectionSet: nestedSelSet || undefined,
        };
        selections.push(field);
    });
    var selectionSet = {
        kind: 'SelectionSet',
        selections: selections,
    };
    return selectionSet;
}
var justTypenameQuery = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'query',
            name: null,
            variableDefinitions: null,
            directives: [],
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        alias: null,
                        name: {
                            kind: 'Name',
                            value: '__typename',
                        },
                        arguments: [],
                        directives: [],
                        selectionSet: null,
                    },
                ],
            },
        },
    ],
};

var ApolloCache = (function () {
    function ApolloCache() {
    }
    ApolloCache.prototype.transformDocument = function (document) {
        return document;
    };
    ApolloCache.prototype.transformForLink = function (document) {
        return document;
    };
    ApolloCache.prototype.readQuery = function (options, optimistic) {
        if (optimistic === void 0) { optimistic = false; }
        return this.read({
            query: options.query,
            variables: options.variables,
            optimistic: optimistic,
        });
    };
    ApolloCache.prototype.readFragment = function (options, optimistic) {
        if (optimistic === void 0) { optimistic = false; }
        return this.read({
            query: getFragmentQueryDocument$2(options.fragment, options.fragmentName),
            variables: options.variables,
            rootId: options.id,
            optimistic: optimistic,
        });
    };
    ApolloCache.prototype.writeQuery = function (options) {
        this.write({
            dataId: 'ROOT_QUERY',
            result: options.data,
            query: options.query,
            variables: options.variables,
        });
    };
    ApolloCache.prototype.writeFragment = function (options) {
        this.write({
            dataId: options.id,
            result: options.data,
            variables: options.variables,
            query: getFragmentQueryDocument$2(options.fragment, options.fragmentName),
        });
    };
    ApolloCache.prototype.writeData = function (_a) {
        var id = _a.id, data = _a.data;
        if (typeof id !== 'undefined') {
            var typenameResult = null;
            try {
                typenameResult = this.read({
                    rootId: id,
                    optimistic: false,
                    query: justTypenameQuery,
                });
            }
            catch (e) {
            }
            var __typename = (typenameResult && typenameResult.__typename) || '__ClientData';
            var dataToWrite = Object.assign({ __typename: __typename }, data);
            this.writeFragment({
                id: id,
                fragment: fragmentFromPojo(dataToWrite, __typename),
                data: dataToWrite,
            });
        }
        else {
            this.writeQuery({ query: queryFromPojo(data), data: data });
        }
    };
    return ApolloCache;
}());
//# sourceMappingURL=bundle.esm.js.map

function Cache$1(options) {
  this.map = new Map;
  this.newest = null;
  this.oldest = null;
  this.max = options && options.max;
  this.dispose = options && options.dispose;
}

var Cache_1 = Cache$1;

var Cp = Cache$1.prototype;

Cp.has = function (key) {
  return this.map.has(key);
};

Cp.get = function (key) {
  var entry = getEntry(this, key);
  return entry && entry.value;
};

function getEntry(cache, key) {
  var entry = cache.map.get(key);
  if (entry &&
      entry !== cache.newest) {
    var older = entry.older;
    var newer = entry.newer;

    if (newer) {
      newer.older = older;
    }

    if (older) {
      older.newer = newer;
    }

    entry.older = cache.newest;
    entry.older.newer = entry;

    entry.newer = null;
    cache.newest = entry;

    if (entry === cache.oldest) {
      cache.oldest = newer;
    }
  }

  return entry;
}

Cp.set = function (key, value) {
  var entry = getEntry(this, key);
  if (entry) {
    return entry.value = value;
  }

  entry = {
    key: key,
    value: value,
    newer: null,
    older: this.newest
  };

  if (this.newest) {
    this.newest.newer = entry;
  }

  this.newest = entry;
  this.oldest = this.oldest || entry;

  this.map.set(key, entry);

  return entry.value;
};

Cp.clean = function () {
  if (typeof this.max === "number") {
    while (this.oldest &&
           this.map.size > this.max) {
      this.delete(this.oldest.key);
    }
  }
};

Cp.delete = function (key) {
  var entry = this.map.get(key);
  if (entry) {
    if (entry === this.newest) {
      this.newest = entry.older;
    }

    if (entry === this.oldest) {
      this.oldest = entry.newer;
    }

    if (entry.newer) {
      entry.newer.older = entry.older;
    }

    if (entry.older) {
      entry.older.newer = entry.newer;
    }

    this.map.delete(key);

    if (typeof this.dispose === "function") {
      this.dispose(key, entry.value);
    }

    return true;
  }

  return false;
};

var cache = {
	Cache: Cache_1
};

var tuple_1 = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, '__esModule', { value: true });

// Although `Symbol` is widely supported these days, we can safely fall
// back to using a non-enumerable string property without violating any
// assumptions elsewhere in the implementation.
var useSymbol =
  typeof Symbol === "function" &&
  typeof Symbol.for === "function";

// Used to mark `tuple.prototype` so that all objects that inherit from
// any `tuple.prototype` object (there could be more than one) will test
// positive according to `tuple.isTuple`.
var brand = useSymbol
  ? Symbol.for("immutable-tuple")
  : "@@__IMMUTABLE_TUPLE__@@";

// Used to save a reference to the globally shared `UniversalWeakMap` that
// stores all known `tuple` objects.
var globalKey = useSymbol
  ? Symbol.for("immutable-tuple-root")
  : "@@__IMMUTABLE_TUPLE_ROOT__@@";

// Convenient helper for defining hidden immutable properties.
function def(obj, name, value, enumerable) {
  Object.defineProperty(obj, name, {
    value: value,
    enumerable: !! enumerable,
    writable: false,
    configurable: false
  });
  return value;
}

var freeze = Object.freeze || function (obj) {
  return obj;
};

function isObjRef(value) {
  switch (typeof value) {
  case "object":
    if (value === null) {
      return false;
    }
  case "function":
    return true;
  default:
    return false;
  }
}

// The `mustConvertThisToArray` value is true when the corresponding
// `Array` method does not attempt to modify `this`, which means we can
// pass a `tuple` object as `this` without first converting it to an
// `Array`.
function forEachArrayMethod(fn) {
  function call(name, mustConvertThisToArray) {
    var desc = Object.getOwnPropertyDescriptor(Array.prototype, name);
    fn(name, desc, !! mustConvertThisToArray);
  }

  call("every");
  call("filter");
  call("find");
  call("findIndex");
  call("forEach");
  call("includes");
  call("indexOf");
  call("join");
  call("lastIndexOf");
  call("map");
  call("reduce");
  call("reduceRight");
  call("slice");
  call("some");
  call("toLocaleString");
  call("toString");

  // The `reverse` and `sort` methods are usually destructive, but for
  // `tuple` objects they return a new `tuple` object that has been
  // appropriately reversed/sorted.
  call("reverse", true);
  call("sort", true);

  // Make `[...someTuple]` work.
  call(useSymbol && Symbol.iterator || "@@iterator");
}

// A map data structure that holds object keys weakly, yet can also hold
// non-object keys, unlike the native `WeakMap`.
var UniversalWeakMap = function UniversalWeakMap() {
  // Since a `WeakMap` cannot hold primitive values as keys, we need a
  // backup `Map` instance to hold primitive keys. Both `this._weakMap`
  // and `this._strongMap` are lazily initialized.
  this._weakMap = null;
  this._strongMap = null;
  this.data = null;
};

// Since `get` and `set` are the only methods used, that's all I've
// implemented here.

UniversalWeakMap.prototype.get = function get (key) {
  var map = this._getMap(key, false);
  if (map) {
    return map.get(key);
  }
};

UniversalWeakMap.prototype.set = function set (key, value) {
  this._getMap(key, true).set(key, value);
  // An actual `Map` or `WeakMap` would return `this` here, but
  // returning the `value` is more convenient for the `tuple`
  // implementation.
  return value;
};

UniversalWeakMap.prototype._getMap = function _getMap (key, canCreate) {
  if (! canCreate) {
    return isObjRef(key) ? this._weakMap : this._strongMap;
  }
  if (isObjRef(key)) {
    return this._weakMap || (this._weakMap = new WeakMap);
  }
  return this._strongMap || (this._strongMap = new Map);
};

// See [`universal-weak-map.js`](universal-weak-map.html).
// See [`util.js`](util.html).
// If this package is installed multiple times, there could be mutiple
// implementations of the `tuple` function with distinct `tuple.prototype`
// objects, but the shared pool of `tuple` objects must be the same across
// all implementations. While it would be ideal to use the `global`
// object, there's no reliable way to get the global object across all JS
// environments without using the `Function` constructor, so instead we
// use the global `Array` constructor as a shared namespace.
var root = Array[globalKey] || def(Array, globalKey, new UniversalWeakMap, false);

function lookup() {
  return lookupArray(arguments);
}

function lookupArray(array) {
  var node = root;

  // Because we are building a tree of *weak* maps, the tree will not
  // prevent objects in tuples from being garbage collected, since the
  // tree itself will be pruned over time when the corresponding `tuple`
  // objects become unreachable. In addition to internalization, this
  // property is a key advantage of the `immutable-tuple` package.
  var len = array.length;
  for (var i = 0; i < len; ++i) {
    var item = array[i];
    node = node.get(item) || node.set(item, new UniversalWeakMap);
  }

  // Return node.data rather than node itself to prevent tampering with
  // the UniversalWeakMap tree.
  return node.data || (node.data = Object.create(null));
}

// See [`lookup.js`](lookup.html).
// See [`util.js`](util.html).
// When called with any number of arguments, this function returns an
// object that inherits from `tuple.prototype` and is guaranteed to be
// `===` any other `tuple` object that has exactly the same items. In
// computer science jargon, `tuple` instances are "internalized" or just
// "interned," which allows for constant-time equality checking, and makes
// it possible for tuple objects to be used as `Map` or `WeakMap` keys, or
// stored in a `Set`.
function tuple() {
  var arguments$1 = arguments;

  var node = lookup.apply(null, arguments);

  if (node.tuple) {
    return node.tuple;
  }

  var t = Object.create(tuple.prototype);

  // Define immutable items with numeric indexes, and permanently fix the
  // `.length` property.
  var argc = arguments.length;
  for (var i = 0; i < argc; ++i) {
    t[i] = arguments$1[i];
  }

  def(t, "length", argc, false);

  // Remember this new `tuple` object so that we can return the same object
  // earlier next time.
  return freeze(node.tuple = t);
}

// Since the `immutable-tuple` package could be installed multiple times
// in an application, there is no guarantee that the `tuple` constructor
// or `tuple.prototype` will be unique, so `value instanceof tuple` is
// unreliable. Instead, to test if a value is a tuple, you should use
// `tuple.isTuple(value)`.
def(tuple.prototype, brand, true, false);
function isTuple(that) {
  return !! (that && that[brand] === true);
}

tuple.isTuple = isTuple;

function toArray(tuple) {
  var array = [];
  var i = tuple.length;
  while (i--) { array[i] = tuple[i]; }
  return array;
}

// Copy all generic non-destructive Array methods to `tuple.prototype`.
// This works because (for example) `Array.prototype.slice` can be invoked
// against any `Array`-like object.
forEachArrayMethod(function (name, desc, mustConvertThisToArray) {
  var method = desc && desc.value;
  if (typeof method === "function") {
    desc.value = function () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      var result = method.apply(
        mustConvertThisToArray ? toArray(this) : this,
        args
      );
      // Of course, `tuple.prototype.slice` should return a `tuple` object,
      // not a new `Array`.
      return Array.isArray(result) ? tuple.apply(void 0, result) : result;
    };
    Object.defineProperty(tuple.prototype, name, desc);
  }
});

// Like `Array.prototype.concat`, except for the extra effort required to
// convert any tuple arguments to arrays, so that
// ```
// tuple(1).concat(tuple(2), 3) === tuple(1, 2, 3)
// ```
var ref = Array.prototype;
var concat = ref.concat;
tuple.prototype.concat = function () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return tuple.apply(void 0, concat.apply(toArray(this), args.map(
    function (item) { return isTuple(item) ? toArray(item) : item; }
  )));
};

exports.default = tuple;
exports.tuple = tuple;
exports.lookup = lookup;
exports.lookupArray = lookupArray;
});

unwrapExports(tuple_1);
var tuple_2 = tuple_1.tuple;
var tuple_3 = tuple_1.lookup;
var tuple_4 = tuple_1.lookupArray;

var local = createCommonjsModule(function (module, exports) {

var fakeNullFiber = new (function Fiber(){});
var localKey = "_optimism_local";

function getCurrentFiber() {
  return fakeNullFiber;
}

{
  try {
    var Fiber = module["eriuqer".split("").reverse().join("")]("fibers");
    // If we were able to require fibers, redefine the getCurrentFiber
    // function so that it has a chance to return Fiber.current.
    getCurrentFiber = function () {
      return Fiber.current || fakeNullFiber;
    };
  } catch (e) {}
}

// Returns an object unique to Fiber.current, if fibers are enabled.
// This object is used for Fiber-local storage in ./entry.js.
exports.get = function () {
  var fiber = getCurrentFiber();
  return fiber[localKey] || (fiber[localKey] = Object.create(null));
};
});
var local_1 = local.get;

var entry = createCommonjsModule(function (module, exports) {

var getLocal = local.get;
var UNKNOWN_VALUE = Object.create(null);
var emptySetPool = [];
var entryPool = [];

// Don't let the emptySetPool or entryPool grow larger than this size,
// since unconstrained pool growth could lead to memory leaks.
exports.POOL_TARGET_SIZE = 100;

// Since this package might be used browsers, we should avoid using the
// Node built-in assert module.
function assert(condition, optionalMessage) {
  if (! condition) {
    throw new Error(optionalMessage || "assertion failure");
  }
}

function Entry(fn, key, args) {
  this.parents = new Set;
  this.childValues = new Map;

  // When this Entry has children that are dirty, this property becomes
  // a Set containing other Entry objects, borrowed from emptySetPool.
  // When the set becomes empty, it gets recycled back to emptySetPool.
  this.dirtyChildren = null;

  reset(this, fn, key, args);

  ++Entry.count;
}

Entry.count = 0;

function reset(entry, fn, key, args) {
  entry.fn = fn;
  entry.key = key;
  entry.args = args;
  entry.value = UNKNOWN_VALUE;
  entry.dirty = true;
  entry.subscribe = null;
  entry.unsubscribe = null;
  entry.recomputing = false;
  // Optional callback that will be invoked when entry.parents becomes
  // empty. The Entry object is given as the first parameter. If the
  // callback returns true, then this entry can be removed from the graph
  // and safely recycled into the entryPool.
  entry.reportOrphan = null;
}

Entry.acquire = function (fn, key, args) {
  var entry = entryPool.pop();
  if (entry) {
    reset(entry, fn, key, args);
    return entry;
  }
  return new Entry(fn, key, args);
};

function release(entry) {
  assert(entry.parents.size === 0);
  assert(entry.childValues.size === 0);
  assert(entry.dirtyChildren === null);
  if (entryPool.length < exports.POOL_TARGET_SIZE) {
    entryPool.push(entry);
  }
}

exports.Entry = Entry;

var Ep = Entry.prototype;

// The public API of Entry objects consists of the Entry constructor,
// along with the recompute, setDirty, and dispose methods.

Ep.recompute = function recompute() {
  if (! rememberParent(this) &&
      maybeReportOrphan(this)) {
    // The recipient of the entry.reportOrphan callback decided to dispose
    // of this orphan entry by calling entry.dispos(), which recycles it
    // into the entryPool, so we don't need to (and should not) proceed
    // with the recomputation.
    return;
  }

  return recomputeIfDirty(this);
};

// If the given entry has a reportOrphan method, and no remaining parents,
// call entry.reportOrphan and return true iff it returns true. The
// reportOrphan function should return true to indicate entry.dispose()
// has been called, and the entry has been removed from any other caches
// (see index.js for the only current example).
function maybeReportOrphan(entry) {
  var report = entry.reportOrphan;
  return typeof report === "function" &&
    entry.parents.size === 0 &&
    report(entry) === true;
}

Ep.setDirty = function setDirty() {
  if (this.dirty) return;
  this.dirty = true;
  this.value = UNKNOWN_VALUE;
  reportDirty(this);
  // We can go ahead and unsubscribe here, since any further dirty
  // notifications we receive will be redundant, and unsubscribing may
  // free up some resources, e.g. file watchers.
  unsubscribe(this);
};

Ep.dispose = function dispose() {
  var entry = this;
  forgetChildren(entry).forEach(maybeReportOrphan);
  unsubscribe(entry);

  // Because this entry has been kicked out of the cache (in index.js),
  // we've lost the ability to find out if/when this entry becomes dirty,
  // whether that happens through a subscription, because of a direct call
  // to entry.setDirty(), or because one of its children becomes dirty.
  // Because of this loss of future information, we have to assume the
  // worst (that this entry might have become dirty very soon), so we must
  // immediately mark this entry's parents as dirty. Normally we could
  // just call entry.setDirty() rather than calling parent.setDirty() for
  // each parent, but that would leave this entry in parent.childValues
  // and parent.dirtyChildren, which would prevent the child from being
  // truly forgotten.
  entry.parents.forEach(function (parent) {
    parent.setDirty();
    forgetChild(parent, entry);
  });

  // Since this entry has no parents and no children anymore, and the
  // caller of Entry#dispose has indicated that entry.value no longer
  // matters, we can safely recycle this Entry object for later use.
  release(entry);
};

function setClean(entry) {
  entry.dirty = false;

  if (mightBeDirty(entry)) {
    // This Entry may still have dirty children, in which case we can't
    // let our parents know we're clean just yet.
    return;
  }

  reportClean(entry);
}

function reportDirty(entry) {
  entry.parents.forEach(function (parent) {
    reportDirtyChild(parent, entry);
  });
}

function reportClean(entry) {
  entry.parents.forEach(function (parent) {
    reportCleanChild(parent, entry);
  });
}

function mightBeDirty(entry) {
  return entry.dirty ||
    (entry.dirtyChildren &&
     entry.dirtyChildren.size);
}

// Let a parent Entry know that one of its children may be dirty.
function reportDirtyChild(entry, child) {
  // Must have called rememberParent(child) before calling
  // reportDirtyChild(parent, child).
  assert(entry.childValues.has(child));
  assert(mightBeDirty(child));

  if (! entry.dirtyChildren) {
    entry.dirtyChildren = emptySetPool.pop() || new Set;

  } else if (entry.dirtyChildren.has(child)) {
    // If we already know this child is dirty, then we must have already
    // informed our own parents that we are dirty, so we can terminate
    // the recursion early.
    return;
  }

  entry.dirtyChildren.add(child);
  reportDirty(entry);
}

// Let a parent Entry know that one of its children is no longer dirty.
function reportCleanChild(entry, child) {
  var cv = entry.childValues;

  // Must have called rememberChild(child) before calling
  // reportCleanChild(parent, child).
  assert(cv.has(child));
  assert(! mightBeDirty(child));

  var childValue = cv.get(child);
  if (childValue === UNKNOWN_VALUE) {
    cv.set(child, child.value);
  } else if (childValue !== child.value) {
    entry.setDirty();
  }

  removeDirtyChild(entry, child);

  if (mightBeDirty(entry)) {
    return;
  }

  reportClean(entry);
}

function removeDirtyChild(entry, child) {
  var dc = entry.dirtyChildren;
  if (dc) {
    dc.delete(child);
    if (dc.size === 0) {
      if (emptySetPool.length < exports.POOL_TARGET_SIZE) {
        emptySetPool.push(dc);
      }
      entry.dirtyChildren = null;
    }
  }
}

function rememberParent(entry) {
  var local$$1 = getLocal();
  var parent = local$$1.currentParentEntry;
  if (parent) {
    entry.parents.add(parent);

    if (! parent.childValues.has(entry)) {
      parent.childValues.set(entry, UNKNOWN_VALUE);
    }

    if (mightBeDirty(entry)) {
      reportDirtyChild(parent, entry);
    } else {
      reportCleanChild(parent, entry);
    }

    return parent;
  }
}

// This is the most important method of the Entry API, because it
// determines whether the cached entry.value can be returned immediately,
// or must be recomputed. The overall performance of the caching system
// depends on the truth of the following observations: (1) this.dirty is
// usually false, (2) this.dirtyChildren is usually null/empty, and thus
// (3) this.value is usally returned very quickly, without recomputation.
function recomputeIfDirty(entry) {
  if (entry.dirty) {
    // If this Entry is explicitly dirty because someone called
    // entry.setDirty(), recompute.
    return reallyRecompute(entry);
  }

  if (mightBeDirty(entry)) {
    // Get fresh values for any dirty children, and if those values
    // disagree with this.childValues, mark this Entry explicitly dirty.
    entry.dirtyChildren.forEach(function (child) {
      assert(entry.childValues.has(child));
      try {
        recomputeIfDirty(child);
      } catch (e) {
        entry.setDirty();
      }
    });

    if (entry.dirty) {
      // If this Entry has become explicitly dirty after comparing the fresh
      // values of its dirty children against this.childValues, recompute.
      return reallyRecompute(entry);
    }
  }

  assert(entry.value !== UNKNOWN_VALUE);

  return entry.value;
}

function reallyRecompute(entry) {
  assert(! entry.recomputing, "already recomputing");
  entry.recomputing = true;

  // Since this recomputation is likely to re-remember some of this
  // entry's children, we forget our children here but do not call
  // maybeReportOrphan until after the recomputation finishes.
  var originalChildren = forgetChildren(entry);

  var local$$1 = getLocal();
  var parent = local$$1.currentParentEntry;
  local$$1.currentParentEntry = entry;

  var threw = true;
  try {
    entry.value = entry.fn.apply(null, entry.args);
    threw = false;

  } finally {
    entry.recomputing = false;

    assert(local$$1.currentParentEntry === entry);
    local$$1.currentParentEntry = parent;

    if (threw || ! subscribe(entry)) {
      // Mark this Entry dirty if entry.fn threw or we failed to
      // resubscribe. This is important because, if we have a subscribe
      // function and it failed, then we're going to miss important
      // notifications about the potential dirtiness of entry.value.
      entry.setDirty();
    } else {
      // If we successfully recomputed entry.value and did not fail to
      // (re)subscribe, then this Entry is no longer explicitly dirty.
      setClean(entry);
    }
  }

  // Now that we've had a chance to re-remember any children that were
  // involved in the recomputation, we can safely report any orphan
  // children that remain.
  originalChildren.forEach(maybeReportOrphan);

  return entry.value;
}

var reusableEmptyArray = [];

// Removes all children from this entry and returns an array of the
// removed children.
function forgetChildren(entry) {
  var children = reusableEmptyArray;

  if (entry.childValues.size > 0) {
    children = [];
    entry.childValues.forEach(function (value, child) {
      forgetChild(entry, child);
      children.push(child);
    });
  }

  // After we forget all our children, this.dirtyChildren must be empty
  // and therefor must have been reset to null.
  assert(entry.dirtyChildren === null);

  return children;
}

function forgetChild(entry, child) {
  child.parents.delete(entry);
  entry.childValues.delete(child);
  removeDirtyChild(entry, child);
}

function subscribe(entry) {
  if (typeof entry.subscribe === "function") {
    try {
      unsubscribe(entry); // Prevent double subscriptions.
      entry.unsubscribe = entry.subscribe.apply(null, entry.args);
    } catch (e) {
      // If this Entry has a subscribe function and it threw an exception
      // (or an unsubscribe function it previously returned now throws),
      // return false to indicate that we were not able to subscribe (or
      // unsubscribe), and this Entry should remain dirty.
      entry.setDirty();
      return false;
    }
  }

  // Returning true indicates either that there was no entry.subscribe
  // function or that it succeeded.
  return true;
}

function unsubscribe(entry) {
  var unsub = entry.unsubscribe;
  if (typeof unsub === "function") {
    entry.unsubscribe = null;
    unsub();
  }
}
});
var entry_1 = entry.POOL_TARGET_SIZE;
var entry_2 = entry.Entry;

var Cache$2 = cache.Cache;
var tuple$1 = tuple_1.tuple;
var Entry = entry.Entry;
var getLocal = local.get;

function normalizeOptions(options) {
  options = options || Object.create(null);

  if (typeof options.makeCacheKey !== "function") {
    options.makeCacheKey = tuple$1;
  }

  if (typeof options.max !== "number") {
    options.max = Math.pow(2, 16);
  }

  return options;
}

function wrap(fn, options) {
  options = normalizeOptions(options);

  // If this wrapped function is disposable, then its creator does not
  // care about its return value, and it should be removed from the cache
  // immediately when it no longer has any parents that depend on it.
  var disposable = !! options.disposable;

  var cache$$1 = new Cache$2({
    max: options.max,
    dispose: function (key, entry$$1) {
      entry$$1.dispose();
    }
  });

  function reportOrphan(entry$$1) {
    if (disposable) {
      // Triggers the entry.dispose() call above.
      cache$$1.delete(entry$$1.key);
      return true;
    }
  }

  function optimistic() {
    if (disposable && ! getLocal().currentParentEntry) {
      // If there's no current parent computation, and this wrapped
      // function is disposable (meaning we don't care about entry.value,
      // just dependency tracking), then we can short-cut everything else
      // in this function, because entry.recompute() is going to recycle
      // the entry object without recomputing anything, anyway.
      return;
    }

    var key = options.makeCacheKey.apply(null, arguments);
    if (! key) {
      return fn.apply(null, arguments);
    }

    var args = [], len = arguments.length;
    while (len--) args[len] = arguments[len];

    var entry$$1 = cache$$1.get(key);
    if (entry$$1) {
      entry$$1.args = args;
    } else {
      cache$$1.set(key, entry$$1 = Entry.acquire(fn, key, args));
      entry$$1.subscribe = options.subscribe;
      if (disposable) {
        entry$$1.reportOrphan = reportOrphan;
      }
    }

    var value = entry$$1.recompute();

    // Move this entry to the front of the least-recently used queue,
    // since we just finished computing its value.
    cache$$1.set(key, entry$$1);

    // Clean up any excess entries in the cache, but only if this entry
    // has no parents, which means we're not in the middle of a larger
    // computation that might be flummoxed by the cleaning.
    if (entry$$1.parents.size === 0) {
      cache$$1.clean();
    }

    // If options.disposable is truthy, the caller of wrap is telling us
    // they don't care about the result of entry.recompute(), so we should
    // avoid returning the value, so it won't be accidentally used.
    if (! disposable) {
      return value;
    }
  }

  optimistic.dirty = function () {
    var key = options.makeCacheKey.apply(null, arguments);
    if (! key) {
      return;
    }

    if (! cache$$1.has(key)) {
      return;
    }

    cache$$1.get(key).setDirty();
  };

  return optimistic;
}

var wrap_1 = wrap;

var testMap = new Map();
if (testMap.set(1, 2) !== testMap) {
    var set_1 = testMap.set;
    Map.prototype.set = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        set_1.apply(this, args);
        return this;
    };
}
var testSet = new Set();
if (testSet.add(3) !== testSet) {
    var add_1 = testSet.add;
    Set.prototype.add = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        add_1.apply(this, args);
        return this;
    };
}
var frozen = {};
if (typeof Object.freeze === 'function') {
    Object.freeze(frozen);
}
try {
    testMap.set(frozen, frozen).delete(frozen);
}
catch (_a) {
    var wrap$1 = function (method) {
        return method && (function (obj) {
            try {
                testMap.set(obj, obj).delete(obj);
            }
            finally {
                return method.call(Object, obj);
            }
        });
    };
    Object.freeze = wrap$1(Object.freeze);
    Object.seal = wrap$1(Object.seal);
    Object.preventExtensions = wrap$1(Object.preventExtensions);
}

var haveWarned$3 = false;
function shouldWarn() {
    var answer = !haveWarned$3;
    if (!isTest$2()) {
        haveWarned$3 = true;
    }
    return answer;
}
var HeuristicFragmentMatcher = (function () {
    function HeuristicFragmentMatcher() {
    }
    HeuristicFragmentMatcher.prototype.ensureReady = function () {
        return Promise.resolve();
    };
    HeuristicFragmentMatcher.prototype.canBypassInit = function () {
        return true;
    };
    HeuristicFragmentMatcher.prototype.match = function (idValue, typeCondition, context) {
        var obj = context.store.get(idValue.id);
        if (!obj && idValue.id === 'ROOT_QUERY') {
            return true;
        }
        if (!obj) {
            return false;
        }
        if (!obj.__typename) {
            if (shouldWarn()) {
                process.env.NODE_ENV === "production" || invariant$1.warn("You're using fragments in your queries, but either don't have the addTypename:\n  true option set in Apollo Client, or you are trying to write a fragment to the store without the __typename.\n   Please turn on the addTypename option and include __typename when writing fragments so that Apollo Client\n   can accurately match fragments.");
                process.env.NODE_ENV === "production" || invariant$1.warn('Could not find __typename on Fragment ', typeCondition, obj);
                process.env.NODE_ENV === "production" || invariant$1.warn("DEPRECATION WARNING: using fragments without __typename is unsupported behavior " +
                    "and will be removed in future versions of Apollo client. You should fix this and set addTypename to true now.");
            }
            return 'heuristic';
        }
        if (obj.__typename === typeCondition) {
            return true;
        }
        if (shouldWarn()) {
            process.env.NODE_ENV === "production" || invariant$1.error('You are using the simple (heuristic) fragment matcher, but your ' +
                'queries contain union or interface types. Apollo Client will not be ' +
                'able to accurately map fragments. To make this error go away, use ' +
                'the `IntrospectionFragmentMatcher` as described in the docs: ' +
                'https://www.apollographql.com/docs/react/advanced/fragments.html#fragment-matcher');
        }
        return 'heuristic';
    };
    return HeuristicFragmentMatcher;
}());

var CacheKeyNode = (function () {
    function CacheKeyNode() {
        this.children = null;
        this.key = null;
    }
    CacheKeyNode.prototype.lookup = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return this.lookupArray(args);
    };
    CacheKeyNode.prototype.lookupArray = function (array) {
        var node = this;
        array.forEach(function (value) {
            node = node.getOrCreate(value);
        });
        return node.key || (node.key = Object.create(null));
    };
    CacheKeyNode.prototype.getOrCreate = function (value) {
        var map = this.children || (this.children = new Map());
        var node = map.get(value);
        if (!node) {
            map.set(value, (node = new CacheKeyNode()));
        }
        return node;
    };
    return CacheKeyNode;
}());

var hasOwn = Object.prototype.hasOwnProperty;
var DepTrackingCache = (function () {
    function DepTrackingCache(data) {
        if (data === void 0) { data = Object.create(null); }
        var _this = this;
        this.data = data;
        this.depend = wrap_1(function (dataId) { return _this.data[dataId]; }, {
            disposable: true,
            makeCacheKey: function (dataId) {
                return dataId;
            }
        });
    }
    DepTrackingCache.prototype.toObject = function () {
        return this.data;
    };
    DepTrackingCache.prototype.get = function (dataId) {
        this.depend(dataId);
        return this.data[dataId];
    };
    DepTrackingCache.prototype.set = function (dataId, value) {
        var oldValue = this.data[dataId];
        if (value !== oldValue) {
            this.data[dataId] = value;
            this.depend.dirty(dataId);
        }
    };
    DepTrackingCache.prototype.delete = function (dataId) {
        if (hasOwn.call(this.data, dataId)) {
            delete this.data[dataId];
            this.depend.dirty(dataId);
        }
    };
    DepTrackingCache.prototype.clear = function () {
        this.replace(null);
    };
    DepTrackingCache.prototype.replace = function (newData) {
        var _this = this;
        if (newData) {
            Object.keys(newData).forEach(function (dataId) {
                _this.set(dataId, newData[dataId]);
            });
            Object.keys(this.data).forEach(function (dataId) {
                if (!hasOwn.call(newData, dataId)) {
                    _this.delete(dataId);
                }
            });
        }
        else {
            Object.keys(this.data).forEach(function (dataId) {
                _this.delete(dataId);
            });
        }
    };
    return DepTrackingCache;
}());
function defaultNormalizedCacheFactory(seed) {
    return new DepTrackingCache(seed);
}

var StoreReader = (function () {
    function StoreReader(cacheKeyRoot) {
        if (cacheKeyRoot === void 0) { cacheKeyRoot = new CacheKeyNode; }
        var _this = this;
        this.cacheKeyRoot = cacheKeyRoot;
        var reader = this;
        var executeStoreQuery = reader.executeStoreQuery, executeSelectionSet = reader.executeSelectionSet;
        this.executeStoreQuery = wrap_1(function (options) {
            return executeStoreQuery.call(_this, options);
        }, {
            makeCacheKey: function (_a) {
                var query = _a.query, rootValue = _a.rootValue, contextValue = _a.contextValue, variableValues = _a.variableValues, fragmentMatcher = _a.fragmentMatcher;
                if (contextValue.store instanceof DepTrackingCache) {
                    return reader.cacheKeyRoot.lookup(query, contextValue.store, fragmentMatcher, JSON.stringify(variableValues), rootValue.id);
                }
                return;
            }
        });
        this.executeSelectionSet = wrap_1(function (options) {
            return executeSelectionSet.call(_this, options);
        }, {
            makeCacheKey: function (_a) {
                var selectionSet = _a.selectionSet, rootValue = _a.rootValue, execContext = _a.execContext;
                if (execContext.contextValue.store instanceof DepTrackingCache) {
                    return reader.cacheKeyRoot.lookup(selectionSet, execContext.contextValue.store, execContext.fragmentMatcher, JSON.stringify(execContext.variableValues), rootValue.id);
                }
                return;
            }
        });
    }
    StoreReader.prototype.readQueryFromStore = function (options) {
        var optsPatch = { returnPartialData: false };
        return this.diffQueryAgainstStore(__assign({}, options, optsPatch)).result;
    };
    StoreReader.prototype.diffQueryAgainstStore = function (_a) {
        var store = _a.store, query = _a.query, variables = _a.variables, previousResult = _a.previousResult, _b = _a.returnPartialData, returnPartialData = _b === void 0 ? true : _b, _c = _a.rootId, rootId = _c === void 0 ? 'ROOT_QUERY' : _c, fragmentMatcherFunction = _a.fragmentMatcherFunction, config = _a.config;
        var queryDefinition = getQueryDefinition$2(query);
        variables = assign$2({}, getDefaultValues$2(queryDefinition), variables);
        var context = {
            store: store,
            dataIdFromObject: (config && config.dataIdFromObject) || null,
            cacheRedirects: (config && config.cacheRedirects) || {},
        };
        var execResult = this.executeStoreQuery({
            query: query,
            rootValue: {
                type: 'id',
                id: rootId,
                generated: true,
                typename: 'Query',
            },
            contextValue: context,
            variableValues: variables,
            fragmentMatcher: fragmentMatcherFunction,
        });
        var hasMissingFields = execResult.missing && execResult.missing.length > 0;
        if (hasMissingFields && !returnPartialData) {
            execResult.missing.forEach(function (info) {
                if (info.tolerable)
                    return;
                throw process.env.NODE_ENV === "production" ? new InvariantError() : new InvariantError("Can't find field " + info.fieldName + " on object " + JSON.stringify(info.object, null, 2) + ".");
            });
        }
        if (previousResult) {
            if (isEqual$3(previousResult, execResult.result)) {
                execResult.result = previousResult;
            }
        }
        return {
            result: execResult.result,
            complete: !hasMissingFields,
        };
    };
    StoreReader.prototype.executeStoreQuery = function (_a) {
        var query = _a.query, rootValue = _a.rootValue, contextValue = _a.contextValue, variableValues = _a.variableValues, _b = _a.fragmentMatcher, fragmentMatcher = _b === void 0 ? defaultFragmentMatcher : _b;
        var mainDefinition = getMainDefinition$2(query);
        var fragments = getFragmentDefinitions$2(query);
        var fragmentMap = createFragmentMap$2(fragments);
        var execContext = {
            query: query,
            fragmentMap: fragmentMap,
            contextValue: contextValue,
            variableValues: variableValues,
            fragmentMatcher: fragmentMatcher,
        };
        return this.executeSelectionSet({
            selectionSet: mainDefinition.selectionSet,
            rootValue: rootValue,
            execContext: execContext,
        });
    };
    StoreReader.prototype.executeSelectionSet = function (_a) {
        var _this = this;
        var selectionSet = _a.selectionSet, rootValue = _a.rootValue, execContext = _a.execContext;
        var fragmentMap = execContext.fragmentMap, contextValue = execContext.contextValue, variables = execContext.variableValues;
        var finalResult = { result: null };
        var objectsToMerge = [];
        var object = contextValue.store.get(rootValue.id);
        var typename = (object && object.__typename) ||
            (rootValue.id === 'ROOT_QUERY' && 'Query') ||
            void 0;
        function handleMissing(result) {
            var _a;
            if (result.missing) {
                finalResult.missing = finalResult.missing || [];
                (_a = finalResult.missing).push.apply(_a, result.missing);
            }
            return result.result;
        }
        selectionSet.selections.forEach(function (selection) {
            var _a;
            if (!shouldInclude$2(selection, variables)) {
                return;
            }
            if (isField$2(selection)) {
                var fieldResult = handleMissing(_this.executeField(object, typename, selection, execContext));
                if (typeof fieldResult !== 'undefined') {
                    objectsToMerge.push((_a = {},
                        _a[resultKeyNameFromField$2(selection)] = fieldResult,
                        _a));
                }
            }
            else {
                var fragment = void 0;
                if (isInlineFragment$2(selection)) {
                    fragment = selection;
                }
                else {
                    fragment = fragmentMap[selection.name.value];
                    if (!fragment) {
                        throw process.env.NODE_ENV === "production" ? new InvariantError() : new InvariantError("No fragment named " + selection.name.value);
                    }
                }
                var typeCondition = fragment.typeCondition.name.value;
                var match = execContext.fragmentMatcher(rootValue, typeCondition, contextValue);
                if (match) {
                    var fragmentExecResult = _this.executeSelectionSet({
                        selectionSet: fragment.selectionSet,
                        rootValue: rootValue,
                        execContext: execContext,
                    });
                    if (match === 'heuristic' && fragmentExecResult.missing) {
                        fragmentExecResult = __assign({}, fragmentExecResult, { missing: fragmentExecResult.missing.map(function (info) {
                                return __assign({}, info, { tolerable: true });
                            }) });
                    }
                    objectsToMerge.push(handleMissing(fragmentExecResult));
                }
            }
        });
        finalResult.result = mergeDeepArray(objectsToMerge);
        return finalResult;
    };
    StoreReader.prototype.executeField = function (object, typename, field, execContext) {
        var variables = execContext.variableValues, contextValue = execContext.contextValue;
        var fieldName = field.name.value;
        var args = argumentsObjectFromField$2(field, variables);
        var info = {
            resultKey: resultKeyNameFromField$2(field),
            directives: getDirectiveInfoFromField$2(field, variables),
        };
        var readStoreResult = readStoreResolver(object, typename, fieldName, args, contextValue, info);
        if (Array.isArray(readStoreResult.result)) {
            return this.combineExecResults(readStoreResult, this.executeSubSelectedArray(field, readStoreResult.result, execContext));
        }
        if (!field.selectionSet) {
            assertSelectionSetForIdValue(field, readStoreResult.result);
            return readStoreResult;
        }
        if (readStoreResult.result == null) {
            return readStoreResult;
        }
        return this.combineExecResults(readStoreResult, this.executeSelectionSet({
            selectionSet: field.selectionSet,
            rootValue: readStoreResult.result,
            execContext: execContext,
        }));
    };
    StoreReader.prototype.combineExecResults = function () {
        var execResults = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            execResults[_i] = arguments[_i];
        }
        var missing = null;
        execResults.forEach(function (execResult) {
            if (execResult.missing) {
                missing = missing || [];
                missing.push.apply(missing, execResult.missing);
            }
        });
        return {
            result: execResults.pop().result,
            missing: missing,
        };
    };
    StoreReader.prototype.executeSubSelectedArray = function (field, result, execContext) {
        var _this = this;
        var missing = null;
        function handleMissing(childResult) {
            if (childResult.missing) {
                missing = missing || [];
                missing.push.apply(missing, childResult.missing);
            }
            return childResult.result;
        }
        result = result.map(function (item) {
            if (item === null) {
                return null;
            }
            if (Array.isArray(item)) {
                return handleMissing(_this.executeSubSelectedArray(field, item, execContext));
            }
            if (field.selectionSet) {
                return handleMissing(_this.executeSelectionSet({
                    selectionSet: field.selectionSet,
                    rootValue: item,
                    execContext: execContext,
                }));
            }
            assertSelectionSetForIdValue(field, item);
            return item;
        });
        return { result: result, missing: missing };
    };
    return StoreReader;
}());
function assertSelectionSetForIdValue(field, value) {
    if (!field.selectionSet && isIdValue$2(value)) {
        throw process.env.NODE_ENV === "production" ? new InvariantError() : new InvariantError("Missing selection set for object of type " + value.typename + " returned for query field " + field.name.value);
    }
}
function defaultFragmentMatcher() {
    return true;
}
function readStoreResolver(object, typename, fieldName, args, context, _a) {
    var resultKey = _a.resultKey, directives = _a.directives;
    var storeKeyName = fieldName;
    if (args || directives) {
        storeKeyName = getStoreKeyName$2(storeKeyName, args, directives);
    }
    var fieldValue = void 0;
    if (object) {
        fieldValue = object[storeKeyName];
        if (typeof fieldValue === 'undefined' &&
            context.cacheRedirects &&
            typeof typename === 'string') {
            var type = context.cacheRedirects[typename];
            if (type) {
                var resolver = type[fieldName];
                if (resolver) {
                    fieldValue = resolver(object, args, {
                        getCacheKey: function (storeObj) {
                            return toIdValue$2({
                                id: context.dataIdFromObject(storeObj),
                                typename: storeObj.__typename,
                            });
                        },
                    });
                }
            }
        }
    }
    if (typeof fieldValue === 'undefined') {
        return {
            result: fieldValue,
            missing: [{
                    object: object,
                    fieldName: storeKeyName,
                    tolerable: false,
                }],
        };
    }
    if (isJsonValue$2(fieldValue)) {
        fieldValue = fieldValue.json;
    }
    return {
        result: fieldValue,
    };
}

var ObjectCache = (function () {
    function ObjectCache(data) {
        if (data === void 0) { data = Object.create(null); }
        this.data = data;
    }
    ObjectCache.prototype.toObject = function () {
        return this.data;
    };
    ObjectCache.prototype.get = function (dataId) {
        return this.data[dataId];
    };
    ObjectCache.prototype.set = function (dataId, value) {
        this.data[dataId] = value;
    };
    ObjectCache.prototype.delete = function (dataId) {
        this.data[dataId] = void 0;
    };
    ObjectCache.prototype.clear = function () {
        this.data = Object.create(null);
    };
    ObjectCache.prototype.replace = function (newData) {
        this.data = newData || Object.create(null);
    };
    return ObjectCache;
}());

var WriteError = (function (_super) {
    __extends(WriteError, _super);
    function WriteError() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = 'WriteError';
        return _this;
    }
    return WriteError;
}(Error));
function enhanceErrorWithDocument(error, document) {
    var enhancedError = new WriteError("Error writing result to store for query:\n " + JSON.stringify(document));
    enhancedError.message += '\n' + error.message;
    enhancedError.stack = error.stack;
    return enhancedError;
}
var StoreWriter = (function () {
    function StoreWriter() {
    }
    StoreWriter.prototype.writeQueryToStore = function (_a) {
        var query = _a.query, result = _a.result, _b = _a.store, store = _b === void 0 ? defaultNormalizedCacheFactory() : _b, variables = _a.variables, dataIdFromObject = _a.dataIdFromObject, fragmentMatcherFunction = _a.fragmentMatcherFunction;
        return this.writeResultToStore({
            dataId: 'ROOT_QUERY',
            result: result,
            document: query,
            store: store,
            variables: variables,
            dataIdFromObject: dataIdFromObject,
            fragmentMatcherFunction: fragmentMatcherFunction,
        });
    };
    StoreWriter.prototype.writeResultToStore = function (_a) {
        var dataId = _a.dataId, result = _a.result, document = _a.document, _b = _a.store, store = _b === void 0 ? defaultNormalizedCacheFactory() : _b, variables = _a.variables, dataIdFromObject = _a.dataIdFromObject, fragmentMatcherFunction = _a.fragmentMatcherFunction;
        var operationDefinition = getOperationDefinition$2(document);
        try {
            return this.writeSelectionSetToStore({
                result: result,
                dataId: dataId,
                selectionSet: operationDefinition.selectionSet,
                context: {
                    store: store,
                    processedData: {},
                    variables: assign$2({}, getDefaultValues$2(operationDefinition), variables),
                    dataIdFromObject: dataIdFromObject,
                    fragmentMap: createFragmentMap$2(getFragmentDefinitions$2(document)),
                    fragmentMatcherFunction: fragmentMatcherFunction,
                },
            });
        }
        catch (e) {
            throw enhanceErrorWithDocument(e, document);
        }
    };
    StoreWriter.prototype.writeSelectionSetToStore = function (_a) {
        var _this = this;
        var result = _a.result, dataId = _a.dataId, selectionSet = _a.selectionSet, context = _a.context;
        var variables = context.variables, store = context.store, fragmentMap = context.fragmentMap;
        selectionSet.selections.forEach(function (selection) {
            if (!shouldInclude$2(selection, variables)) {
                return;
            }
            if (isField$2(selection)) {
                var resultFieldKey = resultKeyNameFromField$2(selection);
                var value = result[resultFieldKey];
                if (typeof value !== 'undefined') {
                    _this.writeFieldToStore({
                        dataId: dataId,
                        value: value,
                        field: selection,
                        context: context,
                    });
                }
                else {
                    var isDefered = false;
                    var isClient = false;
                    if (selection.directives && selection.directives.length) {
                        isDefered = selection.directives.some(function (directive) { return directive.name && directive.name.value === 'defer'; });
                        isClient = selection.directives.some(function (directive) { return directive.name && directive.name.value === 'client'; });
                    }
                    if (!isDefered && !isClient && context.fragmentMatcherFunction) {
                        process.env.NODE_ENV === "production" || invariant$1.warn("Missing field " + resultFieldKey + " in " + JSON.stringify(result, null, 2).substring(0, 100));
                    }
                }
            }
            else {
                var fragment = void 0;
                if (isInlineFragment$2(selection)) {
                    fragment = selection;
                }
                else {
                    fragment = (fragmentMap || {})[selection.name.value];
                    process.env.NODE_ENV === "production" ? invariant$1(fragment) : invariant$1(fragment, "No fragment named " + selection.name.value + ".");
                }
                var matches = true;
                if (context.fragmentMatcherFunction && fragment.typeCondition) {
                    var idValue = toIdValue$2({ id: 'self', typename: undefined });
                    var fakeContext = {
                        store: new ObjectCache({ self: result }),
                        cacheRedirects: {},
                    };
                    var match = context.fragmentMatcherFunction(idValue, fragment.typeCondition.name.value, fakeContext);
                    if (!isProduction$2() && match === 'heuristic') {
                        process.env.NODE_ENV === "production" || invariant$1.error('WARNING: heuristic fragment matching going on!');
                    }
                    matches = !!match;
                }
                if (matches) {
                    _this.writeSelectionSetToStore({
                        result: result,
                        selectionSet: fragment.selectionSet,
                        dataId: dataId,
                        context: context,
                    });
                }
            }
        });
        return store;
    };
    StoreWriter.prototype.writeFieldToStore = function (_a) {
        var field = _a.field, value = _a.value, dataId = _a.dataId, context = _a.context;
        var _b;
        var variables = context.variables, dataIdFromObject = context.dataIdFromObject, store = context.store;
        var storeValue;
        var storeObject;
        var storeFieldName = storeKeyNameFromField$2(field, variables);
        if (!field.selectionSet || value === null) {
            storeValue =
                value != null && typeof value === 'object'
                    ?
                        { type: 'json', json: value }
                    :
                        value;
        }
        else if (Array.isArray(value)) {
            var generatedId = dataId + "." + storeFieldName;
            storeValue = this.processArrayValue(value, generatedId, field.selectionSet, context);
        }
        else {
            var valueDataId = dataId + "." + storeFieldName;
            var generated = true;
            if (!isGeneratedId(valueDataId)) {
                valueDataId = '$' + valueDataId;
            }
            if (dataIdFromObject) {
                var semanticId = dataIdFromObject(value);
                process.env.NODE_ENV === "production" ? invariant$1(!semanticId || !isGeneratedId(semanticId)) : invariant$1(!semanticId || !isGeneratedId(semanticId), 'IDs returned by dataIdFromObject cannot begin with the "$" character.');
                if (semanticId ||
                    (typeof semanticId === 'number' && semanticId === 0)) {
                    valueDataId = semanticId;
                    generated = false;
                }
            }
            if (!isDataProcessed(valueDataId, field, context.processedData)) {
                this.writeSelectionSetToStore({
                    dataId: valueDataId,
                    result: value,
                    selectionSet: field.selectionSet,
                    context: context,
                });
            }
            var typename = value.__typename;
            storeValue = toIdValue$2({ id: valueDataId, typename: typename }, generated);
            storeObject = store.get(dataId);
            var escapedId = storeObject && storeObject[storeFieldName];
            if (escapedId !== storeValue && isIdValue$2(escapedId)) {
                var hadTypename = escapedId.typename !== undefined;
                var hasTypename = typename !== undefined;
                var typenameChanged = hadTypename && hasTypename && escapedId.typename !== typename;
                process.env.NODE_ENV === "production" ? invariant$1(!generated || escapedId.generated || typenameChanged) : invariant$1(!generated || escapedId.generated || typenameChanged, "Store error: the application attempted to write an object with no provided id but the store already contains an id of " + escapedId.id + " for this object. The selectionSet that was trying to be written is:\n" + JSON.stringify(field));
                process.env.NODE_ENV === "production" ? invariant$1(!hadTypename || hasTypename) : invariant$1(!hadTypename || hasTypename, "Store error: the application attempted to write an object with no provided typename but the store already contains an object with typename of " + escapedId.typename + " for the object of id " + escapedId.id + ". The selectionSet that was trying to be written is:\n" + JSON.stringify(field));
                if (escapedId.generated) {
                    if (typenameChanged) {
                        if (!generated) {
                            store.delete(escapedId.id);
                        }
                    }
                    else {
                        mergeWithGenerated(escapedId.id, storeValue.id, store);
                    }
                }
            }
        }
        storeObject = store.get(dataId);
        if (!storeObject || !isEqual$3(storeValue, storeObject[storeFieldName])) {
            store.set(dataId, __assign({}, storeObject, (_b = {}, _b[storeFieldName] = storeValue, _b)));
        }
    };
    StoreWriter.prototype.processArrayValue = function (value, generatedId, selectionSet, context) {
        var _this = this;
        return value.map(function (item, index) {
            if (item === null) {
                return null;
            }
            var itemDataId = generatedId + "." + index;
            if (Array.isArray(item)) {
                return _this.processArrayValue(item, itemDataId, selectionSet, context);
            }
            var generated = true;
            if (context.dataIdFromObject) {
                var semanticId = context.dataIdFromObject(item);
                if (semanticId) {
                    itemDataId = semanticId;
                    generated = false;
                }
            }
            if (!isDataProcessed(itemDataId, selectionSet, context.processedData)) {
                _this.writeSelectionSetToStore({
                    dataId: itemDataId,
                    result: item,
                    selectionSet: selectionSet,
                    context: context,
                });
            }
            return toIdValue$2({ id: itemDataId, typename: item.__typename }, generated);
        });
    };
    return StoreWriter;
}());
function isGeneratedId(id) {
    return id[0] === '$';
}
function mergeWithGenerated(generatedKey, realKey, cache) {
    if (generatedKey === realKey) {
        return false;
    }
    var generated = cache.get(generatedKey);
    var real = cache.get(realKey);
    var madeChanges = false;
    Object.keys(generated).forEach(function (key) {
        var value = generated[key];
        var realValue = real[key];
        if (isIdValue$2(value) &&
            isGeneratedId(value.id) &&
            isIdValue$2(realValue) &&
            !isEqual$3(value, realValue) &&
            mergeWithGenerated(value.id, realValue.id, cache)) {
            madeChanges = true;
        }
    });
    cache.delete(generatedKey);
    var newRealValue = __assign({}, generated, real);
    if (isEqual$3(newRealValue, real)) {
        return madeChanges;
    }
    cache.set(realKey, newRealValue);
    return true;
}
function isDataProcessed(dataId, field, processedData) {
    if (!processedData) {
        return false;
    }
    if (processedData[dataId]) {
        if (processedData[dataId].indexOf(field) >= 0) {
            return true;
        }
        else {
            processedData[dataId].push(field);
        }
    }
    else {
        processedData[dataId] = [field];
    }
    return false;
}

var defaultConfig = {
    fragmentMatcher: new HeuristicFragmentMatcher(),
    dataIdFromObject: defaultDataIdFromObject,
    addTypename: true,
    resultCaching: true,
};
function defaultDataIdFromObject(result) {
    if (result.__typename) {
        if (result.id !== undefined) {
            return result.__typename + ":" + result.id;
        }
        if (result._id !== undefined) {
            return result.__typename + ":" + result._id;
        }
    }
    return null;
}
var hasOwn$1 = Object.prototype.hasOwnProperty;
var OptimisticCacheLayer = (function (_super) {
    __extends(OptimisticCacheLayer, _super);
    function OptimisticCacheLayer(optimisticId, parent, transaction) {
        var _this = _super.call(this, Object.create(null)) || this;
        _this.optimisticId = optimisticId;
        _this.parent = parent;
        _this.transaction = transaction;
        return _this;
    }
    OptimisticCacheLayer.prototype.toObject = function () {
        return __assign({}, this.parent.toObject(), this.data);
    };
    OptimisticCacheLayer.prototype.get = function (dataId) {
        return hasOwn$1.call(this.data, dataId)
            ? this.data[dataId]
            : this.parent.get(dataId);
    };
    return OptimisticCacheLayer;
}(ObjectCache));
var InMemoryCache = (function (_super) {
    __extends(InMemoryCache, _super);
    function InMemoryCache(config) {
        if (config === void 0) { config = {}; }
        var _this = _super.call(this) || this;
        _this.watches = new Set();
        _this.typenameDocumentCache = new Map();
        _this.cacheKeyRoot = new CacheKeyNode();
        _this.silenceBroadcast = false;
        _this.config = __assign({}, defaultConfig, config);
        if (_this.config.customResolvers) {
            process.env.NODE_ENV === "production" || invariant$1.warn('customResolvers have been renamed to cacheRedirects. Please update your config as we will be deprecating customResolvers in the next major version.');
            _this.config.cacheRedirects = _this.config.customResolvers;
        }
        if (_this.config.cacheResolvers) {
            process.env.NODE_ENV === "production" || invariant$1.warn('cacheResolvers have been renamed to cacheRedirects. Please update your config as we will be deprecating cacheResolvers in the next major version.');
            _this.config.cacheRedirects = _this.config.cacheResolvers;
        }
        _this.addTypename = _this.config.addTypename;
        _this.data = _this.config.resultCaching
            ? new DepTrackingCache()
            : new ObjectCache();
        _this.optimisticData = _this.data;
        _this.storeReader = new StoreReader(_this.cacheKeyRoot);
        _this.storeWriter = new StoreWriter();
        var cache = _this;
        var maybeBroadcastWatch = cache.maybeBroadcastWatch;
        _this.maybeBroadcastWatch = wrap_1(function (c) {
            return maybeBroadcastWatch.call(_this, c);
        }, {
            makeCacheKey: function (c) {
                if (c.optimistic) {
                    return;
                }
                if (c.previousResult) {
                    return;
                }
                if (cache.data instanceof DepTrackingCache) {
                    return cache.cacheKeyRoot.lookup(c.query, JSON.stringify(c.variables));
                }
            }
        });
        return _this;
    }
    InMemoryCache.prototype.restore = function (data) {
        if (data)
            this.data.replace(data);
        return this;
    };
    InMemoryCache.prototype.extract = function (optimistic) {
        if (optimistic === void 0) { optimistic = false; }
        return (optimistic ? this.optimisticData : this.data).toObject();
    };
    InMemoryCache.prototype.read = function (options) {
        if (typeof options.rootId === 'string' &&
            typeof this.data.get(options.rootId) === 'undefined') {
            return null;
        }
        return this.storeReader.readQueryFromStore({
            store: options.optimistic ? this.optimisticData : this.data,
            query: this.transformDocument(options.query),
            variables: options.variables,
            rootId: options.rootId,
            fragmentMatcherFunction: this.config.fragmentMatcher.match,
            previousResult: options.previousResult,
            config: this.config,
        });
    };
    InMemoryCache.prototype.write = function (write) {
        this.storeWriter.writeResultToStore({
            dataId: write.dataId,
            result: write.result,
            variables: write.variables,
            document: this.transformDocument(write.query),
            store: this.data,
            dataIdFromObject: this.config.dataIdFromObject,
            fragmentMatcherFunction: this.config.fragmentMatcher.match,
        });
        this.broadcastWatches();
    };
    InMemoryCache.prototype.diff = function (query) {
        return this.storeReader.diffQueryAgainstStore({
            store: query.optimistic ? this.optimisticData : this.data,
            query: this.transformDocument(query.query),
            variables: query.variables,
            returnPartialData: query.returnPartialData,
            previousResult: query.previousResult,
            fragmentMatcherFunction: this.config.fragmentMatcher.match,
            config: this.config,
        });
    };
    InMemoryCache.prototype.watch = function (watch) {
        var _this = this;
        this.watches.add(watch);
        return function () {
            _this.watches.delete(watch);
        };
    };
    InMemoryCache.prototype.evict = function (query) {
        throw process.env.NODE_ENV === "production" ? new InvariantError() : new InvariantError("eviction is not implemented on InMemory Cache");
    };
    InMemoryCache.prototype.reset = function () {
        this.data.clear();
        this.broadcastWatches();
        return Promise.resolve();
    };
    InMemoryCache.prototype.removeOptimistic = function (idToRemove) {
        var toReapply = [];
        var removedCount = 0;
        var layer = this.optimisticData;
        while (layer instanceof OptimisticCacheLayer) {
            if (layer.optimisticId === idToRemove) {
                ++removedCount;
            }
            else {
                toReapply.push(layer);
            }
            layer = layer.parent;
        }
        if (removedCount > 0) {
            this.optimisticData = layer;
            while (toReapply.length > 0) {
                var layer_1 = toReapply.pop();
                this.performTransaction(layer_1.transaction, layer_1.optimisticId);
            }
            this.broadcastWatches();
        }
    };
    InMemoryCache.prototype.performTransaction = function (transaction, optimisticId) {
        var _a = this, data = _a.data, silenceBroadcast = _a.silenceBroadcast;
        this.silenceBroadcast = true;
        if (typeof optimisticId === 'string') {
            this.data = this.optimisticData = new OptimisticCacheLayer(optimisticId, this.optimisticData, transaction);
        }
        try {
            transaction(this);
        }
        finally {
            this.silenceBroadcast = silenceBroadcast;
            this.data = data;
        }
        this.broadcastWatches();
    };
    InMemoryCache.prototype.recordOptimisticTransaction = function (transaction, id) {
        return this.performTransaction(transaction, id);
    };
    InMemoryCache.prototype.transformDocument = function (document) {
        if (this.addTypename) {
            var result = this.typenameDocumentCache.get(document);
            if (!result) {
                result = addTypenameToDocument$2(document);
                this.typenameDocumentCache.set(document, result);
                this.typenameDocumentCache.set(result, result);
            }
            return result;
        }
        return document;
    };
    InMemoryCache.prototype.broadcastWatches = function () {
        var _this = this;
        if (!this.silenceBroadcast) {
            this.watches.forEach(function (c) { return _this.maybeBroadcastWatch(c); });
        }
    };
    InMemoryCache.prototype.maybeBroadcastWatch = function (c) {
        c.callback(this.diff({
            query: c.query,
            variables: c.variables,
            previousResult: c.previousResult && c.previousResult(),
            optimistic: c.optimistic,
        }));
    };
    return InMemoryCache;
}(ApolloCache));
//# sourceMappingURL=bundle.esm.js.map

var __assign$b = (undefined && undefined.__assign) || function () {
    __assign$b = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign$b.apply(this, arguments);
};
var defaultHttpOptions = {
    includeQuery: true,
    includeExtensions: false,
};
var defaultHeaders = {
    // headers are case insensitive (https://stackoverflow.com/a/5259004)
    accept: '*/*',
    'content-type': 'application/json',
};
var defaultOptions = {
    method: 'POST',
};
var fallbackHttpConfig = {
    http: defaultHttpOptions,
    headers: defaultHeaders,
    options: defaultOptions,
};
var throwServerError = function (response, result, message) {
    var error = new Error(message);
    error.response = response;
    error.statusCode = response.status;
    error.result = result;
    throw error;
};
//TODO: when conditional types come in ts 2.8, operations should be a generic type that extends Operation | Array<Operation>
var parseAndCheckHttpResponse = function (operations) { return function (response) {
    return (response
        .text()
        .then(function (bodyText) {
        try {
            return JSON.parse(bodyText);
        }
        catch (err) {
            var parseError = err;
            parseError.response = response;
            parseError.statusCode = response.status;
            parseError.bodyText = bodyText;
            return Promise.reject(parseError);
        }
    })
        //TODO: when conditional types come out then result should be T extends Array ? Array<FetchResult> : FetchResult
        .then(function (result) {
        if (response.status >= 300) {
            //Network error
            throwServerError(response, result, "Response not successful: Received status code " + response.status);
        }
        //TODO should really error per response in a Batch based on properties
        //    - could be done in a validation link
        if (!Array.isArray(result) &&
            !result.hasOwnProperty('data') &&
            !result.hasOwnProperty('errors')) {
            //Data error
            throwServerError(response, result, "Server response was missing for query '" + (Array.isArray(operations)
                ? operations.map(function (op) { return op.operationName; })
                : operations.operationName) + "'.");
        }
        return result;
    }));
}; };
var checkFetcher = function (fetcher) {
    if (!fetcher && typeof fetch === 'undefined') {
        var library = 'unfetch';
        if (typeof window === 'undefined')
            library = 'node-fetch';
        throw new Error("\nfetch is not found globally and no fetcher passed, to fix pass a fetch for\nyour environment like https://www.npmjs.com/package/" + library + ".\n\nFor example:\nimport fetch from '" + library + "';\nimport { createHttpLink } from 'apollo-link-http';\n\nconst link = createHttpLink({ uri: '/graphql', fetch: fetch });");
    }
};
var createSignalIfSupported = function () {
    if (typeof AbortController === 'undefined')
        return { controller: false, signal: false };
    var controller = new AbortController();
    var signal = controller.signal;
    return { controller: controller, signal: signal };
};
var selectHttpOptionsAndBody = function (operation, fallbackConfig) {
    var configs = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        configs[_i - 2] = arguments[_i];
    }
    var options = __assign$b({}, fallbackConfig.options, { headers: fallbackConfig.headers, credentials: fallbackConfig.credentials });
    var http = fallbackConfig.http;
    /*
     * use the rest of the configs to populate the options
     * configs later in the list will overwrite earlier fields
     */
    configs.forEach(function (config) {
        options = __assign$b({}, options, config.options, { headers: __assign$b({}, options.headers, config.headers) });
        if (config.credentials)
            options.credentials = config.credentials;
        http = __assign$b({}, http, config.http);
    });
    //The body depends on the http options
    var operationName = operation.operationName, extensions = operation.extensions, variables = operation.variables, query = operation.query;
    var body = { operationName: operationName, variables: variables };
    if (http.includeExtensions)
        body.extensions = extensions;
    // not sending the query (i.e persisted queries)
    if (http.includeQuery)
        body.query = printer_1(query);
    return {
        options: options,
        body: body,
    };
};
var serializeFetchParameter = function (p, label) {
    var serialized;
    try {
        serialized = JSON.stringify(p);
    }
    catch (e) {
        var parseError = new Error("Network request failed. " + label + " is not serializable: " + e.message);
        parseError.parseError = e;
        throw parseError;
    }
    return serialized;
};
//selects "/graphql" by default
var selectURI = function (operation, fallbackURI) {
    var context = operation.getContext();
    var contextURI = context.uri;
    if (contextURI) {
        return contextURI;
    }
    else if (typeof fallbackURI === 'function') {
        return fallbackURI(operation);
    }
    else {
        return fallbackURI || '/graphql';
    }
};
//# sourceMappingURL=index.js.map

/* tslint:disable */
var __extends$6 = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __rest$1 = (undefined && undefined.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
var createHttpLink = function (linkOptions) {
    if (linkOptions === void 0) { linkOptions = {}; }
    var _a = linkOptions.uri, uri = _a === void 0 ? '/graphql' : _a, 
    // use default global fetch is nothing passed in
    fetcher = linkOptions.fetch, includeExtensions = linkOptions.includeExtensions, useGETForQueries = linkOptions.useGETForQueries, requestOptions = __rest$1(linkOptions, ["uri", "fetch", "includeExtensions", "useGETForQueries"]);
    // dev warnings to ensure fetch is present
    checkFetcher(fetcher);
    //fetcher is set here rather than the destructuring to ensure fetch is
    //declared before referencing it. Reference in the destructuring would cause
    //a ReferenceError
    if (!fetcher) {
        fetcher = fetch;
    }
    var linkConfig = {
        http: { includeExtensions: includeExtensions },
        options: requestOptions.fetchOptions,
        credentials: requestOptions.credentials,
        headers: requestOptions.headers,
    };
    return new ApolloLink(function (operation) {
        var chosenURI = selectURI(operation, uri);
        var context = operation.getContext();
        var contextConfig = {
            http: context.http,
            options: context.fetchOptions,
            credentials: context.credentials,
            headers: context.headers,
        };
        //uses fallback, link, and then context to build options
        var _a = selectHttpOptionsAndBody(operation, fallbackHttpConfig, linkConfig, contextConfig), options = _a.options, body = _a.body;
        var controller;
        if (!options.signal) {
            var _b = createSignalIfSupported(), _controller = _b.controller, signal = _b.signal;
            controller = _controller;
            if (controller)
                options.signal = signal;
        }
        // If requested, set method to GET if there are no mutations.
        var definitionIsMutation = function (d) {
            return d.kind === 'OperationDefinition' && d.operation === 'mutation';
        };
        if (useGETForQueries &&
            !operation.query.definitions.some(definitionIsMutation)) {
            options.method = 'GET';
        }
        if (options.method === 'GET') {
            var _c = rewriteURIForGET(chosenURI, body), newURI = _c.newURI, parseError = _c.parseError;
            if (parseError) {
                return fromError(parseError);
            }
            chosenURI = newURI;
        }
        else {
            try {
                options.body = serializeFetchParameter(body, 'Payload');
            }
            catch (parseError) {
                return fromError(parseError);
            }
        }
        return new Observable$1(function (observer) {
            fetcher(chosenURI, options)
                .then(function (response) {
                operation.setContext({ response: response });
                return response;
            })
                .then(parseAndCheckHttpResponse(operation))
                .then(function (result) {
                // we have data and can send it to back up the link chain
                observer.next(result);
                observer.complete();
                return result;
            })
                .catch(function (err) {
                // fetch was cancelled so its already been cleaned up in the unsubscribe
                if (err.name === 'AbortError')
                    return;
                // if it is a network error, BUT there is graphql result info
                // fire the next observer before calling error
                // this gives apollo-client (and react-apollo) the `graphqlErrors` and `networErrors`
                // to pass to UI
                // this should only happen if we *also* have data as part of the response key per
                // the spec
                if (err.result && err.result.errors && err.result.data) {
                    // if we dont' call next, the UI can only show networkError because AC didn't
                    // get andy graphqlErrors
                    // this is graphql execution result info (i.e errors and possibly data)
                    // this is because there is no formal spec how errors should translate to
                    // http status codes. So an auth error (401) could have both data
                    // from a public field, errors from a private field, and a status of 401
                    // {
                    //  user { // this will have errors
                    //    firstName
                    //  }
                    //  products { // this is public so will have data
                    //    cost
                    //  }
                    // }
                    //
                    // the result of above *could* look like this:
                    // {
                    //   data: { products: [{ cost: "$10" }] },
                    //   errors: [{
                    //      message: 'your session has timed out',
                    //      path: []
                    //   }]
                    // }
                    // status code of above would be a 401
                    // in the UI you want to show data where you can, errors as data where you can
                    // and use correct http status codes
                    observer.next(err.result);
                }
                observer.error(err);
            });
            return function () {
                // XXX support canceling this request
                // https://developers.google.com/web/updates/2017/09/abortable-fetch
                if (controller)
                    controller.abort();
            };
        });
    });
};
// For GET operations, returns the given URI rewritten with parameters, or a
// parse error.
function rewriteURIForGET(chosenURI, body) {
    // Implement the standard HTTP GET serialization, plus 'extensions'. Note
    // the extra level of JSON serialization!
    var queryParams = [];
    var addQueryParam = function (key, value) {
        queryParams.push(key + "=" + encodeURIComponent(value));
    };
    if ('query' in body) {
        addQueryParam('query', body.query);
    }
    if (body.operationName) {
        addQueryParam('operationName', body.operationName);
    }
    if (body.variables) {
        var serializedVariables = void 0;
        try {
            serializedVariables = serializeFetchParameter(body.variables, 'Variables map');
        }
        catch (parseError) {
            return { parseError: parseError };
        }
        addQueryParam('variables', serializedVariables);
    }
    if (body.extensions) {
        var serializedExtensions = void 0;
        try {
            serializedExtensions = serializeFetchParameter(body.extensions, 'Extensions map');
        }
        catch (parseError) {
            return { parseError: parseError };
        }
        addQueryParam('extensions', serializedExtensions);
    }
    // Reconstruct the URI with added query params.
    // XXX This assumes that the URI is well-formed and that it doesn't
    //     already contain any of these query params. We could instead use the
    //     URL API and take a polyfill (whatwg-url@6) for older browsers that
    //     don't support URLSearchParams. Note that some browsers (and
    //     versions of whatwg-url) support URL but not URLSearchParams!
    var fragment = '', preFragment = chosenURI;
    var fragmentStart = chosenURI.indexOf('#');
    if (fragmentStart !== -1) {
        fragment = chosenURI.substr(fragmentStart);
        preFragment = chosenURI.substr(0, fragmentStart);
    }
    var queryParamsPrefix = preFragment.indexOf('?') === -1 ? '?' : '&';
    var newURI = preFragment + queryParamsPrefix + queryParams.join('&') + fragment;
    return { newURI: newURI };
}
var HttpLink = /** @class */ (function (_super) {
    __extends$6(HttpLink, _super);
    function HttpLink(opts) {
        return _super.call(this, createHttpLink(opts).request) || this;
    }
    return HttpLink;
}(ApolloLink));
//# sourceMappingURL=httpLink.js.map

//# sourceMappingURL=index.js.map

var ConnectionMode;
(function (ConnectionMode) {
    ConnectionMode[ConnectionMode["AUTO"] = 0] = "AUTO";
    ConnectionMode[ConnectionMode["PLAIN"] = 1] = "PLAIN";
    ConnectionMode[ConnectionMode["NODES"] = 2] = "NODES";
    ConnectionMode[ConnectionMode["EDGES"] = 3] = "EDGES";
})(ConnectionMode || (ConnectionMode = {}));
var ArgumentMode;
(function (ArgumentMode) {
    ArgumentMode[ArgumentMode["TYPE"] = 0] = "TYPE";
    ArgumentMode[ArgumentMode["LIST"] = 1] = "LIST";
})(ArgumentMode || (ArgumentMode = {}));
//# sourceMappingURL=adapter.js.map

/**
 * This class provides methods to transform incoming data from GraphQL in to a format Vuex-ORM understands and
 * vice versa.
 */
var Transformer = /** @class */function () {
    function Transformer() {}
    /**
     * Transforms outgoing data. Use for variables param.
     *
     * @param {Model} model Base model of the mutation/query
     * @param {Data} data Data to transform
     * @param {boolean} read Tells if this is a write or a read action. read is fetch, write is push and persist.
     * @param {Array<String>} whitelist of fields
     * @param {Map<string, Array<string>>} outgoingRecords List of record IDs that are already added to the
     *                                                     outgoing data in order to detect recursion.
     * @param {boolean} recursiveCall Tells if it's a recursive call.
     * @returns {Data}
     */
    Transformer.transformOutgoingData = function (model, data, read, inputType, whitelist, outgoingRecords, recursiveCall) {
        var _this = this;
        var context = Context.getInstance();
        var relations = model.getRelations();
        var returnValue = {};
        var inputFields = inputType ? inputType.inputFields : undefined;
        if (outgoingRecords === undefined) outgoingRecords = new Map();
        if (recursiveCall === undefined) recursiveCall = false;
        Object.keys(data).forEach(function (key) {
            var value = data[key];
            var isRelation = model.getRelations().has(key);
            var isRecursion = false;
            if (value instanceof Array) {
                isRecursion = isRelation && _this.isRecursion(outgoingRecords, value[0]);
            } else {
                isRecursion = isRelation && _this.isRecursion(outgoingRecords, value);
            }
            // shouldIncludeOutgoingField and the read param is tricky. In the initial call of this method
            // we want to include any relation, so we have to make sure it's false. In the recursive calls
            // it should be true when we transform the outgoing data for fetch (and false for the others)
            if (!isRecursion && _this.shouldIncludeOutgoingField(recursiveCall && read, key, value, model, whitelist, inputFields)) {
                var relatedModel = Model.getRelatedModel(relations.get(key));
                if (value instanceof Array) {
                    // Either this is a hasMany field or a .attr() field which contains an array.
                    var arrayModel_1 = context.getModel(singularize(key), true);
                    if (arrayModel_1) {
                        _this.addRecordForRecursionDetection(outgoingRecords, value[0]);
                        returnValue[key] = value.map(function (v) {
                            return _this.transformOutgoingData(arrayModel_1 || model, v, read, undefined, undefined, outgoingRecords, true);
                        });
                    } else {
                        // Simple field, not a relation
                        returnValue[key] = value;
                    }
                } else if ((typeof value === "undefined" ? "undefined" : _typeof(value)) === "object" && value.$id !== undefined) {
                    if (!relatedModel) {
                        relatedModel = context.getModel(value.$self().entity);
                    }
                    _this.addRecordForRecursionDetection(outgoingRecords, value);
                    // Value is a record, transform that too
                    returnValue[key] = _this.transformOutgoingData(relatedModel, value, read, undefined, undefined, outgoingRecords, true);
                } else {
                    // In any other case just let the value be what ever it is
                    returnValue[key] = value;
                }
            }
        });
        return returnValue;
    };
    /**
     * Transforms a set of incoming data to the format vuex-orm requires.
     *
     * @param {Data | Array<Data>} data
     * @param model
     * @param mutation required to transform something like `disableUserAddress` to the actual model name.
     * @param {boolean} recursiveCall
     * @returns {Data}
     */
    Transformer.transformIncomingData = function (data, model, mutation, recursiveCall) {
        var _this = this;
        if (mutation === void 0) {
            mutation = false;
        }
        if (recursiveCall === void 0) {
            recursiveCall = false;
        }
        var result = {};
        var context = Context.getInstance();
        if (!recursiveCall) {
            context.logger.group("Transforming incoming data");
            context.logger.log("Raw data:", data);
        }
        if (Array.isArray(data)) {
            result = data.map(function (d) {
                return _this.transformIncomingData(d, model, mutation, true);
            });
        } else {
            Object.keys(data).forEach(function (key) {
                if (data[key] !== undefined && data[key] !== null && key in data) {
                    if (isPlainObject(data[key])) {
                        var localModel = context.getModel(key, true) || model;
                        if (data[key].nodes && context.connectionMode === ConnectionMode.NODES) {
                            result[pluralize$1(key)] = _this.transformIncomingData(data[key].nodes, localModel, mutation, true);
                        } else if (data[key].edges && context.connectionMode === ConnectionMode.EDGES) {
                            result[pluralize$1(key)] = _this.transformIncomingData(data[key].edges, localModel, mutation, true);
                        } else if (data["node"] && context.connectionMode === ConnectionMode.EDGES) {
                            result = _this.transformIncomingData(data["node"], localModel, mutation, true);
                        } else {
                            var newKey = key;
                            if (mutation && !recursiveCall) {
                                newKey = data[key].nodes ? localModel.pluralName : localModel.singularName;
                                newKey = downcaseFirstLetter(newKey);
                            }
                            result[newKey] = _this.transformIncomingData(data[key], localModel, mutation, true);
                        }
                    } else if (Model.isFieldNumber(model.fields.get(key))) {
                        result[key] = parseFloat(data[key]);
                    } else if (key.endsWith("Type") && model.isTypeFieldOfPolymorphicRelation(key)) {
                        result[key] = pluralize$1(downcaseFirstLetter(data[key]));
                    } else if (Array.isArray(data[key])) {
                        var relation = model.getRelations().get(key);
                        if (relation) {
                            var related = Model.getRelatedModel(relation);
                            result[key] = _this.transformIncomingData(data[key], related, mutation, true);
                        }
                    } else {
                        result[key] = data[key];
                    }
                }
            });
        }
        if (!recursiveCall) {
            context.logger.log("Transformed data:", result);
            context.logger.groupEnd();
        } else {
            result["$isPersisted"] = true;
        }
        // Make sure this is really a plain JS object. We had some issues in testing here.
        return clone(result);
    };
    /**
     * Tells if a field should be included in the outgoing data.
     * @param {boolean} forFilter Tells whether a filter is constructed or not.
     * @param {string} fieldName Name of the field to check.
     * @param {any} value Value of the field.
     * @param {Model} model Model class which contains the field.
     * @param {Array<String>|undefined} whitelist Contains a list of fields which should always be included.
     * @param {Array<GraphQLField>|undefined} schemaFields Contains a list of schema fields which are defined in the model input type for the mutation.
     * @returns {boolean}
     */
    Transformer.shouldIncludeOutgoingField = function (forFilter, fieldName, value, model, whitelist, schemaFields) {
        // Always add fields on the whitelist.
        if (whitelist && whitelist.includes(fieldName)) return true;
        // Ignore internal fields
        if (fieldName.startsWith("$")) return false;
        // Ignore empty fields
        if (value === null || value === undefined) return false;
        // Is the field in the mutation type field list, if provided?
        if (schemaFields && !schemaFields.find(function (f) {
            return f.name === fieldName;
        })) return false;
        // Include all eager save connections
        if (model.getRelations().has(fieldName)) {
            // We never add relations to filters.
            if (forFilter) return false;
            var relation = model.getRelations().get(fieldName);
            var related = Model.getRelatedModel(relation);
            if (related && model.shouldEagerSaveRelation(fieldName, relation, related)) return true;
            // All other relations are skipped
            return false;
        }
        // Everything else is ok
        return true;
    };
    /**
     * Registers a record for recursion detection.
     * @param {Map<string, Array<string>>} records Map of IDs.
     * @param {ORMModel} record The record to register.
     */
    Transformer.addRecordForRecursionDetection = function (records, record) {
        var context = Context.getInstance();
        if (!record) {
            context.logger.warn("Trying to add invalid record", record, "to recursion detection");
            return;
        }
        if (!record.$self) {
            context.logger.warn("Seems like you're using non-model classes with plugin graphql. You shouldn't do that.");
            return;
        }
        var model = context.getModel(record.$self().entity);
        var ids = records.get(model.singularName) || [];
        ids.push(record.$id);
        records.set(model.singularName, ids);
    };
    /**
     * Detects recursions.
     * @param {Map<string, Array<string>>} records Map of IDs.
     * @param {ORMModel} record The record to check.
     * @return {boolean} true when the record is already included in the records.
     */
    Transformer.isRecursion = function (records, record) {
        if (!record) return false;
        if (!record.$self) {
            Context.getInstance().logger.warn("Seems like you're using non-model classes with plugin graphql. You shouldn't do that.");
            return false;
        }
        var model = Context.getInstance().getModel(record.$self().entity);
        var ids = records.get(model.singularName) || [];
        return ids.includes(record.$id);
    };
    return Transformer;
}();

var parse = parser.parse;

// Strip insignificant whitespace
// Note that this could do a lot more, such as reorder fields etc.
function normalize(string) {
  return string.replace(/[\s,]+/g, ' ').trim();
}

// A map docString -> graphql document
var docCache = {};

// A map fragmentName -> [normalized source]
var fragmentSourceMap = {};

function cacheKeyFromLoc(loc) {
  return normalize(loc.source.body.substring(loc.start, loc.end));
}

// For testing.
function resetCaches() {
  docCache = {};
  fragmentSourceMap = {};
}

// Take a unstripped parsed document (query/mutation or even fragment), and
// check all fragment definitions, checking for name->source uniqueness.
// We also want to make sure only unique fragments exist in the document.
var printFragmentWarnings = true;
function processFragments(ast) {
  var astFragmentMap = {};
  var definitions = [];

  for (var i = 0; i < ast.definitions.length; i++) {
    var fragmentDefinition = ast.definitions[i];

    if (fragmentDefinition.kind === 'FragmentDefinition') {
      var fragmentName = fragmentDefinition.name.value;
      var sourceKey = cacheKeyFromLoc(fragmentDefinition.loc);

      // We know something about this fragment
      if (fragmentSourceMap.hasOwnProperty(fragmentName) && !fragmentSourceMap[fragmentName][sourceKey]) {

        // this is a problem because the app developer is trying to register another fragment with
        // the same name as one previously registered. So, we tell them about it.
        if (printFragmentWarnings) {
          console.warn("Warning: fragment with name " + fragmentName + " already exists.\n"
            + "graphql-tag enforces all fragment names across your application to be unique; read more about\n"
            + "this in the docs: http://dev.apollodata.com/core/fragments.html#unique-names");
        }

        fragmentSourceMap[fragmentName][sourceKey] = true;

      } else if (!fragmentSourceMap.hasOwnProperty(fragmentName)) {
        fragmentSourceMap[fragmentName] = {};
        fragmentSourceMap[fragmentName][sourceKey] = true;
      }

      if (!astFragmentMap[sourceKey]) {
        astFragmentMap[sourceKey] = true;
        definitions.push(fragmentDefinition);
      }
    } else {
      definitions.push(fragmentDefinition);
    }
  }

  ast.definitions = definitions;
  return ast;
}

function disableFragmentWarnings() {
  printFragmentWarnings = false;
}

function stripLoc(doc, removeLocAtThisLevel) {
  var docType = Object.prototype.toString.call(doc);

  if (docType === '[object Array]') {
    return doc.map(function (d) {
      return stripLoc(d, removeLocAtThisLevel);
    });
  }

  if (docType !== '[object Object]') {
    throw new Error('Unexpected input.');
  }

  // We don't want to remove the root loc field so we can use it
  // for fragment substitution (see below)
  if (removeLocAtThisLevel && doc.loc) {
    delete doc.loc;
  }

  // https://github.com/apollographql/graphql-tag/issues/40
  if (doc.loc) {
    delete doc.loc.startToken;
    delete doc.loc.endToken;
  }

  var keys = Object.keys(doc);
  var key;
  var value;
  var valueType;

  for (key in keys) {
    if (keys.hasOwnProperty(key)) {
      value = doc[keys[key]];
      valueType = Object.prototype.toString.call(value);

      if (valueType === '[object Object]' || valueType === '[object Array]') {
        doc[keys[key]] = stripLoc(value, true);
      }
    }
  }

  return doc;
}

var experimentalFragmentVariables = false;
function parseDocument(doc) {
  var cacheKey = normalize(doc);

  if (docCache[cacheKey]) {
    return docCache[cacheKey];
  }

  var parsed = parse(doc, { experimentalFragmentVariables: experimentalFragmentVariables });
  if (!parsed || parsed.kind !== 'Document') {
    throw new Error('Not a valid GraphQL document.');
  }

  // check that all "new" fragments inside the documents are consistent with
  // existing fragments of the same name
  parsed = processFragments(parsed);
  parsed = stripLoc(parsed, false);
  docCache[cacheKey] = parsed;

  return parsed;
}

function enableExperimentalFragmentVariables() {
  experimentalFragmentVariables = true;
}

function disableExperimentalFragmentVariables() {
  experimentalFragmentVariables = false;
}

// XXX This should eventually disallow arbitrary string interpolation, like Relay does
function gql(/* arguments */) {
  var args = Array.prototype.slice.call(arguments);

  var literals = args[0];

  // We always get literals[0] and then matching post literals for each arg given
  var result = (typeof(literals) === "string") ? literals : literals[0];

  for (var i = 1; i < args.length; i++) {
    if (args[i] && args[i].kind && args[i].kind === 'Document') {
      result += args[i].loc.source.body;
    } else {
      result += args[i];
    }

    result += literals[i];
  }

  return parseDocument(result);
}

// Support typescript, which isn't as nice as Babel about default exports
gql.default = gql;
gql.resetCaches = resetCaches;
gql.disableFragmentWarnings = disableFragmentWarnings;
gql.enableExperimentalFragmentVariables = enableExperimentalFragmentVariables;
gql.disableExperimentalFragmentVariables = disableExperimentalFragmentVariables;

var src = gql;

/**
 * This class takes care of the communication with the graphql endpoint by leveraging the awesome apollo-client lib.
 */
var Apollo = /** @class */function () {
    /**
     * @constructor
     */
    function Apollo() {
        var context = Context.getInstance();
        // This allows the test suite to pass a custom link
        if (!context.options.apolloClient && context.options.link) {
            this.httpLink = context.options.link;
        } else {
            /* istanbul ignore next */
            this.httpLink = new HttpLink({
                uri: context.options.url ? context.options.url : "/graphql",
                credentials: context.options.credentials ? context.options.credentials : "same-origin",
                useGETForQueries: Boolean(context.options.useGETForQueries)
            });
        }
        if (context.options.apolloClient) {
            this.apolloClient = function (context) {
                return context.options.apolloClient;
            }(context);
        } else {
            this.apolloClient = new ApolloClient({
                link: this.httpLink,
                cache: new InMemoryCache(),
                connectToDevTools: context.debugMode
            });
        }
    }
    /**
     * Sends a request to the GraphQL API via apollo
     * @param model
     * @param {any} query The query to send (result from gql())
     * @param {Arguments} variables Optional. The variables to send with the query
     * @param {boolean} mutation Optional. If this is a mutation (true) or a query (false, default)
     * @param {boolean} bypassCache If true the query will be send to the server without using the cache. For queries only
     * @returns {Promise<Data>} The new records
     */
    Apollo.prototype.request = function (model, query, variables, mutation, bypassCache) {
        if (mutation === void 0) {
            mutation = false;
        }
        if (bypassCache === void 0) {
            bypassCache = false;
        }
        return __awaiter(this, void 0, void 0, function () {
            var fetchPolicy, context, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fetchPolicy = bypassCache ? "network-only" : "cache-first";
                        Context.getInstance().logger.logQuery(query, variables, fetchPolicy);
                        context = { headers: Apollo.getHeaders() };
                        if (!mutation) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.apolloClient.mutate({ mutation: query, variables: variables, context: context })];
                    case 1:
                        response = _a.sent();
                        return [3 /*break*/, 4];
                    case 2:
                        return [4 /*yield*/, this.apolloClient.query({ query: query, variables: variables, fetchPolicy: fetchPolicy, context: context })];
                    case 3:
                        response = _a.sent();
                        _a.label = 4;
                    case 4:
                        // Transform incoming data into something useful
                        return [2 /*return*/, Transformer.transformIncomingData(response.data, model, mutation)];
                }
            });
        });
    };
    Apollo.prototype.simpleQuery = function (query, variables, bypassCache, context) {
        if (bypassCache === void 0) {
            bypassCache = false;
        }
        return __awaiter(this, void 0, void 0, function () {
            var fetchPolicy;
            return __generator(this, function (_a) {
                fetchPolicy = bypassCache ? "network-only" : "cache-first";
                return [2 /*return*/, this.apolloClient.query({
                    query: src(query),
                    variables: variables,
                    fetchPolicy: fetchPolicy,
                    context: { headers: Apollo.getHeaders() }
                })];
            });
        });
    };
    Apollo.prototype.simpleMutation = function (query, variables, context) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.apolloClient.mutate({
                    mutation: src(query),
                    variables: variables,
                    context: { headers: Apollo.getHeaders() }
                })];
            });
        });
    };
    Apollo.getHeaders = function () {
        var context = Context.getInstance();
        var headers = context.options.headers ? context.options.headers : {};
        if (typeof headers === "function") {
            headers = headers(context);
        }
        return headers;
    };
    return Apollo;
}();
//# sourceMappingURL=apollo.js.map

var Schema = /** @class */function () {
    function Schema(schema) {
        var _this = this;
        var context = Context.getInstance();
        this.schema = schema;
        this.types = new Map();
        this.mutations = new Map();
        this.queries = new Map();
        this.schema.types.forEach(function (t) {
            return _this.types.set(t.name, t);
        });
        this.getType(context.adapter.getRootQueryName()).fields.forEach(function (f) {
            return _this.queries.set(f.name, f);
        });
        this.getType(context.adapter.getRootMutationName()).fields.forEach(function (f) {
            return _this.mutations.set(f.name, f);
        });
    }
    Schema.prototype.determineQueryMode = function () {
        var _this = this;
        var connection = null;
        this.queries.forEach(function (query) {
            var typeName = Schema.getTypeNameOfField(query);
            if (typeName.endsWith("TypeConnection")) {
                connection = _this.getType(typeName);
                return false; // break
            }
            return true;
        });
        /* istanbul ignore next */
        if (!connection) {
            throw new Error("Can't determine the connection mode due to the fact that here are no connection types in the schema. Please set the connectionMode via Vuex-ORM-GraphQL options!");
        }
        if (connection.fields.find(function (f) {
            return f.name === "nodes";
        })) {
            return ConnectionMode.NODES;
        } else if (connection.fields.find(function (f) {
            return f.name === "edges";
        })) {
            return ConnectionMode.EDGES;
        } else {
            return ConnectionMode.PLAIN;
        }
    };
    Schema.prototype.getType = function (name, allowNull) {
        if (allowNull === void 0) {
            allowNull = false;
        }
        name = Context.getInstance().adapter.prepareSchemaTypeName(name);
        var type = this.types.get(name);
        if (!allowNull && !type) {
            throw new Error("Couldn't find Type of name " + name + " in the GraphQL Schema.");
        }
        return type || null;
    };
    Schema.prototype.getMutation = function (name, allowNull) {
        if (allowNull === void 0) {
            allowNull = false;
        }
        var mutation = this.mutations.get(name);
        /* istanbul ignore next */
        if (!allowNull && !mutation) {
            throw new Error("Couldn't find Mutation of name " + name + " in the GraphQL Schema.");
        }
        return mutation || null;
    };
    Schema.prototype.getQuery = function (name, allowNull) {
        if (allowNull === void 0) {
            allowNull = false;
        }
        var query = this.queries.get(name);
        /* istanbul ignore next */
        if (!allowNull && !query) {
            throw new Error("Couldn't find Query of name " + name + " in the GraphQL Schema.");
        }
        return query || null;
    };
    Schema.returnsConnection = function (field) {
        return Schema.getTypeNameOfField(field).endsWith("TypeConnection");
    };
    Schema.getRealType = function (type) {
        if (type.kind === "NON_NULL") {
            return this.getRealType(type.ofType);
        } else {
            return type;
        }
    };
    Schema.getTypeNameOfField = function (field) {
        var type = this.getRealType(field.type);
        if (type.kind === "LIST") {
            while (!type.name) {
                type = type.ofType;
            }return "[" + type.name + "]";
        } else {
            while (!type.name) {
                type = type.ofType;
            } /* istanbul ignore next */
            if (!type.name) throw new Error("Can't find type name for field " + field.name);
            return type.name;
        }
    };
    return Schema;
}();
//# sourceMappingURL=schema.js.map

var DefaultAdapter = /** @class */function () {
    function DefaultAdapter() {}
    DefaultAdapter.prototype.getRootMutationName = function () {
        return "Mutation";
    };
    DefaultAdapter.prototype.getRootQueryName = function () {
        return "Query";
    };
    DefaultAdapter.prototype.getConnectionMode = function () {
        return ConnectionMode.NODES;
    };
    DefaultAdapter.prototype.getArgumentMode = function () {
        return ArgumentMode.TYPE;
    };
    DefaultAdapter.prototype.getFilterTypeName = function (model) {
        return upcaseFirstLetter(model.singularName) + "Filter";
    };
    DefaultAdapter.prototype.getInputTypeName = function (model, action) {
        return upcaseFirstLetter(model.singularName) + "Input";
    };
    DefaultAdapter.prototype.getNameForDestroy = function (model) {
        return "delete" + upcaseFirstLetter(model.singularName);
    };
    DefaultAdapter.prototype.getNameForFetch = function (model, plural) {
        return plural ? model.pluralName : model.singularName;
    };
    DefaultAdapter.prototype.getNameForPersist = function (model) {
        return "create" + upcaseFirstLetter(model.singularName);
    };
    DefaultAdapter.prototype.getNameForPush = function (model) {
        return "update" + upcaseFirstLetter(model.singularName);
    };
    DefaultAdapter.prototype.prepareSchemaTypeName = function (name) {
        return upcaseFirstLetter(name);
    };
    return DefaultAdapter;
}();
//# sourceMappingURL=default-adapter.js.map

var introspectionQuery = "\nquery Introspection {\n  __schema {\n    types {\n      name\n      description\n      fields(includeDeprecated: true) {\n        name\n        description\n        args {\n          name\n          description\n          type {\n            name\n            kind\n\n            ofType {\n              kind\n\n              name\n              ofType {\n                kind\n                name\n\n                ofType {\n                  kind\n                  name\n                }\n              }\n            }\n          }\n        }\n\n        type {\n          name\n          kind\n\n          ofType {\n            kind\n\n            name\n            ofType {\n              kind\n              name\n\n              ofType {\n                kind\n                name\n              }\n            }\n          }\n        }\n      }\n\n      inputFields {\n        name\n        description\n        type {\n          name\n          kind\n\n          ofType {\n            kind\n\n            name\n            ofType {\n              kind\n              name\n\n              ofType {\n                kind\n                name\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n}\n";
//# sourceMappingURL=introspection-query.js.map

/**
 * Internal context of the plugin. This class contains all information, the models, database, logger and so on.
 *
 * It's a singleton class, so just call Context.getInstance() anywhere you need the context.
 */
var Context = /** @class */function () {
    /**
     * Private constructor, called by the setup method
     *
     * @constructor
     * @param {Components} components The Vuex-ORM Components collection
     * @param {Options} options The options passed to VuexORM.install
     */
    function Context(components, options) {
        /**
         * Collection of all Vuex-ORM models wrapped in a Model instance.
         * @type {Map<any, any>}
         */
        this.models = new Map();
        /**
         * When true, the logging is enabled.
         * @type {boolean}
         */
        this.debugMode = false;
        /**
         * Defines how to query connections. 'auto' | 'nodes' | 'edges' | 'plain'
         */
        this.connectionMode = ConnectionMode.AUTO;
        /**
         * Container for the global mocks.
         * @type {Object}
         */
        this.globalMocks = {};
        this.components = components;
        this.options = options;
        this.database = options.database;
        this.debugMode = Boolean(options.debug);
        this.logger = new Logger(this.debugMode);
        this.adapter = options.adapter || new DefaultAdapter();
        /* istanbul ignore next */
        if (!options.database) {
            throw new Error("database param is required to initialize vuex-orm-graphql!");
        }
    }
    /**
     * Get the singleton instance of the context.
     * @returns {Context}
     */
    Context.getInstance = function () {
        return this.instance;
    };
    /**
     * This is called only once and creates a new instance of the Context.
     * @param {Components} components The Vuex-ORM Components collection
     * @param {Options} options The options passed to VuexORM.install
     * @returns {Context}
     */
    Context.setup = function (components, options) {
        this.instance = new Context(components, options);
        this.instance.apollo = new Apollo();
        this.instance.collectModels();
        this.instance.logger.group("Context setup");
        this.instance.logger.log("components", this.instance.components);
        this.instance.logger.log("options", this.instance.options);
        this.instance.logger.log("database", this.instance.database);
        this.instance.logger.log("models", this.instance.models);
        this.instance.logger.groupEnd();
        return this.instance;
    };
    Context.prototype.loadSchema = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                if (!this.schemaWillBeLoaded) {
                    this.schemaWillBeLoaded = new Promise(function (resolve, reject) {
                        return __awaiter(_this, void 0, void 0, function () {
                            var context, result;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        this.logger.log("Fetching GraphQL Schema initially ...");
                                        this.connectionMode = this.adapter.getConnectionMode();
                                        context = {
                                            headers: { "X-GraphQL-Introspection-Query": "true" }
                                        };
                                        return [4 /*yield*/, this.apollo.simpleQuery(introspectionQuery, {}, true, context)];
                                    case 1:
                                        result = _a.sent();
                                        this.schema = new Schema(result.data.__schema);
                                        this.logger.log("GraphQL Schema successful fetched", result);
                                        this.logger.log("Starting to process the schema ...");
                                        this.processSchema();
                                        this.logger.log("Schema procession done!");
                                        resolve(this.schema);
                                        return [2 /*return*/];
                                }
                            });
                        });
                    });
                }
                return [2 /*return*/, this.schemaWillBeLoaded];
            });
        });
    };
    Context.prototype.processSchema = function () {
        var _this = this;
        this.models.forEach(function (model) {
            var type;
            try {
                type = _this.schema.getType(model.singularName);
            } catch (error) {
                _this.logger.warn("Ignoring entity " + model.singularName + " because it's not in the schema.");
                return;
            }
            model.fields.forEach(function (field, fieldName) {
                if (!type.fields.find(function (f) {
                    return f.name === fieldName;
                })) {
                    _this.logger.warn("Ignoring field " + model.singularName + "." + fieldName + " because it's not in the schema.");
                    // TODO: Move skipFields to the model
                    model.baseModel.skipFields = model.baseModel.skipFields ? model.baseModel.skipFields : [];
                    if (!model.baseModel.skipFields.includes(fieldName)) {
                        model.baseModel.skipFields.push(fieldName);
                    }
                }
            });
        });
        if (this.connectionMode === ConnectionMode.AUTO) {
            this.connectionMode = this.schema.determineQueryMode();
            this.logger.log("Connection Query Mode is " + this.connectionMode + " by automatic detection");
        } else {
            this.logger.log("Connection Query Mode is " + this.connectionMode + " by config");
        }
    };
    /**
     * Returns a model from the model collection by it's name
     *
     * @param {Model|string} model A Model instance, a singular or plural name of the model
     * @param {boolean} allowNull When true this method returns null instead of throwing an exception when no model was
     *                            found. Default is false
     * @returns {Model}
     */
    Context.prototype.getModel = function (model, allowNull) {
        if (allowNull === void 0) {
            allowNull = false;
        }
        if (typeof model === "string") {
            var name_1 = singularize(downcaseFirstLetter(model));
            model = this.models.get(name_1);
            if (!allowNull && !model) throw new Error("No such model " + name_1 + "!");
        }
        return model;
    };
    /**
     * Will add a mock for simple mutations or queries. These are model unrelated and have to be
     * handled  globally.
     *
     * @param {Mock} mock - Mock config.
     */
    Context.prototype.addGlobalMock = function (mock) {
        if (this.findGlobalMock(mock.action, mock.options)) return false;
        if (!this.globalMocks[mock.action]) this.globalMocks[mock.action] = [];
        this.globalMocks[mock.action].push(mock);
        return true;
    };
    /**
     * Finds a global mock for the given action and options.
     *
     * @param {string} action - Name of the action like 'simpleQuery' or 'simpleMutation'.
     * @param {MockOptions} options - MockOptions like { name: 'example' }.
     * @returns {Mock | null} null when no mock was found.
     */
    Context.prototype.findGlobalMock = function (action, options) {
        if (this.globalMocks[action]) {
            return this.globalMocks[action].find(function (m) {
                if (!m.options || !options) return true;
                var relevantOptions = pick(options, Object.keys(m.options));
                return isEqual(relevantOptions, m.options || {});
            }) || null;
        }
        return null;
    };
    /**
     * Hook to be called by simpleMutation and simpleQuery actions in order to get the global mock
     * returnValue.
     *
     * @param {string} action - Name of the action like 'simpleQuery' or 'simpleMutation'.
     * @param {MockOptions} options - MockOptions.
     * @returns {any} null when no mock was found.
     */
    Context.prototype.globalMockHook = function (action, options) {
        var returnValue = null;
        var mock = this.findGlobalMock(action, options);
        if (mock) {
            if (mock.returnValue instanceof Function) {
                returnValue = mock.returnValue();
            } else {
                returnValue = mock.returnValue || null;
            }
        }
        return returnValue;
    };
    /**
     * Wraps all Vuex-ORM entities in a Model object and saves them into this.models
     */
    Context.prototype.collectModels = function () {
        var _this = this;
        this.database.entities.forEach(function (entity) {
            var model = new Model(entity.model);
            _this.models.set(model.singularName, model);
            Model.augment(model);
        });
    };
    return Context;
}();
//# sourceMappingURL=context.js.map

/**
 * Contains all logic to build GraphQL queries/mutations.
 */
var QueryBuilder = /** @class */function () {
    function QueryBuilder() {}
    /**
     * Builds a field for the GraphQL query and a specific model
     *
     * @param {Model|string} model The model to use
     * @param {boolean} multiple Determines whether plural/nodes syntax or singular syntax is used.
     * @param {Arguments} args The args that will be passed to the query field ( user(role: $role) )
     * @param {Array<Model>} path The relations in this list are ignored (while traversing relations).
     *                                    Mainly for recursion
     * @param {string} name Optional name of the field. If not provided, this will be the model name
     * @param filter
     * @param {boolean} allowIdFields Optional. Determines if id fields will be ignored for the argument generation.
     *                                See buildArguments
     * @returns {string}
     *
     * @todo Do we need the allowIdFields param?
     */
    QueryBuilder.buildField = function (model, multiple, args, path, name, filter, allowIdFields) {
        if (multiple === void 0) {
            multiple = true;
        }
        if (path === void 0) {
            path = [];
        }
        if (filter === void 0) {
            filter = false;
        }
        if (allowIdFields === void 0) {
            allowIdFields = false;
        }
        var context = Context.getInstance();
        model = context.getModel(model);
        name = name ? name : model.pluralName;
        var field = context.schema.getMutation(name, true) || context.schema.getQuery(name, true);
        var params = this.buildArguments(model, args, false, filter, allowIdFields, field);
        path = path.length === 0 ? [model.singularName] : path;
        var fields = "\n      " + model.getQueryFields().join(" ") + "\n      " + this.buildRelationsQuery(model, path) + "\n    ";
        if (multiple) {
            var header = "" + name + params;
            if (context.connectionMode === ConnectionMode.NODES) {
                return "\n          " + header + " {\n            nodes {\n              " + fields + "\n            }\n          }\n        ";
            } else if (context.connectionMode === ConnectionMode.EDGES) {
                return "\n          " + header + " {\n            edges {\n              node {\n                " + fields + "\n              }\n            }\n          }\n        ";
            } else {
                return "\n          " + header + " {\n            " + fields + "\n          }\n        ";
            }
        } else {
            return "\n        " + (name ? name : model.singularName) + params + " {\n          " + fields + "\n        }\n      ";
        }
    };
    /**
     * Generates a query.
     * Currently only one root field for the query is possible.
     * @param {string} type 'mutation' or 'query'
     * @param {Model | string} model The model this query or mutation affects. This mainly determines the query fields.
     * @param {string} name Optional name of the query/mutation. Will overwrite the name from the model.
     * @param {Arguments} args Arguments for the query
     * @param {boolean} multiple Determines if the root query field is a connection or not (will be passed to buildField)
     * @param {boolean} filter When true the query arguments are passed via a filter object.
     * @returns {any} Whatever gql() returns
     */
    QueryBuilder.buildQuery = function (type, model, name, args, multiple, filter) {
        var context = Context.getInstance();
        // model
        model = context.getModel(model);
        // arguments
        args = this.prepareArguments(args);
        // multiple
        multiple = multiple === undefined ? !args["id"] : multiple;
        // name
        if (!name) name = multiple ? model.pluralName : model.singularName;
        // field
        var field = context.schema.getMutation(name, true) || context.schema.getQuery(name, true);
        // build query
        var query = type + " " + upcaseFirstLetter(name) + this.buildArguments(model, args, true, filter, true, field) + " {\n" + ("  " + this.buildField(model, multiple, args, [], name, filter, true) + "\n") + "}";
        return src(query);
    };
    /**
     * Generates the arguments string for a graphql query based on a given map.
     *
     * There are three types of arguments:
     *
     * 1) Signatures with primitive types (signature = true)
     *      => 'mutation createUser($name: String!)'
     *
     * 2) Signatures with object types (signature = true, args = { user: { __type: 'User' }})
     *      => 'mutation createUser($user: UserInput!)'
     *
     * 3) Fields with variables (signature = false)
     *      => 'user(id: $id)'
     *
     * 4) Filter fields with variables (signature = false, filter = true)
     *      => 'users(filter: { active: $active })'
     *
     * @param model
     * @param {Arguments | undefined} args
     * @param {boolean} signature When true, then this method generates a query signature instead of key/value pairs
     * @param filter
     * @param {boolean} allowIdFields If true, ID fields will be included in the arguments list
     * @param {GraphQLField} field Optional. The GraphQL mutation or query field
     * @returns {String}
     */
    QueryBuilder.buildArguments = function (model, args, signature, filter, allowIdFields, field) {
        var _this = this;
        if (signature === void 0) {
            signature = false;
        }
        if (filter === void 0) {
            filter = false;
        }
        if (allowIdFields === void 0) {
            allowIdFields = true;
        }
        if (field === void 0) {
            field = null;
        }
        var context = Context.getInstance();
        if (args === undefined) return "";
        var returnValue = "";
        var first = true;
        if (args) {
            Object.keys(args).forEach(function (key) {
                var value = args[key];
                var isForeignKey = model.skipField(key);
                var skipFieldDueId = (key === "id" || isForeignKey) && !allowIdFields;
                var schemaField = _this.findSchemaFieldForArgument(key, field, model, filter);
                var isConnectionField = schemaField && Schema.getTypeNameOfField(schemaField).endsWith("TypeConnection");
                // Ignore null fields, ids and connections
                if (value && !skipFieldDueId && !isConnectionField) {
                    var typeOrValue = "";
                    if (signature) {
                        if (isPlainObject(value) && value.__type) {
                            // Case 2 (User!)
                            typeOrValue = context.adapter.getInputTypeName(context.getModel(value.__type)) + "!";
                        } else if (value instanceof Array && field) {
                            var arg = QueryBuilder.findSchemaFieldForArgument(key, field, model, filter);
                            /* istanbul ignore next */
                            if (!arg) {
                                throw new Error("The argument " + key + " is of type array but it's not possible to determine the type, because it's not in the field " + field.name);
                            }
                            typeOrValue = Schema.getTypeNameOfField(arg) + "!";
                        } else if (schemaField && Schema.getTypeNameOfField(schemaField)) {
                            // Case 1, 3 and 4
                            typeOrValue = Schema.getTypeNameOfField(schemaField) + "!";
                        } else if (key === "id" || isForeignKey) {
                            // Case 1 (ID!)
                            typeOrValue = "ID!";
                        } else {
                            // Case 1 (String!)
                            typeOrValue = _this.determineAttributeType(model, key, value, field || undefined);
                            typeOrValue = typeOrValue + "!";
                        }
                    } else {
                        // Case 3 or 4
                        typeOrValue = "$" + key;
                    }
                    returnValue = "" + returnValue + (first ? "" : ", ") + ((signature ? "$" : "") + key) + ": " + typeOrValue;
                    first = false;
                }
            });
            if (!first) {
                if (!signature && filter && Context.getInstance().adapter.getArgumentMode() === ArgumentMode.TYPE) returnValue = "filter: { " + returnValue + " }";
                returnValue = "(" + returnValue + ")";
            }
        }
        return returnValue;
    };
    /**
     * Determines the GraphQL primitive type of a field in the variables hash by the field type or (when
     * the field type is generic attribute) by the variable type.
     * @param {Model} model
     * @param {string} key
     * @param {string} value
     * @param {GraphQLField} query Pass when we have to detect the type of an argument
     * @returns {string}
     */
    QueryBuilder.determineAttributeType = function (model, key, value, query) {
        var context = Context.getInstance();
        var field = model.fields.get(key);
        var schemaField;
        if (query) {
            schemaField = query.args.find(function (f) {
                return f.name === key;
            });
            if (!schemaField) {
                var filterField = query.args.find(function (f) {
                    return f.name === "filter";
                });
                if (filterField) {
                    schemaField = this.findSchemaFieldForArgument(key, null, model, true);
                }
            }
        } else {
            schemaField = context.schema.getType(model.singularName).fields.find(function (f) {
                return f.name === key;
            });
        }
        if (schemaField && Schema.getTypeNameOfField(schemaField)) {
            return Schema.getTypeNameOfField(schemaField);
        } else {
            if (field instanceof context.components.String) {
                return "String";
            } else if (field && field instanceof context.components.Number) {
                return "Int";
            } else if (field && field instanceof context.components.Boolean) {
                return "Boolean";
            } else {
                if (typeof value === "number") return "Int";
                if (typeof value === "string") return "String";
                if (typeof value === "boolean") return "Boolean";
                throw new Error("Can't find suitable graphql type for field '" + model.singularName + "." + key + "'.");
            }
        }
    };
    QueryBuilder.findSchemaFieldForArgument = function (name, field, model, isFilter) {
        var context = Context.getInstance();
        var schema = context.schema;
        var schemaField;
        if (field) {
            schemaField = field.args.find(function (f) {
                return f.name === name;
            });
            if (schemaField) return schemaField;
        }
        // We try to find the FilterType or at least the Type this query belongs to.
        var type = schema.getType(isFilter ? context.adapter.getFilterTypeName(model) : model.singularName, true);
        // Next we try to find the field from the type
        schemaField = type ? (isFilter ? type.inputFields : type.fields).find(function (f) {
            return f.name === name;
        }) : undefined;
        // Warn before we return null
        if (!schemaField) {
            Context.getInstance().logger.warn("Couldn't find the argument with name " + name + " for the mutation/query " + (field ? field.name : "(?)"));
        }
        return schemaField;
    };
    /**
     * Generates the fields for all related models.
     *
     * @param {Model} model
     * @param {Array<Model>} path
     * @returns {string}
     */
    QueryBuilder.buildRelationsQuery = function (model, path) {
        var _this = this;
        if (path === void 0) {
            path = [];
        }
        if (model === null) return "";
        var context = Context.getInstance();
        var relationQueries = [];
        model.getRelations().forEach(function (field, name) {
            var relatedModel = Model.getRelatedModel(field);
            // We will ignore the field, when it's already in the path. Means: When it's already queried. However there are
            // cases where the model will have a relationship to itself. For example a nested category strucure where the
            // category model has a parent: belongsTo(Category). So we also check if the model references itself. If this is
            // the case, we allow the nesting up to 5 times.
            var referencesItSelf = takeWhile(path.slice(0).reverse(), function (p) {
                return p === relatedModel.singularName;
            }).length;
            var ignore = referencesItSelf ? referencesItSelf > 5 : path.includes(relatedModel.singularName);
            // console.log(`-----> Will ${ignore ? '' : 'not'} ignore ${model.singularName}.${name}, path: ${path.join('.')}`);
            if (model.shouldEagerLoadRelation(name, field, relatedModel) && !ignore) {
                var newPath = path.slice(0);
                newPath.push(relatedModel.singularName);
                relationQueries.push(_this.buildField(relatedModel, Model.isConnection(field), undefined, newPath, name, false));
            }
        });
        return relationQueries.join("\n");
    };
    QueryBuilder.prepareArguments = function (args) {
        args = args ? clone(args) : {};
        Object.keys(args).forEach(function (key) {
            var value = args[key];
            if (value && isPlainObject(value)) {
                if (Context.getInstance().adapter.getArgumentMode() === ArgumentMode.LIST) {
                    Object.keys(value).forEach(function (k) {
                        args[k] = value[k];
                    });
                    delete args[key];
                } else {
                    args[key] = { __type: upcaseFirstLetter(key) };
                }
            }
        });
        return args;
    };
    return QueryBuilder;
}();
//# sourceMappingURL=query-builder.js.map

/**
 * Provides some helper methods to interact with the Vuex-ORM store
 */
var Store = /** @class */function () {
    function Store() {}
    /**
     * Inserts incoming data into the store. Existing data will be updated.
     *
     * @param {Data} data New data to insert/update
     * @param {Function} dispatch Vuex Dispatch method for the model
     * @return {Promise<Data>} Inserted data as hash
     */
    Store.insertData = function (data, dispatch) {
        return __awaiter(this, void 0, void 0, function () {
            var insertedData;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        insertedData = {};
                        return [4 /*yield*/, Promise.all(Object.keys(data).map(function (key) {
                            return __awaiter(_this, void 0, void 0, function () {
                                var value, newData;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            value = data[key];
                                            Context.getInstance().logger.log("Inserting records", value);
                                            return [4 /*yield*/, dispatch("insertOrUpdate", { data: value })];
                                        case 1:
                                            newData = _a.sent();
                                            Object.keys(newData).forEach(function (dataKey) {
                                                if (!insertedData[dataKey]) insertedData[dataKey] = [];
                                                insertedData[dataKey] = insertedData[dataKey].concat(newData[dataKey]);
                                            });
                                            return [2 /*return*/];
                                    }
                                });
                            });
                        }))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, insertedData];
                }
            });
        });
    };
    return Store;
}();
//# sourceMappingURL=store.js.map

/**
 * Base class for all Vuex actions. Contains some utility and convenience methods.
 */
var Action = /** @class */function () {
    function Action() {}
    /**
     * Sends a mutation.
     *
     * @param {string} name Name of the mutation like 'createUser'
     * @param {Data | undefined} variables Variables to send with the mutation
     * @param {Function} dispatch Vuex Dispatch method for the model
     * @param {Model} model The model this mutation affects.
     * @param {boolean} multiple Tells if we're requesting a single record or multiple.
     * @returns {Promise<any>}
     */
    Action.mutation = function (name, variables, dispatch, model) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, context, schema, multiple, query, newData, insertedData, records, newRecord;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!variables) return [3 /*break*/, 5];
                        context = Context.getInstance();
                        return [4 /*yield*/, context.loadSchema()];
                    case 1:
                        schema = _b.sent();
                        multiple = Schema.returnsConnection(schema.getMutation(name));
                        query = QueryBuilder.buildQuery("mutation", model, name, variables, multiple);
                        return [4 /*yield*/, context.apollo.request(model, query, variables, true)];
                    case 2:
                        newData = _b.sent();
                        if (!(name !== context.adapter.getNameForDestroy(model))) return [3 /*break*/, 4];
                        newData = newData[Object.keys(newData)[0]];
                        // IDs as String cause terrible issues, so we convert them to integers.
                        newData.id = parseInt(newData.id, 10);
                        return [4 /*yield*/, Store.insertData((_a = {}, _a[model.singularName] = newData, _a), dispatch)];
                    case 3:
                        insertedData = _b.sent();
                        records = insertedData[model.singularName];
                        newRecord = records[records.length - 1];
                        if (newRecord) {
                            return [2 /*return*/, newRecord];
                        } else {
                            Context.getInstance().logger.log("Couldn't find the record of type '", model.singularName, "' within", insertedData, ". Falling back to find()");
                            return [2 /*return*/, model.baseModel.query().last()];
                        }
                        _b.label = 4;
                    case 4:
                        return [2 /*return*/, true];
                    case 5:
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Convenience method to get the model from the state.
     * @param {RootState} state Vuex state
     * @returns {Model}
     */
    Action.getModelFromState = function (state) {
        return Context.getInstance().getModel(state.$name);
    };
    /**
     * Makes sure args is a hash.
     *
     * @param {Arguments|undefined} args
     * @param {any} id When not undefined, it's added to the args
     * @returns {Arguments}
     */
    Action.prepareArgs = function (args, id) {
        args = args || {};
        if (id) args["id"] = id;
        return args;
    };
    /**
     * Adds the record itself to the args and sends it through transformOutgoingData. Key is named by the singular name
     * of the model.
     *
     * @param {Arguments} args
     * @param {Model} model
     * @param {Data} data
     * @returns {Arguments}
     */
    Action.addRecordToArgs = function (args, model, data) {
        args[model.singularName] = Transformer.transformOutgoingData(model, data, false, this.getInputType(model));
        return args;
    };
    /**
     * Transforms each field of the args which contains a model.
     * @param {Arguments} args
     * @returns {Arguments}
     */
    Action.transformArgs = function (args) {
        var _this = this;
        var context = Context.getInstance();
        Object.keys(args).forEach(function (key) {
            var value = args[key];
            if (value instanceof context.components.Model) {
                var model = context.getModel(singularize(value.$self().entity));
                var transformedValue = Transformer.transformOutgoingData(model, value, false, _this.getInputType(model));
                context.logger.log("A", key, "model was found within the variables and will be transformed from", value, "to", transformedValue);
                args[key] = transformedValue;
            }
        });
        return args;
    };
    /**
     * Gets the mutation input type for the given model
     * @param {Model} model
     * @returns {GraphQLType | null}
     */
    Action.getInputType = function (model) {
        var context = Context.getInstance();
        var inputTypeName = context.adapter.getInputTypeName(model);
        return context.schema.getType(inputTypeName);
    };
    return Action;
}();
//# sourceMappingURL=action.js.map

/**
 * Destroy action for sending a delete mutation. Will be used for record.$destroy().
 */
var Destroy = /** @class */function (_super) {
    __extends(Destroy, _super);
    function Destroy() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @param {State} state The Vuex state
     * @param {DispatchFunction} dispatch Vuex Dispatch method for the model
     * @param {string} id ID of the record to delete
     * @returns {Promise<any>} true
     */
    Destroy.call = function (_a, _b) {
        var state = _a.state,
            dispatch = _a.dispatch;
        var id = _b.id,
            args = _b.args;
        return __awaiter(this, void 0, void 0, function () {
            var model, mutationName, mockReturnValue;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!id) return [3 /*break*/, 4];
                        model = this.getModelFromState(state);
                        mutationName = Context.getInstance().adapter.getNameForDestroy(model);
                        mockReturnValue = model.$mockHook("destroy", { id: id });
                        if (!mockReturnValue) return [3 /*break*/, 2];
                        return [4 /*yield*/, Store.insertData(mockReturnValue, dispatch)];
                    case 1:
                        _c.sent();
                        return [2 /*return*/, true];
                    case 2:
                        args = this.prepareArgs(args, id);
                        return [4 /*yield*/, Action.mutation(mutationName, args, dispatch, model)];
                    case 3:
                        _c.sent();
                        return [2 /*return*/, true];
                    case 4:
                        /* istanbul ignore next */
                        throw new Error("The destroy action requires the 'id' to be set");
                }
            });
        });
    };
    return Destroy;
}(Action);
//# sourceMappingURL=destroy.js.map

/**
 * Fetch action for sending a query. Will be used for Model.fetch().
 */
var Fetch = /** @class */function (_super) {
    __extends(Fetch, _super);
    function Fetch() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @param {any} state The Vuex state
     * @param {DispatchFunction} dispatch Vuex Dispatch method for the model
     * @param {ActionParams} params Optional params to send with the query
     * @returns {Promise<Data>} The fetched records as hash
     */
    Fetch.call = function (_a, params) {
        var state = _a.state,
            dispatch = _a.dispatch;
        return __awaiter(this, void 0, void 0, function () {
            var context, model, mockReturnValue, filter, bypassCache, multiple, name, query, data;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        context = Context.getInstance();
                        model = this.getModelFromState(state);
                        mockReturnValue = model.$mockHook("fetch", {
                            filter: params ? params.filter || {} : {}
                        });
                        if (mockReturnValue) {
                            return [2 /*return*/, Store.insertData(mockReturnValue, dispatch)];
                        }
                        return [4 /*yield*/, context.loadSchema()];
                    case 1:
                        _b.sent();
                        filter = {};
                        if (params && params.filter) {
                            filter = Transformer.transformOutgoingData(model, params.filter, true, undefined, Object.keys(params.filter));
                        }
                        bypassCache = params && params.bypassCache;
                        multiple = !filter["id"];
                        name = context.adapter.getNameForFetch(model, multiple);
                        query = QueryBuilder.buildQuery("query", model, name, filter, multiple, multiple);
                        return [4 /*yield*/, context.apollo.request(model, query, filter, false, bypassCache)];
                    case 2:
                        data = _b.sent();
                        // Insert incoming data into the store
                        return [2 /*return*/, Store.insertData(data, dispatch)];
                }
            });
        });
    };
    return Fetch;
}(Action);

/**
 * Mutate action for sending a custom mutation. Will be used for Model.mutate() and record.$mutate().
 */
var Mutate = /** @class */function (_super) {
    __extends(Mutate, _super);
    function Mutate() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @param {any} state The Vuex state
     * @param {DispatchFunction} dispatch Vuex Dispatch method for the model
     * @param {string} name Name of the query
     * @param {boolean} multiple Fetch one or multiple?
     * @param {Arguments} args Arguments for the mutation. Must contain a 'mutation' field.
     * @returns {Promise<Data>} The new record if any
     */
    Mutate.call = function (_a, _b) {
        var state = _a.state,
            dispatch = _a.dispatch;
        var args = _b.args,
            name = _b.name;
        return __awaiter(this, void 0, void 0, function () {
            var context, model, mockReturnValue, schema;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!name) return [3 /*break*/, 2];
                        context = Context.getInstance();
                        model = this.getModelFromState(state);
                        mockReturnValue = model.$mockHook("mutate", {
                            name: name,
                            args: args || {}
                        });
                        if (mockReturnValue) {
                            return [2 /*return*/, Store.insertData(mockReturnValue, dispatch)];
                        }
                        return [4 /*yield*/, context.loadSchema()];
                    case 1:
                        schema = _c.sent();
                        args = this.prepareArgs(args);
                        // There could be anything in the args, but we have to be sure that all records are gone through
                        // transformOutgoingData()
                        this.transformArgs(args);
                        // Send the mutation
                        return [2 /*return*/, Action.mutation(name, args, dispatch, model)];
                    case 2:
                        /* istanbul ignore next */
                        throw new Error("The mutate action requires the mutation name ('mutation') to be set");
                }
            });
        });
    };
    return Mutate;
}(Action);
//# sourceMappingURL=mutate.js.map

/**
 * Persist action for sending a create mutation. Will be used for record.$persist().
 */
var Persist = /** @class */function (_super) {
    __extends(Persist, _super);
    function Persist() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @param {any} state The Vuex state
     * @param {DispatchFunction} dispatch Vuex Dispatch method for the model
     * @param {string} id ID of the record to persist
     * @returns {Promise<Data>} The saved record
     */
    Persist.call = function (_a, _b) {
        var state = _a.state,
            dispatch = _a.dispatch;
        var id = _b.id,
            args = _b.args;
        return __awaiter(this, void 0, void 0, function () {
            var model, mutationName, oldRecord, mockReturnValue, newRecord_1, newRecord;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!id) return [3 /*break*/, 6];
                        model = this.getModelFromState(state);
                        mutationName = Context.getInstance().adapter.getNameForPersist(model);
                        oldRecord = model.baseModel.query().withAllRecursive().where("$id", id).first();
                        mockReturnValue = model.$mockHook("persist", {
                            id: id,
                            args: args || {}
                        });
                        if (!mockReturnValue) return [3 /*break*/, 3];
                        return [4 /*yield*/, Store.insertData(mockReturnValue, dispatch)];
                    case 1:
                        newRecord_1 = _c.sent();
                        return [4 /*yield*/, this.deleteObsoleteRecord(model, newRecord_1, oldRecord)];
                    case 2:
                        _c.sent();
                        return [2 /*return*/, newRecord_1];
                    case 3:
                        // Arguments
                        args = this.prepareArgs(args);
                        this.addRecordToArgs(args, model, oldRecord);
                        return [4 /*yield*/, Action.mutation(mutationName, args, dispatch, model)];
                    case 4:
                        newRecord = _c.sent();
                        // Delete the old record if necessary
                        return [4 /*yield*/, this.deleteObsoleteRecord(model, newRecord, oldRecord)];
                    case 5:
                        // Delete the old record if necessary
                        _c.sent();
                        return [2 /*return*/, newRecord];
                    case 6:
                        /* istanbul ignore next */
                        throw new Error("The persist action requires the 'id' to be set");
                }
            });
        });
    };
    /**
     * It's very likely that the server generated different ID for this record.
     * In this case Action.mutation has inserted a new record instead of updating the existing one.
     *
     * @param {Model} model
     * @param {Data} record
     * @returns {Promise<void>}
     */
    Persist.deleteObsoleteRecord = function (model, newRecord, oldRecord) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (newRecord && oldRecord && newRecord.id !== oldRecord.id) {
                    Context.getInstance().logger.log("Dropping deprecated record", oldRecord);
                    return [2 /*return*/, oldRecord.$delete()];
                }
                return [2 /*return*/, null];
            });
        });
    };
    return Persist;
}(Action);

/**
 * Push action for sending a update mutation. Will be used for record.$push().
 */
var Push = /** @class */function (_super) {
    __extends(Push, _super);
    function Push() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @param {any} state The Vuex state
     * @param {DispatchFunction} dispatch Vuex Dispatch method for the model
     * @param {Arguments} data New data to save
     * @param {Arguments} args Additional arguments
     * @returns {Promise<Data>} The updated record
     */
    Push.call = function (_a, _b) {
        var state = _a.state,
            dispatch = _a.dispatch;
        var data = _b.data,
            args = _b.args;
        return __awaiter(this, void 0, void 0, function () {
            var model, mutationName, mockReturnValue;
            return __generator(this, function (_c) {
                if (data) {
                    model = this.getModelFromState(state);
                    mutationName = Context.getInstance().adapter.getNameForPush(model);
                    mockReturnValue = model.$mockHook("push", {
                        data: data,
                        args: args || {}
                    });
                    if (mockReturnValue) {
                        return [2 /*return*/, Store.insertData(mockReturnValue, dispatch)];
                    }
                    // Arguments
                    args = this.prepareArgs(args, data.id);
                    this.addRecordToArgs(args, model, data);
                    // Send the mutation
                    return [2 /*return*/, Action.mutation(mutationName, args, dispatch, model)];
                } else {
                    /* istanbul ignore next */
                    throw new Error("The persist action requires the 'data' to be set");
                }
                return [2 /*return*/];
            });
        });
    };
    return Push;
}(Action);
//# sourceMappingURL=push.js.map

//# sourceMappingURL=index.js.map

/**
 * Query action for sending a custom query. Will be used for Model.customQuery() and record.$customQuery.
 */
var Query = /** @class */function (_super) {
    __extends(Query, _super);
    function Query() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @param {any} state The Vuex state
     * @param {DispatchFunction} dispatch Vuex Dispatch method for the model
     * @param {string} name Name of the query
     * @param {boolean} multiple Fetch one or multiple?
     * @param {object} filter Filter object (arguments)
     * @param {boolean} bypassCache Whether to bypass the cache
     * @returns {Promise<Data>} The fetched records as hash
     */
    Query.call = function (_a, _b) {
        var state = _a.state,
            dispatch = _a.dispatch;
        var name = _b.name,
            filter = _b.filter,
            bypassCache = _b.bypassCache;
        return __awaiter(this, void 0, void 0, function () {
            var context, model, mockReturnValue, schema, multiple, query, data;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!name) return [3 /*break*/, 3];
                        context = Context.getInstance();
                        model = this.getModelFromState(state);
                        mockReturnValue = model.$mockHook("query", {
                            name: name,
                            filter: filter || {}
                        });
                        if (mockReturnValue) {
                            return [2 /*return*/, Store.insertData(mockReturnValue, dispatch)];
                        }
                        return [4 /*yield*/, context.loadSchema()];
                    case 1:
                        schema = _c.sent();
                        // Filter
                        filter = filter ? Transformer.transformOutgoingData(model, filter, true) : {};
                        multiple = Schema.returnsConnection(schema.getQuery(name));
                        query = QueryBuilder.buildQuery("query", model, name, filter, multiple, false);
                        return [4 /*yield*/, context.apollo.request(model, query, filter, false, bypassCache)];
                    case 2:
                        data = _c.sent();
                        // Insert incoming data into the store
                        return [2 /*return*/, Store.insertData(data, dispatch)];
                    case 3:
                        /* istanbul ignore next */
                        throw new Error("The customQuery action requires the query name ('name') to be set");
                }
            });
        });
    };
    return Query;
}(Action);
//# sourceMappingURL=query.js.map

/**
 * SimpleQuery action for sending a model unrelated simple query.
 */
var SimpleQuery = /** @class */function (_super) {
    __extends(SimpleQuery, _super);
    function SimpleQuery() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @param {DispatchFunction} dispatch Vuex Dispatch method for the model
     * @param {string} query The query to send
     * @param {Arguments} variables
     * @param {boolean} bypassCache Whether to bypass the cache
     * @returns {Promise<any>} The result
     */
    SimpleQuery.call = function (_a, _b) {
        var dispatch = _a.dispatch;
        var query = _b.query,
            bypassCache = _b.bypassCache,
            variables = _b.variables;
        return __awaiter(this, void 0, void 0, function () {
            var context, parsedQuery, mockReturnValue, result;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        context = Context.getInstance();
                        if (!query) return [3 /*break*/, 2];
                        parsedQuery = parseQuery(query);
                        mockReturnValue = context.globalMockHook("simpleQuery", {
                            name: parsedQuery.definitions[0]["name"].value,
                            variables: variables
                        });
                        if (mockReturnValue) {
                            return [2 /*return*/, mockReturnValue];
                        }
                        variables = this.prepareArgs(variables);
                        return [4 /*yield*/, context.apollo.simpleQuery(graphQlDocumentToString(parsedQuery), variables, bypassCache)];
                    case 1:
                        result = _c.sent();
                        // remove the symbols
                        return [2 /*return*/, removeSymbols(clone(result.data))];
                    case 2:
                        /* istanbul ignore next */
                        throw new Error("The simpleQuery action requires the 'query' to be set");
                }
            });
        });
    };
    return SimpleQuery;
}(Action);
//# sourceMappingURL=simple-query.js.map

/**
 * SimpleMutation action for sending a model unrelated simple mutation.
 */
var SimpleMutation = /** @class */function (_super) {
    __extends(SimpleMutation, _super);
    function SimpleMutation() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @param {DispatchFunction} dispatch Vuex Dispatch method for the model
     * @param {string} query The query to send
     * @param {Arguments} variables
     * @returns {Promise<any>} The result
     */
    SimpleMutation.call = function (_a, _b) {
        var dispatch = _a.dispatch;
        var query = _b.query,
            variables = _b.variables;
        return __awaiter(this, void 0, void 0, function () {
            var context, parsedQuery, mockReturnValue, result;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        context = Context.getInstance();
                        if (!query) return [3 /*break*/, 2];
                        parsedQuery = parseQuery(query);
                        mockReturnValue = context.globalMockHook("simpleMutation", {
                            name: parsedQuery.definitions[0]["name"].value,
                            variables: variables
                        });
                        if (mockReturnValue) {
                            return [2 /*return*/, mockReturnValue];
                        }
                        variables = this.prepareArgs(variables);
                        return [4 /*yield*/, context.apollo.simpleMutation(graphQlDocumentToString(parsedQuery), variables)];
                    case 1:
                        result = _c.sent();
                        // remove the symbols
                        return [2 /*return*/, clone(result.data)];
                    case 2:
                        /* istanbul ignore next */
                        throw new Error("The simpleMutation action requires the 'query' to be set");
                }
            });
        });
    };
    return SimpleMutation;
}(Action);
//# sourceMappingURL=simple-mutation.js.map

/**
 * Main class of the plugin. Setups the internal context, Vuex actions and model methods
 */
var VuexORMGraphQL = /** @class */function () {
    /**
     * @constructor
     * @param {Components} components The Vuex-ORM Components collection
     * @param {Options} options The options passed to VuexORM.install
     */
    function VuexORMGraphQL(components, options) {
        Context.setup(components, options);
        VuexORMGraphQL.setupActions();
        VuexORMGraphQL.setupModelMethods();
    }
    /**
     * Allow everything to read the context.
     */
    VuexORMGraphQL.prototype.getContext = function () {
        return Context.getInstance();
    };
    /**
     * This method will setup following Vuex actions: fetch, persist, push, destroy, mutate
     */
    VuexORMGraphQL.setupActions = function () {
        var context = Context.getInstance();
        context.components.RootActions.simpleQuery = SimpleQuery.call.bind(SimpleQuery);
        context.components.RootActions.simpleMutation = SimpleMutation.call.bind(SimpleMutation);
        context.components.Actions.fetch = Fetch.call.bind(Fetch);
        context.components.Actions.persist = Persist.call.bind(Persist);
        context.components.Actions.push = Push.call.bind(Push);
        context.components.Actions.destroy = Destroy.call.bind(Destroy);
        context.components.Actions.mutate = Mutate.call.bind(Mutate);
        context.components.Actions.query = Query.call.bind(Query);
    };
    /**
     * This method will setup following model methods: Model.fetch, Model.mutate, Model.customQuery, record.$mutate,
     * record.$persist, record.$push, record.$destroy and record.$deleteAndDestroy, record.$customQuery
     */
    VuexORMGraphQL.setupModelMethods = function () {
        var context = Context.getInstance();
        // Register static model convenience methods
        context.components.Model.fetch = function (filter, bypassCache) {
            if (bypassCache === void 0) {
                bypassCache = false;
            }
            return __awaiter(this, void 0, void 0, function () {
                var filterObj;
                return __generator(this, function (_a) {
                    filterObj = filter;
                    if (!isPlainObject(filterObj)) {
                        filterObj = { id: filter };
                    }
                    return [2 /*return*/, this.dispatch("fetch", { filter: filterObj, bypassCache: bypassCache })];
                });
            });
        };
        context.components.Model.mutate = function (params) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.dispatch("mutate", params)];
                });
            });
        };
        context.components.Model.customQuery = function (_a) {
            var name = _a.name,
                filter = _a.filter,
                multiple = _a.multiple,
                bypassCache = _a.bypassCache;
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_b) {
                    return [2 /*return*/, this.dispatch("query", { name: name, filter: filter, multiple: multiple, bypassCache: bypassCache })];
                });
            });
        };
        // Register model convenience methods
        var model = context.components.Model.prototype;
        model.$mutate = function (_a) {
            var name = _a.name,
                args = _a.args,
                multiple = _a.multiple;
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_b) {
                    args = args || {};
                    if (!args["id"]) args["id"] = this.$id;
                    return [2 /*return*/, this.$dispatch("mutate", { name: name, args: args, multiple: multiple })];
                });
            });
        };
        model.$customQuery = function (_a) {
            var name = _a.name,
                filter = _a.filter,
                multiple = _a.multiple,
                bypassCache = _a.bypassCache;
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_b) {
                    filter = filter || {};
                    if (!filter["id"]) filter["id"] = this.$id;
                    return [2 /*return*/, this.$dispatch("query", { name: name, filter: filter, multiple: multiple, bypassCache: bypassCache })];
                });
            });
        };
        model.$persist = function (args) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.$dispatch("persist", { id: this.$id, args: args })];
                });
            });
        };
        model.$push = function (args) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.$dispatch("push", { data: this, args: args })];
                });
            });
        };
        model.$destroy = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.$dispatch("destroy", { id: this.$id })];
                });
            });
        };
        model.$deleteAndDestroy = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [4 /*yield*/, this.$delete()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, this.$destroy()];
                    }
                });
            });
        };
    };
    return VuexORMGraphQL;
}();
//# sourceMappingURL=vuex-orm-graphql.js.map

/**
 * Plugin class. This just provides a static install method for Vuex-ORM and stores the instance of the model
 * within this.instance.
 */
var VuexORMGraphQLPlugin = /** @class */function () {
  function VuexORMGraphQLPlugin() {}
  /**
   * This is called, when VuexORM.install(VuexOrmGraphQL, options) is called.
   *
   * @param {Components} components The Vuex-ORM Components collection
   * @param {Options} options The options passed to VuexORM.install
   * @returns {VuexORMGraphQL}
   */
  VuexORMGraphQLPlugin.install = function (components, options) {
    VuexORMGraphQLPlugin.instance = new VuexORMGraphQL(components, options);
    return VuexORMGraphQLPlugin.instance;
  };
  return VuexORMGraphQLPlugin;
}();
//# sourceMappingURL=plugin.js.map

var context = null;
function setupTestUtils(plugin) {
    /* istanbul ignore next */
    if (!plugin.instance) {
        throw new Error("Please call this function after setting up the store!");
    }
    context = plugin.instance.getContext();
}
var Mock = /** @class */function () {
    function Mock(action, options) {
        this.action = action;
        this.options = options;
    }
    Mock.prototype.for = function (modelClass) {
        this.modelClass = modelClass;
        return this;
    };
    Mock.prototype.andReturn = function (returnValue) {
        this.returnValue = returnValue;
        this.installMock();
        return this;
    };
    Mock.prototype.installMock = function () {
        if (this.action === "simpleQuery" || this.action === "simpleMutation") {
            context.addGlobalMock(this);
        } else {
            var model = context.getModel(this.modelClass.entity);
            model.$addMock(this);
        }
    };
    return Mock;
}();
function clearORMStore() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    /* istanbul ignore next */
                    if (!context) {
                        throw new Error("Please call setupTestUtils() before!");
                    }
                    return [4 /*yield*/, context.database.store.dispatch("entities/deleteAll")];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function mock(action, options) {
    /* istanbul ignore next */
    if (!context) {
        throw new Error("Please call setupTestUtils() before!");
    }
    return new Mock(action, options);
}
//# sourceMappingURL=test-utils.js.map

//# sourceMappingURL=index.js.map

export default VuexORMGraphQLPlugin;
export { DefaultAdapter, ConnectionMode, ArgumentMode, setupTestUtils, mock, clearORMStore, Mock };
//# sourceMappingURL=vuex-orm-graphql.es5.js.map
