import RenderIcon from './RenderIcon';

const SelectInput = (props: any) => {
  let { icon, placeholder } = props;
  if (!icon) {
    icon = 'mdi mdi-email';
  }
  return (
    <div className="select">
      <select className="devugo-input" {...props}>
        <option value="">{placeholder}</option>
        {props.options.map((option: string, index: number) => (
          <option key={index}>{option}</option>
        ))}
      </select>
      <div className="icon">
        <RenderIcon title={icon} />
      </div>
    </div>
  );
};

export default SelectInput;
