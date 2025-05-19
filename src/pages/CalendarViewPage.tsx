import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addMonths, subMonths, addDays, isSameMonth, isSameDay } from 'date-fns';
import { TaskSummary } from '@/types/task';
import { getTasks } from '@/services/taskService';

const CalendarViewPage: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tasks, setTasks] = useState<TaskSummary[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all tasks
    const loadTasks = async () => {
      try {
        const fetchedTasks = await getTasks();
        setTasks(fetchedTasks);
      } catch (error) {
        console.error("Failed to fetch tasks for calendar view:", error);
      }
    };
    loadTasks();
  }, []);

  const onDateClick = (day: Date) => {
    setSelectedDate(day);
  };

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const renderHeader = () => {
    return (
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={prevMonth}
          className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <span className="text-gray-600 dark:text-gray-300">←</span>
        </button>
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          {format(currentMonth, 'MMMM yyyy')}
        </h2>
        <button
          onClick={nextMonth}
          className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <span className="text-gray-600 dark:text-gray-300">→</span>
        </button>
      </div>
    );
  };

  const renderDays = () => {
    const days = [];
    const dateFormat = 'EEE';
    const startDate = startOfWeek(currentMonth);

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col-center" key={i}>
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {format(addDays(startDate, i), dateFormat)}
          </span>
        </div>
      );
    }

    return <div className="grid grid-cols-7 mb-2">{days}</div>;
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = '';

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, 'd');
        const cloneDay = day;
        
        // Filter tasks for the current day - using createdAt as fallback since deadline isn't in TaskSummary
        const dayTasks = tasks.filter((task) => {
          // Use createdAt date for task display in calendar
          const taskDate = new Date(task.createdAt);
          return isSameDay(taskDate, cloneDay);
        });

        days.push(
          <div
            key={day.toString()}
            className={`min-h-[100px] border p-1 ${
              !isSameMonth(day, monthStart)
                ? 'text-gray-400 dark:text-gray-600 bg-gray-50 dark:bg-gray-800'
                : isSameDay(day, selectedDate)
                ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-500'
                : 'bg-white dark:bg-gray-800'
            }`}
            onClick={() => onDateClick(cloneDay)}
          >
            <div className="flex justify-between">
              <span className={`text-sm ${
                isSameDay(day, new Date()) 
                  ? 'bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center' 
                  : ''
              }`}>
                {formattedDate}
              </span>
            </div>
            <div className="mt-1 max-h-20 overflow-y-auto">
              {dayTasks.map((task) => (
                <div 
                  key={task.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/tasks/${task.id}`);
                  }}
                  className={`text-xs p-1 mb-1 rounded truncate cursor-pointer ${
                    task.priority === 'high' 
                      ? 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-200' 
                      : task.priority === 'medium'
                      ? 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200'
                      : 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200'
                  }`}
                >
                  {task.title}
                </div>
              ))}
            </div>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="grid grid-cols-7" key={day.toString()}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="bg-white dark:bg-gray-800 rounded-lg">{rows}</div>;
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Calendar View</h1>
      <div className="calendar bg-white dark:bg-gray-800 rounded-lg shadow p-4">
        {renderHeader()}
        {renderDays()}
        {renderCells()}
      </div>
    </div>
  );
};

export default CalendarViewPage; 