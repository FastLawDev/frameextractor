import * as React from 'react'

export interface MarkProps {
  key: string
  content: string
  start: number
  end: number
  tag: string
  color?: string
  onClick: (_: any) => any
}

const Mark: React.SFC<MarkProps> = props => (
  <mark
    style={{backgroundColor: props.color || '#84d2ff', padding: '0 4px'}}
    data-start={props.start}
    data-end={props.end}
    onClick={() => props.onClick({start: props.start, end: props.end})}
  >
    {props.content}
    {props.tag && (
      <span className='badge'>{props.tag}</span>
    )}
  </mark>
)

export default Mark
