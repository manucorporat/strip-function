
import { stripFunctions } from '../index';



describe('inlineTemplate', () => {
  it("should remove one line function", () => {
    const ONELINE = `
    function() {
      for(;;) {
        assert("';'", 1223, console.log("a"));
      }
      let a = 12;
      console.log(12 + console.log(), 12, ";", '";');
      console.debug("hola");
      cconsole.log();
      if(true) assert();
      aassert();
    }
  `;

  const ONELINE_EXPECTED = `
    function() {
      for(;;) {
        void 0;
      }
      let a = 12;
      void 0;
      console.debug("hola");
      cconsole.log();
      if(true) void 0;
      aassert();
    }
  `;
    let replacer = stripFunctions(['console.log', 'assert']);
    let result = replacer(ONELINE);
    expect(result).toEqual(ONELINE_EXPECTED);
  });

    it("should remove multi line function", () => {
    const MULTILINE = `
    function() {
      for(;;) {
        assert("';",
            '"',
        1223,
        console.log("a"));
      }
      let a = 12;
      console.log(
        "hola",
        1,
        hola()
          .adios(),
        '23;', value
        value2);
      console.debug(12
      ,12, ";", '";'
        );
      cconsole.log();
      if(true) assert("hola",
        hola,
        123,
        hola(";"));
      aassert();
    }
  `;

  const MULTILINE_EXPECTED = `
    function() {
      for(;;) {
        void 0;
      }
      let a = 12;
      void 0;
      console.debug(12
      ,12, ";", '";'
        );
      cconsole.log();
      if(true) void 0;
      aassert();
    }
  `;
    let replacer = stripFunctions(['console.log', 'assert']);
    let result = replacer(MULTILINE);
    expect(result).toEqual(MULTILINE_EXPECTED);
  });
});

