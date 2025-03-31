import React from 'react';
import { EventCategory } from '@/types';

interface CategoryFilterProps {
  selectedCategory: EventCategory;
  onCategoryChange: (category: EventCategory) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ selectedCategory, onCategoryChange }) => {
  const categories: EventCategory[] = [
    'All', 'Academic', 'Social', 'Cultural', 'Sports', 'Career', 'Workshop', 'Concert'
  ];

  const handleClick = (category: EventCategory) => {
    console.log('Category clicked:', category);
    onCategoryChange(category);
  };

  return (
    <div className="flex flex-wrap justify-center mb-8 animate-fade-in">
      <div className="glass-card p-2 flex flex-wrap justify-center gap-2">
        {categories.map((category, index) => (
          <button
            key={category}
            onClick={() => handleClick(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 staggered-item ${
              selectedCategory === category
                ? 'glass-button text-white'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200 hover:scale-105'
            }`}
            style={{animationDelay: `${0.05 * index}s`}}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
