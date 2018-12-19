const Row = ({ children }) => (
  <div>
    <style jsx>{`
      margin: 20px 0;
    `}</style>
    {children}
  </div>
);

export const Button = ({ children, hover, ...props }) => (
  <button {...props}>
    <style jsx>{`
      border: 2px solid #999;
      background: none;
      color: #999;
      cursor: pointer;
      font-size: 90%;
      border-radius: 10px;
      margin-left: 10px;

      :hover {
        color: initial;
        border-color: inherit;
      }

      :hover:after {
        content: ' ${hover}';
      }
    `}</style>
    {children}
  </button>
);

const Input = ({ as, children, ...props }) => {
  if (as !== 'select') {
    const As = as;
    return <As {...props} />;
  }

  return <select {...props}>{children}</select>;
};

export const Field = ({
  as = 'input',
  children,
  label,
  name,
  placeholder,
  ...props
}) => (
  <Row>
    <style jsx>{`
      span {
        margin-right: 10px;
      }
    `}</style>
    <label>
      <span>{label}</span>
      <Input
        as={as}
        type="text"
        name={name}
        placeholder={placeholder}
        {...props}
      >
        {children}
      </Input>
    </label>
  </Row>
);
