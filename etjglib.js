//etjglib.js

//fast random boolean
function rbool() {
  return Math.random() < 0.5;
}

//fast random array index
function rindex(arr) {
  return (Math.random() * arr.length) << 0;
}

//fast random array item
function ritem(arr) {
  return arr[(Math.random() * arr.length) << 0];
}

//fast random bit
function rbit() {
  return (Math.random() + 0.5) << 0;
}

//proper away-from-zero rounding
function sround(inputNumber) {
  return inputNumber > 0 ? (inputNumber - (inputNumber << 0) >= 0.5 ? (inputNumber << 0) + 1 : inputNumber << 0) :
    (inputNumber < 0 ? (inputNumber - (inputNumber << 0) <= -0.5 ? (inputNumber << 0) - 1 : inputNumber << 0) : 0);
}

//condition-compatible Exclusive Or (XOR)
function xor(arg1, arg2) {
  return arg1 !== arg2;
}

//return true if only one value is truthy (XOR)
function xorTruthy(arg1, arg2) {
  return !!(arg1) !== !!(arg2);
}

//return true only if both values are truthy (AND)
function andTruthy(arg1, arg2) {
  return !!(arg1) && !!(arg2);
}

//return true only if both values are falsy (NOT AND)
function andFalsy(arg1, arg2) {
  return !(arg1) && !(arg2);
}

//return true if either condition/value is truthy
function orTruthy(arg1, arg2) {
  return !!(arg1) || !!(arg2);
}

//return true if truthy/falsy values match
function truthyMatch(arg1, arg2) {
  return !!(arg1) === !!(arg2);
}

//generate random string from char set
function rstring(stringLength, charSet) {
  const strLength = !stringLength || stringLength < 1 ? 1 : stringLength << 0;
  const availChars = charSet ? charSet :
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_";
  let newStr = "";
  for (let i = 0; i < strLength; i++) {
    newStr += availChars[((Math.random() * availChars.length) << 0)];
  }
  return newStr;
}

//generate random id number of n digits (returns string, 1st digit is never 0)
function randID(numDigits) {
  let idLength = !numDigits || typeof numDigits !== "number" ? 12 : numDigits < 2 ? 2 : numDigits << 0;
  const okChars = "0123456789";
  const ok1stChars = "123456789";
  let idStr = ok1stChars[((Math.random() * ok1stChars.length) << 0)];
  for (let i = 0; i < idLength - 1; i++) {
    idStr += okChars[((Math.random() * okChars.length) << 0)];
  }
  return idStr;
}

//indexOf but not case-sensitive for strings
function looseIndexOf(targetArray, targetValue) {
  if (typeof targetValue !== "string") {
    return targetArray.indexOf(targetValue);
  }
  let targetStr = targetValue.toString().trim().toLowerCase();
  for (let i = 0; i < targetArray.length; i++) {
    if (typeof targetArray[i] === "string"
      && targetStr === targetArray[i].trim().toLowerCase()) {
      return i;
    }
  }
  return -1;
}

//pick from an array using a custom repeating hop pattern (array).
//dontWrap = boolean = out-of-bounds picks will stop the function
//instead of wrapping around the array to stay within bounds.
//startIndex = number = index of item to pick first. 0 by default
//example of proper pattern array: pattern = [1, 1, 2, -5, 3, -1]
function arrayHop(arr, pattern, howMany, dontWrap, startIndex) {
  if (dontWrap && (startIndex >= arr.length || startIndex <= -arr.length)) {
    return undefined;
  }
  let patCurIndex = 0;
  let outputArray = [];
  let stopAtBounds = !!dontWrap;
  let howManyWanted = !howMany || howMany < 1 ? 2048 : howMany << 0;
  let currIndex = !startIndex ? 0 : startIndex < 0 ? (arr.length - ((-startIndex << 0) % arr.length)) % arr.length :
    (startIndex << 0) % arr.length;
  for (let i = 0; i < howManyWanted; i++) {
    outputArray.push(arr[currIndex]);
    currIndex += (pattern[patCurIndex] << 0);
    if (stopAtBounds && (currIndex >= arr.length || currIndex < 0)) {
      return outputArray;
    }
    currIndex = currIndex < 0 ? (arr.length - (-currIndex % arr.length)) % arr.length : currIndex % arr.length;
    patCurIndex = (patCurIndex + 1) % pattern.length;
  }
  return outputArray;
}

