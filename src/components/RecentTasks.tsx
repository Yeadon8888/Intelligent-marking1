import React from 'react';

const RecentTasks: React.FC = () => {
  const tasks = [
    { name: '期中考试', subject: '数学', completedAt: '2023-05-15', progress: 100 },
    { name: '单元测试', subject: '英语', completedAt: '2023-05-10', progress: 80 },
    { name: '月考', subject: '语文', completedAt: '2023-05-05', progress: 95 },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-8">
      <h2 className="text-xl font-semibold mb-4">最近任务</h2>
      <div className="space-y-4">
        {tasks.map((task, index) => (
          <div key={index} className="border-b pb-4 last:border-b-0">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold">{task.name}</h3>
                <p className="text-sm text-gray-600">{task.subject} | {task.completedAt}</p>
              </div>
              <div className="w-24">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-green-600 h-2.5 rounded-full"
                    style={{ width: `${task.progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <a href="#" className="text-blue-600 hover:text-blue-800 mt-4 inline-block">
        查看所有任务
      </a>
    </div>
  );
};

export default RecentTasks;