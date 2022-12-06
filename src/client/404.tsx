;((location, projectPages) => {
  const repo = projectPages ? '/' + location.pathname.split('/')[1] : ''

  const redirect = () => {
    location.replace(
      location.protocol +
        '//' +
        location.hostname +
        (location.port ? ':' + location.port : '') +
        repo +
        '/?' +
        (location.pathname ? 'p=' + location.pathname.replace(/&/g, '~and~').replace(repo, '') : '') +
        (location.search ? '&q=' + location.search.slice(1).replace(/&/g, '~and~') : '') +
        location.hash
    )
  }
  const resolve = () => {
    if (location.search) {
      const query = location.search
        .slice(1)
        .split('&')
        .reduce<Record<string, string>>((query, parameter) => {
          const splitted = parameter.split('=')
          return {
            ...query,
            [splitted[0]]: splitted.slice(1).join('=').replace(/~and~/g, '&'),
          }
        }, {})
      if (query.p !== undefined) {
        window.history.replaceState(
          null,
          '404',
          repo + (query.p || '') + (query.q ? '?' + query.q : '') + location.hash
        )
      }
    }
  }
  document.title === '404' ? redirect() : resolve()
})(window.location, false)
