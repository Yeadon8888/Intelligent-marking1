import React, { useState, useEffect } from 'react';
import QuestionScoreConfig from './QuestionScoreConfig';

interface TaskConfigProps {
  onStartReview: () => void;
  isEnabled: boolean;
}

const TaskConfig: React.FC<TaskConfigProps> = ({ onStartReview, isEnabled }) => {
  const [taskName, setTaskName] = useState('');
  const [subject, setSubject] = useState('');
  const [totalScore, setTotalScore] = useState('');
  const [questionCount, setQuestionCount] = useState('');
  const [questions, setQuestions] = useState<{ number: number; score: number }[]>([]);
  const [isConfigExpanded, setIsConfigExpanded] = useState(false);

  useEffect(() => {
    const savedConfig = localStorage.getItem('questionScoreConfig');
    if (savedConfig) {
      setQuestions(JSON.parse(savedConfig));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('questionScoreConfig', JSON.stringify(questions));
  }, [questions]);

  const handleQuestionChange = (newQuestions: { number: number; score: number }[]) => {
    setQuestions(newQuestions);
  };

  const calculateTotalConfigScore = () => {
    return questions.reduce((sum, q) => sum + q.score, 0);
  };

  const isStartReviewEnabled = () => {
    return (
      isEnabled &&
      questions.length > 0 &&
      calculateTotalConfigScore() === Number(totalScore)
    );
  };

  const handleAverageDistribution = () => {
    const count = parseInt(questionCount);
    if (count > 0 && totalScore) {
      const scorePerQuestion = Number(totalScore) / count;
      const newQuestions = Array.from({ length: count }, (_, index) => ({
        number: index + 1,
        score: Number(scorePerQuestion.toFixed(2)),
      }));
      setQuestions(newQuestions);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-8">
      <h2 className="text-xl font-semibold mb-4">任务配置</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="任务名称"
          className="border rounded p-2"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
        <select
          className="border rounded p-2"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        >
          <option value="">选择科目</option>
          <option value="语文">语文</option>
          <option value="数学">数学</option>
          <option value="英语">英语</option>
        </select>
        <div className="relative">
          <input
            type="number"
            placeholder="总分"
            className="border rounded p-2 w-full"
            value={totalScore}
            onChange={(e) => setTotalScore(e.target.value)}
          />
          <span className="absolute right-0 top-0 text-xs text-gray-500 mt-1 mr-2">
            总分应与题目得分配置中的总分一致
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="number"
            placeholder="题目数量"
            className="border rounded p-2 flex-grow"
            value={questionCount}
            onChange={(e) => setQuestionCount(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white px-2 py-1 rounded text-sm"
            onClick={handleAverageDistribution}
          >
            平均分配
          </button>
        </div>
      </div>
      <div className="mt-6">
        <button
          className="flex items-center justify-between w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 rounded font-semibold"
          onClick={() => setIsConfigExpanded(!isConfigExpanded)}
        >
          <span>题目得分配置</span>
          <span>{isConfigExpanded ? '▲' : '▼'}</span>
        </button>
        {isConfigExpanded && (
          <QuestionScoreConfig
            questions={questions}
            onChange={handleQuestionChange}
            totalScore={Number(totalScore)}
          />
        )}
      </div>
      <button
        className={`mt-6 w-full py-2 px-4 rounded font-semibold text-white ${
          isStartReviewEnabled()
            ? 'bg-blue-600 hover:bg-blue-700'
            : 'bg-gray-400 cursor-not-allowed'
        }`}
        onClick={onStartReview}
        disabled={!isStartReviewEnabled()}
      >
        开始批阅
      </button>
    </div>
  );
};

export default TaskConfig;