import RenderIcon from './RenderIcon';

const Input = (props: any) => {
  let { icon } = props;

  if (!icon) {
    icon = 'mdi mdi-email';
  }
  return (
    <div className="input">
      <input className="devugo-input" {...props} />
      <div className="icon">
        <RenderIcon title={icon} />
      </div>
    </div>
  );
};

export default Input;
