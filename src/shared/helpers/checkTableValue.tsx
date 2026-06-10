export const renderOrDash = (
  value: any,
  renderElement?: (val: any) => React.ReactNode
) => {
  if (value === null || value === undefined || value === "") {
    return <div className="text-center text-gray-400">-</div>;
  }
  return renderElement ? renderElement(value) : value;
};
