import { useState, useEffect } from 'react';
import { Field, Button } from '../components/Form';
import { Input as Binary } from '../components/Binary';
import { binaryToNumber, numberToBinary } from '../lib/numbers';

const Page = props => {
  if (!props.fed) {
    const query = Array.from(
      new URLSearchParams(window.location.search).entries()
    ).reduce((acc, [key, value]) => ({ [key]: value, ...acc }), {});
    props = Page.getInitialProps({ query });
  }
  const [signed, setSign] = useState(props.signed);
  const [length, setLength] = useState(props.length);
  const [rep, setRep] = useState(props.rep);
  const [showInfo, setShowInfo] = useState(true);
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

    const { value, preview, binary } = numberToBinary({
      value: v,
      rep,
      length,
      signed,
    });

    setPreview(preview);
    setValue(binary);
  };

  return (
    <div>
      <style jsx>{`
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

/*
<Button
            hover="dismiss"
            onClick={() => {
              setShowInfo(false);
              localStorage.setItem('showInfo', 'false');
            }}
          >
            ×
          </Button>
          */

Page.getInitialProps = ({ query }) => {
  const { length = 8, value = '00010000', signed = true, rep = 2 } = query;

  return {
    fed: true,
    length: parseInt(length, 10),
    value,
    signed: signed === 'true' || signed === true,
    rep: parseInt(rep, 10),
  };
};

export default Page;
