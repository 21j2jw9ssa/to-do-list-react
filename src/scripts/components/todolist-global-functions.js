/**
 * Generates a random hash (12-bit by default)
 * @param {Number} hashLength length of a hash to be generated
 * @returns a random hash code
 */
function MakeId( hashLength = 12 ) {
  let selectedChars = [] ;

  /*
  Possible characters include:
  - UPPERCASE English alphabets, i.e. A~Z
  - LOWERCASE English alphabets, i.e. a~z
  - DECIMAL digits, i.e. 0~9
  - underscore character, i.e. the '_' character

  It starts with all characters listed above.
  For each character to form a hash,
  a random character is picked from above
  without being put back.

  Repeat the process until the result hash
  reaches the required length.
  */
  let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_" ;
  for ( let i = 0; i < hashLength ; i++ ) {
    const key = Math.floor( Math.random() * chars.length ) ;
    selectedChars.push( chars.charAt(key) ) ;
    chars = chars.replace( chars.charAt(key), '' ) ;
  } // for

  return selectedChars.join('') ;
} // MakeId()

export default MakeId ;