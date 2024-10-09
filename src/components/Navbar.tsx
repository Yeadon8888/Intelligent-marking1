import React from 'react';
import { BookOpen, User } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <BookOpen size={24} />
          <span className="text-xl font-semibold">智能批阅助手</span>
        </div>
        <div className="flex items-center space-x-6">
          <a href="#" className="hover:text-blue-200">首页</a>
          <a href="#" className="hover:text-blue-200">任务</a>
          <a href="#" className="hover:text-blue-200">统计</a>
          <a href="#" className="hover:text-blue-200">设置</a>
          <div className="relative">
            <User size={24} className="cursor-pointer" />
            {/* Implement dropdown menu here */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;