import { useState, useEffect } from 'react';
import { Field, Button } from '../components/Form';
import { Input as Binary } from '../components/Binary';
import { binaryToNumber } from '../lib/numbers';

const toBinary = (n, length = 8) => {
  if (n < 0) {
    return Array.from({ length }, (_, i) => {
      return ((n >> i) & 1) === 1 ? 1 : 0;
    })
      .reverse()
      .join('');
  }

  return n.toString(2).padStart(length, 0);
};

const Page = props => {
  const [signed, setSign] = useState(props.signed);
  const [length, setLength] = useState(props.length);
  const [rep, setRep] = useState(props.rep);
  const [showInfo, setShowInfo] = useState(props.showInfo);
  const [value, setValue] = useState(
    props.value ||
      Array.from({ length })
        .fill(0)
        .join('')
  );

  const [dValue, setDValue] = useState(
    binaryToNumber(value, length, signed, rep)
  );

  const [preview, setPreview] = useState(null);

  useEffect(() => {
    const q = new URLSearchParams();
    q.set('length', length);
    q.set('rep', rep);
    q.set('value', value);
    q.set('signed', signed);

    window.history.replaceState('', '', '?' + q.toString());
  });

  const handleRepChange = e => {
    const rep = parseInt(e.target.value, 10);
    setRep(rep);
    setPreview(null);
    setDValue(binaryToNumber(value, length, signed, rep));
  };

  const handleValueChange = value => {
    setValue(value);
    setPreview(null);
    setDValue(binaryToNumber(value, length, signed, rep));
  };

  const handleSignChange = e => {
    const signed = e.target.checked;
    setSign(signed);
    setPreview(null);
    setDValue(binaryToNumber(value, length, signed, rep));
  };

  const handleSizeChange = e => {
    const length = parseInt(e.target.value, 10);
    setLength(length);
    setValue(value.slice(-length).padStart(length, '0'));
    setPreview(null);
    setDValue(
      binaryToNumber(
        value.slice(-length).padStart(length, '0'),
        length,
        signed,
        rep
      )
    );
  };

  const convertToBinary = v => {
    setDValue(v);

    let int = null;
    try {
      let res = eval(v);
      if (typeof res === 'string') {
        res = res.charCodeAt(0);
      }
      int = res;
    } catch (e) {
      // do nothing
      int = parseInt(v, 10);
    }

    let neg = int < 0;
    if (neg) {
      int *= -1;
    }

    if (isNaN(int)) int = 0;

    let binary = null;

    if (!neg || !signed) {
      binary = toBinary(int, length);
    } else if (rep === 0) {
      binary = `1${toBinary(int, length).slice(-(length - 1))}`;
    } else {
      const twos = rep === 2 ? 1 : 0;
      binary = `1${toBinary(twos + (int ^ (2 ** length - 1)), length).slice(
        -(length - 1)
      )}`;
    }

    const cmp = binaryToNumber(binary, length, signed, rep);

    if (v.trim() !== cmp.trim()) {
      setPreview(cmp);
    } else {
      setPreview(null);
    }

    return setValue(binary);
  };

  return (
    <div>
      <style jsx>{`
        p {
          font-size: 14px;
          color: #999;
          line-height: 1.4;
        }

        p:last-child {
          margin-bottom: 2rem;
        }

        p a {
          color: #666;
          font-size: 14px;
        }

        .overflow {
          overflow-x: auto;
          overflow-y: visible;
          padding-top: 2rem;
        }

        .dec {
          font-size: 100px;
          font-size: 16vw;
          text-align: center;
          display: block;
          border: 0;
          background: none;
          outline: 0;
          width: 100%;
        }

        .preview {
          text-align: center;
          color: #666;
        }
      `}</style>
      {showInfo && (
        <p>
          This project visualises how signed and unsigned binary works. You can
          change the value by tapping the binary column headings or entering a
          decimal value at the bottom. Further reading can be{' '}
          <a href="https://www3.ntu.edu.sg/home/ehchua/programming/java/datarepresentation.html">
            found here
          </a>
          . I've also made a <a href="https://bitcalc.app">bit calculator</a>.
          <Button
            hover="dismiss"
            onClick={() => {
              setShowInfo(false);
              localStorage.setItem('showInfo', 'false');
            }}
          >
            ×
          </Button>
        </p>
      )}
      <Field label="Size" as="select" onChange={handleSizeChange}>
        <option value="8">8 bit</option>
        <option value="16">16 bit</option>
        <option value="32">32 bit</option>
      </Field>
      <Field
        label="Signed?"
        type="checkbox"
        value="sign"
        onChange={handleSignChange}
        checked={signed}
      />
      {signed && (
        <Field
          label="Representation"
          as="select"
          onChange={handleRepChange}
          value={rep}
        >
          <option value="2">2's compliment</option>
          <option value="1">1's compliment</option>
          <option value="0">Sign magnitude</option>
        </Field>
      )}
      <hr />
      <div className="overflow">
        <Binary
          length={length}
          signed={signed}
          className="binary"
          value={value}
          onChange={handleValueChange}
        />
      </div>
      <hr />
      <div>
        <input
          _pattern="[-+]?(\d+|\d+\.\d+|\.\d+)([eE][-+]?\d+)?"
          className="dec"
          value={dValue}
          onChange={e => convertToBinary(e.target.value)}
        />
        {preview !== null && (
          <div className="preview">Actual value: {preview}</div>
        )}
      </div>
    </div>
  );
};

Page.getInitialProps = ({ query }) => {
  const { length = 8, value = '00010000', signed = true, rep = 2 } = query;
  return {
    length: parseInt(length, 10),
    value,
    signed: signed === 'true' || signed === true,
    rep: parseInt(rep, 10),
  };
};

export default Page;
