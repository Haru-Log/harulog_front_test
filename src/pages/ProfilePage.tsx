import dummyImage10 from '../assets/20231020_090539.jpg'
import { Button } from "../ui/button"
import ProfileNumber from "../components/ProfilePage/ProfileNumber"
import Heatmap from "../components/ProfilePage/Heatmap";
import { useEffect, useState } from "react";
import { Archive, Mountain } from "lucide-react";
import { Jandi } from "../types/HeatmapData.type";
import FeedCard from "../components/Feed/Cards";
import ChallengeCard from './../components/ChallengePage/Cards';
import { dummy_sample } from "../types/FeedItem.type";
import dummyChallengeData from "../types/ChallengeItem.dummy";
import dummy_jandi from "../types/HeatmapData.dummy";
import { getRange, mergeCategory, mergeJandi, shiftDate } from "../utils/rawDatatoJandi";

const today = new Date(); // dummy data용

const ProfilePage = () => {

  const [chartData, setChartData] = useState<Jandi[]>(
    getRange(51 * 7 + today.getDay() + 1).map(index => {
      return {
        date: shiftDate(new Date(), -index),
        category: [""]
      };
    })
  );

  const [feedToggle, setFeedToggle] = useState(false);

  // 전체 필터링을 위한 작업
  useEffect(() => {
    dummy_jandi.sort((a, b) => a.date.getTime() - b.date.getTime());    
    const mergedJandi = mergeJandi(chartData, mergeCategory(dummy_jandi))



    if (mergedJandi.length) {
      setChartData(mergedJandi.map((it) => {
        let tmp: string[] = [];
        for (let i of it.category) {
          if (!tmp.includes(i)) {
            tmp.push(i)
          }
        }
        return { ...it, category: tmp }
      }))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dummy_jandi])

  return (
    <div className="w-full flex justify-center py-16">
      <div className="w-[80%] h-full flex flex-col">
        <section className="flex h-[30%] w-full items-start">
          <div className="maax-w-40 max-h-40">
            <img src={dummyImage10} className="w-40 h-40 rounded-full object-fill mr-40 whitespace-nowrap" alt="Profile" />
          </div>
          <div className="flex flex-col w-full">
            <div className="flex w-full items-baseline justify-between">
              <div className="font-bold text-3xl">
                이강혁
              </div>
              <Button className="bg-gray-400 rounded-full">프로필 편집</Button>
            </div>
            <div className="flex p-6 justify-between">
              <ProfileNumber title={"게시물"} count={6} />
              <ProfileNumber title={"챌린지"} count={4} />
              <ProfileNumber title={"팔로워"} count={1} />
              <ProfileNumber title={"팔로잉"} count={1} />
            </div>
          </div>
        </section>
        <section>
          <Heatmap data={chartData} />
        </section>
        <section className="w-full h-full">
          <div className="w-full flex justify-between">
            <div
              className={`w-full h-fit flex justify-center p-2 cursor-pointer items-center ${!feedToggle ? 'border-t-2 border-black font-bold' : 'border-t border-t-gray-400 text-gray-400'}`}
              onClick={() => setFeedToggle(false)}
            >
              <Archive className="mr-2" strokeWidth={2.5} size={32} />피드
            </div>
            <div
              className={`w-full h-fit flex justify-center p-2 cursor-pointer items-center  ${feedToggle ? 'border-t-2 border-black font-bold' : 'border-t border-t-gray-400 text-gray-400'}`}
              onClick={() => setFeedToggle(true)}
            >
              <Mountain className="mr-2" strokeWidth={2.5} size={32} />챌린지
            </div>
          </div>
          <div className='flex flex-col items-center'>
            {feedToggle ?
              <ChallengeCard data={dummyChallengeData} />
              :
              <FeedCard data={dummy_sample} />
            }
          </div>
        </section>
      </div>
    </div>
  )
}

export default ProfilePage