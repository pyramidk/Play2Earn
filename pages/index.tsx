import CreateGame from '@/components/CreateGame'
import GameDetails from '@/components/GameDetails'
import GameList from '@/components/GameList'
import Hero from '@/components/Hero'
import { getGames } from '@/services/blockchain'
import { generateGameData } from '@/utils/fakeData'
import { globalActions } from '@/store/globalSlices'
import { GameStruct, RootState } from '@/utils/type.dt'
import { NextPage } from 'next'
import Head from 'next/head'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Page: NextPage<{ gamesData: GameStruct[] }> = ({ gamesData }) => {
  const dispatch = useDispatch()
  const { setGames } = globalActions
  const { games } = useSelector((states: RootState) => states.globalStates)

  useEffect(() => {
    dispatch(setGames(gamesData))
  }, [dispatch, setGames, gamesData]);


  return (
    <div>
      <Head>
        <title>Play2Earn</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Hero />

      {gamesData.length > 1 && (
        <>
          <GameList games={gamesData} />
          <GameDetails />
        </>
      )}
      <CreateGame />
    </div>
  )
}

export default Page

export const getServerSideProps = async () => {
  // const gamesData: GameStruct[] = generateGameData(5)
  const gamesData: GameStruct[] = await getGames()
  return {
    props: { gamesData: JSON.parse(JSON.stringify(gamesData)) },
  }
}
