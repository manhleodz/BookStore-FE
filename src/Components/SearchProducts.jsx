import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import BookCard from './Widgets/SaleBook/BookCard';
import { Product } from '../Network/Product';
import { useParams } from 'react-router-dom';
import Loading from './Widgets/Loading/Loading';
import Footer from './Widgets/Footer/Footer';

export default function SearchProducts() {


    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [sort, setSort] = useState("Tiêu biểu");
    const [filteredData, setFilteredData] = useState(null);
    const [click, setClick] = useState(false);
    const { wordEntered } = useParams();

    function removeAccents(str) {
        var AccentsMap = [
            "aàảãáạăằẳẵắặâầẩẫấậ",
            "AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ",
            "dđ", "DĐ",
            "eèẻẽéẹêềểễếệ",
            "EÈẺẼÉẸÊỀỂỄẾỆ",
            "iìỉĩíị",
            "IÌỈĨÍỊ",
            "oòỏõóọôồổỗốộơờởỡớợ",
            "OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ",
            "uùủũúụưừửữứự",
            "UÙỦŨÚỤƯỪỬỮỨỰ",
            "yỳỷỹýỵ",
            "YỲỶỸÝỴ"
        ];
        for (var i = 0; i < AccentsMap.length; i++) {
            var re = new RegExp('[' + AccentsMap[i].substring(1) + ']', 'g');
            var char = AccentsMap[i][0];
            str = str.replace(re, char);
        }
        return str;
    }

    useEffect(() => {

        document.title = wordEntered;
        Product.getList().then((res) => {

            if (res.data) {
                const newFilter = res.data.filter((value) => {
                    return removeAccents(value.name).toLowerCase().includes(removeAccents(wordEntered).toLowerCase());
                });
                setData(newFilter);
            }
        });

        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, [wordEntered])


    if (loading || !data) {
        return <div className=' fixed top-1/2 left-1/2'><Loading /></div>
    }

    return (
        <>
            <div className=' relative top-44 w-full flex flex-col bg-gray-200'>
                <h1 className='text-center text-3xl'>Có {data.length} kết quả tìm kiếm cho "{wordEntered}"</h1>
                <div className=' w-full flex justify-center items-center'>
                    <div className='w-9/12 relative justify-center items-center shadow-2xl mt-10 bg-white'>
                        <PaginatedItems data={data} />
                    </div>
                </div>
                <Footer />
            </div>
        </>
    )
}


function PaginatedItems({ data }) {
    // We start with an empty list of data.
    const [currentdata, setCurrentdata] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const [itemOffset, setItemOffset] = useState(0);

    useEffect(() => {
        // Fetch data from another resources.
        const endOffset = itemOffset + 10;
        setCurrentdata(data.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(data.length / 10));
    }, [itemOffset, data]);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        const newOffset = event.selected * 10 % data.length;
        setItemOffset(newOffset);
    };

    return (
        <>
            {data.length === 0 ? (
                <h1 className='text-center font-semibold text-3xl'>Không có sách</h1>
            ) : (
                <>
                    <div className=' grid grid-cols-5 w-full justify-center items-center max-2xl:grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 mt-24'>
                        {currentdata && currentdata.map((book, index) => (
                            <BookCard book={book} key={index} />
                        ))}
                    </div>
                    <ReactPaginate
                        nextLabel="->"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={3}
                        marginPagesDisplayed={2}
                        pageCount={pageCount}
                        previousLabel="<-"
                        pageClassName="page-item"
                        pageLinkClassName="page-link"
                        previousClassName="page-item"
                        previousLinkClassName="page-link"
                        nextClassName="page-item"
                        nextLinkClassName="page-link"
                        breakLabel="..."
                        breakClassName="page-item"
                        breakLinkClassName="page-link"
                        containerClassName="pagination"
                        activeClassName="active"
                        renderOnZeroPageCount={null}
                    />
                </>
            )}
        </>
    );
}
