import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames'

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

enum SortType {
  alpha = 'alpha',
  length = 'length',
  empty = ''
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortType>(SortType.empty)
  const [isReversed, setIsReversed] = useState(false)
  const [visibleGoods, setvisibleGoods] = useState(goodsFromServer)

  function sortingGoods(sortField: SortType): void {
    const visibleGoods = [...goodsFromServer]

    if (sortField) {
      switch(sortField) {
        case SortType.alpha:
          visibleGoods.sort((a, b) => a.localeCompare(b))
        break;

        case SortType.length:
          visibleGoods.sort((a, b) => a.length - b.length)
        break;

        default:
      }
    }

    if(isReversed) {
      visibleGoods.reverse()
    }

    setvisibleGoods(visibleGoods);
  }

  const alphaSortHandler = () => {
    setSortField(SortType.alpha)
    sortingGoods(SortType.alpha)
  }

  const lengthSortHandler = () => {
    setSortField(SortType.length)
    sortingGoods(SortType.length)
  }

  const reverseHandler = () => {
    setIsReversed(prev => !prev)
    setvisibleGoods([...visibleGoods].reverse())
  }

  const resetHandler = () => {
    setIsReversed(false)
    setvisibleGoods([...goodsFromServer])
    setSortField(SortType.empty)
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
        type="button"
        className={cn('button is-info',{
         'is-light': sortField !== 'alpha'
        })}
        onClick={alphaSortHandler}
        >
          Sort alphabetically
        </button>

        <button
        type="button"
        className={cn('button is-info',{
          'is-light': sortField !== 'length'
         })}
        onClick={lengthSortHandler}
        >
          Sort by length
        </button>

        <button
        type="button"
        className={cn('button is-info',{
          'is-light': !isReversed
         })}
        onClick={reverseHandler}
        >
          Reverse
        </button>

         {
          goodsFromServer.join('') !== visibleGoods.join('') && (
            <button
            type="button"
            className="button is-danger is-light"
            onClick={resetHandler}
            >
              Reset
            </button>
          )
         }
      </div>

      <ul>
        <ul>
          {
            visibleGoods.map(good => {
              return (
                <li data-cy="Good" key={good}>{good}</li>
              )
            })
          }
        </ul>
      </ul>
    </div>
  );
};
