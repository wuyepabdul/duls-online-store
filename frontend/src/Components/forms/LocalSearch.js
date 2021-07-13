import React from "react";

const LocalSearch = ({ setKeyword, keyword }) => {
  // handle change
  const handleSearchChange = (e) => {
    e.preventDefault();
    setKeyword(e.target.value);
  };
  return (
    <div className="form-outline mt-4">
      <input
        type="text"
        id="keyword"
        name="keyword"
        placeholder="Filter"
        value={keyword}
        onChange={handleSearchChange}
        className="text-center form-control border border-top-0 border-end-0 border-start-0 border-bottom-1 border-primary "
        autoFocus
      />
    </div>
  );
};

export default LocalSearch;
