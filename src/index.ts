

export function regexForName(name: string): RegExp {
  name = name.replace('.', '\\.');
  const reg = `\\b` + name + `\(((\"[^"]*\")|(\'[^']*\')|[^;]|)*\);`;
  return new RegExp(reg, 'gm');
}

export function stripFunctions(functions: string[]) {
  let regexes = functions.map((name) => regexForName(name));

  return function (str: string) {
    regexes.forEach(regex => {
      str = str.replace(regex, 'void 0;');
    });
    return str;
  }
}
