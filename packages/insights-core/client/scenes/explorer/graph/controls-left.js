import './styles.scss'

import React, { Component } from 'react'
import { kea } from 'kea'
import PropTypes from 'prop-types'

import explorerLogic from '~/scenes/explorer/logic'

export const colors = ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf']

@kea({
  connect: {
    actions: [
      explorerLogic, [
        'setGraphTimeGroup'
      ]
    ],
    props: [
      explorerLogic, [
        'graphTimeGroup'
      ]
    ]
  },

  actions: () => ({
    showMore: true
  }),

  reducers: ({ actions }) => ({
    moreShown: [false, PropTypes.bool, {
      [actions.showMore]: () => true,
      [actions.setGraphTimeGroup]: (_, { graphTimeGroup }) => graphTimeGroup === 'quarter' || graphTimeGroup === 'year'
    }]
  })
})
export default class ControlsLeft extends Component {
  render () {
    const { graphTimeGroup, moreShown } = this.props
    const { setGraphTimeGroup, showMore } = this.actions

    return (
      <div className='left'>
        <span className='control-group'>
          <span className={graphTimeGroup === 'day' ? 'control selected' : 'control'} onClick={() => setGraphTimeGroup('day')}>
            day
          </span>
          <span className={graphTimeGroup === 'week' ? 'control selected' : 'control'} onClick={() => setGraphTimeGroup('week')}>
            week
          </span>
          <span className={graphTimeGroup === 'month' ? 'control selected' : 'control'} onClick={() => setGraphTimeGroup('month')}>
            month
          </span>
          {!moreShown && (
            <span className='control' onClick={showMore}>
              ...
            </span>
          )}
          {moreShown && (
            <span className={graphTimeGroup === 'quarter' ? 'control selected' : 'control'} onClick={() => setGraphTimeGroup('quarter')}>
              quarter
            </span>
          )}
          {moreShown && (
            <span className={graphTimeGroup === 'year' ? 'control selected' : 'control'} onClick={() => setGraphTimeGroup('year')}>
              year
            </span>
          )}
        </span>
      </div>
    )
  }
}
