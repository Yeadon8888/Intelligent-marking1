import React, { useState } from 'react';
import Navbar from './components/Navbar';
import UploadSection from './components/UploadSection';
import TaskConfig from './components/TaskConfig';
import ReviewProgress from './components/ReviewProgress';
import RecentTasks from './components/RecentTasks';
import Footer from './components/Footer';

function App() {
  const [assignmentFolder, setAssignmentFolder] = useState<File | null>(null);
  const [answerFile, setAnswerFile] = useState<File | null>(null);
  const [isReviewing, setIsReviewing] = useState(false);

  const handleStartReview = () => {
    setIsReviewing(true);
    // Implement the actual review process here
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <UploadSection
            title="上传作业文件夹"
            type="folder"
            file={assignmentFolder}
            setFile={setAssignmentFolder}
          />
          <UploadSection
            title="上传答案文件"
            type="file"
            file={answerFile}
            setFile={setAnswerFile}
          />
        </div>
        <TaskConfig
          onStartReview={handleStartReview}
          isEnabled={!!assignmentFolder && !!answerFile}
        />
        {isReviewing && <ReviewProgress />}
        <RecentTasks />
      </main>
      <Footer />
    </div>
  );
}

export default App;