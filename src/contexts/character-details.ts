/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @stylistic/max-len */
import { Dispatch, SetStateAction, createContext } from 'react'

interface CharacterDetailsContextModel {
  characterDetails: any
  setCharacterDetails: Dispatch<SetStateAction<object>>
}

export const CharacterDetailsContext = createContext({} as CharacterDetailsContextModel)
