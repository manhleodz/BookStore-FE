import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { CommentApi } from '../../../Network/Comments';
import TagComment from './TagComment';


export default function MyComments() {

  const [comments, setComments] = useState(null);
  const [click, setClick] = useState(false);
  const [sort, setSort] = useState('Mới nhất');

  useEffect(() => {

    CommentApi.getCommentsByUser().then(res => {
      setComments(res.data.reverse());
    }).catch(err => console.log(err))
  }, []);

  if (!comments) return null;

  return (
    <div>
      <div className=' flex justify-between'>
        <h1>Các bình luận của bạn</h1>
        <div>
          <button id='btn' onClick={() => setClick(!click)} className="text-black bg-gray-300 w-32 focus:ring-4 focus:outline-none focus:ring-gray-200  font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-between" type="button">
            {sort}
            <svg className="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
            </svg>
          </button>
          {click ? (
            <>
              <div className="z-10 bg-gray-300 text-black divide-y divide-gray-100 rounded-lg w-32 shadow absolute">
                <ul className="py-2 text-sm text-gray-700 ">
                  <li
                    onClick={() => {
                      let data = [...comments];
                      for (var i = 0; i < data.length; i++) {
                        for (var j = 0; j < (data.length - i - 1); j++) {
                          if (data[j].id < data[j + 1].id) {
                            var temp = data[j];
                            data[j] = data[j + 1];
                            data[j + 1] = temp;
                          }
                        }
                      }
                      setComments(data);
                      setSort('Mới nhất');

                    }}
                  >
                    <h1 className="block px-4 py-2 hover:bg-gray-100 cursor-pointer">Mới nhất</h1>
                  </li>
                  <li
                    onClick={() => {
                      let data = [...comments];
                      for (var i = 0; i < data.length; i++) {
                        for (var j = 0; j < (data.length - i - 1); j++) {
                          if (data[j].id > data[j + 1].id) {
                            var temp = data[j];
                            data[j] = data[j + 1];
                            data[j + 1] = temp;
                          }
                        }
                      }
                      setComments(data);
                      setSort('Cũ nhất');
                    }}
                  >
                    <h1 className="block px-4 py-2 hover:bg-gray-100 cursor-pointer">Cũ nhất</h1>
                  </li>

                </ul>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>

      <div>
        <div className=' space-y-4 divide-y divide-gray-300'>
          {comments.map((comment, index) => (
            <TagComment
              key={index}
              comment={comment}
              id={comment.ProductId}
              setComments={setComments}
              comments={comments} />
          ))}
        </div>
      </div>
    </div>
  )
}
