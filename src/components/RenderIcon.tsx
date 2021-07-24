const RenderIcon = (props: { title: string; styles?: object }) => {
  const { title, styles } = props;
  return <i style={styles} className={title}></i>;
};

export default RenderIcon;
