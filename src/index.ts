
interface Step {
  regex: RegExp;
  name: string;
}

interface Result {
  start: number;
  end: number;
}

enum State {
  FirstWhitespace,
  Inside
}

export class Replacer {
  private steps: Step[];

  constructor(functions: string[]) {
    this.steps = functions.map((name) => regexForName(name));
  }

  replace(source: string): string {
    for (let step of this.steps) {
      source = this.replaceWithStep(source, step);
    }
    return source;
  }

  private replaceWithStep(source: string, step: Step): string {
    let regex = step.regex;
    let parts: string[] = [];
    let index = 0;
    while (true) {
      let result = _findNextFunc(source, regex, index);
      if (result === null) {
        break;
      }
      parts.push(source.substr(index, result.start - index));
      parts.push(`(void 0) /* ${step.name} */`);
      index = result.end;
    }
    if (index < source.length) {
      parts.push(source.substr(index));
    }
    return parts.join('');
  }
}


function regexForName(name: string): Step {
  const name2 = name.replace('.', '\\.');
  const reg = `\\b` + name2 + `[ ]*\\(`;
  return {
    regex: new RegExp(reg, 'gm'),
    name: name
  };
}

function _findNextFunc(src: string, regex: RegExp, start: number): Result {

  regex.lastIndex = start;
  let re = regex.exec(src);
  if (re === null) {
    return null;
  }
  let index = regex.lastIndex;
  let len = src.length;
  let counter = 1;

  while (index < len) {
    let c = src[index];
    index++;
    if (c === '(') {
      counter++;
    } else if (c === ')') {
      counter--;
      if (counter === 0) {
        break;
      }
    }
  }
  return { start: re.index, end: index };
}
