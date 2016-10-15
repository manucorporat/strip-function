
import { Replacer } from '../index';



describe('replacer', () => {
  it('should remove', () => {
    const input = `
assert  ();
{assert(";",
	'";',
	        \`;\`,
	hola,
	hola(assert()));
-assert (1,2,3, hola, "hola", 'hola') ;
!assert();
let a = assert() + 6;
assert(), assert(), assert()
`;


    const expected = `
(void 0) /* assert */;
{(void 0) /* assert */;
-(void 0) /* assert */ ;
!(void 0) /* assert */;
let a = (void 0) /* assert */ + 6;
(void 0) /* assert */, (void 0) /* assert */, (void 0) /* assert */
`;
    let replacer = new Replacer(['assert']);
    let result = replacer.replace(input);
    expect(result).toEqual(expected);
  });

  it('should NOT remove', () => {
    const input = `
_assert();
2assert();
aassert();
assert;
assert -();
`;

    let replacer = new Replacer(['assert']);
    let result = replacer.replace(input);
    expect(result).toEqual(input);
  });

  it('should handle several names', () => {

    const input = `
    if(true) {
      console.debug('text: example;', "hola", \`
        hi there
        kiu4y prx87yweo flb
        \`,
        assert, console.debug(),
        value1,
        value2())

      assert(true, "internal error");
    }
    let a = console.debug() + assert(assert()) + 3;
    ((
    debug()
    _assert()
    assert();`;

    const output = `
    if(true) {
      (void 0) /* console.debug */

      (void 0) /* assert */;
    }
    let a = (void 0) /* console.debug */ + (void 0) /* assert */ + 3;
    ((
    debug()
    _assert()
    (void 0) /* assert */;`;

    let replacer = new Replacer(['assert', 'console.debug']);
    let result = replacer.replace(input);
    expect(result).toEqual(output);
  });

});



