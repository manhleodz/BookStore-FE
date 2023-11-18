import React, { useEffect, useState } from 'react';

export default function FilterBar({ flashSale, filteredData, setFilteredData }) {

  const selectedAuthor0 = sessionStorage.getItem('selectedAuthor');
  const selectedCategory0 = sessionStorage.getItem('selectedCategory');
  const selectedPrice0 = sessionStorage.getItem('selectedPrice');


  let selectedAuthor1;
  let selectedCategory1;
  let selectedPrice1;

  if (selectedAuthor0 && selectedCategory0 && selectedPrice0) {
    selectedAuthor1 = selectedAuthor0;
    selectedCategory1 = selectedCategory0;
    selectedPrice1 = selectedPrice0;
  } else {
    selectedAuthor1 = "[]";
    selectedCategory1 = "[]";
    selectedPrice1 = "[]";
  }

  const [selectedAuthor, setSelectedAuthor] = useState(JSON.parse(selectedAuthor1));
  const [selectedCategory, setSelectedCategory] = useState(JSON.parse(selectedCategory1));
  const [selectedPrice, setSelectedPrice] = useState(JSON.parse(selectedPrice1));


  useEffect(() => {
    let result = [];
    if (selectedAuthor.length === 0 && selectedCategory.length === 0 && selectedPrice.length === 0) {
      result = flashSale;
    }
    else {
      flashSale.map(book => {
        for (let i of selectedAuthor) {
          if (i === book.DetailProduct.author) {
            result.push(book);
          }
        }
        for (let i of selectedPrice) {
          if (i.lower < book.price && i.upper > book.price) {
            result.push(book);
          }
        }
      });
    }

    setFilteredData(result);
  }, [])

  return (
    <>
      <div className=' h-full w-full relative pl-3 mt-10'>
        <div className={`p-1 w-full mt-5`} >
          <div className='flex justify-between items-center'>
            <div className=''>
              <div className=' mb-4 ml-4'>
                <span className=' absolute bg-red-400 text-white w-6 h-6 justify-center text-center rounded-full'>{selectedAuthor.length + selectedCategory.length + selectedPrice.length}</span>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" height="1.7em" viewBox="0 0 512 512" className=' fill-gray-600'>
                <path d="M3.9 54.9C10.5 40.9 24.5 32 40 32H472c15.5 0 29.5 8.9 36.1 22.9s4.6 30.5-5.2 42.5L320 320.9V448c0 12.1-6.8 23.2-17.7 28.6s-23.8 4.3-33.5-3l-64-48c-8.1-6-12.8-15.5-12.8-25.6V320.9L9 97.3C-.7 85.4-2.8 68.8 3.9 54.9z" />
              </svg>
            </div>
          </div>
          <div className=' flex flex-col divide-y'>
            <div>
              <h1 className=' text-2xl font-semibold'>Tác giả</h1>
              <div className="flex items-center p-2 rounded hover:bg-gray-200 ">
                <input
                  defaultChecked={selectedAuthor0 && selectedAuthor0.includes("Thích Nhất Hạnh")}
                  id="checkbox-item-1" onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedAuthor([...selectedAuthor, "Thích Nhất Hạnh"])
                    }
                    else {
                      const arr = selectedAuthor.filter(author => {
                        return author !== "Thích Nhất Hạnh"
                      })
                      setSelectedAuthor(arr);
                    }
                  }}
                  type="checkbox" value=""
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 "
                />
                <label htmlFor="checkbox-item-1" className="w-full ml-2 text-sm font-medium text-gray-900 rounded cursor-pointer ">Thích Nhất Hạnh</label>
              </div>
              <div className="flex items-center p-2 rounded hover:bg-gray-200 ">
                <input
                  defaultChecked={selectedAuthor0 && selectedAuthor0.includes("Mạnh Leo")}
                  id="checkbox-item-2" onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedAuthor([...selectedAuthor, "Mạnh Leo"])
                    }
                    else {
                      const arr = selectedAuthor.filter(author => {
                        return author !== "Mạnh Leo"
                      })
                      setSelectedAuthor(arr);
                    }
                  }} type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 "
                />
                <label htmlFor="checkbox-item-2" className="w-full ml-2 text-sm font-medium text-gray-900 rounded cursor-pointer ">Mạnh Leo</label>
              </div>
              <div className="flex items-center p-2 rounded hover:bg-gray-200 ">
                <input
                  defaultChecked={selectedAuthor0 && selectedAuthor0.includes("Bill Gates")}
                  id="checkbox-item-3" onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedAuthor([...selectedAuthor, "Bill Gates"])
                    }
                    else {
                      const arr = selectedAuthor.filter(author => {
                        return author !== "Bill Gates"
                      })
                      setSelectedAuthor(arr);
                    }
                  }} type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 "
                />
                <label htmlFor="checkbox-item-3" className="w-full ml-2 text-sm font-medium text-gray-900 rounded cursor-pointer ">Bill Gates</label>
              </div>
              <div className="flex items-center p-2 rounded hover:bg-gray-200 ">
                <input
                  defaultChecked={selectedAuthor0 && selectedAuthor0.includes("Nguyễn Nhật Ánh")}
                  id="checkbox-item-4" onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedAuthor([...selectedAuthor, "Nguyễn Nhật Ánh"])
                    } else {
                      const arr = selectedAuthor.filter(author => {
                        return author !== "Nguyễn Nhật Ánh"
                      })
                      setSelectedAuthor(arr);
                    }
                  }} type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 "
                />
                <label htmlFor="checkbox-item-4" className="w-full ml-2 text-sm font-medium text-gray-900 rounded cursor-pointer ">Nguyễn Nhật Ánh</label>
              </div>
              <div className="flex items-center p-2 rounded hover:bg-gray-200 ">
                <input
                  defaultChecked={selectedAuthor0 && selectedAuthor0.includes("Hùng Phạm")}
                  id="checkbox-item-5" onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedAuthor([...selectedAuthor, "Hùng Phạm"])
                    } else {
                      const arr = selectedAuthor.filter(author => {
                        return author !== "Hùng Phạm"
                      })
                      setSelectedAuthor(arr);
                    }
                  }} type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 "
                />
                <label htmlFor="checkbox-item-5" className="w-full ml-2 text-sm font-medium text-gray-900 rounded cursor-pointer ">Hùng Phạm</label>
              </div>
            </div>
            <div>
              <h1 className=' text-2xl font-semibold'>Thể Loại</h1>
              <div className="flex items-center p-2 rounded hover:bg-gray-200 ">
                <input
                  defaultChecked={selectedCategory0 && selectedCategory0.includes("Ngôn tình")}
                  id="checkbox-item-6" onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedCategory([...selectedCategory, "Ngôn tình"])
                    } else {
                      const arr = selectedCategory.filter(author => {
                        return author !== "Ngôn tình"
                      })
                      setSelectedCategory(arr);
                    }
                  }} type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 "
                />
                <label htmlFor="checkbox-item-6" className="w-full ml-2 text-sm font-medium text-gray-900 rounded cursor-pointer ">Ngôn tình</label>
              </div>
              <div className="flex items-center p-2 rounded hover:bg-gray-200 ">
                <input
                  defaultChecked={selectedCategory0 && selectedCategory0.includes("Phật giáo")}
                  id="checkbox-item-7" onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedCategory([...selectedCategory, "Phật giáo"])
                    } else {
                      const arr = selectedCategory.filter(author => {
                        return author !== "Phật giáo"
                      })
                      setSelectedCategory(arr);
                    }
                  }} type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 "
                />
                <label htmlFor="checkbox-item-7" className="w-full ml-2 text-sm font-medium text-gray-900 rounded cursor-pointer ">Phật giáo</label>
              </div>
              <div className="flex items-center p-2 rounded hover:bg-gray-200 ">
                <input
                  defaultChecked={selectedCategory0 && selectedCategory0.includes("Thiếu nhi")}
                  id="checkbox-item-8" onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedCategory([...selectedCategory, "Thiếu nhi"])
                    } else {
                      const arr = selectedCategory.filter(author => {
                        return author !== "Thiếu nhi"
                      })
                      setSelectedCategory(arr);
                    }
                  }} type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 "
                />
                <label htmlFor="checkbox-item-8" className="w-full ml-2 text-sm font-medium text-gray-900 rounded cursor-pointer ">Thiếu nhi</label>
              </div>
              <div className="flex items-center p-2 rounded hover:bg-gray-200 ">
                <input
                  defaultChecked={selectedCategory0 && selectedCategory0.includes("Trinh thám")}
                  id="checkbox-item-9" onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedCategory([...selectedCategory, "Trinh thám"])
                    } else {
                      const arr = selectedCategory.filter(author => {
                        return author !== "Trinh thám"
                      })
                      setSelectedCategory(arr);
                    }
                  }} type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 "
                />
                <label htmlFor="checkbox-item-9" className="w-full ml-2 text-sm font-medium text-gray-900 rounded cursor-pointer ">Trinh thám</label>
              </div>
              <div className="flex items-center p-2 rounded hover:bg-gray-200 ">
                <input
                  defaultChecked={selectedCategory0 && selectedCategory0.includes("Đời sống")}
                  id="checkbox-item-10" onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedCategory([...selectedCategory, "Đời sống"])
                    } else {
                      const arr = selectedCategory.filter(author => {
                        return author !== "Đời sống"
                      })
                      setSelectedCategory(arr);
                    }
                  }} type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 "
                />
                <label htmlFor="checkbox-item-10" className="w-full ml-2 text-sm font-medium text-gray-900 rounded cursor-pointer ">Đời sống</label>
              </div>
            </div>
            <div>
              <h1 className=' text-2xl font-semibold'>Giá</h1>
              <div className="flex items-center p-2 rounded hover:bg-gray-200 ">
                <input
                  defaultChecked={selectedPrice0 && selectedPrice0.includes(`"lower":0`)}
                  id="checkbox-item-11" onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedPrice([...selectedPrice, {
                        lower: 0,
                        upper: 100000
                      }])
                    } else {
                      const arr = selectedPrice.filter(price => {
                        return price.lower !== 0 && price.upper !== 100000;
                      })
                      setSelectedPrice(arr);
                    }
                  }} type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 "
                />
                <label htmlFor="checkbox-item-11" className="w-full ml-2 text-sm font-medium text-gray-900 rounded cursor-pointer ">0 - 100.000vnđ</label>
              </div>
              <div className="flex items-center p-2 rounded hover:bg-gray-200 ">
                <input
                  defaultChecked={selectedPrice0 && selectedPrice0.includes(`"lower":100000`)}
                  id="checkbox-item-12" onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedPrice([...selectedPrice, {
                        lower: 100000,
                        upper: 200000
                      }])
                    } else {
                      const arr = selectedPrice.filter(price => {
                        return price.lower !== 100000 && price.upper !== 200000;
                      })
                      setSelectedPrice(arr);
                    }
                  }} type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 "
                />
                <label htmlFor="checkbox-item-12" className="w-full ml-2 text-sm font-medium text-gray-900 rounded cursor-pointer ">100.000-200.000vnđ</label>
              </div>
              <div className="flex items-center p-2 rounded hover:bg-gray-200 ">
                <input
                  defaultChecked={selectedPrice0 && selectedPrice0.includes(`"lower":200000`)}
                  id="checkbox-item-13" onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedPrice([...selectedPrice, {
                        lower: 200000,
                        upper: 300000
                      }])
                    } else {
                      const arr = selectedPrice.filter(price => {
                        return price.lower !== 200000 && price.upper !== 300000;
                      })
                      setSelectedPrice(arr);
                    }
                  }} type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 "
                />
                <label htmlFor="checkbox-item-13" className="w-full ml-2 text-sm font-medium text-gray-900 rounded cursor-pointer ">200.000-300.000vnđ</label>
              </div>
              <div className="flex items-center p-2 rounded hover:bg-gray-200 ">
                <input
                  defaultChecked={selectedPrice0 && selectedPrice0.includes(`"lower":300000`)}
                  id="checkbox-item-14" onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedPrice([...selectedPrice, {
                        lower: 300000,
                        upper: 400000
                      }])
                    } else {
                      const arr = selectedPrice.filter(price => {
                        return price.lower !== 300000 && price.upper !== 400000;
                      })
                      setSelectedPrice(arr);
                    }
                  }} type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 "
                />
                <label htmlFor="checkbox-item-14" className="w-full ml-2 text-sm font-medium text-gray-900 rounded cursor-pointer ">300.000-400.000vnđ</label>
              </div>
              <div className="flex items-center p-2 rounded hover:bg-gray-200 ">
                <input
                  defaultChecked={selectedPrice0 && selectedPrice0.includes(`"lower":400000`)}
                  id="checkbox-item-15" onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedPrice([...selectedPrice, {
                        lower: 400000,
                        upper: 100000000
                      }])
                    } else {
                      const arr = selectedPrice.filter(price => {
                        return price.lower !== 400000;
                      })
                      setSelectedPrice(arr);
                    }
                  }} type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 "
                />
                <label htmlFor="checkbox-item-15" className="w-full ml-2 text-sm font-medium text-gray-900 rounded cursor-pointer ">{">400.000vnđ"}</label>
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              sessionStorage.setItem("selectedAuthor", JSON.stringify(selectedAuthor));
              sessionStorage.setItem("selectedCategory", JSON.stringify(selectedCategory));
              sessionStorage.setItem("selectedPrice", JSON.stringify(selectedPrice));
              let result = [];
              if (selectedAuthor.length === 0 && selectedCategory.length === 0 && selectedPrice.length === 0) {
                result = flashSale;
              }
              else {
                flashSale.map(book => {
                  for (let i of selectedAuthor) {
                    if (i === book.DetailProduct.author) {
                      result.push(book);
                    }
                  }
                  for (let i of selectedCategory) {
                    if (book.DetailProduct.category === i) {
                      result.push(book);
                    }
                  }
                  for (let i of selectedPrice) {
                    if (i.lower < book.price && i.upper > book.price) {
                      result.push(book);
                    }
                  }
                });
              }
              setFilteredData(result);
            }}
            className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-200 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg w-full text-sm px-5 py-2.5 mr-2 mb-2 "
          >
            Áp dụng
          </button>
        </div>
      </div>
    </>
  )
}
