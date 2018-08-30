import * as _ from 'lodash'

export interface Interval {
        start: number;
        end: number;
}

export interface Split extends Interval {
        content: string;
        mark: boolean;
}

export function splitWithOffsets(text: string, offsets: Interval[]): Split[] {
  let lastEnd = 0
  const splits: Split[] = []

  for (let offset of _.sortBy(offsets, (o: Interval): number => o.start)) {
    const {start, end} = offset
    if (lastEnd < start) {
      splits.push({
        start: lastEnd,
        end: start,
        mark: false,
        content: text.slice(lastEnd, start),
      })
    }
    splits.push({
      ...offset,
      mark: true,
      content: text.slice(start, end),
    })
    lastEnd = end
  }
  if (lastEnd < text.length) {
    splits.push({
      start: lastEnd,
      end: text.length,
      mark: false,
      content: text.slice(lastEnd, text.length),
    })
  }

  return splits
}

export function splitTokensWithOffsets(text: string[], offsets: Interval[]): any {
  let lastEnd = 0
  const splits: any[] = []

  for (let offset of _.sortBy(offsets, (o: Interval): number => o.start)) {
    const {start, end} = offset
    if (lastEnd < start) {
      for (let i = lastEnd; i < start; i++) {
        splits.push({
          i,
          content: text[i],
        })
      }
    }
    splits.push({
      ...offset,
      mark: true,
      content: text.slice(start, end).join(' '),
    })
    lastEnd = end
  }

  for (let i = lastEnd; i < text.length; i++) {
    splits.push({
      i,
      content: text[i],
    })
  }

  return splits
}

export const selectionIsEmpty = (selection: Selection) => {
  let position = selection.anchorNode.compareDocumentPosition(selection.focusNode)

  return position === 0 && selection.focusOffset === selection.anchorOffset
}

export const selectionIsBackwards = (selection: Selection) => {
  if (selectionIsEmpty(selection)) return false

  let position = selection.anchorNode.compareDocumentPosition(selection.focusNode)

  let backward = false
  if (
    (!position && selection.anchorOffset > selection.focusOffset) ||
    position === Node.DOCUMENT_POSITION_PRECEDING
  )
    backward = true

  return backward
}
