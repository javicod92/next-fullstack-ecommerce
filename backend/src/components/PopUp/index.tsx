type PopupProps = {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function Popup({
  title,
  message,
  onConfirm,
  onCancel,
}: PopupProps) {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-10">
      <div className="bg-white p-5 border rounded-lg text-center">
        <h2>{title}</h2>
        <p>{message}</p>
        <div className="flex gap-2 justify-center mt-2">
          <button
            onClick={onConfirm}
            className="delete text-white p-2 px-4 rounded-lg"
          >
            Confirm
          </button>
          <button
            onClick={onCancel}
            className="edit text-white p-2 px-4 rounded-lg"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
