import React from 'react';
import { Upload } from 'lucide-react';

interface UploadSectionProps {
  title: string;
  type: 'folder' | 'file';
  file: File | null;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
}

const UploadSection: React.FC<UploadSectionProps> = ({ title, type, file, setFile }) => {
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    setFile(droppedFile);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <div
        className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 transition-colors"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onClick={() => document.getElementById(`fileInput-${type}`)?.click()}
      >
        <Upload size={48} className="mx-auto mb-4 text-gray-400" />
        <p className="text-gray-600">
          拖放{type === 'folder' ? '作业文件夹' : '答案文件'}或点击选择
        </p>
        <input
          id={`fileInput-${type}`}
          type="file"
          className="hidden"
          onChange={handleFileChange}
          {...(type === 'folder' ? { webkitdirectory: '', directory: '' } : {})}
        />
      </div>
      {file && (
        <div className="mt-4">
          <p className="text-sm text-gray-600">
            已选择: {file.name}
            {type === 'folder' && ` (包含 ${file.webkitRelativePath.split('/').length - 1} 个文件)`}
          </p>
          <button
            className="mt-2 text-sm text-red-600 hover:text-red-800"
            onClick={() => setFile(null)}
          >
            清除选择
          </button>
        </div>
      )}
    </div>
  );
};

export default UploadSection;