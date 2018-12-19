export const binaryToSignedNumber = (s, rep = 0) => {
  rep = parseInt(rep, 10);
  const map = rep === 0 ? 0 : 1;
  const init = rep === 2 ? 1 : 0;

  return (
    '-' +
    s
      .slice(1)
      .map(v => v ^ map)
      .reduceRight(
        (acc, curr, i, all) => acc + 1 * 2 ** (all.length - 1 - i) * curr,
        init
      )
  );
};

export const binaryToNumber = (s, length = 8, signed = false, rep = 2) => {
  rep = parseInt(rep, 10);
  // tidy up the binary
  s = s
    .padStart(length, '0')
    .split('')
    .filter(_ => _ !== ' ')
    .map(_ => parseInt(_, 10))
    .slice(0, length);

  if (signed && s[0] === 1) return binaryToSignedNumber(s, rep);

  return (
    '+' +
    s.reduceRight(
      (acc, curr, i, all) => acc + 1 * 2 ** (all.length - 1 - i) * curr,
      0
    )
  );
};

// binaryToNumber('11100011', 8, true, 2); // ?
