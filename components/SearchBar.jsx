const Searchbar = ({ ...spreaded }) => {
  return (
    <div className="search">
      <input type="text" className="searchTerm" {...spreaded} />
    </div>
  );
};

export default Searchbar;
