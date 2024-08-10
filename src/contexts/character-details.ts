/* eslint-disable @stylistic/max-len */
import { Dispatch, SetStateAction, createContext } from 'react'

interface CharacterDetailsContextModel {
  characterDetails: object
  setCharacterDetails: Dispatch<SetStateAction<object>>
}

export const CharacterDetailsContext = createContext({} as CharacterDetailsContextModel)
