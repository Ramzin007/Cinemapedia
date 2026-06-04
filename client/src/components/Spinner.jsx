import { ClipLoader } from "react-spinners";

function Spinner() {
  return (
    <div className="flex items-center justify-center py-20">
      <ClipLoader
        color="#dc2626"
        size={60}
      />
    </div>
  );
}

export default Spinner;