import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p>&copy; 2023 智能批阅助手. All rights reserved.</p>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-gray-300">关于我们</a>
            <a href="#" className="hover:text-gray-300">隐私政策</a>
            <a href="#" className="hover:text-gray-300">使用条款</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;