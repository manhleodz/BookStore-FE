import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import BookCard from '../SaleBook/BookCard';
import FilterBar from '../FilterBar/FilterBar';


export default function ListBook({ flashSale }) {

  const [click, setClick] = useState(false);
  const [filteredData, setFilteredData] = useState(flashSale);
  const [sort, setSort] = useState("Tiêu biểu");
  const [openFilter, setOpenFilter] = useState(true);

  return (
    <div
      className='w-screen flex justify-center items-center'
      onClick={(e) => {
        if (e.target.id !== "dropdownDefaultButton") {
          setClick(false);
        }
      }}
    >
      <div className='w-9/12 relative justify-center items-center shadow-2xl mt-10 bg-white'>
        <div className=' w-full flex justify-start space-x-3 max-xl:space-x-0'>
          <div className='w-2/12 max-xl:w-0'>
            <button
              onClick={() => {
                setOpenFilter(!openFilter);
              }}
              className=' absolute z-30 p-2 border-2 border-gray-400 bg-gray-200 rounded-lg hidden max-xl:block'>
              <svg xmlns="http://www.w3.org/2000/svg" height="1.3em" viewBox="0 0 448 512" className=' fill-gray-400'>
                <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
              </svg>
            </button>
            <div
              className={` w-full max-xl:absolute max-xl:w-5/12 max-xl:bg-gray-100 h-full z-10 duration-1000 -translate-w-full transition ${!openFilter && ' max-xl:hidden'}`}
            >
              <FilterBar flashSale={flashSale} filteredData={filteredData} setFilteredData={setFilteredData} />
            </div>
          </div>
          <div className=' w-10/12 flex flex-col justify-start max-xl:w-full max-xl:justify-center'>
            <div className=' absolute right-5 top-2'>
              <h1 className=' text-lg font-semibold'>Sắp xếp theo</h1>
              <button
                id="dropdownDefaultButton" data-dropdown-toggle="dropdown"
                onClick={() => setClick(!click)}
                className="text-black font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center border-2 w-44 border-gray-400 bg-gray-200" type="button"
              >
                {sort}
                <svg className="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                </svg>
              </button>
              {click && (<div id="dropdown" className="z-10  absolute bg-white divide-y divide-gray-100 rounded-lg shadow-2xl w-44 dark:bg-gray-700">
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                  <li>
                    <div onClick={() => {
                      setFilteredData(flashSale);
                      setSort('Tiêu biểu');
                    }}
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
                    >Tiêu biểu
                    </div>
                  </li>
                  <li>
                    <div onClick={() => {
                      let data = [...flashSale];
                      for (var i = 0; i < data.length; i++) {
                        for (var j = 0; j < (data.length - i - 1); j++) {
                          if (data[j].id > data[j + 1].id) {
                            var temp = data[j];
                            data[j] = data[j + 1];
                            data[j + 1] = temp;
                          }
                        }
                      }
                      setFilteredData(data);
                      setSort("Sách mới");
                    }}
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
                    >Sách mới
                    </div>
                  </li>
                  <li>
                    <div onClick={() => {
                      let data = [...flashSale];
                      for (var i = 0; i < data.length; i++) {
                        for (var j = 0; j < (data.length - i - 1); j++) {
                          if (data[j].price < data[j + 1].price) {
                            var temp = data[j];
                            data[j] = data[j + 1];
                            data[j + 1] = temp;
                          }
                        }
                      }
                      setFilteredData(data);
                      setSort("Giá cao đến thấp");
                    }}
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
                    >Giá cao đến thấp
                    </div>
                  </li>
                  <li>
                    <div onClick={() => {
                      let data = [...flashSale];
                      for (var i = 0; i < data.length; i++) {
                        for (var j = 0; j < (data.length - i - 1); j++) {
                          if (data[j].price > data[j + 1].price) {
                            var temp = data[j];
                            data[j] = data[j + 1];
                            data[j + 1] = temp;
                          }
                        }
                      }
                      setFilteredData(data);
                      setSort("Giá thấp đến cao");
                    }}
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
                    >Giá thấp đến cao
                    </div>
                  </li>
                  <li>
                    <div onClick={() => {
                      let data = [...flashSale];
                      for (var i = 0; i < data.length; i++) {
                        for (var j = 0; j < (data.length - i - 1); j++) {
                          if (data[j].sold < data[j + 1].sold) {
                            var temp = data[j];
                            data[j] = data[j + 1];
                            data[j + 1] = temp;
                          }
                        }
                      }
                      setFilteredData(data);
                      setSort("Lượng mua");
                    }}
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
                    >Lượng mua
                    </div>
                  </li>
                </ul>
              </div>)}
            </div>
            <PaginatedItems flashSale={filteredData} />
          </div>
        </div>
      </div>
    </div>
  )
}

function PaginatedItems({ flashSale }) {
  // We start with an empty list of flashSale.
  const [currentflashSale, setCurrentflashSale] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    // Fetch flashSale from another resources.
    const endOffset = itemOffset + 10;
    setCurrentflashSale(flashSale.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(flashSale.length / 10));
  }, [itemOffset, flashSale]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = event.selected * 10 % flashSale.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      {flashSale.length === 0 ? (
        <h1 className='text-center font-semibold text-3xl'>Không có sách</h1>
      ) : (
        <div className='flex flex-col justify-between items-end h-full'>
          <div className=' grid grid-cols-5 w-full justify-center items-center max-2xl:grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 mt-24'>
            {currentflashSale && currentflashSale.map((book, index) => (
              <BookCard book={book} key={index} />
            ))}
          </div>
          <div className=' w-full relative bottom-0'>
            <ReactPaginate
              nextLabel="->"
              onPageChange={handlePageClick}
              pageRangeDisplayed={3}
              marginPagesDisplayed={2}
              pageCount={pageCount}
              previousLabel="<-"
              pageClassName="page-item p-1 "
              pageLinkClassName="page-link p-1"
              previousClassName="page-item p-1"
              previousLinkClassName="page-link p-1"
              nextClassName="page-item p-1"
              nextLinkClassName="page-link p-1"
              breakLabel="..."
              breakClassName="page-item p-1"
              breakLinkClassName="page-link p-1"
              containerClassName="pagination p-1"
              activeClassName="active p-1"
              renderOnZeroPageCount={null}
            />
          </div>
        </div>
      )}
    </>
  );
}
