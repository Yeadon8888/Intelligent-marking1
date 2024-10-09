import React, { useState, useEffect } from 'react';

interface Question {
  number: number;
  score: number;
}

interface QuestionScoreConfigProps {
  questions: Question[];
  onChange: (questions: Question[]) => void;
  totalScore: number;
}

const QuestionScoreConfig: React.FC<QuestionScoreConfigProps> = ({
  questions,
  onChange,
  totalScore,
}) => {
  const [localQuestions, setLocalQuestions] = useState<Question[]>(questions);

  useEffect(() => {
    setLocalQuestions(questions);
  }, [questions]);

  const handleAddQuestion = () => {
    const newQuestion: Question = {
      number: localQuestions.length + 1,
      score: 0,
    };
    const updatedQuestions = [...localQuestions, newQuestion];
    setLocalQuestions(updatedQuestions);
    onChange(updatedQuestions);
  };

  const handleRemoveQuestion = (index: number) => {
    const updatedQuestions = localQuestions.filter((_, i) => i !== index);
    setLocalQuestions(updatedQuestions);
    onChange(updatedQuestions);
  };

  const handleQuestionChange = (index: number, field: 'number' | 'score', value: number) => {
    const updatedQuestions = localQuestions.map((q, i) => {
      if (i === index) {
        return { ...q, [field]: value };
      }
      return q;
    });
    setLocalQuestions(updatedQuestions);
    onChange(updatedQuestions);
  };

  const calculateCurrentTotal = () => {
    return localQuestions.reduce((sum, q) => sum + q.score, 0);
  };

  const isQuestionValid = (question: Question, index: number) => {
    return (
      question.number > 0 &&
      question.score >= 0 &&
      !localQuestions.some((q, i) => i !== index && q.number === question.number)
    );
  };

  return (
    <div className="mt-4">
      <p className="text-sm text-gray-600 mb-2">
        请设置每道题的分值。您可以根据需要添加或删除题目。
      </p>
      <div className="space-y-2">
        {localQuestions.map((question, index) => (
          <div key={index} className="flex items-center space-x-2">
            <input
              type="number"
              value={question.number}
              onChange={(e) => handleQuestionChange(index, 'number', parseInt(e.target.value))}
              className="border rounded p-2 w-20"
              placeholder="题号"
              min="1"
            />
            <input
              type="number"
              value={question.score}
              onChange={(e) => handleQuestionChange(index, 'score', parseFloat(e.target.value))}
              className="border rounded p-2 w-20"
              placeholder="分值"
              min="0"
              step="0.1"
            />
            <button
              onClick={() => handleRemoveQuestion(index)}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              删除
            </button>
            {!isQuestionValid(question, index) && (
              <span className="text-red-500 text-xs">无效的题目设置</span>
            )}
          </div>
        ))}
      </div>
      <button
        onClick={handleAddQuestion}
        className="mt-2 bg-green-500 text-white px-4 py-2 rounded"
      >
        添加题目
      </button>
      <p className="mt-4 text-sm">
        当前总分：{calculateCurrentTotal()}分 / 目标总分：{totalScore}分
      </p>
      {calculateCurrentTotal() !== totalScore && (
        <p className="text-red-500 text-sm">总分与目标总分不一致</p>
      )}
    </div>
  );
};

export default QuestionScoreConfig;