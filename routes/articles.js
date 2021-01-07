const express = require('express')
const articleRouter = express.Router()
const {createArticlePage, editArticlePage, getArticle,getAllArticle, createArticle, editArticle, deleteArticle, saveArticleAndRedirect } = require("../controller/articleController")
const {authenticate} = require("../controller/authController")

articleRouter.get('/new',authenticate, createArticlePage);

articleRouter.get('/edit/:id', authenticate, editArticlePage)

articleRouter.get('/myarticles',authenticate, getAllArticle)

articleRouter.get('/:slug', getArticle)

articleRouter.post('/', authenticate , createArticle, saveArticleAndRedirect('new'))

articleRouter.put('/:id', editArticle, saveArticleAndRedirect('edit'))

articleRouter.delete('/:id', deleteArticle)

// function saveArticleAndRedirect(path) {
//   return async (req, res) => {
//     let article = req.article
//     article.title = req.body.title
//     article.description = req.body.description
//     article.markdown = req.body.markdown
//     try {
//       article = await article.save()
//       res.redirect(`/articles/${article.slug}`)
//     } catch (e) {
//       res.render(`articles/${path}`, { article: article })
//     }
//   }
// }

module.exports = articleRouter