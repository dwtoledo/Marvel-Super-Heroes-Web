/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent, useContext, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { debounce } from 'lodash'

import { LoadingContent } from '../../components/LoadingContent'
import { CharactersTable } from '../../components/CharactersTable'
import { CharacterSearchForm } from '../../components/CharacterSearchForm'
import { CharacterDetailsContext } from '../../contexts/character-details'

import styles from './style.module.css'
import { Pagination } from '../../components/Pagination'
import { useMarvelCharacters } from '../../hooks/MarvelCharacters'

export function Home() {
  const { setCharacterDetails } = useContext(CharacterDetailsContext)
  const navigate = useNavigate()

  const {
    characters,
    isLoading,
    currentPage,
    totalPages,
    setSearchQuery,
    setCurrentPage,
  } = useMarvelCharacters()

  const debouncedChangeHandler = useMemo(
    () => debounce((newValue: string) => setSearchQuery(newValue), 1500),
    [setSearchQuery],
  )

  function handleNewSearchQuery(event: ChangeEvent<HTMLInputElement>) {
    debouncedChangeHandler(event.target.value)
    setCurrentPage(1)
  }

  function handleSuperHeroCardClick(character: any) {
    setCharacterDetails(character)
    navigate(`/details/${character.id}`)
  }

  function handleNextPage() {
    handleGoToPage(currentPage + 1)
  }

  function handlePreviousPage() {
    handleGoToPage(currentPage - 1)
  }

  function handleFirstPage() {
    handleGoToPage(1)
  }

  function handleLastPage() {
    handleGoToPage(totalPages)
  }

  function handleGoToPage(page: number) {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  return (
    <main className={styles.mainContent}>
      <div className={styles.charactersWrapper}>
        <h1>Busca de personagens:</h1>

        <CharacterSearchForm onSearchQueryChange={handleNewSearchQuery} />

        {isLoading
          ? <LoadingContent message="Buscando super-heróis..." />
          : (<CharactersTable
              characters={characters}
              onCharacterClick={handleSuperHeroCardClick}
             />)}

      </div>

      {!characters.length
        ? null
        : (
          <div className={isLoading
            ? styles.paginationWrapperHidden
            : styles.paginationWrapper}
          >
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onNextPage={handleNextPage}
              onPreviousPage={handlePreviousPage}
              onFirstPage={handleFirstPage}
              onLastPage={handleLastPage}
              onGoToPage={handleGoToPage}
            />
          </div>
          )}

    </main>
  )
}
