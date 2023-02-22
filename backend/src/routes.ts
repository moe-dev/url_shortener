import Router from 'express-promise-router'
// import * as cache from './cache'
import * as db from './db'
import { generateRandomString, isValidUrl } from './utils'
// import logger from './lib/logger'
import { RequestHandler } from 'express'

const router = Router()

router.get('/health', (_, res) => res.sendStatus(200))

router.get('/hello', (_, res) => {
  res.json({ message: 'hello' })
})

router.put('/url', (async (_req, res) => {
  const url = _req.body.url
  try{
  if (!isValidUrl(url)){
    throw new Error ("Invalid URL")
  }
  const slug = generateRandomString()
  await db.createUrl(url, slug)
  res.json({slug: slug})
  }
  catch(e){  
    res.status(400).send(e)
  }
}) as RequestHandler)

router.get('/:slug', (async (_req, res) => {
  try{
  const url = await db.getUrl(_req.params.slug)
  if (!url){
    throw new Error ("Url Does Not Exist")
  }
  res.json({url:url})
  }
  catch(e){  
    res.status(400).send(e)
  }
}) as RequestHandler)

export default router
