import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CommentApi } from '../../../Network/Comments';
import { Detail } from '../../../Network/Detail';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';


export default function TagComment({ comment, id, setComments, comments }) {

    const [option, setOption] = useState(false);
    const user = useSelector(state => state.authentication.user);

    const handleDelete = () => {

        CommentApi.deleteComment(comment.id).then((response) => {
            const newList = comments.filter((comment1) => comment1.id !== comment.id);
            setComments(newList);
        }).then(() => {
            Detail.updateRatingDetail(comment.Product.id);
        }).catch((error) => {
            alert("Lỗi server!");
        });
    }

    const navigate = useNavigate();

    if (!user) return null;

    return (
        <div className=' flex items-center justify-between pt-3'>
            <div className=' flex items-center justify-between w-10/12'>
                <img src={comment.Product.image} className='rounded-full ' alt='...' style={{ width: '80px', height: '80px' }} />
                <div className=' w-10/12 relative -pl-2'>
                    <div className='w-8/12'>
                        <h1
                            className=' text-md cursor-pointer'
                            title={comment.Product.name}
                            onClick={() => navigate(`/detail/${comment.Product.name}/${comment.Product.id}`)}
                            style={{ wordBreak: "break-all", textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: 'hidden' }}
                        >
                            {comment.Product.name}
                        </h1>
                        <Box
                            sx={{
                                width: 100,
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <Rating
                                name="hover-feedback"
                                value={comment.rating}
                                precision={0.5}
                                emptyIcon={<StarIcon style={{ opacity: 0.5 }} fontSize="inherit" />}
                                readOnly
                            />
                        </Box>
                        <h1
                            className='text-sm'
                            style={{ wordBreak: "break-all", textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: 'hidden' }}
                        >
                            {comment.commentBody}
                        </h1>
                    </div>
                    <div className=' flex justify-between'>
                        <h1 className=' text-sm font-semibold'>{comment.createdAt.slice(0, 10)}</h1>
                        <h1 className=' text-sm'>{comment.createdAt.slice(11, 16)}</h1>
                    </div>
                </div>
            </div>

            <div className=' w-2/12 flex justify-end'>
                {option && (
                    <div
                        className=' w-2/3 bg-gray-200 rounded-md p-1 text-lg cursor-pointer hover:bg-gray-300'
                        onClick={handleDelete}
                    >
                        Xóa
                    </div>
                )}
                <button
                    className=' p-2 rounded-full bg-gray-300 hover:bg-gray-400'
                    onClick={() => setOption(!option)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                        <path d="M8 256a56 56 0 1 1 112 0A56 56 0 1 1 8 256zm160 0a56 56 0 1 1 112 0 56 56 0 1 1 -112 0zm216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112z" />
                    </svg>
                </button>
            </div>
        </div>
    )
}
