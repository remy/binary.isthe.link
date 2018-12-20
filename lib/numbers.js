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

const toBinary = (n, length = 8) => {
  let binary = null;
  if (n < 0) {
    binary = Array.from({ length }, (_, i) => {
      return ((n >> i) & 1) === 1 ? 1 : 0;
    })
      .reverse()
      .join('');
  } else {
    binary = n.toString(2);
  }

  return binary.padStart(length, 0).slice(-length);
};

export const numberToBinary = ({
  value,
  rep = 2,
  signed = false,
  length = 8,
}) => {
  let int = null;
  try {
    let res = eval(value);
    if (typeof res === 'string') {
      res = res.charCodeAt(0);
    }
    int = res;
    console.log('res', res);
  } catch (e) {
    // do nothing
    console.log('failed', e);

    int = parseInt(value, 10);
  }

  let neg = int < 0;
  if (neg) {
    int *= -1;
  }

  if (isNaN(int)) int = 0;

  let binary = null;

  if (!neg || !signed) {
    binary = toBinary(int, length); //? int
  } else if (rep === 0) {
    binary = `1${toBinary(int, length).slice(-(length - 1))}`;
  } else {
    const twos = rep === 2 ? 1 : 0;
    binary = `1${toBinary(twos + (int ^ (2 ** length - 1)), length).slice(
      -(length - 1)
    )}`;
  }

  const cmp = binaryToNumber(binary, length, signed, rep); //?

  const preview = value.trim() !== cmp.trim() ? cmp : null;

  return {
    binary,
    preview,
    value,
  };
};

// numberToBinary({ value: '+128 << 1' }); // ?

// binaryToNumber('11100011', 8, true, 2); // ?
