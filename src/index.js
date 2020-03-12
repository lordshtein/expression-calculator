function eval() {
  // Do not use eval!!! expr.match(/[\(\)\*\/\+\-0-9]/g)
  return;
}

function expressionCalculator(expr) {
  /* убрать пробелы */
  
  
  let result = []
  let operators = []
  let solved = []
  let array = []
  let str =""
  let checkBrackets = []

  /* проверка на непарные скобки */
  checkBrackets = expr.match(/[\(\)]/g)

  if (checkBrackets) {
    let check = []
    checkBrackets.forEach( function (e) {
      if ( e == ")" && check[check.length-1] == "(") {
        check.pop()
      } else {
        check.push(e)
      }
    })
    if (check.length) {
    throw "ExpressionError: Brackets must be paired"
  }
  }

  
  /* соеденить соседние цифры */
  expr = expr.replace(/\s+/g, '');
  let arrayStep1 = expr.match(/[\(\)\*\/\+\-0-9]/g)

  

  for (let i=0; i<arrayStep1.length; i++) {
    if (arrayStep1[i] == "+" || arrayStep1[i] == "-" 
    || arrayStep1[i] == "*" || arrayStep1[i] == "/"
    || arrayStep1[i] == "(" || arrayStep1[i] == ")") {
      
      array.push(arrayStep1[i])
      

    } else {
      
      str=arrayStep1[i]

      while (parseFloat(arrayStep1[i+1]) || arrayStep1[i+1] == "0") {
        str=str.concat(arrayStep1[i+1])
        i++
      }
      array.push(str)
    }  
  }


  for (let i = 0; i < array.length; i++) {

    if (Number(array[i]) || array[i] == "0") {
      result.push(array[i])

    } else if (array[i] == "(") {
      operators.push(array[i])

    } else if (array[i] == ")") {
      while (operators[operators.length - 1] != "(") {
        result.push(operators.pop())
      }
      operators.pop()

    } else if (array[i] == "*" || array[i] == "/") {
      while (operators[operators.length - 1] == "*" || operators[operators.length - 1] == "/") {
        result.push(operators.pop())
      }
      operators.push(array[i])

    } else if (array[i] == "+" || array[i] == "-") {
      while (operators[operators.length - 1] == "*" || operators[operators.length - 1] == "/" || operators[operators.length - 1] == "+" || operators[operators.length - 1] == "-") {
        result.push(operators.pop())
      }
      operators.push(array[i])
    }
  }
  while (operators[0]) {
    result.push(operators.pop())
  }


  for (let i = 0; i < result.length; i++) {
    if (parseFloat(result[i]) || result[i] == "0") {
      solved.push(parseFloat(result[i]))
    } else {
      let a = solved.pop();
      let b = solved.pop();
      if (result[i] === "+") {
        solved.push(parseFloat(a) + parseFloat(b));
      } else if (result[i] === "-") {
        solved.push(parseFloat(b) - parseFloat(a));
      } else if (result[i] === "*") {
        solved.push(parseFloat(a) * parseFloat(b));
      } else if (result[i] === "/") {
        /* проверка деления на 0 */
        if (a == "0") {
          throw "TypeError: Division by zero." 
        }
        solved.push(parseFloat(b) / parseFloat(a));
      }
    }
  }
  return parseFloat(solved[0]) 

  /* sorry for so long way */
}


module.exports = {
  expressionCalculator
}