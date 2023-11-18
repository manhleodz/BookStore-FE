import React, { useState, useEffect } from 'react'
import { Product } from '../../../Network/Product';
import { useDispatch, useSelector } from 'react-redux';
import { setFilteredData } from '../../../Redux/AuthenticationSlice';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Search() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { t } = useTranslation();


    const filteredData = useSelector((state) => state.authentication.filteredData);

    const [wordEntered, setWordEntered] = useState("");
    const [data, setData] = useState([]);

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
    const handleFilter = (event) => {

        const searchWord = event.target.value;
        setWordEntered((searchWord));
        const newFilter = data.filter((value) => {
            return removeAccents(value.name).toLowerCase().includes(removeAccents(searchWord).toLowerCase());
        });

        if (searchWord === "") {
            dispatch(setFilteredData([]));
        } else {
            dispatch(setFilteredData(newFilter));
        }
    };


    const clearInput = () => {
        dispatch(setFilteredData([]));
        setWordEntered("");
    };

    useEffect(() => {
        Product.getList().then((res) => {
            setData(res.data);
        });
    }, [])

    if (!data) return null;

    return (
        <div
            className="search__container focus:outline-0"
        >
            <div className='search-value relative justify-center items-center'
                onClick={(e) => {
                }}>
                <input
                    className="search__input text-lg focus:outline-0 outline-none" type="text" placeholder={t('search')}
                    value={wordEntered}
                    onChange={handleFilter}
                    onKeyDownCapture={(e) => {
                        if (e.key === 'Enter' && wordEntered.length !== 0) {
                            navigate(`/products/${wordEntered}`)
                            clearInput();
                        }
                    }}
                />
                {filteredData.length !== 0 && (
                    <div className="dataResult absolute w-full bg-white max-h-96 shadow-2xl overflow-y-scroll outline-none p-2">
                        {filteredData.slice(0, 15).map((value, key) => {
                            return (
                                <div key={key} className=" dataItem cursor-pointer hover:bg-slate-100 flex items-center space-x-5"
                                    onClick={() => {
                                        navigate(`/detail/${value.name}/${value.id}`)
                                        clearInput();
                                    }}
                                >

                                    <img alt='...' src={`${value.image}`} className='h-20 w-20 object-cover' />
                                    <div className=' flex'>
                                        <p
                                            className='' style={{ wordBreak: "break-all", textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: 'hidden', maxWidth: '300px' }}
                                        >
                                            {value.name}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
            <div className=' space-x-2 text-sm underline flex '>
                <h1 className=' cursor-pointer hover:text-gray-600' onClick={() => navigate('/products/de men phieu luu ky')}>Dế mèn phiêu lưu ký</h1>
                <h1 className=' cursor-pointer hover:text-gray-800' onClick={() => navigate('/products/rung nauy')} >Rừng NaUy</h1>
                <h1 className=' cursor-pointer hover:text-gray-800' onClick={() => navigate('/products/hoang tu be')} >Hoàng tử bé</h1>
                <h1 className=' cursor-pointer hover:text-gray-800 max-lg:hidden' onClick={() => navigate('/products/di gap mua xuan')} >Đi gặp mùa xuân</h1>
            </div>
        </div>
    )
}
