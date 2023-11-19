import React, { useState } from 'react';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import { useSelector } from 'react-redux';
import { CommentApi } from '../../../Network/Comments';
import { Detail } from '../../../Network/Detail';
import { useTranslation } from 'react-i18next';
import Rating from '@mui/material/Rating';

const labels = {
  1: 'Không hài lòng',
  2: 'Chưa hài lòng',
  3: 'Hơi hài lòng',
  4: 'Hài lòng',
  5: 'Rất hài lòng',
};

export default function Comment({ comment, setComments, listCmt, user, detail, setDetail, setReload }) {

  const owner = useSelector(state => state.authentication.user);
  const { t } = useTranslation();
  const [edit, setEdit] = useState(true);
  const [options, setOptions] = useState(false);
  const [newComment, setNewComment] = useState(comment.commentBody);
  const [rating, setRating] = useState(comment.rating);
  const [hover, setHover] = React.useState(-1);

  const UpdateComment = (e) => {
    e.preventDefault();
    if (newComment !== comment.commentBody) {
      setReload(true);
      CommentApi.editComment(comment.id, {
        commentBody: newComment,
        rating: rating
      }).then(() => {
        Detail.updatedDetailProduct(comment.ProductId).then(() => {
          CommentApi.getCommentsByProductId(comment.ProductId).then(res => {
            setComments(res.data.reverse());
            setReload(false);
            setEdit(true);
          }).catch(err => console.log(err))
        })
      })
      setNewComment('');
    }
  }

  const deleteComment = () => {
    setReload(true);
    CommentApi.deleteComment(comment.id)
      .then(() => {
        const newList = listCmt.filter(comment1 => comment1.id !== comment.id)
        setComments(newList);
      })
      .then(() => {
        Detail.updatedDetailProduct({
          ratingstars: updateStar(comment.rating)
        }, comment.ProductId).then(() => {
          Detail.getDetailProduct(detail.id).then((response) => {
            setDetail(response.data[0]);
            setReload(false);
          });
        }).catch(err => {
          console.error(err);
        });
      }).catch(err => console.error(err));
  }

  function rank(star) {
    if (star === 0) {
      return 'Chưa đánh giá';
    } else if (star === 1) {
      return 'Không hài lòng';
    } else if (star === 2) {
      return 'Chưa hài lòng';
    } else if (star === 3) {
      return 'Hơi hài lòng';
    } else if (star === 4) {
      return 'Hài lòng';
    } else if (star === 5) {
      return 'Rất hài lòng';
    }
  }

  function updateStar(rating) {
    let star = 0;

    for (let i of listCmt) {

      star += i.rating;
    }
    return (star - rating) / (listCmt.length - 1);
  }

  return (
    <div className=' w-full space-x-5 my-4 flex justify-start '>
      <div className='w-3/12 max-xl:w-4/12'>
        <div className=' flex items-center'>
          <img src={user.avatar} alt={user.username} className='w-12 h-12 rounded-full' />
          <div>
            <h1 className=' text-xl font-semibold pl-2'>{user.username}</h1>
            <h1 className=' text-sm text-gray-500 pl-2'>{t('join')}: {user.createdAt.slice(0, 10)}</h1>
          </div>
        </div>
        <h1 className=''>{t('cmt')}: {comment.createdAt.slice(0, 10)}</h1>
      </div>
      <div className='w-full flex items-center justify-between'>
        <div className=' w-full'>
          {edit && (
            <div className='flex items-center'>
              <Rating name="read-only" value={Number(comment.rating)} readOnly />
              <h1 className=' font-semibold'>{rank(comment.rating)}</h1>
            </div>
          )}
          {edit ? (
            <div className={` break-words w-full bg-white`} style={{ minHeight: '10px' }}>{comment.commentBody}</div>
          ) : (
            <form
              action={UpdateComment}
              className=' w-full h-full  border rounded-md focus:outline pt-3 focus:outline-blue-300 shadow-sm shadow-blue-300'
            >
              <div className='flex items-center pb-2'>
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
              </div>
              <textarea
                className='w-full h-full bg-gray-100 outline-none px-3 pt-3'
                autoFocus={true}
                defaultValue={comment.commentBody}
                onChange={(e) => setNewComment(e.target.value)}
              >
              </textarea>
              <div className='w-full flex justify-between h-full relative z-0'>
                <button onClick={() => setEdit(true)}>
                  <svg xmlns="http://www.w3.org/2000/svg" height="1.6em" fill='red' viewBox="0 0 512 512">
                    <path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z" />
                  </svg>
                </button>
                <button onClick={UpdateComment} className=' p-2 bg-blue-400 text-white rounded-md hover:bg-blue-600 active:ring active:ring-blue-300'>
                  Chỉnh sửa
                </button>
              </div>
            </form>
          )}
        </div>
        {user !== null && owner && user.id === owner.id && (
          <>
            {options ? (
              <div className='w-3/12 bg-gray-200 rounded-md p-1 divide-y divide-gray-500'>
                <div
                  className='cursor-pointer flex items-center hover:bg-gray-300 p-1.5 font-medium'
                  onClick={() => {
                    setEdit(false)
                    setOptions(false)
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512" className=' px-2'>
                    <path d="M413.5 237.5c-28.2 4.8-58.2-3.6-80-25.4l-38.1-38.1C280.4 159 272 138.8 272 117.6V105.5L192.3 62c-5.3-2.9-8.6-8.6-8.3-14.7s3.9-11.5 9.5-14l47.2-21C259.1 4.2 279 0 299.2 0h18.1c36.7 0 72 14 98.7 39.1l44.6 42c24.2 22.8 33.2 55.7 26.6 86L503 183l8-8c9.4-9.4 24.6-9.4 33.9 0l24 24c9.4 9.4 9.4 24.6 0 33.9l-88 88c-9.4 9.4-24.6 9.4-33.9 0l-24-24c-9.4-9.4-9.4-24.6 0-33.9l8-8-17.5-17.5zM27.4 377.1L260.9 182.6c3.5 4.9 7.5 9.6 11.8 14l38.1 38.1c6 6 12.4 11.2 19.2 15.7L134.9 484.6c-14.5 17.4-36 27.4-58.6 27.4C34.1 512 0 477.8 0 435.7c0-22.6 10.1-44.1 27.4-58.6z" />
                  </svg>
                  Chỉnh sửa
                </div>
                <div
                  className='cursor-pointer flex items-center hover:bg-gray-300 p-1.5 font-medium'
                  onClick={deleteComment}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512" className=' px-2'>
                    <path d="M170.5 51.6L151.5 80h145l-19-28.4c-1.5-2.2-4-3.6-6.7-3.6H177.1c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80H368h48 8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8V432c0 44.2-35.8 80-80 80H112c-44.2 0-80-35.8-80-80V128H24c-13.3 0-24-10.7-24-24S10.7 80 24 80h8H80 93.8l36.7-55.1C140.9 9.4 158.4 0 177.1 0h93.7c18.7 0 36.2 9.4 46.6 24.9zM80 128V432c0 17.7 14.3 32 32 32H336c17.7 0 32-14.3 32-32V128H80zm80 64V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16z" />
                  </svg>
                  {t('delete')}
                </div>
              </div>
            ) : (
              <div></div>
            )}
            <button onClick={() => {
              setOptions(!options);
            }}
              className=' flex justify-center items-center cursor-pointer rounded-full bg-gray-200 p-2'>
              <svg xmlns="http://www.w3.org/2000/svg" height="0.9em" viewBox="0 0 448 512"><path d="M8 256a56 56 0 1 1 112 0A56 56 0 1 1 8 256zm160 0a56 56 0 1 1 112 0 56 56 0 1 1 -112 0zm216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112z" /></svg>
            </button>
          </>
        )}
      </div>
    </div>
  )
}
