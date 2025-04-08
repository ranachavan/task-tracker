import React from 'react';

function FilterButtons({ filter, setFilter }) {
  return (
    <div className="filter-buttons">
      <button 
        onClick={() => setFilter('all')} 
        className={filter === 'all' ? 'active' : ''}
      >
        All
      </button>
      <button 
        onClick={() => setFilter('completed')} 
        className={filter === 'completed' ? 'active' : ''}
      >
        Completed
      </button>
      <button 
        onClick={() => setFilter('pending')} 
        className={filter === 'pending' ? 'active' : ''}
      >
        Pending
      </button>
    </div>
  );
}

export default FilterButtons;