import { Popconfirm } from 'antd';

const QuickConfirm = (props: { title: string; icon: string; ok: () => void; children: any }) => {
  return (
    <Popconfirm
      placement="top"
      title={props.title}
      onConfirm={props.ok}
      okText="Ok"
      cancelText="No"
      trigger="hover"
      icon={props.icon}
    >
      {props.children}
    </Popconfirm>
  );
};

export default QuickConfirm;
