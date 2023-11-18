import React, { useEffect, useState } from 'react'
import { Detail } from '../Network/Detail';
import { useNavigate, useParams } from 'react-router-dom';
import { Product } from '../Network/Product';
import Loading from './Widgets/Loading/Loading';
import ToastMessage from './Widgets/ToastMessage';
import { useDispatch, useSelector } from "react-redux";
import { addCart, setCart } from "../Redux/AuthenticationSlice";
import { CartApi } from '../Network/Cart';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProductReview from './Widgets/Comments/ProductReview';
import { useTranslation } from 'react-i18next';
import Rating from '@mui/material/Rating';
import ListByCategory2 from './Widgets/ListByCategory/ListByCategory2';



export default function DetailProduct() {

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.authentication.user);
  const { t } = useTranslation();


  const [detail, setDetail] = useState();
  const [showImg, setShowImg] = useState("");
  const [buy, setBuy] = useState(1);
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(false);
  const [active, setActive] = useState(true);

  useEffect(() => {

    document.title = "DetailProduct";
    setLoading(true);
    Detail.getDetailProduct(id).then((response) => {
      setDetail(response.data[0]);
      setShowImg(response.data[0].Product.image);
      setLoading(false);
    });
  }, [id]);


  const showToastMessage = (title) => {
    toast.success(title, {
      position: toast.POSITION.TOP_RIGHT
    });
  };


  if (loading) {
    return <div className=' fixed top-1/2 left-1/2'><Loading /></div>
  }

  if (!detail) return null;

  const images = detail.ImageProducts;
  const leftQuantity = detail.Product.quantity - detail.Product.sold;

  return (
    <>
      <div className=' relative top-52 w-full justify-center h-full bg-gray-200'>
        <div className=' flex flex-col items-center justify-center space-y-10'>
          <div className='w-9/12 h-auto shadow-lg rounded-lg bg-white block'>
            <div className='p-5 flex max-xl:flex-col'>
              <div className=' w-full relative'>
                <div className='flex w-full'>
                  <div className=' w-1/6'>
                    {/* <button
                      className=' text-xl w-full text-center bg-gray-200 flex items-center justify-center hover:bg-gray-300 '
                      onClick={() => {
                        document.getElementById('container').scrollTop -= 200;
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512"><path d="M182.6 137.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8H288c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-128-128z" /></svg>
                    </button> */}
                    <div className='w-full overflow-x-hidden overflow-y-hidden' style={{ height: '500px' }} id='container' >
                      <div className='space-y-2 w-full' id='images' style={{ maxHeight: `${(detail.ImageProducts.length + 1) * 100}px` }}>
                        <div
                          key={id}
                          className='focus:outline-none w-full cursor-pointer focus:ring-4 focus:ring-red-300 flex justify-center items-center'
                          onClick={() => {
                            setShowImg(detail.Product.image);
                          }}
                        >
                          <img alt='...' src={`${detail.Product.image}`} className='max-h-40' />
                        </div>
                        {images !== null && (
                          <div className=' overflow-auto flex flex-col items-center justify-center'>
                            {images.map((image, id) => (
                              <div
                                key={id}
                                className='focus:outline-none w-11/12 my-1 cursor-pointer focus:ring-4 focus:ring-red-300 flex items-center justify-center'
                                onClick={() => {
                                  setShowImg(image.path);
                                }}
                              >
                                <img alt='...' src={`${image.path}`} className='side_nav_item max-h-40 object-cover' />
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    {/* <button
                      className=' text-xl w-full text-center bg-gray-200 flex items-center justify-center hover:bg-gray-300  '
                      onClick={() => {
                        document.getElementById('container').scrollTop += 200;
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512">
                        <path d="M182.6 470.6c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-9.2-9.2-11.9-22.9-6.9-34.9s16.6-19.8 29.6-19.8H288c12.9 0 24.6 7.8 29.6 19.8s2.2 25.7-6.9 34.9l-128 128z" /></svg>
                    </button> */}
                  </div>
                  <div className='flex items-center justify-center h-auto w-full' style={{ height: "500px" }} >
                    <div className='p-12 max-w-lg'>
                      <img alt='...' src={showImg !== detail.ImageProducts.image ? showImg : detail.Product.image} className='' style={{maxHeight: '500px'}}/>
                    </div>
                  </div>
                </div>
              </div>
              <div className='pl-10 relative w-full'>
                <h1 className='text-3xl font-normal'>{detail.Product.name}</h1>
                <div className='grid grid-cols-2 max-sm:grid-cols-1 pt-2'>
                  <div className='space-y-4'>
                    <h1 className='text-lg'>{t('author')}:
                      <span
                        className='font-medium text-blue-600 cursor-pointer hover:underline'
                        onClick={() => {
                          window.open(`https://vi.wikipedia.org/wiki/${detail.author}`, '_blank', 'noopener,noreferrer');
                        }}
                      >
                        {detail.author !== null ? `${detail.author}` : `${t('updating')}`}
                      </span>
                    </h1>
                    <h2 className='text-lg'>{t('release')}: <span className='font-medium '>{detail.release !== null ? `${detail.release}` : `${t('updating')}`}</span></h2>
                  </div>
                  <h2 className='text-lg'>{t('publisher')}:
                    <span
                      className='font-medium text-blue-600 cursor-pointer hover:underline'
                      onClick={() => {
                        window.open(`https://vi.wikipedia.org/wiki/${detail.publisher}`, '_blank', 'noopener,noreferrer');
                      }}>
                      {detail.publisher !== null ? `${detail.publisher}` : `${t('updating')}`}
                    </span>
                  </h2>
                </div>
                <h1 className='text-4xl text-red-700 font-bold'>{detail.Product.price !== null ? `${detail.Product.price.toLocaleString()}đ` : `${t('updating')}`}</h1>
                <div className='space-y-5'>
                  <h1 className='flex text-lg'>{t('express')}:
                    <div className='pl-4'>
                      <div className='flex items-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 640 512" className='fill-red-600 pr-3'>
                          <path d="M112 0C85.5 0 64 21.5 64 48V96H16c-8.8 0-16 7.2-16 16s7.2 16 16 16H64 272c8.8 0 16 7.2 16 16s-7.2 16-16 16H64 48c-8.8 0-16 7.2-16 16s7.2 16 16 16H64 240c8.8 0 16 7.2 16 16s-7.2 16-16 16H64 16c-8.8 0-16 7.2-16 16s7.2 16 16 16H64 208c8.8 0 16 7.2 16 16s-7.2 16-16 16H64V416c0 53 43 96 96 96s96-43 96-96H384c0 53 43 96 96 96s96-43 96-96h32c17.7 0 32-14.3 32-32s-14.3-32-32-32V288 256 237.3c0-17-6.7-33.3-18.7-45.3L512 114.7c-12-12-28.3-18.7-45.3-18.7H416V48c0-26.5-21.5-48-48-48H112zM544 237.3V256H416V160h50.7L544 237.3zM160 368a48 48 0 1 1 0 96 48 48 0 1 1 0-96zm272 48a48 48 0 1 1 96 0 48 48 0 1 1 -96 0z" />
                        </svg>
                        <h1>
                          Hùng Lĩnh express
                        </h1>
                      </div>
                      <div className='flex items-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512" className='fill-green-500 pr-3'>
                          <path d="M64 64C28.7 64 0 92.7 0 128V384c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V128c0-35.3-28.7-64-64-64H64zM272 192H496c8.8 0 16 7.2 16 16s-7.2 16-16 16H272c-8.8 0-16-7.2-16-16s7.2-16 16-16zM256 304c0-8.8 7.2-16 16-16H496c8.8 0 16 7.2 16 16s-7.2 16-16 16H272c-8.8 0-16-7.2-16-16zM164 152v13.9c7.5 1.2 14.6 2.9 21.1 4.7c10.7 2.8 17 13.8 14.2 24.5s-13.8 17-24.5 14.2c-11-2.9-21.6-5-31.2-5.2c-7.9-.1-16 1.8-21.5 5c-4.8 2.8-6.2 5.6-6.2 9.3c0 1.8 .1 3.5 5.3 6.7c6.3 3.8 15.5 6.7 28.3 10.5l.7 .2c11.2 3.4 25.6 7.7 37.1 15c12.9 8.1 24.3 21.3 24.6 41.6c.3 20.9-10.5 36.1-24.8 45c-7.2 4.5-15.2 7.3-23.2 9V360c0 11-9 20-20 20s-20-9-20-20V345.4c-10.3-2.2-20-5.5-28.2-8.4l0 0 0 0c-2.1-.7-4.1-1.4-6.1-2.1c-10.5-3.5-16.1-14.8-12.6-25.3s14.8-16.1 25.3-12.6c2.5 .8 4.9 1.7 7.2 2.4c13.6 4.6 24 8.1 35.1 8.5c8.6 .3 16.5-1.6 21.4-4.7c4.1-2.5 6-5.5 5.9-10.5c0-2.9-.8-5-5.9-8.2c-6.3-4-15.4-6.9-28-10.7l-1.7-.5c-10.9-3.3-24.6-7.4-35.6-14c-12.7-7.7-24.6-20.5-24.7-40.7c-.1-21.1 11.8-35.7 25.8-43.9c6.9-4.1 14.5-6.8 22.2-8.5V152c0-11 9-20 20-20s20 9 20 20z" />
                        </svg>
                        <h1>{t('freeship')}</h1>
                      </div>
                    </div>
                  </h1>
                  <h1 className='text-lg'>{t('genre')}: {detail.category !== null ? `${detail.category}` : `${t('updating')}`}</h1>
                  <h2 className='text-lg flex items-center'>
                    {t('rating')}: {detail.ratingstars !== null ? `${detail.ratingstars}` : `${t('updating')}`}
                    <Rating name="read-only" value={Number(detail.ratingstars)} precision={0.5} readOnly />
                  </h2>
                  <h1 className='text-lg h-40 break-words'>{t('description')}: {detail.description !== null ? `${detail.description}` : `${t('updating')}`}</h1>
                  <h1>{t('sold')}: {detail.Product.sold !== null ? `${detail.Product.sold} cuốn` : `${t('updating')}`}</h1>
                  <div className='flex items-center space-x-4'>
                    <h1 className='text-lg'>{t('amount')}</h1>
                    <div className='border-2 border-black rounded-xl w-1/6'>
                      <div className=' flex justify-between space-x-1 items-center'>
                        <button
                          className=' active:scale-150 text-xl px-1'
                          onClick={() => {
                            if (buy > 1) {
                              if (active === false) {
                                setActive(true);
                              }
                              setBuy(buy - 1);
                            }
                          }}>
                          -
                        </button>
                        <input className='font-semibold w-full text-center active:ring-0 active:border-none outline-none'
                          value={buy}
                          onBlur={(e) => {
                            if (buy === '') {
                              setBuy(1);
                            }
                          }}
                          onChange={(e) => {
                            if (Number(e.target.value) < 100000 && Number(e.target.value) >= 0) {
                              setBuy(Number(e.target.value))
                            } else {
                              setBuy(1);
                            }
                          }}
                        />
                        <button
                          className='active:scale-150 text-xl px-1'
                          onClick={() => {
                            if (leftQuantity > buy) {
                              setBuy((buy) => Number(buy) + 1);
                              setActive(true);
                            } else {
                              setActive(false);
                            }
                          }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    {leftQuantity <= buy && (
                      <p className=' text-red-600 underline'>{t('remain')} {leftQuantity} {t('book')}</p>
                    )}
                  </div>
                </div>
                <div className=' relative bottom-0 my-2'>
                  <div className='flex justify-between'>
                    <button
                      className=' cursor-pointer focus:ring-1 focus:ring-red-500 focus:outline-none border-red-700 border-2 text-red-700 font-medium rounded-lg text-lg px-5 py-2.5 mr-2 mb-2 w-6/12 flex items-center justify-center'
                      onClick={() => {
                        if (user) {
                          if (buy <= leftQuantity) {
                            setReload(true);
                            CartApi.addBook({
                              amount: buy,
                              ProductId: detail.Product.id,
                              UserId: user.id,
                              total: buy * detail.Product.price
                            }).then(() => {
                              showToastMessage("Thêm thành công");
                              CartApi.getList(user.id).then((res) => {
                                dispatch(setCart(res.data));
                              });
                              setReload(false);
                            }).catch((err) => {
                              Detail.getDetailProduct(id).then((response) => {
                                setDetail(response.data[0]);
                                setShowImg(response.data[0].Product.image);
                              });
                              ToastMessage.showToastWarnMessage(err.response.data);
                            })
                          }
                        } else {
                          ToastMessage.showToastWarnMessage('Bạn cần đăng nhập để sử dụng');
                        }
                      }}
                      disabled={detail.Product.sold === detail.Product.quantity}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512" className='fill-red-700 mr-1'>
                        <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" />
                      </svg>
                      {t('AddToCart')}
                    </button>
                    <ToastContainer autoClose={1000} />
                    {detail.Product.sold === detail.Product.quantity ? (
                      <button
                        className={` cursor-default focus:outline-none text-black bg-gray-500 font-medium rounded-lg text-lg px-5 py-2.5 mr-2 mb-2 w-6/12 focus:ring-1 `}
                      >
                        {t('buy')}
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          if (user) {
                            if (buy <= leftQuantity) {
                              setReload(true);
                              CartApi.addBook({
                                amount: buy,
                                ProductId: detail.Product.id,
                                UserId: user.id,
                                total: buy * detail.Product.price
                              }).then(() => {
                                CartApi.getList(user.id).then((res) => {
                                  dispatch(setCart(res.data));
                                  navigate(`/cart/${user.id}`)
                                });
                                setReload(false);
                              }).catch((err) => {
                                Detail.getDetailProduct(id).then((response) => {
                                  setDetail(response.data[0]);
                                  setShowImg(response.data[0].Product.image);
                                });
                                ToastMessage.showToastWarnMessage(err.response.data);
                              })
                            }
                          } else {
                            ToastMessage.showToastWarnMessage('Bạn cần đăng nhập để sử dụng')
                          }
                        }}
                        className={` cursor-pointer focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-red-500 font-medium rounded-lg text-lg px-5 py-2.5 mr-2 mb-2 w-6/12 focus:ring-1 `}>
                        {t('buy')}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className=' border-t-gray border-2 rounded-b-lg'>
              <div className=' flex items-center justify-around p-1'>
                <div className='flex items-center'>
                  <svg xmlns="http://www.w3.org/2000/svg" height="1.2em" viewBox="0 0 512 512" className=' fill-blue-600'>
                    <path d="M383.5 192c.3-5.3 .5-10.6 .5-16c0-51-15.9-96-40.2-127.6C319.5 16.9 288.2 0 256 0s-63.5 16.9-87.8 48.4C143.9 80 128 125 128 176c0 5.4 .2 10.7 .5 16H240V320H208c-7 0-13.7 1.5-19.7 4.2L68.2 192H96.5c-.3-5.3-.5-10.6-.5-16c0-64 22.2-121.2 57.1-159.3C62 49.3 18.6 122.6 4.2 173.6C1.5 183.1 9 192 18.9 192h6L165.2 346.3c-3.3 6.5-5.2 13.9-5.2 21.7v96c0 26.5 21.5 48 48 48h96c26.5 0 48-21.5 48-48V368c0-7.8-1.9-15.2-5.2-21.7L487.1 192h6c9.9 0 17.4-8.9 14.7-18.4C493.4 122.6 450 49.3 358.9 16.7C393.8 54.8 416 112.1 416 176c0 5.4-.2 10.7-.5 16h28.3L323.7 324.2c-6-2.7-12.7-4.2-19.7-4.2H272V192H383.5z" />
                  </svg>
                  <h1 className=' uppercase font-semibold text-sm'>{t('freeship')}</h1>
                </div>
                <div className='flex items-center'>
                  <svg xmlns="http://www.w3.org/2000/svg" height="1.7em" viewBox="0 0 512 512" className=' fill-green-600'>
                    <g>
                      <g>
                        <path d="M272.538,263.469l-34.566-34.564c-13.633-13.635-35.744-13.637-49.379-0.003l-10.736,10.738
                      c-0.25,0.247-0.488,0.514-0.727,0.77l-79.914-79.914c0.258-0.238,0.516-0.472,0.77-0.726l10.736-10.738
                      c13.635-13.634,13.633-35.743-0.002-49.379L74.157,65.089c-13.639-13.642-35.748-13.64-49.383-0.004L14.038,75.822
                      c-29.041,29.04-9.205,98.218,70.172,177.593c79.373,79.377,148.547,99.221,177.594,70.173l10.738-10.737
                      C286.175,299.216,286.175,277.106,272.538,263.469z"/>
                      </g>
                      <g>
                        <path d="M292.856,252.482c-3.55,0-7.138-1.023-10.301-3.159c-8.442-5.698-10.666-17.161-4.968-25.603
                      c13.366-19.802,20.432-42.958,20.432-66.965c0-66.098-53.774-119.872-119.871-119.872c-23.246,0-45.785,6.656-65.18,19.249
                      c-8.542,5.547-19.964,3.118-25.51-5.424c-5.547-8.542-3.118-19.964,5.424-25.51C118.271,8.713,147.755,0,178.148,0
                      c86.435,0,156.754,70.32,156.754,156.756c0,31.389-9.248,61.681-26.744,87.601C304.595,249.635,298.778,252.482,292.856,252.482z"
                        />
                      </g>
                      <g>
                        <g>
                          <path d="M200.023,165.163h-33.438l19.504-21.721c10.252-10.695,16.125-22.079,16.125-31.248c0-15.996-12.35-26.743-30.732-26.743
                        c-10.402,0-21.269,4.638-29.066,12.408c-1.564,1.556-2.441,3.668-2.441,5.873c-0.004,2.204,0.873,4.318,2.432,5.877l0.666,0.667
                        c3.234,3.23,8.475,3.238,11.715,0.015c4.449-4.42,11-7.276,16.695-7.276c6.01,0,13.17,1.593,13.17,9.179
                        c0,3.569-3.523,11.085-11.264,19.151c-0.063,0.063-0.123,0.128-0.18,0.194l-31.506,35.006c-1.371,1.523-2.129,3.501-2.129,5.552
                        v2.331c0,4.583,3.715,8.299,8.299,8.299h52.15c4.582,0,8.297-3.715,8.297-8.299v-0.966
                        C208.32,168.878,204.605,165.163,200.023,165.163z"/>
                        </g>
                        <g>
                          <path d="M259.681,140.744h-4.85v-17.88c0-4.583-3.717-8.298-8.299-8.298h-0.969c-4.584,0-8.299,3.715-8.299,8.298v17.88h-16.568
                        l24.66-42.855c1.475-2.568,1.473-5.729-0.01-8.293c-1.482-2.565-4.221-4.144-7.184-4.144h-1.107
                        c-2.971,0-5.713,1.587-7.193,4.161l-31.17,54.201c-0.723,1.259-1.105,2.685-1.105,4.137v2.06c0,4.583,3.715,8.298,8.299,8.298
                        h31.379v16.12c0,4.583,3.715,8.299,8.299,8.299h0.969c4.582,0,8.299-3.715,8.299-8.299v-16.12h4.85
                        c4.582,0,8.299-3.715,8.299-8.298v-0.967C267.98,144.46,264.263,140.744,259.681,140.744z"/>
                        </g>
                      </g>
                    </g>
                  </svg>
                  <h1 className=' uppercase font-semibold text-sm'>{t('response')}</h1>
                </div>
                <div className=' flex items-center'>
                  <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512" className=' fill-red-600'>
                    <path d="M96 0C43 0 0 43 0 96V416c0 53 43 96 96 96H384h32c17.7 0 32-14.3 32-32s-14.3-32-32-32V384c17.7 0 32-14.3 32-32V32c0-17.7-14.3-32-32-32H384 96zm0 384H352v64H96c-17.7 0-32-14.3-32-32s14.3-32 32-32zm32-240c0-8.8 7.2-16 16-16H336c8.8 0 16 7.2 16 16s-7.2 16-16 16H144c-8.8 0-16-7.2-16-16zm16 48H336c8.8 0 16 7.2 16 16s-7.2 16-16 16H144c-8.8 0-16-7.2-16-16s7.2-16 16-16z" />
                  </svg>
                  <h1 className=' uppercase font-semibold text-sm'>{t('back')}</h1>
                </div>
              </div>
            </div>
          </div>
          <ListByCategory2 category={detail.category} />
          <ProductReview id={id} detail={detail} setDetail={setDetail} />
        </div>
      </div>
      {reload && (
        <div className=' fixed z-50 w-full h-full top-0 left-0 flex justify-center items-center'
          style={{ backgroundColor: 'rgb(0,0,0,0.4)' }}>
          <div role="status">
            <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}
    </>
  )
}
