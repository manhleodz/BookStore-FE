import React, { useEffect, useState } from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import { CommentApi } from '../../../Network/Comments'
import Comment from './Comment';
import ReactPaginate from 'react-paginate';
import { useSelector } from "react-redux";
import { Detail } from '../../../Network/Detail';
import LoginModal from '../LoginModal/LoginModal';
import { useTranslation } from 'react-i18next';


const labels = {
  1: 'Không hài lòng',
  2: 'Chưa hài lòng',
  3: 'Hơi hài lòng',
  4: 'Hài lòng',
  5: 'Rất hài lòng',
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}


export default function ProductReview({ id, detail, setDetail }) {

  const [comments, setComments] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [rating, setRating] = useState(0);
  const [hover, setHover] = React.useState(-1);

  const user = useSelector(state => state.authentication.user);
  const { t } = useTranslation();


  function updateAddStar(rating) {
    let star = 0;
    for (let i of comments) {
      star += i.rating;
    }

    return (star + rating) / (comments.length + 1);
  }

  const filterStar = (star) => {

    const arr = comments.filter(comment => { return comment.rating === star })
    return arr.length;
  };

  const onSubmit = () => {

    if (newComment !== '' && rating !== 0) {

      setNewComment('');
      setRating(0);
      CommentApi.postNewComment({
        commentBody: newComment,
        rating: rating,
        ProductId: id,
        UserId: user.id,
      }, id
      ).then(() => {

        setRating(0);
        Detail.updatedDetailProduct({
          ratingstars: Math.round(updateAddStar(rating) * 10) / 10
        }, id).then(() => {
          Detail.getDetailProduct(id).then((response) => {
            setDetail(response.data[0]);
          });
        }).catch((error) => {
          console.log(error);
        });

        CommentApi.getCommentsByProductId(id).then(res => {
          setComments(res.data.reverse());
        }).catch(err => console.log(err))

      }).catch((error) => {
        console.log(error);
      });
    }
  }

  useEffect(() => {

    CommentApi.getCommentsByProductId(id).then(res => {
      setComments(res.data.reverse());
    }).catch(err => console.log(err));

  }, [id]);

  if (!comments) return null;

  return (
    <div className=' bg-white w-9/12 h-auto p-5 rounded-lg'>

      <div className=' space-y-4 divide-y-2 divide-gray-300'>
        <div className=' flex  max-2xl:flex-col  max-xl:items-center'>
          <div className=' w-5/12  max-2xl:w-full'>
            <h1 className='text-2xl font-semibold'>{t('ratingProduct')}</h1>
            <div className=' flex items-center  max-2xl:justify-center space-x-3 w-full'>
              <div className='text-center'>
                <div>
                  <span className=' text-6xl font-semibold'>{detail.ratingstars == null ? 0 : detail.ratingstars}</span>
                  <span className='text-2xl font-semibold'>/5</span>
                </div>
                <Rating name="read-only" value={Number(detail.ratingstars)} precision={0.5} readOnly />

                <h1 className=' text-gray-500'>{`(${comments.length} ${t('rating')})`}</h1>
              </div>
              <div className='w-12/12 h-auto space-y-2 text-base'>
                {[1, 2, 3, 4, 5].reverse().map((start, id) => (
                  <div className=' flex items-center ' key={id}>
                    <div className=' w-full flex items-center space-x-2'>
                      <h1>{start} {t('star')}</h1>
                      <div className=' h-auto bg-gray-300 w-56'>
                        <div className='h-2 bg-yellow-400' style={{ width: `${filterStar(start) * 100 / comments.length}%` }}></div>
                      </div>
                      <h1>{comments.length !== 0 ? Math.floor(filterStar(start) * 100 / comments.length) : 0} %</h1>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {user ? (
            <div className=' w-8/12  max-2xl:w-full flex flex-col items-center justify-center'>
              <h1 className=' text-2xl'>{t('commented')}</h1>

              <div
                className=' w-full'
              >
                <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 ">
                  <div className="px-4 py-2 bg-white rounded-t-lg ">
                    <label htmlFor="comment" className="sr-only">Your comment</label>
                    <label>
                      <textarea onChange={(e) => setNewComment(e.target.value)} id="comment" value={newComment} rows="4" className="w-full h-full px-0 text-lg text-gray-900 bg-white border-0 outline-none" placeholder={t('writecmt')} required></textarea>
                    </label>
                  </div>
                  <div className="flex items-center justify-between px-3 py-2 border-t ">

                    <Rating
                      name="hover-feedback"
                      value={rating}
                      precision={1}
                      onChange={(event, newValue) => {
                        setRating(newValue);
                      }}
                      onChangeActive={(event, newHover) => {
                        setHover(newHover);
                      }}
                      emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                    />
                    {rating !== null && (
                      <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : rating]}</Box>
                    )}
                    <button
                      onClick={onSubmit}
                      className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-green-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-green-800"
                    >
                      {t('post')}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className=' w-8/12 flex justify-center items-center text-center'>
              <h1>Chỉ có thành viên mới có thể viết nhận xét.Vui lòng <span onClick={() => { document.getElementById('modal').style.display = 'block' }} className='text-blue-500 underline cursor-pointer'>đăng nhập</span> hoặc <span className='text-blue-500 underline cursor-pointer'>đăng ký.</span></h1>
            </div>
          )}
        </div>
        <PaginatedItems comments={comments} setComments={setComments} detail={detail} setDetail={setDetail} />
      </div>
      {!user && (
        <div id='modal' style={{ display: 'none' }} onClick={(e) => { if (e.target.id === 'background') { document.getElementById('modal').style.display = 'none' } }}>
          <LoginModal />
        </div>
      )}
    </div>
  )
}

function PaginatedItems({ comments, setComments, detail, setDetail }) {
  // We start with an empty list of flashSale.
  const [currentflashSale, setCurrentflashSale] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    // Fetch flashSale from another resources.
    const endOffset = itemOffset + 6;
    setCurrentflashSale(comments.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(comments.length / 6));
  }, [itemOffset, comments]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = event.selected * 6 % comments.length;
    setItemOffset(newOffset);
  };

  if (currentflashSale === null) return null;

  return (
    <>
      <div className=' p-10 space-y-8 divide-y'>
        {currentflashSale.map((book, index) => (
          <Comment
            key={index}
            comment={book}
            user={book.User}
            setComments={setComments}
            listCmt={comments}
            detail={detail}
            setDetail={setDetail}
          />
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
  );
}

