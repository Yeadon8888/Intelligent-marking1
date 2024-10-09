import React, { useState, useEffect } from 'react';

const ReviewProgress: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [currentFile, setCurrentFile] = useState('');
  const [processedFiles, setProcessedFiles] = useState(0);
  const [totalFiles, setTotalFiles] = useState(100); // Simulated total files

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prevProgress + 1;
      });
      setProcessedFiles((prevFiles) => Math.min(prevFiles + 1, totalFiles));
      setCurrentFile(`file_${Math.floor(Math.random() * 1000)}.pdf`);
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-8">
      <h2 className="text-xl font-semibold mb-4">批阅进度</h2>
      <div className="mb-4">
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-blue-600 h-2.5 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
      <p className="text-sm text-gray-600">当前处理: {currentFile}</p>
      <p className="text-sm text-gray-600">
        进度: {processedFiles} / {totalFiles} 文件
      </p>
    </div>
  );
};

export default ReviewProgress;