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

    useEffect(() => {
        Product.getList().then((res) => {

            let arr = [];
            for (let i of res.data) {
                arr.push(i.product);
            }
            setData(arr);
        });
    }, [])

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
        setWordEntered(removeAccents(searchWord));
        const newFilter = data.filter((value) => {
            return removeAccents(value.name).toLowerCase().includes(searchWord.toLowerCase());
        });

        if (searchWord === "") {
            dispatch(setFilteredData([]));
        } else {
            dispatch(setFilteredData(newFilter));
        }
    };

    if (!data) return null;

    const clearInput = () => {
        dispatch(setFilteredData([]));
        setWordEntered("");
    };
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
                    <div className="dataResult absolute w-full bg-white max-h-40 overflow-auto outline-none">
                        {filteredData.slice(0, 15).map((value, key) => {
                            return (
                                <div key={key} className=" dataItem cursor-pointer hover:bg-slate-100"
                                    style={{ wordBreak: "break-all", textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: 'hidden' }}
                                    onClick={() => {
                                        navigate(`/detail/${value.name}/${value.id}`)
                                        clearInput();
                                    }}
                                >
                                    <p>{value.name} </p>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
            <div className=' space-x-2 text-sm underline flex '>
                <h1 className=' cursor-pointer hover:text-gray-600' onClick={() => navigate('/products/dac nhan tam')} href={`${import.meta.env.VITE_HOMEURL}products/dac nhan tam`}>Đắc nhâm tâm</h1>
                <h1 className=' cursor-pointer hover:text-gray-800' onClick={() => navigate('/products/khong diet khong sinh dung so hai')} href={`${import.meta.env.VITE_HOMEURL}products/khong diet khong sinh dung so hai`}>Không diệt không sinh đừng sợ hãi</h1>
                <h1 className=' cursor-pointer hover:text-gray-800 max-lg:hidden' onClick={() => navigate('/products/di gap mua xuan')} href={`${import.meta.env.VITE_HOMEURL}products/di gap mua xuan`}>Đi gặp mùa xuân</h1>
            </div>
        </div>
    )
}
