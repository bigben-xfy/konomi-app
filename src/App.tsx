import React, { useEffect, useState } from 'react'
import { Theme } from '@mui/material'
import { createStyles, makeStyles } from '@mui/styles'

import { getList, getCoinPrice } from './api'
import { listData } from './types/list'
import Card from './components/card'

const iconHead = require('./assets/icon-oracle.png')

const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    root: {
      width: '100vw',
      height: '100vh',
      backgroundColor: '#29263F'
    },
    inner: {
      [theme.breakpoints.down('sm')]: {
        width: '290px'
      },
      [theme.breakpoints.up('sm')]: {
        width: '600px'
      },
      [theme.breakpoints.up('md')]: {
        width: '1024px'
      },
      [theme.breakpoints.up('lg')]: {
        width: '1440px'
      },
      maxHeight: '100vh'
    },
    innerBody: {
      width: '100%',
      flexWrap: 'wrap',
      maxHeight: 'calc(100vh - 55px)',
      overflow: 'auto'
    },
    logo: {
      width: 118,
      height: 28,
      background: `url(${iconHead})`,
      backgroundSize: '100% 100%',
      marginBottom: 27
    },
    loading: {
      fontSize: '30px',
      textAlign: 'center',
      color: '#ffffff'
    }
  })
})

const App = () => {
  const classes = useStyles()

  const [list, setList] = useState<listData[]>([])
  const [selectedId, setSelectedId] = useState(-1)

  const getData = async () => {
    const response = await getList()
    setList(response)
    
    const ids = response.map(item => item.subscriptionId)
    const priceResponse = await getCoinPrice(ids)
    
    const final = response.map((item, index) => {
      return {
        ...item,
        ...priceResponse[index]
      }
    })
    setList(final)
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div className={`${classes.root} flex flex-center`}>
      <div className={`${classes.inner}`}>
        <div className={classes.logo} />
        {!list.length && (
          <div className={classes.loading}>Loading...</div>
        )}
        <div className={`${classes.innerBody} flex`}>
          {list.map(item => (
            <Card {...item} key={item.id} selectedId={selectedId} clickHandler={setSelectedId} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
