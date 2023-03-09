import React from 'react'

interface Props {
  loadMore: (e?: any) => void;
}

const Pagination = ({ loadMore }:Props) => {
  return (
    <div>
      <button className="btn btn-dark d-block w-50 text-center m-auto mt-3 mb-2 " 
      onClick={()=>loadMore()}
      >Load More</button>
    </div>
  );
};

export default Pagination