//check if baseString contains keyString, without "don't"
//or similar negators before it.
function hasNotNegated(keyString, baseString) {
  const negators = /dont|don't|don’t|do not|donot/i;
  const negatorIndex = baseString.search(negators);
  const keyRegex = new RegExp(keyString.toString(), "i");
  const firstKeyIndex = baseString.search(keyRegex);
  return firstKeyIndex > -1 && (negatorIndex < 0 ||
    firstKeyIndex <= negatorIndex);
}

//return which string in an array of strings is found
//at the earliest position within the input string.
//returns an empty string (falsy) if none are found.
//since it only outputs a single item no matter what,
//you can use if-else blocks without missing anything.
//caseSensitive is an optional boolean, default = false.
//example usage:
//let selected = firstMatch(inputText, optionsArray);
//if(selected === "look") {...} else if(selected ===...
function firstMatch(inputString, matchesArray, caseSensitive) {
  let keyRegex, candPos;
  let earliestItem = "";
  let earliestPos = inputString.toString().length;
  for (let i in matchesArray) {
    if (!(typeof matchesArray[i] === "string" || typeof matchesArray[i] === "number"
      || typeof matchesArray[i] === "boolean")) {
      continue;
    }
    keyRegex = !!caseSensitive ? new RegExp(matchesArray[i].toString())
      : new RegExp(matchesArray[i].toString(), "i");
    candPos = inputString.toString().search(keyRegex);
    earliestItem = (candPos > -1 && candPos < earliestPos) ? matchesArray[i].toString() : earliestItem;
    earliestPos = (candPos > -1 && candPos < earliestPos) ? candPos : earliestPos;
  }
  return earliestItem;
}

//return which element in matchesArray matches inputItem.
//(the item itself, not the index of it).
//if strictMode is false (default), matchesArray simply
//needs to contain inputItem (non-case-sensitive) within
//one of its strings and that string will be returned.
//returns an empty string (falsy) if one isn't found.
//useful for if-else blocks as it returns 1 item only.
//NOT FOR TRUE COMPARISON OF ARRAYS, OBJECTS, ETC
function matchedItem(inputItem, matchesArray, strictMode) {
  let keyRegex = typeof inputItem === "string" && !strictMode ?
    new RegExp(inputItem, "i") : null;
  for (let i in matchesArray) {
    if ((typeof matchesArray[i] === "string" && typeof inputItem === "string" && !strictMode
      && keyRegex.test(matchesArray[i])) || matchesArray[i] === inputItem) {
      return matchesArray[i];
    }
  }
  return "";
}

//inclusive wrapping of a number within lower and upper bounds
function wrapNum(num, low, high) {
  return low === high ? low : num < low ? high - ((low - num) % (high - low))
    : num > high ? low + ((num - high) % (high - low)) : num;
}

//wrap a number within the usable bounds of an array.
//arrLength should be the Array.length, not the last index
function wrapIndex(num, arrLength) {
  return arrLength <= 1 ? 0 : num << 0 < 0 ?
    (arrLength - ((-num << 0) % arrLength)) % arrLength :
    num << 0 >= arrLength ? (num << 0) % arrLength : num << 0;
}

//do a slice of a string or array that includes the element at
//the stop index. (only tested to work with non-negative indices)
function inclSlice(strOrArr, startIndex, lastIndex) {
  return lastIndex ?
    strOrArr.slice(startIndex, lastIndex + 1) :
    strOrArr.slice(startIndex);
}

export {
  rbool, rindex, ritem, rbit, sround, xor, xorTruthy, andTruthy, andFalsy, orTruthy, truthyMatch,
  rstring, randID, looseIndexOf, arrayHop, hasNotNegated, firstMatch, matchedItem, wrapNum,
  wrapIndex, inclSlice
};
