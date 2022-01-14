type Props = {} & Pick<
  React.HTMLAttributes<HTMLDivElement>,
  "style" | "className"
>;

export const Header = (props: Props) => {
  return <div {...props}></div>;
};
