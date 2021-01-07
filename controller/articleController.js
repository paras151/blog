var express = require("express");

const articleModel = require('../model/articleModel')

const createArticlePage = async (req,res)=>{
    res.render('articles/new', { article: new articleModel() })
}

const editArticlePage = async (req,res)=>{
    const article = await articleModel.findById(req.params.id)
    res.render('articles/edit', { article: article })
}

const getArticle = async (req,res)=>{
    const article = await articleModel.findOne({ slug: req.params.slug })
  if (article == null) res.redirect('/')
  res.render('articles/show', { article: article })
}

const getAllArticle = async (req,res)=>{

  const articles = await articleModel.find({_creator: req.user._id}).sort({ createdAt: 'desc' })
  res.render('articles/showAll', { articles: articles })

//   const article = await articleModel.findOne({ _creator: req.user._id })
// if (article == null) res.redirect('/')
// res.render('articles/showAll', { article: article })
}

const createArticle = async (req,res,next)=>{
    req.article = new articleModel()
    next()
}

const editArticle = async (req,res,next)=>{
    req.article = await articleModel.findById(req.params.id)
    next()
}

const deleteArticle = async (req,res)=>{
    await articleModel.findByIdAndDelete(req.params.id)
    res.redirect('/articles/myarticles')
}

function saveArticleAndRedirect(path) {
    return async (req, res) => {

      let article = req.article
      article.title = req.body.title
      article.description = req.body.description
      article.markdown = req.body.markdown
      if(!article._creator) 
        article._creator = req.user._id 
      try {
        article = await article.save()
        res.redirect(`/articles/${article.slug}`)
      } catch (e) {
        res.render(`articles/${path}`, { article: article })
      }
    }
  }

  module.exports = {createArticlePage, editArticlePage, getArticle,getAllArticle, createArticle, editArticle, deleteArticle, saveArticleAndRedirect }