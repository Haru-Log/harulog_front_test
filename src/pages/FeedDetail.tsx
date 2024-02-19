import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom"
import dummyImage1 from '../assets/20231010_084411.jpg' // 임시 이미지
import { Heart, Pencil } from "lucide-react"
import Comment from "../components/Feed/Comment"
import { fetchFeedDetail } from "../api/feed/FetchFeedDetail"
import { Button } from "../ui/button"
import { Textarea } from "../ui/textarea"
import { addComment } from "../api/feed/addComment"
import { CommentType } from "../types/CommentType"
import { useFeedStore } from "../zustand/feedStore"


const FeedDetail = () => {

  const post_id = parseInt(useParams().id || "");
  const setFeed = useFeedStore(state => state.setFeed);
  const feed = useFeedStore(state => state.feed)
  const navigate = useNavigate();
  const [commentContent, setCommentContent] = useState("");

  useEffect(() => {
    const fetchFeedDetails = async () => {
      try {
        const feedDetails = await fetchFeedDetail(post_id);
        setFeed({ ...feedDetails.data, createdAt: new Date(feedDetails.data.createdAt), updateAt: new Date(feedDetails.data.updateAt) })

      } catch (error) {
        console.log(error);
      }
    }
    fetchFeedDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const submitComment = async () => {
    const response = await addComment(post_id, 0, commentContent);
    if (response) {
      window.location.reload();
    }
  }

  return (
    <div className="w-full flex justify-center font-ibm pt-5">
      <div className="w-[50%] h-full p-12 flex flex-col">
        <section className="w-full flex flex-row items-center h-fit justify-between mb-5">
          <div className="flex flex-row items-center h-fit">
            <img src={dummyImage1} alt="프로필 이미지" className="w-20 h-20 rounded-full mr-10" />
            <div className="items-center text-3xl whitespace-nowrap font-bold">{feed?.nickname}</div>
          </div>
          <div className="cursor-pointer" onClick={() => navigate(`/feed/edit/${post_id}`)}>
            <Pencil size={30} />
          </div>
        </section>
        <section className="w-full mb-5">
          <img src={feed?.imgUrl} alt="post" className="max-h-[100vh] w-full object-cover" />
        </section>
        <section className="flex items-center justify-between">
          <div className="flex flex-row">
            <div className={`text-white px-3 py-1 rounded-full h-fit w-fit text-center mr-3 text-2xl bg-${feed?.categoryName}`}>
              {feed?.categoryName}
            </div>
            <div className={`text-white px-3 py-1 rounded-full h-fit w-fit text-center text-2xl bg-${feed?.categoryName}`}>
              {feed?.categoryName === "기상"
                ? `${Math.floor(feed.activityTime / 60)}시 ${feed.activityTime % 60}분`
                : `${feed?.activityTime}분`}
            </div>
          </div>
          <div className="text-xl">
            {feed?.createdAt.toDateString()}
          </div>
        </section>
        <section className="mt-5 flex items-center">
          <Heart size={50} />
          <div className="ml-5 text-4xl font-bold">
            {feed?.likeCount}
          </div>
        </section>
        <section className="mt-5 text-4xl">
          {feed?.content}
        </section>
        <form onSubmit={submitComment} className="w-full relative flex">
          <Textarea value={commentContent} onChange={(e) => setCommentContent(e.target.value)} placeholder="댓글 작성" className="pr-14 resize-none h-fit scrollbar-hide" />
          <Button type="submit" className="absolute right-1 text-[#92C7CF]">전송</Button>
        </form>
        <section className="mt-10">
          {feed?.commentList?.map((it: CommentType) => (
            <Comment key={it.id} {...it} />
          ))}
        </section>
      </div>

    </div>)
}

export default FeedDetail
