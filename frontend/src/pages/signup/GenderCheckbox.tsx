interface GenderCheckboxProps {
  onCheckboxChange: (gender: string) => void;
  selectedGender: string;
}

const GenderCheckbox: React.FC<GenderCheckboxProps> = ({
  onCheckboxChange,
  selectedGender,
}) => {
  return (
    <div className="flex">
      <div className="form-control">
        <label
          className={`label gap-2 cursor-pointer ${
            selectedGender === "male" ? "selected" : ""
          }`}
        >
          <span className="label-text">Male</span>
          <input
            type="checkbox"
            className="checkbox border-slate-900"
            checked={selectedGender === "male"}
            onChange={() => onCheckboxChange("male")}
          />
        </label>
      </div>
      <div className="form-control">
        <label
          className={`label gap-2 cursor-pointer ${
            selectedGender === "female" ? "selected" : ""
          }`}
        >
          <span className="label-text">Female</span>
          <input
            checked={selectedGender === "female"}
            onChange={() => onCheckboxChange("female")}
            type="checkbox"
            className="checkbox border-slate-900"
          />
        </label>
      </div>
    </div>
  );
};
export default GenderCheckbox;
