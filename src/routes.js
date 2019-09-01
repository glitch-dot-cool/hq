// store routes and corresponding urls for BrowserViews. if a route doesn't require
// a BrowserView (i.e. is not embedded content from another website), simply leave the 
// url property as undefined.

export default {
  trello: {
    path: "/trello",
    url: "https://trello.com/b/FloSWCwI/glitchdotcool"
  },
  github: {
    path: "/github",
    url: "https://github.com/glitch-dot-cool"
  },
  home: {
    path: "/",
    url: undefined
  },
  about: {
    path: "/about",
    url: undefined
  }
};