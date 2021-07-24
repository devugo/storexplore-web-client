const Button = (props: any) => {
  return (
    <button className="devugo-btn" {...props}>
      {props.children}
    </button>
  );
};

export default Button;
