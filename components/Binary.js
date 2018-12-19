import { useState } from 'react';

function useControlledState(value, onChange) {
  const state = useState(value);
  return onChange ? [value, onChange] : state;
}

const metaKeys = [8, 46, 37, 38, 39, 40, 48, 49]; // bkspace, del, cursors, 0, 1

function filterBinary(event) {
  if (metaKeys.includes(event.which) || event.metaKey) {
    return;
  }
  event.preventDefault();
}

export const Input = ({ length, signed, ...props }) => {
  const [value, setValue] = useControlledState(props.value, props.onChange);
  let width = length * 4;

  return (
    <div className="root">
      <style jsx>{`
        text-align: right;
        .root {
          width: ${width}ch;
          margin: 0 auto;
        }

        div {
          position: relative;
        }

        input {
          font-size: 36px;
          letter-spacing: 1rem;
          outline: 0;
          width: 100%;
          display: inline-block;
          background: none;
          border: 0;
          z-index: 1;
          position: relative;
          padding: 0;
          margin: 0;
        }

        input.shadow {
          color: #ddd;
          position: absolute;
          top: 0;
          left: 0;
          z-index: 0;
        }

        span.container {
          width: 2rem;
          height: 2rem;
          display: inline-block;
        }

        span span {
          -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
          transform: rotate(90deg) translateX(-1rem) translateY(1.1rem);
          padding-right: 0.25rem;
          display: block;
          text-align: right;
          font-size: 0.6rem;
          width: 3rem;
          height: 2rem;
          cursor: pointer;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          user-select: none;
        }

        span span:hover {
          background: #eee;
        }
      `}</style>
      <div>
        {Array.from({ length }, (_, i) => {
          const b = signed && i === 0 ? 'sign +/-' : 2 ** (length - i - 1);
          return (
            <span key={i} className="container">
              <span
                onClick={() => {
                  const left = value.substr(0, i);
                  const right = value.substr(i + 1);

                  setValue(`${left}${parseInt(value[i], 10) ^ 1}${right}`);
                }}
              >
                {b}
              </span>
            </span>
          );
        })}
      </div>
      <div>
        <input
          {...props}
          onKeyDown={e => {
            if (e.target.selectionStart === e.target.selectionEnd) {
              if (
                [48, 49].includes(e.which) &&
                e.target.value.length >= length
              ) {
                return e.preventDefault();
              }
            }
            filterBinary(e);
          }}
          value={value}
          onChange={e => setValue(e.target.value)}
        />
        <input
          className="shadow"
          value={value.padStart(length, '0')}
          readOnly
        />
      </div>
    </div>
  );
};

export const ArrayOfInputs = ({ value, length }) => (
  <div>
    <style jsx>{`
      label {
        cursor: pointer;
        position: relative;
        width: 36px;
        display: inline-block;
        text-align: center;
      }

      input {
        cursor: pointer;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        opacity: 0;
      }

      span {
        display: block;
        width: 100%;
        height: 100%;
      }

      input + span:after {
        font-size: 2rem;
        content: '0';
      }
      input:checked + span:after {
        content: '1';
      }
    `}</style>
    {Array.from({ length }, (_, i) => (
      <label key={length - i}>
        <input
          type="checkbox"
          value={2 ** (length - 1 - i)}
          onChange={e => {
            value[length - 1 - i] = e.target.checked ? 1 : 0;
          }}
        />
        <span />
      </label>
    ))}
  </div>
);
