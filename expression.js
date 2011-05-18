/**
 * 
 * ...
 * 
 * OPERATORS:
 * 
 *    
 *
 */

var useRad = true;

var Expression = function() {
    
    // save the expression
    this.expression = [];
    
    // if an error is encountered, the error message is stored here
    var errorMessage = false;
    
    function toRad(x) {
        
        return x * (Math.PI / 180);
        
    }
    
    function toDeg(x) {
        
        return x * (180 / Math.PI);
        
    }
    
    /**
     * Operator and Function evaluations
     */
    
    function evalAdd(a,b) {
        
        return a + b;
        
    }
    
    function evalSubtract(a,b) {
        
        return a - b;
        
    }
    
    function evalMultiply (a, b) {
        
        return a * b;
        
    }
    
    function evalDivide(a,b) {
        
        if (b) {
            
            return a / b;
            
        }
        
        setError('Division by zero');
        
        return false;
        
    }
    
    function evalPower(a,b) {
        
        return Math.pow(a,b);
        
    }
    
    function evalMod(a,b) {
        
        return a % b;
        
    }
    
    function evalSin(a) {
        
        if (!useRad) {
            
            a = toRad(a);
            
        }
        
        return Math.sin(a);
        
    }
    
    function evalCos(a) {
        
        if (!useRad) {
            
            a = toRad(a);
            
        }
        
        return Math.cos(a);
        
    }
    
    function evalTan(a) {
        
        if (!useRad) {
            
            a = toRad(a);
            
        }
        
        return Math.tan(a);
        
    }
    
    function evalSinI(a) {
        
        var x = Math.asin(a);
        
        if (!useRad) {
            
            return toDeg(x);
            
        }
        
        return x;
        
    }
    
    function evalCosI(a) {
        
        var x = Math.acos(a);
        
        if (!useRad) {
            
            return toDeg(x);
            
        }
        
        return x;
        
    }
    
    function evalTanI(a) {
        
        var x = Math.atan(a);
        
        if (!useRad) {
            
            return toDeg(x);
            
        }
        
        return x;
        
    }
    
    function evalSqrt(a) {
        
        return Math.sqrt(a);
        
    }
    
    function evalCbrt(a) {
        
        return Math.pow(a,1/3);
        
    }
    
    function evalRoot(a, b) {
        
        return Math.pow(a,1/b);
        
    }
    
    function evalLog10(a) {
        
        return Math.log(a) / Math.log(10);
        
    }
    
    function evalLn(a) {
        
        return Math.log(a);
        
    }
    
    function evalE(a) {
        
        return Math.pow(Math.E, a);
        
    }
    
    function evalInverse(a) {
        
        return Math.pow(a, -1);
        
    }
    
    function evalFactorial(a) {
        
        if (a < 0) {
            
            setError('Factorial cannot be negative.');
            
            return false;
            
        } else if (a === 0) {
            
            return 1;
            
        }
        
        var i = a;
        
        while (--i) {
            a *= i;
        }
        
        return a;
        
    }
    
    function evalChoose(a, b) {
        
        return evalFactorial(a) / (evalFactorial(b) * evalFactorial(a - b));
        
    }
    
    function evalPermute(a, b) {
        
        return evalFactorial(a) / (evalFactorial(a - b));
        
    }
    
    function evalSquare(a) {
        
        return a*a;
        
    }
    
    function evalCube(a) {
        
        return a*a*a;
        
    }
    
    function evalPercent(a) {
        
        return a / 100;
        
    }
    
    function evalFloor(a) {
        
        return Math.floor(a);
        
    }
    
    function evalCeil(a) {
        
        return Math.ceil(a);
        
    }
    
    /**
     * Definition of an operator
     */
    var OperatorToken = function(symbol, fcn, numArgs, associativity, precedence) {
        
        // for type checking
        this.type = "operator";
        
        // set the symbol        
        this.symbol = symbol;
        
        // set the evalution function
        this.fcn = fcn;
        
        // set the number of arguments taken by the operator
        this.numArgs = numArgs;
        
        // set the associativity direction
        this.associativity = associativity;
        
        // set the precedence
        this.precedence = precedence;
        
    }
    
    /**
     * Definition of a function
     */
    var FunctionToken = function(identifier, fcn, numArgs, associativity, precedence) {
        
        // for type checking
        this.type = "function";
        
        // set the symbol        
        this.identifier = identifier;
        
        // set the evalution function
        this.fcn = fcn;
        
        // set the number of arguments taken by the operator
        this.numArgs = numArgs;
        
        // set the associativity direction
        this.associativity = associativity;
        
        // set the precedence
        this.precedence = precedence;
        
    }
    
    var NumberToken = function(number, display) {
        
        // for type checking
        this.type = "number";
        
        if (typeof display === 'undefined') {
            
            display = number;
            
        }
        
        // what the number looks like
        this.number = display;
        
        // interpret the number
        this.value = parseFloat(number);
        
    }
    
    var ParenToken = function(paren) {
        
        this.paren = paren;
        
        if (paren == '(') {
            
            this.type = 'left paren';
            
        } else if (paren == ')') {
            
            this.type = 'right paren';
            
        } else {
            
            this.type = 'unknown';
            
        }
        
    }
    
    var operators = {
        '+' : new OperatorToken(' + ', evalAdd, 2, 'left', 10),
        '-' : new OperatorToken(' - ', evalSubtract, 2, 'left', 10),
        '*' : new OperatorToken(' &#215; ', evalMultiply, 2, 'left', 20),
        '/' : new OperatorToken(' &divide; ', evalDivide, 2, 'left', 20),
        '^' : new OperatorToken('^', evalPower, 2, 'right', 30),
        '%' : new OperatorToken(' % ', evalMod, 2, 'left', 20),
        'root' : new OperatorToken('<sup>x</sup>&radic;', evalRoot, 2, 'left', 50),
        'choose' : new OperatorToken('C', evalChoose, 2, 'left', 50),
        'permute' : new OperatorToken('P', evalPermute, 2, 'left', 50),
        'mod' : new OperatorToken(' mod ', evalMod, 2, 'left', 50)
    };
    
    var functions = {
        'sin' : new FunctionToken('sin', evalSin, 1, 'left', 50),
        'cos' : new FunctionToken('cos', evalCos, 1, 'left', 50),
        'tan' : new FunctionToken('tan', evalTan, 1, 'left', 50),
        'sin_i' : new FunctionToken('sin<sup>-1</sup>', evalSinI, 1, 'left', 50),
        'cos_i' : new FunctionToken('cos<sup>-1</sup>', evalCosI, 1, 'left', 50),
        'tan_i' : new FunctionToken('tan<sup>-1</sup>', evalTanI, 1, 'left', 50),
        'sqrt' : new FunctionToken(' &radic;', evalSqrt, 1, 'left', 50),
        'cbrt' : new FunctionToken('<sup>3</sup>&radic;', evalCbrt, 1, 'left', 50),
        'log10' : new FunctionToken('log', evalLog10, 1, 'left', 50),
        'e_x' : new FunctionToken('e^', evalE, 1, 'left', 50),
        'ln' : new FunctionToken('ln', evalLn, 1, 'left', 50),
        'inverse' : new FunctionToken('<sup>-1</sup>', evalInverse, 1, 'right', 50),
        'factorial' : new FunctionToken('!', evalFactorial, 1, 'right', 50),
        'square' : new FunctionToken('<sup>2</sup>', evalSquare, 1, 'right', 50),
        'cube' : new FunctionToken('<sup>3</sup>', evalCube, 1, 'right', 50),
        'percent' : new FunctionToken('%', evalPercent, 1, 'right', 50),
        'floor' : new FunctionToken('floor', evalFloor, 1, 'left', 50),
        'ceil' : new FunctionToken('ceil', evalCeil, 1, 'left', 50)
    };
    
    var constants = {
        'pi' : new NumberToken(Math.PI, '&pi;'),
        '2pi' : new NumberToken(2 * Math.PI, '2&pi;')
    }
    
    /**
     * Convert a number's base.
     *
     * @param number {String/Number} The original number
     * @param currentBase {Number} The number's current base
     * @param newBase {Number} The desired base.
     * @returns {String/Number} the number in the new base
     */
    function convertBase(number, currentBase, newBase) {
        
        //
        
        return number;
        
    }
    
    /**
     * Set the error message.
     */
    function setError(message) {
        
        errorMessage = message;
        
    }
    
    /**
     * Get the error message.
     */
    this.getError = function() {
        
        return 'Error: ' + errorMessage;
        
    }
    
    /**
     * Converts a tokenized expression from infix notation to
     * Reverse Polish Notation (RPN), using the Shunting-Yard
     * algorithm.
     * 
     * @see http://en.wikipedia.org/wiki/Shunting-yard_algorithm
     * 
     * @return {Array/Boolean} RPN of the expression, false on error
     */
    function toRPN(expression) {
        
        var output = [],
            stack  = [];
        
        // initial pass to add implicit multiplication
        for (var i = 0; i < expression.length; i++) {
            
             //if ()
            
        }
        
        for (i = 0; i < expression.length; i++) {
            
            var token = expression[i];
            
            if (token.type === 'number') {
                
                output.push(token);
                
            } else if (token.type === 'function') {
                
                stack.push(token);
                
            } else if (token.type === 'operator') {
                
                while (stack.length > 0) {
                    
                    var top = stack[stack.length - 1];
                                        
                    if ((top.type === 'operator' || top.type === 'function') && 
                            (token.associativity == 'left' && token.precedence <= top.precedence) ||
                            (token.associativity == 'right' && token.precedence < top.precedence)) {
                        
                        output.push(stack.pop());
                        
                    } else {
                        
                        break;
                        
                    }
                    
                }
                
                stack.push(token);
                
            } else if (token.type === 'left paren') {
                
                stack.push(token);
                
            } else if (token.type === 'right paren') {
                
                var flag = false;
                
                while (stack.length > 0) {
                    
                    var top = stack[stack.length - 1];
                    
                    if (top.type === 'left paren') {
                        
                        flag = true;
                        
                        break;
                        
                    } else {
                        
                        output.push(stack.pop());
                        
                    }
                    
                }
                
                if (!flag) {
                    
                    setError('Parenthesis mismatch detected.');
                    
                    return false;
                    
                }
                
                // discard the left parenthesis
                stack.pop();
                
                if (stack.length > 0) {
                    
                    if (stack[stack.length - 1].type === 'function') {
                        
                        output.push(stack.pop());
                        
                    }
                    
                }
                
            } else {
                
                setError('Unknown token encountered.');
                
                return false;
                
            }
            
        }
        
        // all tokens read, now move the rest of the stack into the output
        
        while(stack.length > 0) {
            
            if (stack[stack.length - 1].type === 'left paren' || stack[stack.length - 1] === 'right paren') {
                
                setError('Parenthesis mismatch encountered.');
                
                return false;
                
            }
            
            output.push(stack.pop());
            
        }
        
        return output;
        
    }
    
    /**
     * Evaluates an expression in Reverse Polish Notation.
     * 
     * Returns false on evaluation error.
     * 
     * @return Number / Boolean
     */
    function evaluateRPN(expression) {
        
        var stack = [];
        
        for (var i = 0; i < expression.length; i++) {
            
            var token = expression[i];
            
            if (token.type === 'number') { // TODO: Or is identifier. Above as well.
                
                stack.push(token);
                
            } else if (token.type === 'operator' || token.type === 'function') {
                
                if (stack.length < token.numArgs) {
                    
                    setError('Not enough input values given.');
                    
                    return false;
                    
                }
                
                var args = [];
                
                for (var j = 0; j < token.numArgs; j++) {
                    
                    args.push(stack.pop().value);
                    
                }
                
                args.reverse();
                
                stack.push(new NumberToken(token.fcn.apply(this, args)));
                
            }
            
        }
        
        if (stack.length == 1) {
            
            return stack[0];
            
        } else {
            
            setError('Too many input values encountered.');
            
            return false;
            
        }
        
    }
    
    // public:
    
    /**
     * Returns the final evaluation of the original expression, or
     * false if there is an error.
     */
    this.evaluate = function(useRadIn) {
        
        useRad = useRadIn || false;
        
        if (this.expression.length <= 0) {
            
            return 0;
            
        }
        
        var rpn = toRPN(this.expression);
        
        var result = evaluateRPN(rpn).value;
        
        if (typeof result === 'undefined' || isNaN(result)) {
            
            setError('An error occurred in calculating result.');
            
            return false;
            
        } else if (String(parseFloat(result.toFixed(15))).toLowerCase().indexOf('e') !== -1 || Math.abs(parseFloat(result.toFixed(15))) > 1e16 || result === Infinity) {
            
            setError('Result is too large.');
            
            return false;
            
        }
        
        return String(parseFloat(result.toFixed(15)));
        
    }
    
    /* FETCH THE EXPRESSION AS TEXT */
    
    this.getText = function() {
        
        var result = '';
        
        for (var i = 0; i < this.expression.length; i++) {
            
            var t = this.expression[i];
            
            if (t.type === 'number') {
                
                result += t.number;
                
            } else if (t.type === 'operator') {
                
                result += t.symbol;
                
            } else if (t.type === 'function') {
                
                result += t.identifier;
                
            } else if (t.type === 'left paren' || t.type === 'right paren') {
                
                result += (' ' + t.paren + ' ');
                
            }
            
        }
        
        return result;
        
    }
    
    /* ADDING TO THE EXPRESSON */
    
    this.pushNumber = function(number) {
        
        if (isNaN(number)) {
            
            return false;
            
        }
        
        this.expression.push(new NumberToken(parseFloat(number,10)));
        
        return true;
        
    }
    
    this.pushOperator = function(operator) {
        
        if (typeof operators[operator] === 'undefined') {
            
            return false;
            
        }
        
        this.expression.push(operators[operator]);
        
        return true;
        
    }
    
    this.pushFunction = function(fcn) {
        
        if (typeof functions[fcn] === 'undefined') {
            
            return false;
            
        }
        
        this.expression.push(functions[fcn]);
        
        return true;
        
    }
    
    this.pushParen = function(paren) {
        
        if (paren !== '(' && paren !== ')') {
            
            return false;
            
        }
        
        this.expression.push(new ParenToken(paren));
        
        return true;
        
    }
    
    this.pushConstant = function(constant) {
        
        if (typeof constants[constant] === 'undefined') {
            
            return false;
            
        }
        
        this.expression.push(constants[constant]);
        
        return true;
        
    }
    
    this.removeLast = function() {
        
        this.expression.pop();
        
    }
    
}