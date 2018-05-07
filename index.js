const Vue = require('vue')
const server = require('express')()
const renderer = require('vue-server-renderer').createRenderer()

server.get('*', (req, res) => {
  const app = new Vue({
    data: {
      url: req.url,
      title: 'Hello Vue',
      article: 'It is really confuse me, how to struct our data'
    },
    template: require('fs').readFileSync('./index.template.html', 'utf8')
  })

  const context = {
    'title': "",
    'article': ""
  }

  renderer.renderToString(app, context, (err, html) => {
    if (err) {
      res.status(500).end('Internal Server Error')
      return
    }
    res.end(html)
  })
})

server.listen(8080)
