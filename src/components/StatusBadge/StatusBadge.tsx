import React from 'react';
import './StatusBadge.css';

interface StatusBadgeProps {
  statusText?: string;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  statusText = 'Available for Data Science & ML Opportunities',
  className = '',
}) => {
  return (
    <div className={`status-badge ${className}`}>
      <span className="status-badge__dot-container">
        <span className="status-badge__dot-ping" />
        <span className="status-badge__dot" />
      </span>
      <span className="status-badge__text">{statusText}</span>
    </div>
  );
};

export default StatusBadge;
