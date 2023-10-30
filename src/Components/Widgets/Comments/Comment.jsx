import React, { useEffect, useState } from 'react';
import ReactStars from "react-rating-stars-component";
import { useSelector } from 'react-redux';
import { CommentApi } from '../../../Network/Comments';
import { Detail } from '../../../Network/Detail';
import { useTranslation } from 'react-i18next';
import Rating from '@mui/material/Rating';


export default function Comment({ comment, setComments, listCmt, user, detail, setDetail }) {

  const owner = useSelector(state => state.authentication.user);
  const { t } = useTranslation();
  const [edit, setEdit] = useState(false);

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
      <div className='w-3/12'>
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
          <div className='flex items-center'>
            <Rating name="read-only" value={Number(comment.rating)} readOnly />
            <h1 className=' font-semibold'>{rank(comment.rating)}</h1>
          </div>
          <input className=' break-words w-full bg-white' value={comment.commentBody} disabled={!edit} style={{ minHeight: '10px' }}></input>
        </div>
        {user !== null && owner && (
          <>
            {user.id === owner.id && (
              <>
                <button className=' flex justify-center items-center cursor-pointer rounded-full bg-gray-200 p-2'>
                  <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M8 256a56 56 0 1 1 112 0A56 56 0 1 1 8 256zm160 0a56 56 0 1 1 112 0 56 56 0 1 1 -112 0zm216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112z" /></svg>
                </button>
                <div className='w-1/6 inline-block'>
                  <div>Chỉnh sửa</div>
                  <div
                    onClick={(e) => {
                      CommentApi.deleteComment(comment.id)
                        .then(() => {
                          const newList = listCmt.filter(comment1 => comment1.id !== comment.id)
                          setComments(newList);
                        })
                        .then(res => {
                          Detail.updatedDetailProduct({
                            ratingstars: updateStar(comment.rating)
                          }, comment.ProductId).then(() => {
                            Detail.getDetailProduct(detail.id).then((response) => {
                              setDetail(response.data[0]);
                            });
                          }).catch(err => {
                            console.error(err);
                          });
                        }).catch(err => console.error(err));
                    }}
                    className=' cursor-pointer'
                  >
                    {t('delete')}
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  )
}
