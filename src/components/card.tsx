import React from 'react'
import { listData } from '@/types/list'
import { Theme } from '@mui/material'
import { createStyles, makeStyles } from '@mui/styles'
import { moneyFormat } from '../utils'

const bg = require('../assets/card-bg.png')
const bgHighlight = require('../assets/card-bg-highlight.png')
const coinBg = require('../assets/coin-bg.png')
const coinDefault = require('../assets/coin-default.png')

const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    root: {
      position: 'relative',
      width: '290px',
      height: '138px',
      backgroundSize: '100% 100%',
      background: `url(${bg})`,
      marginRight: '68px',
      marginBottom: '50px',
      [theme.breakpoints.down('sm')]: {
        marginRight: 0
      },
      [theme.breakpoints.up('sm') && theme.breakpoints.down('md')]: {
        '&:nth-child(2n)': {
          marginRight: 0
        }
      },
      [theme.breakpoints.up('md') && theme.breakpoints.down('lg')]: {
        '&:nth-child(3n)': {
          marginRight: 0
        }
      },
      [theme.breakpoints.up('lg')]: {
        '&:nth-child(4n)': {
          marginRight: 0
        }
      },
      '&:hover, &.selected': {
        background: `url(${bgHighlight})`,
        backgroundSize: '100% 100%'
      }
    },
    status: {
      position: 'absolute',
      fontSize: 18,
      lineHeight: '22px',
      textAlign: 'right',
      right: '10px',
      top: '5px',
      '&.active': {
        color: '#76FCB3'
      },
      '&.suspended': {
        color: '#FFE500'
      },
      '&.terminated': {
        color: '#FF007A'
      }
    },
    name: {
      color: '#ffffff',
      fontSize: 20,
      fontWeight: 'bold',
      lineHeight: '32px',
      width: 132,
      textAlign: 'center'
    },
    infoContain: {
      marginTop: 18,
      height: 70,
      justifyContent: 'space-between',
      paddingLeft: 22,
      paddingRight: 14
    },
    coinContain: {
      width: 70,
      height: 70,
      backgroundSize: '100% 100%',
      background: `url(${coinBg})`
    },
    coin: {
      width: 60,
      height: 60,
      margin: 5,
      borderRadius: '50%',
      overflow: 'hidden',
      backgroundSize: '100% 100%',
      background: `url(${coinDefault})`,
      '& img': {
        width: '100%',
        height: '100%'
      }
    },
    info: {
      height: 70,
      color: '#ffffff',
      lineHeight: '35px',
      textAlign: 'right',
      userSelect: 'none'
    },
    money: {
      fontSize: '22px',
      fontWeight: 500
    },
    date: {
      fontSize: '13px'
    },
    // 粗暴的用毛玻璃处理骨架显示，需要waiting的数据就用毛玻璃等待
    blur: {
      filter: 'blur(8px)'
    }
  })
})

const Card = (props: listData & { selectedId?: number, clickHandler: Function }) => {
  const classes = useStyles()

  const getStatus = (status: 0 | 1 | 2) => {
    return ['suspended', 'active', 'terminated'][status]
  }

  return (
    <div className={`${classes.root} ${props.id === props.selectedId && 'selected'}`} onClick={() => props.clickHandler(props.id)}>
      <div className={`${classes.status} ${getStatus(props.status)}`} >{getStatus(props.status)}</div>

      <div className={classes.name}>{props.symbol}</div>

      <div className={`${classes.infoContain} flex`}>
        <div className={classes.coinContain}>
          <div className={classes.coin}>{props.logo && <img src={props.logo} alt='' />}</div>
        </div>

        <div className={classes.info}>
          <div className={`${classes.money} ${!props.price && classes.blur}`}>$ {moneyFormat(props.price)}</div>
          {/* 缺个随机时间跟时间格式转义 */}
          <div className={classes.date}>End: 08/Sept/2022 16:00</div>
        </div>
      </div>
    </div>
  )
}

export default Card