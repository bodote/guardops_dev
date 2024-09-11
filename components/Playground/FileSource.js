import React, { useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

const FileSource = ({ source, content }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="mb-2">
      <div 
        className="flex items-center cursor-pointer bg-gray-100 p-2 rounded-t-lg hover:text-gray-600"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? <FiChevronUp size={16} /> : <FiChevronDown size={16} />}
        <span className="ml-2 font-medium">{source}</span>
      </div>
      {isExpanded && (
        <div className="bg-white p-2 border border-gray-200 rounded-b-lg">
          <pre className="whitespace-pre-wrap">{content}</pre>
        </div>
      )}
    </div>
  );
};

export default FileSource;