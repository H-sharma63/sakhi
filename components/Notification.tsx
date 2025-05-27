import { X } from 'lucide-react';

interface NotificationProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

export function Notification({ message, type, onClose }: NotificationProps) {
  return (
    <div className="fixed inset-x-0 top-4 flex justify-center z-50">
      <div className={`min-w-[300px] p-4 rounded-lg shadow-lg border 
        ${type === 'success' 
          ? 'bg-green-50 border-green-500 text-green-700' 
          : 'bg-red-50 border-red-500 text-red-700'
        }`}
      >
        <div className="flex justify-between items-start">
          <p className="pr-4">{message}</p>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}