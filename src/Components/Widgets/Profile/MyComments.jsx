import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { CommentApi } from '../../../Network/Comments';
import TagComment from './TagComment';


export default function MyComments() {

  const [comments, setComments] = useState(null);

  useEffect(() => {

    CommentApi.getCommentsByUser().then(res => {
      setComments(res.data);
    }).catch(err => console.log(err))
  }, []);

  if (!comments) return null;

  return (
    <div>
      <div className=' flex justify-between'>
        <h1>Các bình luận của bạn</h1>
        <div>
          <button id="dropdownHoverButton" data-dropdown-toggle="dropdownHover" data-dropdown-trigger="hover" className="text-black bg-gray-300 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center " type="button">Mới nhất <svg className="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
          </svg>
          </button>
          <div id="dropdownHover" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownHoverButton">
              <li>
                <a href="/#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
              </li>
              <li>
                <a href="/#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
              </li>
              <li>
                <a href="/#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</a>
              </li>
              <li>
                <a href="/#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</a>
              </li>
            </ul>
          </div>
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
