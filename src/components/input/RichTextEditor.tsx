import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

const RichTextEditor = ({
  value,
  onChange,
}: {
  value: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <ReactQuill
      value={value}
      style={{
        height: "240px",
      }}
      onChange={onChange}
      className="pb-10"
    />
  );
};

export default RichTextEditor;
